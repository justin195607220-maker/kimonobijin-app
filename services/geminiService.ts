
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import { Background, Kimono, KimonoColor, KimonoPattern } from "../types";

// Helper to convert a Blob to a base64 string
const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                // The result includes the Base64 prefix, which we need to remove.
                resolve(reader.result.split(',')[1]);
            } else {
                reject(new Error("Failed to read blob as a data URL."));
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);
    });
};

// A utility to resize an image Blob object to a maximum dimension, preserving aspect ratio.
const resizeImage = (blob: Blob, maxDimension: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;

      // If the image is already within the desired dimensions, no need to resize.
      if (width <= maxDimension && height <= maxDimension) {
        resolve(blob);
        return;
      }

      // Calculate new dimensions
      if (width > height) {
        height = Math.round(height * (maxDimension / width));
        width = maxDimension;
      } else {
        width = Math.round(width * (maxDimension / height));
        height = maxDimension;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error("Could not get canvas context for resizing."));
      }
      ctx.drawImage(img, 0, 0, width, height);

      const mimeType = blob.type;
      const quality = mimeType === 'image/jpeg' ? 0.92 : undefined; 

      canvas.toBlob((resizedBlob) => {
        if (resizedBlob) {
          resolve(resizedBlob);
        } else {
          reject(new Error("Failed to create blob from canvas during resizing."));
        }
      }, mimeType, quality);
    };
    img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Failed to load image for resizing."));
    };
    img.src = objectUrl;
  });
};

// Helper to get the dimensions of an image from a Blob
const getImageDimensions = (blob: Blob): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image to get dimensions."));
    };
    img.src = objectUrl;
  });
};

// New function to pad an image blob to a target aspect ratio by adding white space
const padImageBlob = (blob: Blob, targetAspectRatio: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(blob);
        img.onload = () => {
            URL.revokeObjectURL(objectUrl);
            const originalWidth = img.width;
            const originalHeight = img.height;
            const originalAspectRatio = originalWidth / originalHeight;

            // If aspect ratios are already very close, no need to pad
            if (Math.abs(originalAspectRatio - targetAspectRatio) < 0.01) {
                resolve(blob);
                return;
            }

            let canvasWidth = originalWidth;
            let canvasHeight = originalHeight;

            // Adjust canvas size to match target, adding padding
            if (originalAspectRatio > targetAspectRatio) {
                // Original is wider than target (e.g., 16:9 vs 4:3), so add vertical padding
                canvasHeight = originalWidth / targetAspectRatio;
            } else {
                // Original is taller than target (e.g., 9:16 vs 4:3), so add horizontal padding
                canvasWidth = originalHeight * targetAspectRatio;
            }

            const canvas = document.createElement('canvas');
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return reject(new Error("Could not get canvas context for padding."));
            }

            // Fill with a neutral white background.
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            
            // Draw original image centered on the new canvas
            const x = (canvasWidth - originalWidth) / 2;
            const y = (canvasHeight - originalHeight) / 2;
            ctx.drawImage(img, x, y, originalWidth, originalHeight);

            const mimeType = blob.type;
            const quality = mimeType === 'image/jpeg' ? 0.92 : undefined;

            canvas.toBlob((paddedBlob) => {
                if (paddedBlob) {
                    resolve(paddedBlob);
                } else {
                    reject(new Error("Failed to create blob from padded canvas."));
                }
            }, mimeType, quality);
        };
        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Failed to load image for padding."));
        };
        img.src = objectUrl;
    });
};

// Utility function to introduce a delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

interface GenerateKimonoImageParams {
  originalImage: File;
  kimono: Kimono;
  color: KimonoColor;
  pattern: KimonoPattern;
  background: Background;
  placement: number;
  size: number;
  distance: number;
  posePrompt: string;
  referenceImages?: File[];
}

export const generateKimonoImage = async (params: GenerateKimonoImageParams): Promise<string> => {
  // Initialize GoogleGenAI instance inside the function to ensure it uses the most up-to-date API key.
  const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

  const MAX_RETRIES = 2; // Total 3 attempts (initial + 2 retries)
  const RETRY_DELAY_MS = 20000; // Base delay: 20 seconds

  // Deconstruct params to use them in the loop
  const {
    originalImage,
    kimono,
    color,
    pattern,
    background,
    placement,
    size,
    distance,
    posePrompt,
    referenceImages,
  } = params;

  // Step 1: Process the background image to get its aspect ratio.
  let backgroundBlob: Blob;
  if (background.file) {
    // User-uploaded background: already a file, just resize it.
    backgroundBlob = await resizeImage(background.file, 768);
  } else if (background.imageUrl) {
    // Preset background: fetch from URL via a CORS proxy to avoid browser security issues.
    // Then, process it exactly like a user-uploaded file to ensure consistency.
    const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(background.imageUrl)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch image from URL: ${response.statusText}`);
    }
    const blob = await response.blob();
    backgroundBlob = await resizeImage(blob, 768);
  } else {
    throw new Error("背景画像のソースが見つかりません。");
  }

  const { width: bgWidth, height: bgHeight } = await getImageDimensions(backgroundBlob);
  const targetAspectRatio = bgWidth / bgHeight;
  
  const backgroundBase64 = await blobToBase64(backgroundBlob);
  const backgroundImagePart = {
    inlineData: {
      data: backgroundBase64,
      mimeType: backgroundBlob.type,
    },
  };

  // Step 2: Process the person image, padding it to match the background's aspect ratio.
  const resizedPersonBlob = await resizeImage(originalImage, 768);
  const paddedPersonBlob = await padImageBlob(resizedPersonBlob, targetAspectRatio);
  const personBase64 = await blobToBase64(paddedPersonBlob);
  const personImagePart = {
    inlineData: {
      data: personBase64,
      mimeType: paddedPersonBlob.type,
    },
  };

  const parts = [personImagePart, backgroundImagePart];
  
  // Step 3: Do the same padding for any reference images.
  if (referenceImages && referenceImages.length > 0) {
    const referenceImageParts = await Promise.all(
      referenceImages.map(async (file) => {
        const resizedBlob = await resizeImage(file, 768);
        const paddedBlob = await padImageBlob(resizedBlob, targetAspectRatio);
        const base64 = await blobToBase64(paddedBlob);
        return {
          inlineData: {
            data: base64,
            mimeType: paddedBlob.type,
          },
        };
      })
    );
    parts.push(...referenceImageParts);
  }

    let placementInstructionText: string;
    if (placement < -110) {
        placementInstructionText = "Position the subject completely on the far left edge of the frame, with part of their body cut off for an extreme composition.";
    } else if (placement <= -90) {
        placementInstructionText = 'Place the subject on the far left edge of the scene for a dramatic composition.';
    } else if (placement <= -50) {
        placementInstructionText = 'Place the subject clearly in the left half of the frame, between the center and the edge.';
    } else if (placement <= -20) {
        placementInstructionText = "Place the subject along the left third line of the composition (rule of thirds) for a dynamic image.";
    } else if (placement < 20) {
        placementInstructionText = 'Place the subject centrally in the scene, making them the main focus in a balanced composition.';
    } else if (placement < 50) {
        placementInstructionText = "Place the subject along the right third line of the composition (rule of thirds) for a dynamic image.";
    } else if (placement < 90) {
        placementInstructionText = 'Place the subject clearly in the right half of the frame, between the center and the edge.';
    } else if (placement < 110) {
        placementInstructionText = 'Place the subject on the far right edge of the scene for a dramatic composition.';
    } else {
        placementInstructionText = "Position the subject completely on the far right edge of the frame, with part of their body cut off for an extreme composition.";
    }

    let sizeInstructionText: string;
    if (size <= 5) {
        sizeInstructionText = 'The subject should be microscopic, a tiny speck, almost invisible within a vast, overwhelming landscape (an extreme artistic choice).';
    } else if (size <= 15) {
        sizeInstructionText = 'An epic extreme long shot where the subject is barely visible, to emphasize the grand scale of the landscape.';
    } else if (size <= 30) {
        sizeInstructionText = 'A very long shot, where the subject is small in the frame to emphasize the surrounding background.';
    } else if (size <= 50) {
        sizeInstructionText = 'A standard long shot, showing the subject from head to toe with a good amount of background visible.';
    } else if (size <= 70) {
        sizeInstructionText = 'A full shot or American shot (from the knees up), balancing the subject and the scenery.';
    } else if (size <= 90) {
        sizeInstructionText = 'A standard medium shot (from the waist up), focusing more on the subject.';
    } else if (size <= 110) {
        sizeInstructionText = 'A close-up shot, focusing on the subject\'s upper body and face, with the background less prominent.';
    } else {
        sizeInstructionText = 'An extreme close-up shot that fills the frame with the subject\'s face, capturing fine details of their expression.';
    }

    let distanceInstructionText: string;
    if (distance < -110) {
        distanceInstructionText = "The subject should be in the extreme far distance, a tiny silhouette on the horizon.";
    } else if (distance <= -80) {
        distanceInstructionText = "Position the subject far in the background to emphasize the scale and depth of the environment.";
    } else if (distance <= -50) {
        distanceInstructionText = "Position the subject in the background, clearly behind the middle ground elements.";
    } else if (distance <= -20) {
        distanceInstructionText = "Position the subject in the middle-to-background area of the scene.";
    } else if (distance < 20) {
        distanceInstructionText = "Position the subject naturally in the middle ground of the scene, well-integrated with their surroundings.";
    } else if (distance < 50) {
        distanceInstructionText = "Position the subject in the middle-to-foreground area of the scene.";
    } else if (distance < 80) {
        distanceInstructionText = "Position the subject in the foreground, close to the camera, making them a primary focus.";
    } else if (distance < 110) {
        distanceInstructionText = "Position the subject extremely close to the camera, in the immediate foreground, for a strong sense of presence.";
    } else {
        distanceInstructionText = "The subject should be so close to the camera that their face or body dominates the frame, with parts cropped out for an intense perspective.";
    }

    const poseInstructionText = (posePrompt && posePrompt.trim() !== '')
    ? `Follow this specific instruction for the pose and action: '${posePrompt}'.`
    : `Maintain the original pose from the photo, adapting it to look natural while wearing a kimono.`;

    let attireInstruction: string;
    if (kimono.id === 'yukata') {
        attireInstruction = `
- Dress the subject in a beautiful '浴衣 (Yukata)'.
- **CRITICAL INSTRUCTION:** A Yukata is a casual, lightweight, single-layered summer kimono typically made of cotton. The final image MUST depict a thin, cool fabric suitable for a hot summer day. DO NOT render multiple layers, an obi that is too formal, or a fabric that looks thick like a formal Furisode or Tomesode.
- The primary color of the yukata should be '${color.name}'.
- The yukata should feature a '${pattern.name}' pattern.
        `;
    } else {
        attireInstruction = `
- Dress the subject in a beautiful '${kimono.name}'.
- The primary color of the kimono should be '${color.name}'.
- The kimono should feature a traditional '${pattern.name}' pattern.
        `;
    }
    const prompt = `
**GOAL:** Create a single, photorealistic composite image.

**SUBJECT:**
- The main subject is in the *first* provided image.
- **CRITICAL:** You must preserve the subject's original face and identity perfectly (e.g., if it's a specific person, dog, or cat). Do not alter their core features.

**BACKGROUND & FINAL IMAGE SPECIFICATIONS:**
- The *second* provided image is the designated background.
- **ABSOLUTE RULE:** The final output image's aspect ratio MUST EXACTLY match the aspect ratio of this background image. Do not alter it.
- To achieve this, take the subject from the first image, and seamlessly composite them into the background. The final output must be the complete scene with the background's original aspect ratio.

**ATTIRE:**
${attireInstruction}

**COMPOSITION:**
- **Framing / Shot Size:** ${sizeInstructionText}
- **Horizontal Placement (Left/Right):** ${placementInstructionText}
- **Depth Placement (Foreground/Background):** ${distanceInstructionText}

**POSE:**
- ${poseInstructionText}
${(referenceImages && referenceImages.length > 0) ? `- Additional images (${referenceImages.length} total) are provided as a reference for the pose. Use them as a loose guide or for inspiration. Do not copy the subject, face, or clothes from the reference images.` : ''}

**FINAL IMAGE RULES:**
- Blend the subject seamlessly into the background.
- The lighting on the subject must match the background's lighting perfectly.
- **Output ONLY the final image.** Do not include any text, markdown, descriptions, or commentary in your response. Your entire response should be the image file.
`;
    const textPart = { text: prompt };

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response: GenerateContentResponse = await ai.models.generateContent({
                // FIX: Updated model name to the Flash version for speed and standard usage.
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [...parts, textPart],
                },
                config: {
                    // FIX: Image generation/editing models should only have Modality.IMAGE as per guidelines.
                    responseModalities: [Modality.IMAGE],
                },
            });

            const candidate = response.candidates?.[0];
            const finishReason = candidate?.finishReason;

            if (finishReason === 'SAFETY' || finishReason === 'IMAGE_SAFETY') {
                throw new Error("[SAFETY_BLOCK]AIが安全上の理由で画像の生成をブロックしました。アップロードした画像や指示内容が、AIの安全ポリシーに抵触した可能性があります。お手数ですが、別の写真や背景、ポーズ指示をお試しください。");
            }

            let generatedDataUrl: string | null = null;
            let fallbackErrorText: string | null = null;

            for (const part of candidate?.content?.parts || []) {
                if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    generatedDataUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
                    break;
                } else if (part.text) {
                    fallbackErrorText = part.text;
                }
            }

            if (generatedDataUrl) {
                return generatedDataUrl; // Success
            }

            console.error("No image part found in Gemini response", response);
            if (fallbackErrorText && fallbackErrorText.trim().length > 1) {
                throw new Error(`AIからの応答: ${fallbackErrorText}`);
            }
            throw new Error("AIモデルは画像を返しませんでした。プロンプトが複雑すぎるか、安全ポリシーに違反している可能性があります。");

        } catch (error) {
            console.error(`Error generating image with Gemini (Attempt ${attempt + 1}):`, error);
            
            let isRateLimitError = false;
            let errorContent = '';
            
            if (error instanceof Error) {
                errorContent = error.message;
            } else if (typeof error === 'object' && error !== null) {
                if ('error' in error && typeof (error as any).error === 'object' && (error as any).error !== null) {
                    const apiError = (error as any).error as { status?: string, code?: number };
                    if (apiError.status === 'RESOURCE_EXHAUSTED' || apiError.code === 429) {
                        isRateLimitError = true;
                    }
                }
                errorContent = JSON.stringify(error);
            } else {
                errorContent = String(error);
            }
            
            const lowerErrorContent = errorContent.toLowerCase();

            if (!isRateLimitError && (lowerErrorContent.includes('429') || lowerErrorContent.includes('resource_exhausted') || lowerErrorContent.includes('rate limit'))) {
                isRateLimitError = true;
            }

            if (isRateLimitError && attempt < MAX_RETRIES) {
                const delayDuration = RETRY_DELAY_MS * (attempt + 1);
                console.log(`Rate limit hit. Retrying in ${delayDuration / 1000} seconds...`);
                await delay(delayDuration);
                continue; // Go to the next iteration of the loop to retry
            }
            
            // If it's not a rate limit error, or if we've exhausted retries, format and throw the final error.
            let message = "画像の生成中に不明なエラーが発生しました。もう一度お試しください。";
            
            if (error instanceof Error) {
                if (error.message.startsWith('[') || error.message.startsWith('AIから') || error.message.startsWith('AIモデルは')) {
                    throw error;
                }
            }
            
            if (isRateLimitError) {
                message = "[RATE_LIMIT_EXCEEDED]APIのリクエスト上限に達しました。しばらく時間をおいてから再度お試しください。";
            } else if (lowerErrorContent.includes('500') || lowerErrorContent.includes('internal error')) {
                message = "AIモデルで内部エラーが発生しました。画像のサイズが大きすぎるか、内容が複雑すぎる可能性があります。しばらくしてから再試行してください。";
            } else if (lowerErrorContent.includes('fetch')) {
                message = "背景画像の読み込みに失敗しました。ネットワーク接続を確認するか、別の背景をお試しください。";
            }

            throw new Error(message);
        }
    }
    
    // This line should theoretically be unreachable, but it's here as a fallback.
    throw new Error("画像の生成に失敗し、リトライの上限に達しました。");
};

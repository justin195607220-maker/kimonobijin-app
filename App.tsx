
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ImageUploader } from './components/ImageUploader';
import { KimonoSelector } from './components/KimonoSelector';
import { ColorSelector } from './components/ColorSelector';
import { KimonoPatternSelector } from './components/KimonoPatternSelector';
import { BackgroundSelector } from './components/BackgroundSelector';
import { PoseSelector } from './components/PoseSelector';
import { ResultDisplay } from './components/ResultDisplay';
import { AdjustmentPanel } from './components/AdjustmentPanel';
import { Gallery } from './components/Gallery';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { UploadIcon } from './components/icons/UploadIcon';
import { DownloadIcon } from './components/icons/DownloadIcon';
import { type Kimono, type KimonoColor, type KimonoPattern, type Background } from './types';
import { KIMONO_OPTIONS, COLOR_OPTIONS, KIMONO_PATTERN_OPTIONS, BACKGROUND_OPTIONS } from './constants';
import { generateKimonoImage } from './services/geminiService';
import { VideoSplashScreen } from './components/VideoSplashScreen';
import { ErrorBoundary } from './components/ErrorBoundary';

// Utility to convert data URL to File
const dataUrlToFile = async (dataUrl: string, fileName: string): Promise<File> => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], fileName, { type: blob.type });
};

const App: React.FC = () => {
  const [showVideoSplash, setShowVideoSplash] = useState<boolean>(true);
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<KimonoColor>(COLOR_OPTIONS[0]);
  const [selectedPattern, setSelectedPattern] = useState<KimonoPattern>(KIMONO_PATTERN_OPTIONS[0]);
  const [selectedKimono, setSelectedKimono] = useState<Kimono>(KIMONO_OPTIONS[0]);
  const [selectedBackground, setSelectedBackground] = useState<Background>(BACKGROUND_OPTIONS[0]);
  const [customBackground, setCustomBackground] = useState<Background | null>(null);
  
  // These now serve as the state for the AdjustmentPanel, with initial defaults.
  const [selectedPlacement, setSelectedPlacement] = useState<number>(0);
  const [personSize, setPersonSize] = useState<number>(60);
  const [personDistance, setPersonDistance] = useState<number>(0);
  const [customInstruction, setCustomInstruction] = useState<string>('');
  const [referenceImageFiles, setReferenceImageFiles] = useState<File[]>([]);
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState<number>(0); // Cooldown timer in seconds

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleVideoSplashFinish = () => {
    setShowVideoSplash(false);
  };
  
  const handleCustomBackgroundUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        const dataUrl = e.target.result;
        // Truncate file name for display
        const displayName = file.name.length > 20 ? `${file.name.substring(0, 18)}...` : file.name;

        const customBg: Background = {
          id: `custom_${file.name}_${Date.now()}`,
          name: displayName,
          thumbnailUrl: dataUrl,
          file: file,
          description: "Custom uploaded background",
        };
        setCustomBackground(customBg);
        setSelectedBackground(customBg);
      } else {
        setError("背景画像の読み込みに失敗しました。");
      }
    };
    reader.onerror = () => {
      setError("背景ファイルの読み込み中にエラーが発生しました。");
    };
    reader.readAsDataURL(file);
  };


  const handleImageUpload = (file: File) => {
    // Reset composition and pose settings for a fresh start with the new image.
    // This prevents the "ghost" of the previous person's settings from affecting the new one.
    setGeneratedImage(null);
    setGalleryImages([]);
    setError(null);
    setReferenceImageFiles([]);
    setCustomInstruction('');
    setSelectedPlacement(0);
    setPersonSize(60);
    setPersonDistance(0);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        const dataUrl = e.target.result as string;
        const img = new Image();
        img.onload = async () => {
            const MAX_DIMENSION = 768;
            let targetWidth = img.width;
            let targetHeight = img.height;

            // Calculate new dimensions to fit within MAX_DIMENSION, preserving aspect ratio
            if (targetWidth > MAX_DIMENSION || targetHeight > MAX_DIMENSION) {
              if (targetWidth > targetHeight) {
                targetHeight = Math.round(targetHeight * (MAX_DIMENSION / targetWidth));
                targetWidth = MAX_DIMENSION;
              } else {
                targetWidth = Math.round(targetWidth * (MAX_DIMENSION / targetHeight));
                targetHeight = MAX_DIMENSION;
              }
            }
            
            // The canvas will now have the aspect ratio of the resized image
            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              setError('Canvasのコンテキストを取得できませんでした。');
              return;
            }
            
            // Draw the original image onto the canvas at the new, resized dimensions
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

            const resizedDataUrl = canvas.toDataURL(file.type);
            setImagePreview(resizedDataUrl);

            // Use a specific quality for jpeg to control file size
            const quality = file.type === 'image/jpeg' ? 0.9 : undefined;
            canvas.toBlob((blob) => {
              if (blob) {
                const resizedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                });
                setOriginalImageFile(resizedFile);
              } else {
                setError("リサイズされた画像の変換に失敗しました。");
                setOriginalImageFile(file); // Fallback to original file
                setImagePreview(dataUrl);
              }
            }, file.type, quality);
        };
        img.onerror = () => {
          setError("画像の読み込み中にエラーが発生しました。");
        };
        img.src = dataUrl;
      }
    };
    reader.onerror = () => {
      setError("ファイルの読み込み中にエラーが発生しました。");
    };
    reader.readAsDataURL(file);
  };
  
  const handleAddReferenceImage = (file: File) => {
    setReferenceImageFiles(prev => [...prev, file]);
  };
  
  const handleRemoveReferenceImage = (fileToRemove: File) => {
    setReferenceImageFiles(prev => prev.filter(file => file !== fileToRemove));
  };


  const isGenerationDisabled = useMemo(() => {
    return !originalImageFile || !selectedColor || !selectedPattern || !selectedKimono || !selectedBackground || isLoading || cooldown > 0;
  }, [originalImageFile, selectedColor, selectedPattern, selectedKimono, selectedBackground, isLoading, cooldown]);

  const handleGenerate = useCallback(async () => {
    if (isGenerationDisabled) return;

    if (!originalImageFile || !selectedKimono || !selectedColor || !selectedPattern || !selectedBackground) {
        setError("ステップ5までのすべてのオプションを選択してください。");
        return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await generateKimonoImage({
        originalImage: originalImageFile,
        kimono: selectedKimono,
        color: selectedColor,
        pattern: selectedPattern,
        background: selectedBackground,
        placement: selectedPlacement,
        size: personSize,
        distance: personDistance,
        posePrompt: customInstruction,
        referenceImages: referenceImageFiles,
      });
      setGeneratedImage(result);
      setGalleryImages(prev => [result, ...prev]);
    } catch (err) {
      const rawErrorMessage = err instanceof Error ? err.message : '画像の生成中に不明なエラーが発生しました。';
      
      let displayErrorMessage = rawErrorMessage;

      if (rawErrorMessage.includes("[RATE_LIMIT_EXCEEDED]")) {
        setCooldown(120);
        displayErrorMessage = rawErrorMessage.replace("[RATE_LIMIT_EXCEEDED]", "").trim();
      } else if (rawErrorMessage.includes("[SAFETY_BLOCK]")) {
        displayErrorMessage = rawErrorMessage.replace("[SAFETY_BLOCK]", "").trim();
      }
      
      setError(displayErrorMessage);
      
      setGeneratedImage(null); // Clear image on error
    } finally {
      setIsLoading(false);
    }
  }, [originalImageFile, selectedKimono, selectedColor, selectedPattern, selectedBackground, selectedPlacement, personSize, personDistance, customInstruction, referenceImageFiles, isGenerationDisabled]);
  
  
  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    const mimeType = generatedImage.split(';')[0].split(':')[1];
    const extension = mimeType.split('/')[1] || 'png';
    link.download = `kimono-bijin-${new Date().getTime()}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStartOver = () => {
    setOriginalImageFile(null);
    setImagePreview(null);
    setGeneratedImage(null);
    setGalleryImages([]);
    setError(null);
    setReferenceImageFiles([]);
    setCustomInstruction('');
    setSelectedPlacement(0);
    setPersonSize(60);
    setPersonDistance(0);
    setCustomBackground(null);
    setSelectedBackground(BACKGROUND_OPTIONS[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleGallerySelect = (imageUrl: string) => {
    setGeneratedImage(imageUrl);
  };
  
  const poseSelectorTooltip = (
    <div>
        <h4 className="font-bold text-base mb-2">AIへの指示で、こだわりの一枚を</h4>
        <p className="mb-3">
            AIは言葉や絵から、あなたのイメージを驚くほど正確に形にしてくれます。
            今のAIはこちらが思っている以上の事ができます。普通の会話のような書き方で、大胆なアイデアも試してみましょう。
        </p>

        <p className="font-semibold mt-3">テクニック1：絵文字や顔文字を使う</p>
        <p className="mb-2">AIは絵文字😉や顔文字(^_^)も理解します。「～のような表情にして」とか「～のようなポーズにして」と指示してください。</p>

        <p className="font-semibold mt-3">テクニック2：棒人間でポーズを指示する</p>
        <p className="mb-2">「ポーズを描く」ボタンから、簡単な棒人間を描いて空欄に「棒人間のようなポーズにして」と指示してください。AIがその骨格を読み取り、自然なポーズを生成します。</p>
        
        <p className="font-semibold mt-3">テクニック3：カメラアングルを指定する</p>
        <p className="mb-2">「下からのアングルで壮大に」「上から見下ろすように」といった指示で、写真の印象を大きく変えることができます。</p>

        <hr className="my-2 border-rose-600"/>

        <p className="font-semibold mt-3">裏ワザ：AIの隠れた能力</p>
        <p className="mb-2">実はこのAI、人間だけでなく犬や猫にも着物を着せることができるかもしれません。写真をアップロードした後、「これは人ではありません。この犬に着物を着せてください」のように、それが動物であることを明確に指示するのが成功のコツです。驚きの結果が生まれるかも？</p>
        
        <hr className="my-2 border-rose-600"/>

        <p className="font-semibold">気軽な気持ちで試しましょう</p>
        <p>
            画像生成は一度で完成させようと思わず、何度か再生成や調整を繰り返して作り上げるものです。
            このアプリはそのように作られていますので、まずは気軽に生成してみてくださいね。
        </p>
    </div>
);
  
  return (
    <div className="bg-rose-50 min-h-screen font-sans text-gray-800">
      {showVideoSplash && <VideoSplashScreen onStart={handleVideoSplashFinish} />}
      <Header />
      <ErrorBoundary>
        <main className="container mx-auto p-4 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Panel: Controls */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-rose-100 flex flex-col gap-6">
              <div>
                <Label 
                  step="1" 
                  text="写真をアップロード" 
                  subtext={imagePreview ? '（違う別の写真にしたい時はここをそのままクリック）' : undefined}
                />
                <ImageUploader 
                  onImageUpload={handleImageUpload} 
                  preview={imagePreview}
                />
              </div>

              <div>
                <Label step="2" text="着物の色を選ぶ" />
                <ColorSelector colors={COLOR_OPTIONS} selectedColor={selectedColor} onSelect={setSelectedColor} />
              </div>

              <div>
                <Label step="3" text="着物の柄を選ぶ" />
                <KimonoPatternSelector patterns={KIMONO_PATTERN_OPTIONS} selectedPattern={selectedPattern} onSelect={setSelectedPattern} />
              </div>

              <div>
                <Label step="4" text="着物の種類を選ぶ" />
                <KimonoSelector kimonos={KIMONO_OPTIONS} selectedKimono={selectedKimono} onSelect={setSelectedKimono} />
              </div>

              <div>
                <Label step="5" text="背景を選ぶ" />
                <BackgroundSelector 
                  backgrounds={BACKGROUND_OPTIONS} 
                  selectedBackground={selectedBackground} 
                  onSelect={setSelectedBackground}
                  customBackground={customBackground}
                  onCustomUpload={handleCustomBackgroundUpload}
                />
              </div>
              
              <div>
                <Label 
                  step="6" 
                  text="どのようなポーズにしますか？" 
                  subtext="「笑顔で」のように指示してください。" 
                  tooltip={poseSelectorTooltip} 
                />
                <PoseSelector 
                  customPose={customInstruction}
                  onCustomPoseChange={setCustomInstruction}
                  referenceImages={referenceImageFiles}
                  onReferenceImageAdd={handleAddReferenceImage}
                  onReferenceImageRemove={handleRemoveReferenceImage}
                />
              </div>
            </div>

            {/* Right Panel: Result and Action */}
            <div className="flex flex-col gap-6">
              
              {/* Result and Actions Container */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-rose-100 flex flex-col gap-4">
                <ResultDisplay 
                  isLoading={isLoading} 
                  generatedImage={generatedImage} 
                  originalImage={imagePreview} 
                />

                {generatedImage && !isLoading && (
                   <AdjustmentPanel
                      selectedPlacement={selectedPlacement}
                      onSelectPlacement={setSelectedPlacement}
                      selectedSize={personSize}
                      onSelectSize={setPersonSize}
                      selectedDistance={personDistance}
                      onSelectDistance={setPersonDistance}
                    />
                )}
                
                {/* Action Buttons */}
                 <div className="flex flex-col gap-4">
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerationDisabled}
                    className="w-full bg-rose-600 text-white font-bold text-lg py-3 px-4 rounded-full shadow-lg hover:bg-rose-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 transform hover:scale-105 disabled:transform-none"
                  >
                    <SparklesIcon className={`w-6 h-6 ${isLoading ? 'animate-pulse' : ''}`}/>
                    {isLoading ? '生成中...' : (cooldown > 0 ? `お待ちください (${cooldown}秒)` : (generatedImage ? '画像を再生成' : '画像を生成'))}
                  </button>
                  
                  {generatedImage && !isLoading && (
                       <button
                        onClick={handleDownload}
                        className="w-full bg-green-600 text-white font-bold text-lg py-3 px-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                       >
                        <DownloadIcon className="w-6 h-6" />
                        保存
                      </button>
                    )}

                  {generatedImage && !isLoading && (
                    <button
                      onClick={handleStartOver}
                      className="w-full bg-transparent text-rose-600 font-bold text-lg py-3 px-4 rounded-full border-2 border-rose-600 hover:bg-rose-100/60 transition-all duration-300 flex items-center justify-center gap-2"
                      aria-label="違う写真をアップロードしてやり直す"
                    >
                      <UploadIcon className="w-6 h-6" />
                      違う写真をアップロード
                    </button>
                  )}
                </div>
              </div>
              
              {galleryImages.length > 0 && !isLoading && (
                <Gallery
                  images={galleryImages}
                  selectedImage={generatedImage}
                  onSelect={handleGallerySelect}
                />
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
                  <p className="font-bold">エラー</p>
                  <p>{error}</p>
                </div>
              )}
              
            </div>
          </div>
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

// FIX: Updated the `Label` component's type definition to not use `React.FC`.
// This resolves a confusing type error related to the `children` prop.
const Label = ({ step, text, subtext, tooltip }: { step: string; text: string; subtext?: string; tooltip?: React.ReactNode }) => (
    <div className="flex flex-wrap items-start sm:items-center justify-between gap-y-2 gap-x-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold text-rose-800 flex items-center">
              <span className="bg-rose-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold mr-3 shrink-0">{step}</span>
              {text}
          </h2>
          {subtext && (
            <p className="text-sm text-rose-600/90 ml-10 -mt-1">{subtext}</p>
          )}
        </div>
        {tooltip && (
            <div className="relative group shrink-0 ml-auto sm:ml-0">
                <button type="button" className="text-lg text-rose-600 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-rose-500 rounded whitespace-nowrap">
                    指示のヒントを見る
                </button>
                <div className="absolute bottom-full mb-2 right-0 w-80 max-w-[calc(100vw-5rem)] sm:max-w-none bg-rose-800 text-white text-sm rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                    {tooltip}
                    <div className="absolute top-full right-4 -mr-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-rose-800"></div>
                </div>
            </div>
        )}
    </div>
);

export default App;

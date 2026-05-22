
import React, { useState, useEffect, useRef } from 'react';
import { DrawingCanvas } from './DrawingCanvas';
import { PencilIcon } from './icons/PencilIcon';
import { UploadIcon } from './icons/UploadIcon';

interface PoseSelectorProps {
  customPose: string;
  onCustomPoseChange: (prompt: string) => void;
  referenceImages: File[];
  onReferenceImageAdd: (file: File) => void;
  onReferenceImageRemove: (file: File) => void;
}

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ReferenceImagePreview: React.FC<{ file: File; onRemove: () => void }> = ({ file, onRemove }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    if (!previewUrl) return null;

    return (
        <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-rose-200 shadow-sm">
            <img src={previewUrl} alt="参考画像" className="w-full h-full object-cover" />
            <button
                onClick={onRemove}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                aria-label="参考画像を削除"
            >
                <CloseIcon className="w-4 h-4" />
            </button>
        </div>
    );
};

export const PoseSelector: React.FC<PoseSelectorProps> = ({
    customPose,
    onCustomPoseChange,
    referenceImages,
    onReferenceImageAdd,
    onReferenceImageRemove,
}) => {
    const [isCanvasOpen, setIsCanvasOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSaveDrawing = (file: File) => {
        onReferenceImageAdd(file);
        setIsCanvasOpen(false);
    }

    // FIX: Replaced for...of loop with a standard for loop.
    // This ensures the `file` variable is correctly typed as a File object,
    // resolving an issue where its type was being inferred as 'unknown'.
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp')) {
                onReferenceImageAdd(file);
            } else if (file) {
                alert('JPEG, PNG, または WEBP 形式の画像ファイルを選択してください。');
            }
        }
        
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col gap-3">
            <textarea
                id="custom-pose"
                rows={3}
                className="w-full p-2 border border-rose-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 transition-colors bg-white/70 placeholder-rose-400"
                placeholder="例：和傘をさして振り返る、肩に小鳥を乗せて、夕暮れの光の中で"
                value={customPose}
                onChange={(e) => onCustomPoseChange(e.target.value)}
            />

            <div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/jpeg, image/png, image/webp"
                    multiple
                />
                
                {referenceImages.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
                        {referenceImages.map((file, index) => (
                            <ReferenceImagePreview key={index} file={file} onRemove={() => onReferenceImageRemove(file)} />
                        ))}
                    </div>
                )}
                
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => setIsCanvasOpen(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-rose-300 rounded-lg text-rose-600 hover:bg-rose-100/50 hover:border-rose-400 transition-colors"
                    >
                        <PencilIcon className="w-5 h-5" />
                        <span className="font-semibold text-sm">ポーズを描く</span>
                    </button>
                    <button
                        onClick={handleUploadClick}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-rose-300 rounded-lg text-rose-600 hover:bg-rose-100/50 hover:border-rose-400 transition-colors"
                    >
                        <UploadIcon className="w-5 h-5" />
                        <span className="font-semibold text-sm">参照画像をアップロード</span>
                    </button>
                </div>
            </div>
            {isCanvasOpen && (
                <DrawingCanvas
                    onSave={handleSaveDrawing}
                    onClose={() => setIsCanvasOpen(false)}
                />
            )}
        </div>
    );
};

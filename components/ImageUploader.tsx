
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  preview: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, preview }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp')) {
      onImageUpload(file);
    } else {
      alert('JPEG, PNG, または WEBP 形式の画像ファイルを選択してください。');
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="relative w-full aspect-square bg-rose-100/50 border-2 border-dashed border-rose-300 rounded-xl flex items-center justify-center text-center p-4 cursor-pointer hover:bg-rose-200/50 transition-colors"
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/jpeg, image/png, image/webp"
      />
      {preview ? (
        <img src={preview} alt="アップロードプレビュー" className="max-w-full max-h-full object-contain rounded-lg" />
      ) : (
        <div className="text-rose-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-2 font-semibold">クリックして写真を選択</p>
          <p className="text-xs mt-1">PNG, JPG, WEBP</p>
        </div>
      )}
    </div>
  );
};

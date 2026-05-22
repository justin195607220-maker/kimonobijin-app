
import React, { useRef } from 'react';
import { type Background } from '../types';
import { UploadIcon } from './icons/UploadIcon';

interface BackgroundSelectorProps {
  backgrounds: Background[];
  selectedBackground: Background | null;
  onSelect: (background: Background) => void;
  customBackground: Background | null;
  onCustomUpload: (file: File) => void;
}

const UploaderTile: React.FC<{ onUpload: (file: File) => void }> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp')) {
      onUpload(file);
    } else {
      alert('JPEG, PNG, または WEBP 形式の画像ファイルを選択してください。');
    }
     // Reset the input value to allow uploading the same file again
    if(fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative aspect-square rounded-lg cursor-pointer transition-all duration-200 overflow-hidden bg-rose-100/60 border-2 border-dashed border-rose-300 flex flex-col items-center justify-center text-rose-600 hover:bg-rose-200/60 hover:border-rose-400"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/jpeg, image/png, image/webp"
      />
      <UploadIcon className="w-8 h-8" />
      <p className="mt-1 text-xs font-semibold text-center">背景画像をアップロード</p>
    </div>
  );
};


const Thumbnail: React.FC<{ background: Background; isSelected: boolean; onSelect: (background: Background) => void }> = ({ background, isSelected, onSelect }) => {
  return (
     <div
        onClick={() => onSelect(background)}
        className={`relative aspect-square rounded-lg cursor-pointer transition-all duration-200 overflow-hidden ${
          isSelected ? 'ring-4 ring-offset-2 ring-rose-500' : 'ring-1 ring-rose-200 hover:ring-2 hover:ring-rose-400'
        }`}
      >
        <img src={background.thumbnailUrl} alt={background.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-0 transition-opacity"></div>
        <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center p-1 truncate">{background.name}</p>
      </div>
  );
};

export const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ backgrounds, selectedBackground, onSelect, customBackground, onCustomUpload }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      <UploaderTile onUpload={onCustomUpload} />
      
      {customBackground && (
        <Thumbnail 
          background={customBackground}
          isSelected={selectedBackground?.id === customBackground.id}
          onSelect={onSelect}
        />
      )}

      {backgrounds.map((background) => (
         <Thumbnail 
            key={background.id}
            background={background}
            isSelected={selectedBackground?.id === background.id}
            onSelect={onSelect}
          />
      ))}
    </div>
  );
};

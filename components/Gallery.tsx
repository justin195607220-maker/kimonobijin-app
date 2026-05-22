import React from 'react';

interface GalleryProps {
  images: string[];
  selectedImage: string | null;
  onSelect: (imageUrl: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ images, selectedImage, onSelect }) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-rose-100">
      <h3 className="text-lg font-semibold text-rose-800 mb-3 text-center">生成結果ギャラリー</h3>
      <div className="flex space-x-4 overflow-x-auto pb-3 -mb-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onSelect(image)}
            className={`flex-shrink-0 w-36 h-36 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 focus:outline-none ${
              selectedImage === image
                ? 'ring-4 ring-offset-2 ring-rose-500'
                : 'ring-1 ring-rose-200 hover:ring-2 hover:ring-rose-400'
            }`}
            aria-label={`生成画像 ${index + 1} を選択`}
          >
            <img src={image} alt={`生成画像 ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

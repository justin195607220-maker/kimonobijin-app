import React from 'react';
import { type KimonoColor } from '../types';

interface ColorSelectorProps {
  colors: KimonoColor[];
  selectedColor: KimonoColor | null;
  onSelect: (color: KimonoColor) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, selectedColor, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {colors.map((color) => (
        <button
          key={color.id}
          onClick={() => onSelect(color)}
          className={`w-12 h-12 rounded-full cursor-pointer transition-all duration-200 border-2 ${
            color.id === 'white' ? 'border-gray-300' : 'border-transparent'
          } ${
            selectedColor?.id === color.id ? 'ring-4 ring-offset-2 ring-rose-500' : 'hover:scale-110'
          } ${color.twColor}`}
          aria-label={`色を選択: ${color.name}`}
          title={color.name}
        >
        </button>
      ))}
    </div>
  );
};

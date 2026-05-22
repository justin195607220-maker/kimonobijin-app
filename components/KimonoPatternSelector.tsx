import React from 'react';
import { type KimonoPattern } from '../types';

interface KimonoPatternSelectorProps {
  patterns: KimonoPattern[];
  selectedPattern: KimonoPattern | null;
  onSelect: (pattern: KimonoPattern) => void;
}

export const KimonoPatternSelector: React.FC<KimonoPatternSelectorProps> = ({ patterns, selectedPattern, onSelect }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {patterns.map((pattern) => (
        <div
          key={pattern.id}
          onClick={() => onSelect(pattern)}
          className={`relative aspect-square rounded-lg cursor-pointer transition-all duration-200 overflow-hidden ${
            selectedPattern?.id === pattern.id ? 'ring-4 ring-offset-2 ring-rose-500' : 'ring-1 ring-rose-200 hover:ring-2 hover:ring-rose-400'
          }`}
        >
          <img src={pattern.imageUrl} alt={pattern.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-0 transition-opacity"></div>
          <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center p-1 truncate">{pattern.name}</p>
        </div>
      ))}
    </div>
  );
};

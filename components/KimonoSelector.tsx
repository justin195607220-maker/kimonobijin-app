import React from 'react';
import { type Kimono } from '../types';

interface KimonoSelectorProps {
  kimonos: Kimono[];
  selectedKimono: Kimono | null;
  onSelect: (kimono: Kimono) => void;
}

export const KimonoSelector: React.FC<KimonoSelectorProps> = ({ kimonos, selectedKimono, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {kimonos.map((kimono) => (
        <button
          key={kimono.id}
          onClick={() => onSelect(kimono)}
          className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm ${
            selectedKimono?.id === kimono.id
              ? 'bg-rose-600 text-white shadow'
              : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-100'
          }`}
          aria-pressed={selectedKimono?.id === kimono.id}
        >
          {kimono.name}
        </button>
      ))}
    </div>
  );
};

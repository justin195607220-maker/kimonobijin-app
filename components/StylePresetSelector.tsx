import React from 'react';
import { type StylePreset } from '../types';

interface StylePresetSelectorProps {
  presets: StylePreset[];
  onSelect: (preset: StylePreset) => void;
  onRandomSelect: () => void;
}

export const StylePresetSelector: React.FC<StylePresetSelectorProps> = ({ presets, onSelect, onRandomSelect }) => {
  return (
    <div className="bg-rose-100/60 p-4 rounded-xl border border-rose-200 mt-4 animate-fade-in">
        <h3 className="text-lg font-semibold text-rose-800 mb-4 text-center">どのスタイルにしますか？</h3>
        <div className="flex flex-wrap gap-3 justify-center">
        {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelect(preset)}
              className="px-4 py-2 rounded-full font-semibold transition-all duration-200 text-sm bg-white text-rose-700 border border-rose-200 hover:bg-rose-600 hover:text-white hover:shadow-md transform hover:-translate-y-0.5"
              title={preset.description}
            >
              {preset.name}
            </button>
        ))}
         <button
            onClick={onRandomSelect}
            className="px-4 py-2 rounded-full font-semibold transition-all duration-200 text-sm bg-yellow-400 text-yellow-900 border border-yellow-500 hover:bg-yellow-500 hover:text-white hover:shadow-md transform hover:-translate-y-0.5"
            title="AIが色、柄、背景、ポーズをランダムに選んで、あなただけの一枚を提案します。"
          >
            ✨ 運命の一枚 (ランダム)
          </button>
        </div>
         <style>{`
            @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
            }
        `}</style>
    </div>
  );
};
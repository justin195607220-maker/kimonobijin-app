import React from 'react';
import { ResetIcon } from './icons/ResetIcon';

interface AdjustmentPanelProps {
  selectedPlacement: number;
  onSelectPlacement: (placement: number) => void;
  selectedSize: number;
  onSelectSize: (size: number) => void;
  selectedDistance: number;
  onSelectDistance: (distance: number) => void;
}

export const AdjustmentPanel: React.FC<AdjustmentPanelProps> = ({
  selectedPlacement,
  onSelectPlacement,
  selectedSize,
  onSelectSize,
  selectedDistance,
  onSelectDistance,
}) => {
  return (
    <div className="bg-rose-100/60 p-4 rounded-xl border border-rose-200 flex flex-col gap-4">
      <h3 className="text-center font-semibold text-rose-800 text-lg">人物の構図を微調整</h3>
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex justify-center items-center gap-2 mb-2">
            <label htmlFor="size-slider" className="text-sm font-medium text-rose-700">大きさ</label>
            <button
                onClick={() => onSelectSize(60)}
                className="text-rose-500 hover:text-rose-700 transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500"
                aria-label="大きさをリセット"
                title="デフォルトに戻す"
            >
                <ResetIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-rose-600 font-medium">小</span>
            <input
              id="size-slider"
              type="range"
              min="0"
              max="120"
              value={selectedSize}
              onChange={(e) => onSelectSize(Number(e.target.value))}
              className="w-full h-2 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              aria-label="人物の大きさ"
            />
            <span className="text-sm text-rose-600 font-medium">大</span>
          </div>
           <div className="text-center text-sm text-rose-800 font-semibold mt-1" aria-live="polite">{selectedSize}</div>
        </div>
        <div>
           <div className="flex justify-center items-center gap-2 mb-2">
              <label htmlFor="placement-slider" className="text-sm font-medium text-rose-700">左右</label>
              <button
                  onClick={() => onSelectPlacement(0)}
                  className="text-rose-500 hover:text-rose-700 transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500"
                  aria-label="左右の位置をリセット"
                  title="デフォルトに戻す"
              >
                  <ResetIcon className="w-4 h-4" />
              </button>
           </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-rose-600 font-medium">左</span>
            <input
              id="placement-slider"
              type="range"
              min="-120"
              max="120"
              value={selectedPlacement}
              onChange={(e) => onSelectPlacement(Number(e.target.value))}
              className="w-full h-2 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              aria-label="人物の配置"
            />
            <span className="text-sm text-rose-600 font-medium">右</span>
          </div>
          <div className="text-center text-sm text-rose-800 font-semibold mt-1" aria-live="polite">{selectedPlacement}</div>
        </div>
        <div>
          <div className="flex justify-center items-center gap-2 mb-2">
            <label htmlFor="distance-slider" className="text-sm font-medium text-rose-700">前後</label>
             <button
                  onClick={() => onSelectDistance(0)}
                  className="text-rose-500 hover:text-rose-700 transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500"
                  aria-label="前後の位置をリセット"
                  title="デフォルトに戻す"
              >
                  <ResetIcon className="w-4 h-4" />
              </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-rose-600 font-medium">後</span>
            <input
              id="distance-slider"
              type="range"
              min="-120"
              max="120"
              value={selectedDistance}
              onChange={(e) => onSelectDistance(Number(e.target.value))}
              className="w-full h-2 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              aria-label="人物の前後位置"
            />
            <span className="text-sm text-rose-600 font-medium">前</span>
          </div>
           <div className="text-center text-sm text-rose-800 font-semibold mt-1" aria-live="polite">{selectedDistance}</div>
        </div>
      </div>
    </div>
  );
};
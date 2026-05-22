
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 bg-rose-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-100 max-w-2xl w-full p-6 sm:p-10 text-center flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-rose-800 mb-4">
          AIで、あなただけの着物姿を
        </h2>
        <p className="text-lg text-rose-700 mb-8 max-w-lg">
          たった一枚の写真から、AIがあなたを美しい着物姿に。色、柄、背景を自由に選んで、理想の一枚を創りましょう。
        </p>
        <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-lg mb-8 border-2 border-rose-100">
            <img 
                src="https://storage.googleapis.com/my-aiai-bucket/welcome-image.jpg" 
                alt="着物姿の女性の作例" 
                className="w-full h-full object-cover"
            />
        </div>
        <button
          onClick={onStart}
          className="w-full max-w-xs bg-rose-600 text-white font-bold text-xl py-4 px-6 rounded-full shadow-lg hover:bg-rose-700 transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105"
        >
          <SparklesIcon className="w-6 h-6" />
          さあ、はじめよう
        </button>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

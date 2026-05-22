import React, { useState, useEffect } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface VideoSplashScreenProps {
  onStart: () => void;
}

const PC_VIDEO_URL = "https://storage.googleapis.com/aiai-bucket-467108/202510-12-0.mp4";
const MOBILE_VIDEO_URL = "https://storage.googleapis.com/aiai-bucket-467108/202510-02-000.mp4";

export const VideoSplashScreen: React.FC<VideoSplashScreenProps> = ({ onStart }) => {
  const [videoSrc, setVideoSrc] = useState(PC_VIDEO_URL);

  useEffect(() => {
    const handleResize = () => {
      // Use a 768px breakpoint to distinguish between mobile and desktop
      if (window.innerWidth < 768) {
        setVideoSrc(MOBILE_VIDEO_URL);
      } else {
        setVideoSrc(PC_VIDEO_URL);
      }
    };

    handleResize(); // Set the correct video on initial load
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black animate-fade-in">
      <video
        key={videoSrc} // Add key to force re-render when the source changes
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline // Important for iOS autoplay
        className="w-full h-full object-cover" // Use object-cover for a full-screen experience on all devices
      />
      <div className="absolute inset-0 bg-black/30">
        
        {/* 
          ======================================================================
           ▼▼▼ PC用テキスト表示位置の調整エリア ▼▼▼
          ======================================================================
          
           PC（パソコン）で表示した際のテキストの位置を調整するには、
           下の <div ... > にある `sm:top-[??%]` の `??` の数字を変更してください。
           
           例：
           - `sm:top-[10%]` → 上から10%の位置に表示（現在地）
           - `sm:top-[20%]` → もっと下に表示
           - `sm:top-[5%]`  → もっと上に表示
           
           スマホでの位置は `top-[35%]` で調整できます。
        */ }
        <div className="absolute top-[15%] sm:top-[20%] left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-8 text-center text-white">
            <h1 className="text-5xl sm:text-7xl tracking-wider mb-4 font-brush" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
                着物美人
            </h1>
            <p className="text-lg sm:text-xl max-w-lg mx-auto" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
                AIで、あなただけの着物姿を
            </p>
        </div>

        {/* 
          ======================================================================
           ▼▼▼ ボタン表示位置の調整エリア ▼▼▼
          ======================================================================

          ボタンの位置を調整する場合は、下の <button ... > にある 
          `bottom-16` (スマホ) や `sm:bottom-[10%]` (PC) の値を変更してください。
        */}
         <button
            onClick={onStart}
            className="absolute bottom-16 sm:bottom-[10%] left-1/2 -translate-x-1/2 bg-rose-600 text-white font-bold text-xl py-4 px-8 rounded-full shadow-lg hover:bg-rose-700 transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105"
         >
            <SparklesIcon className="w-6 h-6" />
            はじめる
        </button>
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

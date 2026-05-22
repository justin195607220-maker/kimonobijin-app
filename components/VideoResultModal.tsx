import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { DownloadIcon } from './icons/DownloadIcon';

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const LOADING_MESSAGES = [
  'AIが動画の構想を練っています...',
  'シーンを組み立てています...',
  '光と影を調整中...',
  '命を吹き込んでいます...',
  '最終レンダリング中です...',
  'もうすぐ完成です！',
];

interface VideoResultModalProps {
  isLoading: boolean;
  videoUrl: string | null;
  onClose: () => void;
}

export const VideoResultModal: React.FC<VideoResultModalProps> = ({ isLoading, videoUrl, onClose }) => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % LOADING_MESSAGES.length);
            }, 4000); // Change message every 4 seconds
            return () => clearInterval(interval);
        }
    }, [isLoading]);
    
    useEffect(() => {
        // Reset message index when modal opens
        if(isLoading || videoUrl) {
            setCurrentMessageIndex(0);
        }
    }, [isLoading, videoUrl])

    const handleDownload = () => {
        if (!videoUrl) return;
        const link = document.createElement('a');
        link.href = videoUrl;
        link.download = `kimono-bijin-video-${new Date().getTime()}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!isLoading && !videoUrl) {
        return null;
    }

    return createPortal(
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            aria-modal="true"
            role="dialog"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-2xl flex flex-col gap-4 relative animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors p-1 rounded-full bg-white/50 hover:bg-gray-100 z-10">
                    <CloseIcon className="w-6 h-6" />
                    <span className="sr-only">閉じる</span>
                </button>

                {isLoading && (
                    <div className="flex flex-col items-center justify-center text-rose-700 h-80">
                        <svg className="animate-spin -ml-1 mr-3 h-12 w-12 text-rose-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-4 text-lg font-semibold">AIが動画を生成中です...</p>
                        <p className="mt-2 text-sm text-rose-600 transition-opacity duration-500">{LOADING_MESSAGES[currentMessageIndex]}</p>
                    </div>
                )}
                
                {videoUrl && !isLoading && (
                    <>
                        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                             <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain" />
                        </div>
                        <button
                            onClick={handleDownload}
                            className="w-full bg-green-600 text-white font-bold text-lg py-3 px-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                        >
                            <DownloadIcon className="w-6 h-6" />
                            動画を保存
                        </button>
                    </>
                )}
            </div>
             <style>{`
                @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
                }
                .animate-fade-in {
                animation: fade-in 0.3s ease-out forwards;
                }
                 @keyframes slide-up {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up {
                animation: slide-up 0.4s ease-out forwards;
                }
            `}</style>
        </div>,
        document.body
    );
};
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { TrashIcon } from './icons/TrashIcon';

interface DrawingCanvasProps {
  onSave: (file: File) => void;
  onClose: () => void;
}

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ onSave, onClose }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineWidth, setLineWidth] = useState(5);

    const setupCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas size based on container, maintaining a square aspect ratio
        const container = canvas.parentElement;
        if (container) {
            const size = Math.min(container.clientWidth, container.clientHeight, 500);
            canvas.width = size * window.devicePixelRatio;
            canvas.height = size * window.devicePixelRatio;
            canvas.style.width = `${size}px`;
            canvas.style.height = `${size}px`;
        }

        const context = canvas.getContext('2d');
        if (!context) return;

        context.scale(window.devicePixelRatio, window.devicePixelRatio);
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = lineWidth;
        contextRef.current = context;

        // Clear canvas with white background
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);

    }, [lineWidth]);

    useEffect(() => {
        setupCanvas();
        window.addEventListener('resize', setupCanvas);
        return () => window.removeEventListener('resize', setupCanvas);
    }, [setupCanvas]);

    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.lineWidth = lineWidth;
        }
    }, [lineWidth]);

    // FIX: Use React's synthetic event types and a proper type guard. Wrap in useCallback for performance.
    const getCoords = useCallback((event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): { x: number; y: number } => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        
        if ('touches' in event) { // Touch event
            if (event.touches.length > 0) {
                return {
                    x: event.touches[0].clientX - rect.left,
                    y: event.touches[0].clientY - rect.top,
                };
            }
        } else { // Mouse event
             return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            };
        }
        return { x: 0, y: 0};
    }, []);

    // FIX: Use React's synthetic event types.
    const startDrawing = useCallback((event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        const { x, y } = getCoords(event);
        if (contextRef.current) {
            contextRef.current.beginPath();
            contextRef.current.moveTo(x, y);
            setIsDrawing(true);
        }
    }, [getCoords]);

    const finishDrawing = useCallback(() => {
        if (contextRef.current) {
            contextRef.current.closePath();
            setIsDrawing(false);
        }
    }, []);

    // FIX: Use React's synthetic event types.
    const draw = useCallback((event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        event.preventDefault();
        const { x, y } = getCoords(event);
        if (contextRef.current) {
            contextRef.current.lineTo(x, y);
            contextRef.current.stroke();
        }
    }, [isDrawing, getCoords]);

    const handleClear = () => {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        if (canvas && context) {
            context.fillStyle = 'white';
            context.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
        }
    };
    
    const handleSave = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.toBlob((blob) => {
            if (blob) {
                const file = new File([blob], 'pose-drawing.png', { type: 'image/png' });
                onSave(file);
            }
        }, 'image/png');
    };

    return createPortal(
        <div 
            className="fixed inset-0 bg-rose-50 z-30 flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-lg flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-rose-800">ポーズを描く</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors p-1 rounded-full">
                        <CloseIcon className="w-6 h-6" />
                        <span className="sr-only">閉じる</span>
                    </button>
                </div>

                <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden touch-none border border-rose-200">
                    {/* FIX: Use inline arrow functions for event handlers to resolve type mismatch errors. */}
                    <canvas 
                        ref={canvasRef}
                        onMouseDown={(e) => startDrawing(e)}
                        onMouseUp={finishDrawing}
                        onMouseMove={(e) => draw(e)}
                        onMouseLeave={finishDrawing}
                        onTouchStart={(e) => startDrawing(e)}
                        onTouchEnd={finishDrawing}
                        onTouchMove={(e) => draw(e)}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                         <label htmlFor="line-width" className="text-sm font-medium text-rose-700 whitespace-nowrap">線の太さ</label>
                         <input
                            id="line-width"
                            type="range"
                            min="1"
                            max="20"
                            value={lineWidth}
                            onChange={(e) => setLineWidth(Number(e.target.value))}
                            className="w-full h-2 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                         />
                    </div>
                     <div className="flex flex-col sm:flex-row gap-3">
                        <button onClick={handleClear} className="w-full flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-rose-500 rounded-full text-rose-600 hover:bg-rose-100/50 transition-colors font-semibold">
                            <TrashIcon className="w-5 h-5" />
                            クリア
                        </button>
                        <button onClick={handleSave} className="w-full flex-1 px-4 py-2 bg-rose-600 text-white font-bold rounded-full shadow-lg hover:bg-rose-700 transition-colors">
                            保存する
                        </button>
                     </div>
                </div>
            </div>
        </div>,
        document.body
    );
};
'use client';

import { useEffect, useRef, useState } from 'react';

interface ScratchCardProps {
  coverImage: string;
  revealImage: string;
  width: number;
  height: number;
  percentToFinish?: number;
  onComplete?: () => void;
}

export default function ScratchCard({
  coverImage,
  revealImage,
  width,
  height,
  percentToFinish = 70,
  onComplete
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<{ x: number, y: number } | null>(null);
  const [scratchedPixels, setScratchedPixels] = useState(0);
  const totalPixels = width * height;

  // Inicjalizacja canvasu
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Załaduj obrazek okładki
    const coverImg = new Image();
    coverImg.src = coverImage;
    coverImg.onload = () => {
      ctx.drawImage(coverImg, 0, 0, width, height);
    };

    // Tło pod zdrapką
    const revealImg = new Image();
    revealImg.src = revealImage;
    revealImg.onload = () => {
      canvas.style.background = `url(${revealImage}) no-repeat center center`;
      canvas.style.backgroundSize = 'cover';
    };
  }, [coverImage, revealImage, width, height]);

  // Funkcja do zdrapywania
  const scratch = (e: React.MouseEvent | React.TouchEvent, isMoving = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Pobierz współrzędne kursora/dotyku
    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if ('touches' in e) {
      // Jeśli to zdarzenie dotykowe
      const touch = e.touches[0] || e.changedTouches[0];
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
      // Jeśli to zdarzenie myszy
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    if (!isMoving) {
      setLastPoint({ x, y });
      return;
    }

    if (!lastPoint) return;

    // Ustaw styl czyszczenia
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 40;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Narysuj ścieżkę
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Zapisz ostatni punkt
    setLastPoint({ x, y });

    // Oblicz procent zdrapanych pikseli
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    const percentScratched = (transparentPixels / (pixels.length / 4)) * 100;
    setScratchedPixels(transparentPixels);

    // Sprawdź czy zdrapano wystarczająco dużo
    if (percentScratched > percentToFinish && !isScratched) {
      setIsScratched(true);
      if (onComplete) {
        onComplete();
      }
    }
  };

  // Obsługa zdarzeń myszy
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    scratch(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    scratch(e, true);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };

  // Obsługa zdarzeń dotyku
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    scratch(e);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    scratch(e, true);
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };

  return (
    <div className="scratch-card-container">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="scratch-canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <div className="absolute bottom-2 right-2 text-xs text-white bg-black/40 px-2 py-1 rounded-full">
        {Math.min(100, Math.round((scratchedPixels / totalPixels) * 100))}%
      </div>
    </div>
  );
} 
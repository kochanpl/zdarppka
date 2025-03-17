'use client';

import { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { PrizeData } from '@/services/mockApi';

interface WinAlertProps {
  isOpen: boolean;
  onClose: () => void;
  prize: PrizeData | null;
}

export default function WinAlert({ isOpen, onClose, prize }: WinAlertProps) {
  const [animation, setAnimation] = useState('');
  
  useEffect(() => {
    if (isOpen) {
      setAnimation('slide-in');
      
      // Po 6 sekundach automatycznie ukryj alert
      const timer = setTimeout(() => {
        setAnimation('slide-out');
        setTimeout(onClose, 500); // Poczekaj na zakończenie animacji przed zamknięciem
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !prize) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className={`relative bg-white rounded-xl shadow-xl p-6 max-w-md w-full transform transition-all duration-500 ${animation === 'slide-in' ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <FaCheckCircle className="text-green-500" size={32} />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Gratulacje!
          </h3>
          
          <p className="text-base text-gray-700 mb-4">
            Wygrałeś: <span className="font-bold text-[#fb923c]">{prize.name}</span>
          </p>
          
          {prize.imageUrl && (
            <div className="mb-4 relative w-full h-48 bg-gray-50 rounded-lg overflow-hidden">
              <Image 
                src={prize.imageUrl}
                alt={prize.name}
                fill
                className="object-contain"
              />
            </div>
          )}
          
          <p className="text-sm text-gray-600 mb-2">{prize.description}</p>
          <p className="text-sm font-semibold text-[#1e3a8a]">{prize.value}</p>
          
          <div className="border-t border-gray-100 my-4 pt-4">
            <p className="text-xs text-gray-500 mb-2">
              Twoja nagroda została zapisana w systemie. Wkrótce otrzymasz email z instrukcją odbioru.
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="mt-4 bg-[#1e3a8a] text-white rounded-full px-6 py-2 font-medium hover:bg-[#3b82f6] transition-colors"
          >
            Super!
          </button>
        </div>
      </div>
    </div>
  );
} 
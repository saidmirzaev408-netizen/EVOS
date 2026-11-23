import React from 'react';
import { useApp } from '../context/AppContext';

export const TableBanner = () => {
  const { activeTable, setIsQrModalOpen, deactivateTable } = useApp();

  if (!activeTable || !activeTable.active) return null;

  return (
    <div className="bg-gradient-to-r from-[#740D23] via-[#9B1832] to-[#B91C3C] text-white py-2.5 px-4 shadow-md sticky top-[69px] z-35 animate-fadeIn border-b border-[#521321]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
            🍽️
          </span>
          <div>
            <span className="font-black text-amber-300">Stoldan buyurtma faol:</span>{' '}
            <span className="font-extrabold">#{activeTable.number}-stol ({activeTable.branch} filiali)</span>
            <span className="hidden md:inline text-white/80 ml-2">• Bepul xizmat ko'rsatish va to'g'ridan-to'g'ri stolga yetkazish!</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setIsQrModalOpen(true)}
            className="bg-white/20 hover:bg-white/30 text-white font-bold px-3 py-1 rounded-lg transition-colors text-[11px]"
          >
            Stolni o'zgartirish 🔄
          </button>
          <button
            type="button"
            onClick={deactivateTable}
            className="bg-black/20 hover:bg-black/30 text-white font-bold px-2.5 py-1 rounded-lg transition-colors text-[11px]"
            title="Stoldan chiqish"
          >
            ✕ Chiqish
          </button>
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';

export const QrModal = () => {
  const {
    isQrModalOpen, setIsQrModalOpen,
    activeTable, activateTable, deactivateTable,
    branchesData, showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('code'); // 'code' or 'scanner'
  const [selectedTable, setSelectedTable] = useState(activeTable?.number || 12);
  const [selectedBranch, setSelectedBranch] = useState(activeTable?.branch || 'Chilonzor');
  const [isScanning, setIsScanning] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isQrModalOpen) return null;

  // Real URL that will be encoded inside the QR code
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://evos.uz';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const qrTargetUrl = `${currentOrigin}${currentPath}?table=${selectedTable}&branch=${encodeURIComponent(selectedBranch)}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(qrTargetUrl)}`;

  const handleActivate = () => {
    activateTable(selectedTable, selectedBranch);
    setIsQrModalOpen(false);
    
    // Smooth scroll to menu
    const menuEl = document.getElementById('menu-section');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSimulateScan = (tableNum, branchName) => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      activateTable(tableNum, branchName);
      setIsQrModalOpen(false);
      const menuEl = document.getElementById('menu-section');
      if (menuEl) {
        menuEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1200);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(qrTargetUrl);
    setCopied(true);
    showToast('Stol havolasi nusxalandi! Telefoningizda ochishingiz mumkin.');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl border border-gray-200 dark:border-gray-800 relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsQrModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
        >
          <Icon name="x" className="w-5 h-5" />
        </button>

        {/* Modal Top Icon */}
        <div className="w-12 h-12 rounded-2xl bg-evos-50 dark:bg-evos-950 text-evos-600 flex items-center justify-center mx-auto text-2xl font-black mb-2">
          📱
        </div>

        <h3 className="text-xl font-black text-gray-900 dark:text-white">
          ISTIQLOL Restoran QR Menyusi
        </h3>
        <p className="text-xs text-gray-500 max-w-xs mx-auto">
          Stoldan turmasdan to'g'ridan-to'g'ri buyurtma bering — taomingiz stolingizga olib kelinadi!
        </p>

        {/* Tabs: QR Code vs Scanner */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl my-4 text-xs font-black">
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'code'
                ? 'bg-white dark:bg-gray-900 text-evos-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            📱 Stol QR-kodi
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('scanner')}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'scanner'
                ? 'bg-white dark:bg-gray-900 text-evos-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            📷 Skanerlash (Kamera)
          </button>
        </div>

        {/* TAB 1: QR CODE DISPLAY & CUSTOM TABLE SELECTOR */}
        {activeTab === 'code' && (
          <div className="space-y-4">
            
            {/* Branch and Table Selector */}
            <div className="grid grid-cols-2 gap-2 text-left">
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Filial</label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
                >
                  <option value="Chilonzor">Chilonzor</option>
                  <option value="Amir Temur">Amir Temur</option>
                  <option value="Buyuk Ipak Yo'li">Buyuk Ipak Yo'li</option>
                  <option value="Yunusobod">Yunusobod</option>
                  <option value="Sergeli">Sergeli</option>
                  <option value="Samarqand">Samarqand</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Stol raqami</label>
                <select
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(Number(e.target.value))}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 18, 20, 24, 30].map(n => (
                    <option key={n} value={n}>#{n}-stol</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Scannable QR Code Image */}
            <div className="p-3 bg-white rounded-3xl border border-gray-200 shadow-md inline-block relative group">
              <img
                src={qrImageUrl}
                alt={`EVOS #${selectedTable}-stol QR-kodi`}
                className="w-48 h-48 mx-auto rounded-xl"
              />
              <div className="mt-2 text-[11px] font-bold text-gray-400 flex items-center justify-center space-x-1">
                <span>📸 Telefon kamerasi bilan skanerlang</span>
              </div>
            </div>

            <div className="text-xs font-bold text-gray-700 dark:text-gray-300">
              Tanlangan stol: <span className="text-evos-600 font-black">#{selectedTable} ({selectedBranch} filiali)</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleActivate}
                className="w-full py-3.5 bg-evos-600 hover:bg-evos-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-evos-600/30 active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <span>🍽️</span>
                <span>Ushbu stoldan buyurtma berish</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 font-bold text-xs rounded-xl transition-colors"
              >
                {copied ? '✓ Havola nusxalandi!' : '🔗 Stol havolasini nusxalash'}
              </button>

              {activeTable?.active && (
                <button
                  type="button"
                  onClick={() => {
                    deactivateTable();
                    setIsQrModalOpen(false);
                  }}
                  className="w-full py-2 text-xs font-bold text-red-500 hover:underline"
                >
                  Stol rejimidan chiqish (Oddiy yetkazishga qaytish)
                </button>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: SIMULATED / INTERACTIVE QR SCANNER */}
        {activeTab === 'scanner' && (
          <div className="space-y-4">
            
            {/* Viewfinder with Laser Scanner Effect */}
            <div className="relative w-56 h-56 mx-auto rounded-3xl bg-black overflow-hidden border-2 border-evos-500 flex items-center justify-center shadow-xl">
              <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80')` }}></div>
              
              {/* Corner markers */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-4 border-l-4 border-evos-500"></div>
              <div className="absolute top-3 right-3 w-6 h-6 border-t-4 border-r-4 border-evos-500"></div>
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-4 border-l-4 border-evos-500"></div>
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-4 border-r-4 border-evos-500"></div>

              {/* Laser Line */}
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent absolute shadow-[0_0_12px_#ff0000] animate-bounce"></div>

              <div className="relative text-white text-center p-3 z-10">
                <span className="text-2xl block mb-1">📷</span>
                <p className="text-[11px] font-bold">Stol ustidagi QR kodni ramka ichiga to'g'rilang</p>
              </div>

              {isScanning && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white z-20">
                  <div className="w-8 h-8 border-4 border-evos-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p className="text-xs font-bold text-emerald-400">QR kod aniqlanmoqda...</p>
                </div>
              )}
            </div>

            {/* Fast Demo Scan Triggers */}
            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold text-gray-500">Tezkor skanerlash simulyatsiyasi:</p>
              
              <button
                type="button"
                onClick={() => handleSimulateScan(12, 'Chilonzor')}
                className="w-full py-2.5 px-3 bg-gray-50 dark:bg-gray-800 hover:bg-evos-50 hover:text-evos-600 dark:hover:bg-gray-700 text-xs font-bold rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-between transition-colors"
              >
                <span>🔍 Skanerlash: #12-stol (Chilonzor filiali)</span>
                <span className="text-evos-600 font-black">Tanlash →</span>
              </button>

              <button
                type="button"
                onClick={() => handleSimulateScan(5, 'Amir Temur')}
                className="w-full py-2.5 px-3 bg-gray-50 dark:bg-gray-800 hover:bg-evos-50 hover:text-evos-600 dark:hover:bg-gray-700 text-xs font-bold rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-between transition-colors"
              >
                <span>🔍 Skanerlash: #5-stol (Amir Temur filiali)</span>
                <span className="text-evos-600 font-black">Tanlash →</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

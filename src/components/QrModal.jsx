import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';

export const QrModal = () => {
  const {
    isQrModalOpen, setIsQrModalOpen,
    activeTable, activateTable, deactivateTable,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('code'); // 'code' | 'scanner' | 'manual'
  const [selectedTable, setSelectedTable] = useState(activeTable?.number || 12);
  const [selectedBranch, setSelectedBranch] = useState(activeTable?.branch || 'Chilonzor');
  
  // URL & Network IP configuration for mobile scanning
  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  const [networkMode, setNetworkMode] = useState(() => {
    return localStorage.getItem('istiqlol_qr_network_mode') || (isLocalhost ? 'wifi' : 'auto');
  });

  const [customIp, setCustomIp] = useState(() => {
    return localStorage.getItem('istiqlol_qr_wifi_ip') || '';
  });

  const [customPort, setCustomPort] = useState(() => {
    return typeof window !== 'undefined' ? (window.location.port || '3000') : '3000';
  });

  const [copied, setCopied] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isScanningSim, setIsScanningSim] = useState(false);
  const [manualTableInput, setManualTableInput] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('istiqlol_qr_network_mode', networkMode);
  }, [networkMode]);

  useEffect(() => {
    localStorage.setItem('istiqlol_qr_wifi_ip', customIp);
  }, [customIp]);

  // Clean up camera stream if open
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  if (!isQrModalOpen) return null;

  // Calculate target URL to be encoded in the QR code
  let baseUrl = '';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  if (networkMode === 'wifi' && customIp.trim()) {
    let cleanIp = customIp.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    if (!cleanIp.includes(':') && customPort) {
      cleanIp = `${cleanIp}:${customPort}`;
    }
    baseUrl = `http://${cleanIp}`;
  } else if (networkMode === 'custom' && customIp.trim()) {
    baseUrl = customIp.trim().startsWith('http') ? customIp.trim() : `https://${customIp.trim()}`;
  } else {
    baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  }

  const qrTargetUrl = `${baseUrl}${currentPath}?table=${selectedTable}&branch=${encodeURIComponent(selectedBranch)}`;
  
  // High quality QR code with quiet margin
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=8&ecc=M&data=${encodeURIComponent(qrTargetUrl)}`;

  const handleActivate = () => {
    activateTable(selectedTable, selectedBranch);
    setIsQrModalOpen(false);
    showToast(`🍽️ #${selectedTable}-stol faollashtirildi (${selectedBranch} filiali)`);
    
    // Smooth scroll to menu
    const menuEl = document.getElementById('menu-section');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSimulateScan = (tableNum, branchName) => {
    setIsScanningSim(true);
    setTimeout(() => {
      setIsScanningSim(false);
      activateTable(tableNum, branchName);
      setIsQrModalOpen(false);
      showToast(`📸 QR kod skanerlandi: #${tableNum}-stol (${branchName})`);
      const menuEl = document.getElementById('menu-section');
      if (menuEl) {
        menuEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
  };

  const handleManualEnter = (e) => {
    e.preventDefault();
    const num = parseInt(manualTableInput, 10);
    if (!num || num < 1 || num > 99) {
      showToast('Iltimos, to\'g\'ri stol raqamini kiriting (1-99)');
      return;
    }
    activateTable(num, selectedBranch);
    setIsQrModalOpen(false);
    showToast(`🍽️ #${num}-stol faollashtirildi (${selectedBranch} filiali)`);
    const menuEl = document.getElementById('menu-section');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(qrTargetUrl);
      setCopied(true);
      showToast('Havola nusxalandi! Telefoningiz brauzerida ochishingiz mumkin.');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.warn('Camera access error:', err);
      setCameraError('Kameraga ruxsat berilmadi yoki kamera mavjud emas. Quyidagi simulyatordan foydalaning.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#181B15] text-[#F4F5F2] rounded-3xl max-w-lg w-full p-5 sm:p-6 text-center shadow-2xl border border-[#2B3125] relative max-h-[94vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            stopCamera();
            setIsQrModalOpen(false);
          }}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#252A20] text-gray-400 hover:text-white transition-colors"
          title="Yopish"
        >
          <Icon name="x" className="w-5 h-5" />
        </button>

        {/* Top Badge */}
        <div className="w-12 h-12 rounded-2xl bg-[#00A859]/20 border border-[#00A859]/40 text-[#00A859] flex items-center justify-center mx-auto text-2xl font-black mb-2 shadow-[0_0_15px_rgba(0,168,89,0.25)]">
          📱
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          ISTIQLOL Restoran QR Menyusi
        </h3>
        <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">
          Telefon kamerasi orqali skanerlang va stolingizga to'g'ridan-to'g'ri buyurtma bering!
        </p>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#121410] rounded-2xl my-4 text-xs font-black border border-[#23281E]">
          <button
            type="button"
            onClick={() => {
              stopCamera();
              setActiveTab('code');
            }}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'code'
                ? 'bg-[#00A859] text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            📱 Stol QR-kodi
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('scanner');
              startCamera();
            }}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'scanner'
                ? 'bg-[#00A859] text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            📷 Skaner
          </button>
          <button
            type="button"
            onClick={() => {
              stopCamera();
              setActiveTab('manual');
            }}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'manual'
                ? 'bg-[#00A859] text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ⌨️ Qo'lda kiritish
          </button>
        </div>

        {/* TAB 1: QR CODE DISPLAY & NETWORK SETTINGS */}
        {activeTab === 'code' && (
          <div className="space-y-4">
            
            {/* Branch and Table Selector */}
            <div className="grid grid-cols-2 gap-2.5 text-left">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                  Filial
                </label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-[#303728] bg-[#22271D] text-white focus:outline-none focus:border-[#00A859]"
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
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                  Stol raqami
                </label>
                <select
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(Number(e.target.value))}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-[#303728] bg-[#22271D] text-white focus:outline-none focus:border-[#00A859]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 18, 20, 24, 30].map(n => (
                    <option key={n} value={n}>#{n}-stol</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Scan & Network IP Helper (Crucial for Localhost!) */}
            <div className="p-3 bg-[#131510] rounded-2xl border border-[#2B3224] text-left text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#F3BE53] flex items-center gap-1.5">
                  📶 Skanerlash manzili (Tarmoq turi):
                </span>
                <span className="text-[10px] text-gray-400">
                  {networkMode === 'wifi' ? 'Wi-Fi IP orqali' : networkMode === 'custom' ? 'Maxsus havola' : 'Localhost'}
                </span>
              </div>

              {/* Network Mode Pills */}
              <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setNetworkMode('wifi')}
                  className={`py-1.5 px-2 rounded-lg border transition-all text-center ${
                    networkMode === 'wifi'
                      ? 'bg-[#00A859]/20 border-[#00A859] text-[#00A859] font-black'
                      : 'border-[#2B3224] text-gray-400 hover:text-white'
                  }`}
                >
                  📱 Wi-Fi (Telefon)
                </button>
                <button
                  type="button"
                  onClick={() => setNetworkMode('auto')}
                  className={`py-1.5 px-2 rounded-lg border transition-all text-center ${
                    networkMode === 'auto'
                      ? 'bg-[#00A859]/20 border-[#00A859] text-[#00A859] font-black'
                      : 'border-[#2B3224] text-gray-400 hover:text-white'
                  }`}
                >
                  💻 Localhost
                </button>
                <button
                  type="button"
                  onClick={() => setNetworkMode('custom')}
                  className={`py-1.5 px-2 rounded-lg border transition-all text-center ${
                    networkMode === 'custom'
                      ? 'bg-[#00A859]/20 border-[#00A859] text-[#00A859] font-black'
                      : 'border-[#2B3224] text-gray-400 hover:text-white'
                  }`}
                >
                  🌐 Maxsus havola
                </button>
              </div>

              {/* Wi-Fi IP input when in wifi mode */}
              {networkMode === 'wifi' && (
                <div className="pt-1.5 space-y-2">
                  <div className="bg-[#1C2018] p-2.5 rounded-xl border border-[#2E3626]">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] font-bold text-gray-300">
                        Kompyuteringiz Wi-Fi IP manzili:
                      </label>
                      <span className="text-[10px] text-emerald-400 font-bold">Port: {customPort}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs font-mono select-none">http://</span>
                      <input
                        type="text"
                        value={customIp}
                        onChange={(e) => setCustomIp(e.target.value)}
                        placeholder="masalan: 192.168.1.15"
                        className="flex-1 bg-[#121410] border border-[#3A4330] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#00A859]"
                      />
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    💡 <strong className="text-gray-300">Nega telefoningizda ochilmaydi?</strong> Chunki telefon boshqa alohida qurilma — <code className="text-[#F3BE53] bg-black/40 px-1 rounded">localhost</code> faqat kompyuterning o'ziga tegishli. Telefon va kompyuter bitta Wi-Fi tarmog'iga ulanganda, yuqoridagi maydonga kompyuteringizning Wi-Fi IP manzilini kiriting (masalan <code className="text-white">192.168.1.5</code>).
                    <br />
                    <em>(IP manzilni bilish: `cmd` oynasini ochib <code className="text-emerald-400">ipconfig</code> deb yozing, `IPv4 Address` qatori).</em>
                  </p>
                </div>
              )}

              {/* Custom URL input */}
              {networkMode === 'custom' && (
                <div className="pt-1.5">
                  <input
                    type="text"
                    value={customIp}
                    onChange={(e) => setCustomIp(e.target.value)}
                    placeholder="https://istiqlol-fastfood.uz yoki ngrok link"
                    className="w-full bg-[#121410] border border-[#3A4330] rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#00A859]"
                  />
                </div>
              )}
            </div>

            {/* High-Contrast QR Code Card */}
            <div className="p-4 bg-white rounded-3xl border-4 border-[#00A859]/30 shadow-[0_0_30px_rgba(0,168,89,0.2)] inline-block relative group">
              <img
                src={qrImageUrl}
                alt={`ISTIQLOL #${selectedTable}-stol QR-kodi`}
                className="w-52 h-52 mx-auto rounded-xl block"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://quickchart.io/qr?text=${encodeURIComponent(qrTargetUrl)}&size=320&margin=2`;
                }}
              />
              <div className="mt-2.5 text-[11px] font-bold text-gray-800 flex items-center justify-center space-x-1.5">
                <span className="text-emerald-700 font-extrabold">📸 Telefoningiz kamerasi bilan skanerlang</span>
              </div>
            </div>

            {/* Generated Scannable URL Preview */}
            <div className="bg-[#121410] border border-[#2B3124] rounded-xl p-2.5 text-left text-[11px]">
              <div className="flex items-center justify-between text-gray-400 mb-1">
                <span className="font-bold">QR kod ichidagi havola:</span>
                <span className="text-[#00A859] font-black">#{selectedTable}-stol</span>
              </div>
              <div className="font-mono text-emerald-400 break-all select-all text-[11px]">
                {qrTargetUrl}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleActivate}
                className="w-full py-3.5 bg-gradient-to-r from-[#00A859] to-[#008f4c] hover:from-[#00b962] hover:to-[#009b53] text-white font-black text-sm rounded-2xl shadow-lg shadow-[#00A859]/30 active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <span>🍽️</span>
                <span>Ushbu stoldan darhol buyurtma berish (#{selectedTable})</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="py-2.5 px-3 bg-[#242A1E] hover:bg-[#2F3727] text-gray-200 font-bold text-xs rounded-xl transition-colors border border-[#37402D] flex items-center justify-center gap-1.5"
                >
                  <Icon name="copy" className="w-4 h-4 text-[#F3BE53]" />
                  <span>{copied ? '✓ Nusxalandi!' : 'Havolani nusxalash'}</span>
                </button>

                <a
                  href={qrTargetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-[#242A1E] hover:bg-[#2F3727] text-gray-200 font-bold text-xs rounded-xl transition-colors border border-[#37402D] flex items-center justify-center gap-1.5"
                >
                  <Icon name="external" className="w-4 h-4 text-[#00A859]" />
                  <span>Brauzerda sinash ↗</span>
                </a>
              </div>

              {activeTable?.active && (
                <button
                  type="button"
                  onClick={() => {
                    deactivateTable();
                    setIsQrModalOpen(false);
                    showToast('Stol rejimi bekor qilindi');
                  }}
                  className="w-full py-2 text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
                >
                  ✕ Stol rejimidan chiqish (Oddiy yetkazishga qaytish)
                </button>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: CAMERA SCANNER & SIMULATOR */}
        {activeTab === 'scanner' && (
          <div className="space-y-4">
            
            {/* Viewfinder with Live Video or Animated Laser */}
            <div className="relative w-64 h-64 mx-auto rounded-3xl bg-black overflow-hidden border-2 border-[#00A859] flex items-center justify-center shadow-xl">
              
              {cameraActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80')` }}
                />
              )}

              {/* Corner Target Markers */}
              <div className="absolute top-3 left-3 w-7 h-7 border-t-4 border-l-4 border-[#00A859] rounded-tl-lg pointer-events-none"></div>
              <div className="absolute top-3 right-3 w-7 h-7 border-t-4 border-r-4 border-[#00A859] rounded-tr-lg pointer-events-none"></div>
              <div className="absolute bottom-3 left-3 w-7 h-7 border-b-4 border-l-4 border-[#00A859] rounded-bl-lg pointer-events-none"></div>
              <div className="absolute bottom-3 right-3 w-7 h-7 border-b-4 border-r-4 border-[#00A859] rounded-br-lg pointer-events-none"></div>

              {/* Laser Scanning Line */}
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#00FF66] to-transparent absolute shadow-[0_0_15px_#00FF66] animate-bounce pointer-events-none"></div>

              {/* Scanning status overlay */}
              {!cameraActive && (
                <div className="relative text-white text-center p-4 z-10 bg-black/60 rounded-2xl mx-3">
                  <span className="text-3xl block mb-1">📷</span>
                  <p className="text-xs font-bold text-gray-200">Stol ustidagi QR kodni nishonga oling</p>
                  <button
                    type="button"
                    onClick={startCamera}
                    className="mt-2.5 px-3 py-1.5 bg-[#00A859] text-white text-[11px] font-black rounded-xl hover:bg-[#00924d] transition-all"
                  >
                    Kamerani yoqish 📸
                  </button>
                </div>
              )}

              {isScanningSim && (
                <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-white z-20">
                  <div className="w-9 h-9 border-4 border-[#00A859] border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p className="text-xs font-extrabold text-[#00FF66]">QR kod aniqlanmoqda...</p>
                </div>
              )}
            </div>

            {cameraError && (
              <p className="text-[11px] text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 text-left">
                ⚠️ {cameraError}
              </p>
            )}

            {/* Fast Demo Scan Triggers */}
            <div className="space-y-2 pt-1 text-left">
              <p className="text-xs font-bold text-gray-400">Tezkor stolni tanlash (Sinov uchun):</p>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleSimulateScan(12, 'Chilonzor')}
                  className="py-2.5 px-3 bg-[#20251B] hover:bg-[#2A3124] text-xs font-bold rounded-xl border border-[#303828] text-left transition-colors flex items-center justify-between"
                >
                  <span>🍽️ #12-stol (Chilonzor)</span>
                  <span className="text-[#00A859] font-black">→</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulateScan(5, 'Amir Temur')}
                  className="py-2.5 px-3 bg-[#20251B] hover:bg-[#2A3124] text-xs font-bold rounded-xl border border-[#303828] text-left transition-colors flex items-center justify-between"
                >
                  <span>🍽️ #5-stol (Amir Temur)</span>
                  <span className="text-[#00A859] font-black">→</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulateScan(8, 'Samarqand')}
                  className="py-2.5 px-3 bg-[#20251B] hover:bg-[#2A3124] text-xs font-bold rounded-xl border border-[#303828] text-left transition-colors flex items-center justify-between"
                >
                  <span>🍽️ #8-stol (Samarqand)</span>
                  <span className="text-[#00A859] font-black">→</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulateScan(3, 'Buyuk Ipak Yo\'li')}
                  className="py-2.5 px-3 bg-[#20251B] hover:bg-[#2A3124] text-xs font-bold rounded-xl border border-[#303828] text-left transition-colors flex items-center justify-between"
                >
                  <span>🍽️ #3-stol (Ipak Yo'li)</span>
                  <span className="text-[#00A859] font-black">→</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: MANUAL TABLE NUMBER ENTRY */}
        {activeTab === 'manual' && (
          <form onSubmit={handleManualEnter} className="space-y-4 py-2">
            <div className="p-4 bg-[#121410] rounded-2xl border border-[#2B3124] text-left space-y-3">
              <label className="block text-xs font-bold text-gray-300">
                Stol ustidagi yozuvdan stol raqamini kiriting:
              </label>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-[#F3BE53]">#</span>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={manualTableInput}
                  onChange={(e) => setManualTableInput(e.target.value)}
                  placeholder="12"
                  className="w-full text-2xl font-black p-3 rounded-xl border border-[#37402F] bg-[#1E2319] text-white text-center tracking-widest focus:outline-none focus:border-[#00A859]"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">
                  Filial
                </label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-[#303728] bg-[#22271D] text-white focus:outline-none"
                >
                  <option value="Chilonzor">Chilonzor</option>
                  <option value="Amir Temur">Amir Temur</option>
                  <option value="Buyuk Ipak Yo'li">Buyuk Ipak Yo'li</option>
                  <option value="Yunusobod">Yunusobod</option>
                  <option value="Sergeli">Sergeli</option>
                  <option value="Samarqand">Samarqand</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#00A859] to-[#008f4c] hover:from-[#00b962] text-white font-black text-sm rounded-2xl shadow-lg shadow-[#00A859]/30 active:scale-95 transition-all"
            >
              🍽️ Menyuni ochish va stolni faollashtirish
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
export default QrModal;

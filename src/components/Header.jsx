import React from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';
import { IstiqlolLogo } from './IstiqlolLogo';
import { languageOptions, allLanguageList } from '../data/i18n';

export const Header = () => {
  const {
    lang, setLang,
    theme, setTheme,
    appMode, setAppMode,
    cart, loyaltyPoints,
    setIsCartOpen, setIsProfileOpen, setIsLoyaltyOpen, setIsQrModalOpen,
    searchQuery, setSearchQuery, t, activeTable,
    deliveryLocation, setDeliveryLocation, setIsLocationModalOpen, showToast,
    isAuthenticated, isAdmin, openAuthModal, user, logoutUser
  } = useApp();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLangChange = (newLang) => {
    setLang(newLang);
    const selectedItem = allLanguageList.find(i => i.code === newLang);
    if (selectedItem) {
      showToast(`${selectedItem.icon} ${selectedItem.label} tanlandi! 🎉`);
    }

    // Synchronize with Google Website Translator for dynamic deep translation
    const gMap = {
      uz: 'uz',
      ru: 'ru',
      en: 'en',
      kk: 'kk',
      tg: 'tg',
      tr: 'tr',
      ar: 'ar',
      zh: 'zh-CN',
      ko: 'ko',
      de: 'de',
      fr: 'fr',
      ja: 'ja',
      hi: 'hi'
    };
    const target = gMap[newLang] || newLang;
    try {
      document.cookie = `googtrans=/uz/${target}; path=/;`;
      if (window.location.hostname) {
        document.cookie = `googtrans=/uz/${target}; path=/; domain=${window.location.hostname};`;
      }
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.value = target;
        combo.dispatchEvent(new Event('change'));
      }
    } catch (e) { }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#161814]/95 backdrop-blur-md border-b border-[#2B3026] text-white transition-colors shadow-md">
      {/* Top Notification / Promo Bar */}
      <div className="bg-[#1F231A] text-gray-300 text-xs font-semibold py-1.5 px-4 border-b border-[#282E22]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-[#F3BE53] text-[#131512] text-[10px] uppercase font-black px-2 py-0.5 rounded-full shadow-sm">
              Aksiya
            </span>
            <span className="text-gray-200">🔥 ISTIQLOL2025 promokodi bilan Somsa, Pirojniy va Moxitolarga 15% chegirma!</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-gray-400 text-xs">
            <span className="flex items-center gap-1 hover:text-[#F3BE53] transition-colors">
              <Icon name="phone" className="w-3.5 h-3.5 text-[#F3BE53]" /> +998 71 200 00 00
            </span>
            <span className="flex items-center gap-1">
              <Icon name="clock" className="w-3.5 h-3.5 text-[#F3BE53]" /> 24/7 Yetkazish
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-2 sm:gap-3 flex-nowrap">

          {/* Brand Logo & Location Pill */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setAppMode('client')}
              className="flex items-center space-x-2.5 text-left group notranslate"
              translate="no"
            >
              <IstiqlolLogo className="w-11 h-11 sm:w-12 sm:h-12 drop-shadow-[0_0_15px_rgba(225,29,72,0.65)] group-hover:scale-110 transition-transform" />
              <div className="notranslate" translate="no">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black tracking-tight text-white group-hover:text-[#F3BE53] transition-colors notranslate" translate="no">
                    ISTIQLOL
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F3BE53] animate-pulse"></span>
                </div>
                <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase -mt-1 hidden sm:block notranslate" translate="no">
                  MAZZALI VA TEZKOR!
                </p>
              </div>
            </button>

            {/* Clickable Delivery Location Selector (Requested by User) */}
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden sm:flex items-center h-9 whitespace-nowrap bg-[#23271E] hover:bg-[#2C3227] px-3 rounded-full text-xs font-bold text-gray-200 border border-[#373F2F] hover:border-[#F3BE53] cursor-pointer transition-all shadow-sm group"
              title="Yetkazish manzilini o'zgartirish uchun bosing"
            >
              <Icon name="map-pin" className="w-3.5 h-3.5 text-[#F3BE53] mr-1.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="truncate max-w-[110px] xl:max-w-[150px]">
                {deliveryLocation?.displayText || `${deliveryLocation?.city}, ${deliveryLocation?.district}` || 'Toshkent, Chilonzor'}
              </span>
              <span className="ml-1 text-[#F3BE53] text-[10px]">▾</span>
            </button>
          </div>

          {/* Search Bar - Style inspired by reference UI */}
          <div className="hidden lg:flex flex-1 min-w-[140px] max-w-sm">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Somsa, burger, moxito..."
                className="w-full h-9 bg-[#23271E] text-white text-xs pl-9 pr-8 rounded-full border border-[#353B2F] focus:border-[#F3BE53] focus:bg-[#1C1F18] focus:outline-none transition-all placeholder-gray-500"
              />
              <Icon name="search" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <Icon name="x" className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-nowrap whitespace-nowrap">

            {/* Utility toolbar: QR · Theme */}
            <div className="hidden sm:flex items-center h-9 p-0.5 rounded-full bg-[#23271E] border border-[#353B2F] shadow-sm">
              {/* Table QR Menu */}
              <button
                onClick={() => setIsQrModalOpen(true)}
                className={`h-8 px-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${activeTable?.active
                    ? 'bg-[#9B1832] text-white font-extrabold'
                    : 'text-gray-300 hover:bg-[#2C3227] hover:text-white'
                  }`}
                title="QR Stol Menyusi"
              >
                <Icon name="qr" className="w-4 h-4 text-[#F3BE53]" />
                <span className={activeTable?.active ? 'inline' : 'hidden 2xl:inline'}>
                  {activeTable?.active ? `#${activeTable.number}-stol` : t('scanQr')}
                </span>
              </button>

              <span className="w-px h-4 bg-[#353B2F] mx-0.5" />

              {/* Dark/Light mode toggle */}
              <button
                onClick={() => {
                  const nextTheme = theme === 'dark' ? 'light' : 'dark';
                  setTheme(nextTheme);
                  showToast(nextTheme === 'dark' ? '🌙 Tungi rejim yoqildi' : '☀️ Kunduzgi rejim yoqildi');
                }}
                className="h-8 w-8 rounded-full flex items-center justify-center text-gray-300 hover:bg-[#2C3227] transition-all active:scale-90"
                title={theme === 'dark' ? "Kunduzgi rejimga o'tish" : "Tungi rejimga o'tish"}
                aria-label="Mavzuni almashtirish"
              >
                <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="w-4 h-4 text-[#F3BE53]" />
              </button>
            </div>

            {/* Language Switcher — Country Languages */}
            <div className="relative flex items-center shrink-0">
              <select
                value={lang}
                onChange={(e) => handleLangChange(e.target.value)}
                className="h-9 bg-[#240C16] hover:bg-[#34111F] text-[#F3BE53] text-xs font-black pl-3 pr-6 rounded-full border border-[#521727] hover:border-[#F3BE53]/60 cursor-pointer focus:outline-none focus:border-[#F3BE53] shadow-md transition-all appearance-none max-w-[110px]"
                title="Tilni tanlang"
                aria-label="Til tanlash"
              >
                {languageOptions.map((group, gIdx) => (
                  <optgroup
                    key={gIdx}
                    label={group.group}
                    className="bg-[#1C0810] text-[#F3BE53] font-black"
                    style={{ backgroundColor: '#14060B', color: '#F3BE53' }}
                  >
                    {group.items.map(opt => (
                      <option
                        key={opt.code}
                        value={opt.code}
                        className="bg-[#1C0810] text-white py-1"
                        style={{ backgroundColor: '#1C0810', color: '#FFFFFF' }}
                      >
                        {opt.icon} {opt.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#F3BE53] text-[9px]">
                ▼
              </div>
            </div>

            {/* Auth / Profile & Loyalty — unified account capsule */}
            {isAuthenticated ? (
              <div className="flex items-center h-9 p-0.5 rounded-full bg-[#250C16] border border-[#4E1726] shadow-sm shrink-0">
                {/* Bonus points */}
                <button
                  type="button"
                  onClick={() => setIsLoyaltyOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 h-8 px-3 rounded-full bg-gradient-to-r from-[#F3BE53]/25 to-[#F3BE53]/10 text-[#F3BE53] text-xs font-black whitespace-nowrap hover:from-[#F3BE53]/40 hover:to-[#F3BE53]/20 transition-all active:scale-95"
                  title="ISTIQLOL Bonus & Mukofotlar"
                >
                  <Icon name="star" className="w-3.5 h-3.5 text-[#F3BE53]" />
                  <span>{loyaltyPoints.toLocaleString()}</span>
                </button>

                {/* Profile */}
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(true)}
                  className="flex items-center gap-1.5 h-8 pl-1 pr-3 rounded-full text-white text-xs font-bold whitespace-nowrap hover:bg-[#34111F] transition-all group"
                  title="Mening profilim"
                >
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F3BE53] to-[#C88418] text-[#1E0910] text-[10px] font-black flex items-center justify-center shadow">
                    {(user.name || 'P').charAt(0).toUpperCase()}
                  </span>
                  <span className="max-w-[90px] truncate">{user.name?.split(' ')[0] || 'Profil'}</span>
                </button>

                <span className="w-px h-4 bg-[#4E1726]" />

                {/* Logout */}
                <button
                  type="button"
                  onClick={logoutUser}
                  className="flex items-center gap-1 h-8 px-2.5 rounded-full text-red-300 hover:text-white hover:bg-red-700/80 text-xs font-bold whitespace-nowrap transition-all active:scale-95"
                  title="Akkountdan chiqish (Logout)"
                  aria-label="Hisobdan chiqish"
                >
                  <Icon name="logout" className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline text-[11px]">Chiqish</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="hidden md:flex items-center gap-1 h-9 whitespace-nowrap text-gray-300 hover:text-[#F3BE53] text-xs font-bold px-2.5 rounded-full transition-colors"
                >
                  <Icon name="lock" className="w-3.5 h-3.5 text-[#F3BE53]" />
                  <span>{t('login') || 'Kirish'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => openAuthModal('register')}
                  className="flex items-center gap-1.5 h-9 whitespace-nowrap bg-gradient-to-r from-[#BA1D3D] via-[#D82249] to-[#9B1832] hover:from-[#CF2044] hover:to-[#B01B3A] text-white px-3 sm:px-3.5 rounded-full text-xs font-black shadow-md shadow-[#BA1D3D]/35 transition-all hover:scale-105 active:scale-95 border border-[#F3BE53]/40"
                  title="Ro'yxatdan o'tish"
                >
                  <span className="text-xs">🎁</span>
                  <span className="hidden sm:inline">Ro'yxatdan o'tish</span>
                </button>
              </div>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 h-9 whitespace-nowrap shrink-0 bg-[#F3BE53] hover:bg-[#E5A934] text-[#131512] px-3.5 rounded-full font-black text-xs sm:text-sm shadow-lg shadow-[#F3BE53]/20 transition-transform active:scale-95"
            >
              <Icon name="shopping-bag" className="w-4 h-4 text-[#131512]" />
              <span className="hidden sm:inline">{t('cart')}</span>
              {totalCartCount > 0 && (
                <span className="bg-[#131512] text-[#F3BE53] text-xs font-black rounded-full px-1.5 py-0.2 min-w-[20px] text-center shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};

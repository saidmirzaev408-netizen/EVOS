import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';
import { IstiqlolLogo } from './IstiqlolLogo';

export const AuthPage = () => {
  const {
    authMode, setAuthMode, setAppMode,
    loginUser, registerUser,
    showToast, t, theme, setTheme,
    lang, setLang, languageOptions
  } = useApp();

  const isRegister = authMode === 'register';

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [forgotPhone, setForgotPhone] = useState('+998 ');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [authMode]);

  // Phone number formatter (+998 __ ___ __ __)
  const handlePhoneInput = (val, setter) => {
    if (!val.startsWith('+998')) {
      val = '+998 ';
    }
    const prefix = '+998 ';
    const rawDigits = val.slice(prefix.length).replace(/\D/g, '').slice(0, 9);
    
    let formatted = prefix;
    if (rawDigits.length > 0) formatted += rawDigits.slice(0, 2);
    if (rawDigits.length > 2) formatted += ' ' + rawDigits.slice(2, 5);
    if (rawDigits.length > 5) formatted += ' ' + rawDigits.slice(5, 7);
    if (rawDigits.length > 7) formatted += ' ' + rawDigits.slice(7, 9);

    setter(formatted);
  };

  // Password strength calculator
  const getPasswordStrength = () => {
    if (!password) return { level: 0, label: '', color: '' };
    if (password.length < 5) return { level: 1, label: 'Oddiy', color: 'bg-red-500' };
    if (password.length < 8) return { level: 2, label: 'O\'rtacha', color: 'bg-amber-500' };
    return { level: 3, label: 'Kuchli va xavfsiz', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength();
  const passwordsMatch = isRegister && password && confirmPassword && password === confirmPassword;

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanDigits = phone.replace(/\D/g, '');

    if (cleanDigits.length < 12) {
      showToast('Iltimos, to\'liq telefon raqamingizni kiriting (+998 __ ___ __ __)', 'info');
      return;
    }

    if (!password || password.length < 4) {
      showToast('Parol kamida 4 ta belgidan iborat bo\'lishi lozim', 'info');
      return;
    }

    if (isRegister) {
      if (!fullName.trim()) {
        showToast('Iltimos, to\'liq ismingizni kiriting', 'info');
        return;
      }
      if (password !== confirmPassword) {
        showToast('Parollar bir-biriga mos kelmadi!', 'info');
        return;
      }
      if (!agreeTerms) {
        showToast('Iltimos, foydalanish shartlariga rozilik bildiring', 'info');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        registerUser({
          name: fullName.trim(),
          phone: phone.trim(),
          password,
          birthday
        });
      }, 600);

    } else {
      // Login mode
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        loginUser({
          phone: phone.trim(),
          password,
          name: fullName.trim() || undefined
        });
      }, 500);
    }
  };

  // 1-Click Demo Fill
  const handleDemoFill = () => {
    if (isRegister) {
      setFullName('Azizbek Rahimov');
      setPhone('+998 90 987 65 43');
      setPassword('istiqlol2025');
      setConfirmPassword('istiqlol2025');
      setBirthday('1998-07-20');
      setAgreeTerms(true);
      showToast('⚡ Demo ma\'lumotlar to\'ldirildi! "Ro\'yxatdan o\'tish" tugmasini bosing.');
    } else {
      setPhone('+998 90 123 45 67');
      setPassword('istiqlol2025');
      showToast('⚡ Demo login to\'ldirildi! "Tizimga kirish" tugmasini bosing.');
    }
  };

  // Social Login handler
  const handleSocialAuth = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const socialNames = {
        telegram: 'Telegram Foydalanuvchisi',
        google: 'Google Mehmon'
      };
      if (isRegister) {
        registerUser({
          name: socialNames[provider] || 'Mehmon',
          phone: '+998 97 888 77 66',
          password: 'social-password-2026'
        });
      } else {
        loginUser({
          name: socialNames[provider] || 'Mehmon',
          phone: '+998 97 888 77 66'
        });
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0E0407] text-[#FFF0F3] relative overflow-hidden flex flex-col justify-between selection:bg-[#BA1D3D] selection:text-white">
      
      {/* Background Decorative Ambient Elements */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#800F26]/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#F3BE53]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-[#BA1D3D]/20 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Top Header Bar */}
      <header className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-[#3E111E]/60 backdrop-blur-md">
        {/* Back to Restaurant Button */}
        <button
          type="button"
          onClick={() => setAppMode('client')}
          className="flex items-center space-x-2 text-gray-300 hover:text-white bg-[#220812] hover:bg-[#340F1D] px-4 py-2 rounded-full border border-[#4E1726] text-xs font-bold transition-all shadow-md group active:scale-95"
        >
          <span className="text-[#F3BE53] group-hover:-translate-x-1 transition-transform font-black">←</span>
          <span>Asosiy menyuga qaytish</span>
        </button>

        {/* Center Brand on Mobile */}
        <div className="flex md:hidden items-center space-x-2 notranslate" translate="no">
          <IstiqlolLogo className="w-8 h-8 drop-shadow-[0_0_12px_rgba(225,29,72,0.8)]" />
          <span className="text-lg font-black tracking-tight text-white">ISTIQLOL</span>
        </div>

        {/* Top Controls: Theme & Language */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Theme switch */}
          <button
            onClick={() => {
              const nextTheme = theme === 'dark' ? 'light' : 'dark';
              setTheme(nextTheme);
              showToast(nextTheme === 'dark' ? '🌙 Tungi rejim yoqildi' : '☀️ Kunduzgi rejim yoqildi');
            }}
            className="p-2 rounded-full bg-[#220812] hover:bg-[#340F1D] text-gray-300 border border-[#4E1726] transition-all hover:scale-105 active:scale-95 shadow-sm"
            title="Mavzuni almashtirish"
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="w-4 h-4 text-[#F3BE53]" />
          </button>

          {/* Language Switcher */}
          <div className="relative flex items-center">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-[#220812] hover:bg-[#340F1D] text-[#F3BE53] text-xs font-black pl-3 pr-6 py-1.5 rounded-full border border-[#4E1726] hover:border-[#F3BE53]/60 cursor-pointer focus:outline-none shadow-md transition-all appearance-none"
            >
              {languageOptions.map((group, gIdx) => (
                <optgroup key={gIdx} label={group.group} className="bg-[#18080F] text-[#F3BE53] font-black">
                  {group.items.map(opt => (
                    <option key={opt.code} value={opt.code} className="bg-[#18080F] text-white py-1">
                      {opt.icon} {opt.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#F3BE53] text-[9px]">
              ▼
            </div>
          </div>
        </div>
      </header>

      {/* Main Container: Split Grid */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-center">

          {/* ======================================================== */}
          {/* LEFT COLUMN: BRAND HERO & EXCLUSIVE VIP PRIVILEGES        */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-6 text-left hidden lg:block pr-4">
            
            {/* Crown Logo Badge */}
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#3A0A17] to-[#1C050B] border border-[#F3BE53]/40 px-4 py-2 rounded-full shadow-lg notranslate" translate="no">
              <IstiqlolLogo className="w-6 h-6 drop-shadow-[0_0_12px_rgba(225,29,72,0.8)]" />
              <span className="text-white font-black tracking-tight text-sm">ISTIQLOL RESTORANI</span>
              <span className="w-2 h-2 rounded-full bg-[#F3BE53] animate-pulse"></span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.15]">
                {isRegister ? (
                  <>
                    Safimizga qo'shiling va{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3BE53] via-[#F8D278] to-[#E5A934]">
                      20 000 bonus
                    </span>{' '}
                    sovg'a oling!
                  </>
                ) : (
                  <>
                    Haqiqiy mazza va{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3BE53] via-[#F8D278] to-[#E5A934]">
                      qulay xizmat
                    </span>{' '}
                    dunyosiga xush kelibsiz!
                  </>
                )}
              </h1>

              <p className="text-sm xl:text-base text-gray-300 leading-relaxed max-w-lg font-medium">
                ISTIQLOL hisobingiz orqali sevimli tandir somsalar, sersuv burgerlar va mazali lavashlarga buyurtma bering, bonus ballar to'plang va stollarni boshqaring.
              </p>
            </div>

            {/* Exclusive VIP Member Perks Cards */}
            <div className="grid grid-cols-2 gap-3.5 pt-2 max-w-lg">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#240813] to-[#15040B] border border-[#481525] shadow-md space-y-1 group hover:border-[#F3BE53]/50 transition-all">
                <div className="text-2xl mb-1">🎁</div>
                <h4 className="text-xs font-black text-white">+20 000 Ball Sovg'a</h4>
                <p className="text-[11px] text-gray-400 leading-tight">Yangi a'zo bo'lganingiz uchun darhol bonus hisobingizga tushadi.</p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#240813] to-[#15040B] border border-[#481525] shadow-md space-y-1 group hover:border-[#F3BE53]/50 transition-all">
                <div className="text-2xl mb-1">⭐</div>
                <h4 className="text-xs font-black text-white">5% Har bir buyurtmadan</h4>
                <p className="text-[11px] text-gray-400 leading-tight">To'plangan ballar orqali bepul taomlar va sovg'alar oling.</p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#240813] to-[#15040B] border border-[#481525] shadow-md space-y-1 group hover:border-[#F3BE53]/50 transition-all">
                <div className="text-2xl mb-1">🛵</div>
                <h4 className="text-xs font-black text-white">25-35 Daqiqa Yetkazish</h4>
                <p className="text-[11px] text-gray-400 leading-tight">Taomingiz pechdan chiqqandek issiq va tez eshigingizda bo'ladi.</p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#240813] to-[#15040B] border border-[#481525] shadow-md space-y-1 group hover:border-[#F3BE53]/50 transition-all">
                <div className="text-2xl mb-1">📱</div>
                <h4 className="text-xs font-black text-white">Jonli Xarita & Kuzatuv</h4>
                <p className="text-[11px] text-gray-400 leading-tight">Kuryer harakatini va buyurtma holatini real vaqtda kuzatib boring.</p>
              </div>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-4 flex items-center space-x-4 border-t border-[#3E111E]/60 max-w-lg">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-[#0E0407] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Avatar 1" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-[#0E0407] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Avatar 2" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-[#0E0407] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" alt="Avatar 3" />
                <div className="w-9 h-9 rounded-full bg-[#BA1D3D] text-white text-[11px] font-black flex items-center justify-center ring-2 ring-[#0E0407]">
                  +50k
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center text-[#F3BE53] text-xs">
                  {"★".repeat(5)}
                  <span className="ml-1.5 text-white font-extrabold text-xs">4.95 / 5.0</span>
                </div>
                <p className="text-xs text-gray-400 font-medium">500,000+ doimiy mamnun mijozlarimiz ishonchi</p>
              </div>
            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: GORGEOUS AUTH CARD (LOGIN & REGISTER)       */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto">
            <div className="bg-[#1A0610]/90 backdrop-blur-2xl border-2 border-[#521727] rounded-[32px] p-6 sm:p-8 shadow-2xl relative shadow-[#800F26]/30 overflow-hidden">
              
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#BA1D3D] via-[#F3BE53] to-[#800F26]"></div>

              {/* Card Header with Brand Logo */}
              <div className="text-center mb-6">
                <div className="inline-block relative mb-2">
                  <IstiqlolLogo className="w-14 h-14 sm:w-16 sm:h-16 mx-auto drop-shadow-[0_0_20px_rgba(225,29,72,0.85)]" />
                  <span className="absolute -bottom-1 right-1 w-4 h-4 bg-[#F3BE53] rounded-full border-2 border-[#1A0610] animate-pulse"></span>
                </div>

                <div className="flex items-center justify-center gap-1.5 mb-1 notranslate" translate="no">
                  <span className="text-2xl font-black tracking-tight text-white">ISTIQLOL</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F3BE53]"></span>
                </div>

                <p className="text-[11px] font-bold text-[#F3BE53] uppercase tracking-wider -mt-1 notranslate" translate="no">
                  MAZZALI VA TEZKOR!
                </p>
              </div>

              {/* Main Mode Toggle Tabs (Kirish vs Ro'yxatdan o'tish) */}
              <div className="grid grid-cols-2 p-1.5 bg-[#12030B] rounded-2xl border border-[#3E111E] mb-6 text-xs font-black">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`py-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                    !isRegister
                      ? 'bg-gradient-to-r from-[#BA1D3D] via-[#D82249] to-[#9B1832] text-white shadow-lg shadow-[#BA1D3D]/35 scale-[1.02]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon name="lock" className="w-4 h-4 text-[#F3BE53]" />
                  <span>Kirish (Login)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className={`py-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                    isRegister
                      ? 'bg-gradient-to-r from-[#BA1D3D] via-[#D82249] to-[#9B1832] text-white shadow-lg shadow-[#BA1D3D]/35 scale-[1.02]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="text-sm">🎁</span>
                  <span>Ro'yxatdan o'tish</span>
                </button>
              </div>

              {/* Welcome Gift Promo Box (Shown on Register) */}
              {isRegister && (
                <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-[#4E0D1B] via-[#681124] to-[#2E0710] border border-[#F3BE53]/50 flex items-center space-x-3 shadow-md animate-fadeIn">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#F3BE53] to-[#FFD885] text-[#131512] font-black flex items-center justify-center text-xl flex-shrink-0 shadow-md">
                    🎁
                  </div>
                  <div className="text-left">
                    <p className="font-black text-[#F3BE53] uppercase tracking-wide text-[11px] flex items-center gap-1.5">
                      <span>Maxsus Taklif</span>
                      <span className="bg-[#BA1D3D] text-white text-[9px] px-1.5 py-0.2 rounded-full">+20 000 Ball</span>
                    </p>
                    <p className="text-gray-200 text-xs leading-snug font-medium">
                      Ro'yxatdan o'tganingiz zahoti hisobingizga <strong className="text-white font-extrabold">20 000 UZS</strong> bonus qo'shiladi!
                    </p>
                  </div>
                </div>
              )}

              {/* Authentication Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-left">

                {/* 1. Full Name (Only for Register) */}
                {isRegister && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-300 flex items-center justify-between">
                      <span>To'liq ismingiz <span className="text-[#BA1D3D]">*</span></span>
                      <span className="text-[10px] text-gray-500 font-normal">Ism va familiya</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="masalan: Azizbek Rahimov"
                        className="w-full bg-[#260A17] border border-[#4E1726] focus:border-[#F3BE53] focus:ring-1 focus:ring-[#F3BE53]/50 text-white rounded-2xl px-4 pl-11 py-3 text-xs sm:text-sm placeholder-gray-500 focus:outline-none transition-all"
                      />
                      <Icon name="user" className="w-4 h-4 text-[#F3BE53] absolute left-3.5 top-3.5" />
                    </div>
                  </div>
                )}

                {/* 2. Phone Number (Both Login & Register) */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300 flex items-center justify-between">
                    <span>Telefon raqami <span className="text-[#BA1D3D]">*</span></span>
                    <span className="text-[10px] text-gray-500 font-normal">O'zbekiston raqamlari</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => handlePhoneInput(e.target.value, setPhone)}
                      placeholder="+998 90 123 45 67"
                      className="w-full bg-[#260A17] border border-[#4E1726] focus:border-[#F3BE53] focus:ring-1 focus:ring-[#F3BE53]/50 text-white font-mono tracking-wide rounded-2xl px-4 pl-11 py-3 text-xs sm:text-sm placeholder-gray-500 focus:outline-none transition-all"
                    />
                    <Icon name="phone" className="w-4 h-4 text-[#F3BE53] absolute left-3.5 top-3.5" />
                  </div>
                </div>

                {/* 3. Password Field */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-300">
                      Parol <span className="text-[#BA1D3D]">*</span>
                    </label>
                    {!isRegister && (
                      <button
                        type="button"
                        onClick={() => setForgotPasswordModal(true)}
                        className="text-[11px] font-semibold text-[#F3BE53] hover:underline"
                      >
                        Parolni unutdingizmi?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isRegister ? "Kamida 4 ta belgi yarating" : "Parolingizni kiriting"}
                      className="w-full bg-[#260A17] border border-[#4E1726] focus:border-[#F3BE53] focus:ring-1 focus:ring-[#F3BE53]/50 text-white rounded-2xl px-4 pl-11 pr-11 py-3 text-xs sm:text-sm placeholder-gray-500 focus:outline-none transition-all"
                    />
                    <Icon name="lock" className="w-4 h-4 text-[#F3BE53] absolute left-3.5 top-3.5" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white transition-colors"
                      title={showPassword ? "Yashirish" : "Ko'rsatish"}
                    >
                      <Icon name={showPassword ? "eye-off" : "eye"} className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Password Strength Meter (On Register) */}
                  {isRegister && password && (
                    <div className="pt-1.5 space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-gray-400">Parol kuchi:</span>
                        <span className="font-bold text-gray-200">{strength.label}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#2E0B1B] rounded-full overflow-hidden flex gap-1">
                        <div className={`h-full transition-all duration-300 flex-1 ${strength.level >= 1 ? strength.color : 'bg-transparent'}`}></div>
                        <div className={`h-full transition-all duration-300 flex-1 ${strength.level >= 2 ? strength.color : 'bg-transparent'}`}></div>
                        <div className={`h-full transition-all duration-300 flex-1 ${strength.level >= 3 ? strength.color : 'bg-transparent'}`}></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Confirm Password (Only for Register) */}
                {isRegister && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-300 flex items-center justify-between">
                      <span>Parolni tasdiqlang <span className="text-[#BA1D3D]">*</span></span>
                      {passwordsMatch && (
                        <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                          <Icon name="check" className="w-3 h-3 text-emerald-400" /> Parollar mos
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Parolni qayta tering"
                        className={`w-full bg-[#260A17] border ${
                          confirmPassword && !passwordsMatch
                            ? 'border-red-500/80 focus:border-red-500'
                            : passwordsMatch
                            ? 'border-emerald-500/80 focus:border-emerald-500'
                            : 'border-[#4E1726] focus:border-[#F3BE53]'
                        } text-white rounded-2xl px-4 pl-11 pr-11 py-3 text-xs sm:text-sm placeholder-gray-500 focus:outline-none transition-all`}
                      />
                      <Icon name="lock" className="w-4 h-4 text-[#F3BE53] absolute left-3.5 top-3.5" />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white transition-colors"
                      >
                        <Icon name={showConfirmPassword ? "eye-off" : "eye"} className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 5. Birthday Picker (Optional on Register) */}
                {isRegister && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-300 flex items-center justify-between">
                      <span>Tug'ilgan sana <span className="text-gray-500 font-normal">(ixtiyoriy)</span></span>
                      <span className="text-[10px] text-[#F3BE53]">🎂 Bayramda maxsus sovg'a</span>
                    </label>
                    <input
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      className="w-full bg-[#260A17] border border-[#4E1726] focus:border-[#F3BE53] text-white rounded-2xl px-4 py-2.5 text-xs focus:outline-none transition-all [color-scheme:dark]"
                    />
                  </div>
                )}

                {/* 6. Remember Me / Terms Checkboxes */}
                {isRegister ? (
                  <label className="flex items-start space-x-2.5 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-[#BA1D3D] rounded border-[#4E1726] cursor-pointer"
                    />
                    <span className="text-[11px] text-gray-400 leading-tight">
                      Men <span className="text-gray-200 underline">Foydalanish shartlari</span> va <span className="text-gray-200 underline">Maxfiylik siyosatiga</span> roziman.
                    </span>
                  </label>
                ) : (
                  <label className="flex items-center space-x-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 accent-[#BA1D3D] rounded border-[#4E1726] cursor-pointer"
                    />
                    <span className="text-xs text-gray-300">Meni ushbu qurilmada eslab qol</span>
                  </label>
                )}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#BA1D3D] via-[#D82249] to-[#9B1832] hover:from-[#CF2044] hover:to-[#B01B3A] text-white font-black text-sm tracking-wide shadow-xl shadow-[#BA1D3D]/35 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center space-x-2 border border-[#F3BE53]/40 disabled:opacity-60 cursor-pointer"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Yuklanmoqda...</span>
                    </div>
                  ) : isRegister ? (
                    <>
                      <span>🎁 Ro'yxatdan o'tish (+20 000 Ball)</span>
                      <span>→</span>
                    </>
                  ) : (
                    <>
                      <Icon name="lock" className="w-4 h-4 text-[#F3BE53]" />
                      <span>Tizimga kirish</span>
                      <span>→</span>
                    </>
                  )}
                </button>

                {/* 1-Click Fast Demo Fill Button */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleDemoFill}
                    className="w-full py-2.5 rounded-xl bg-[#240A15] hover:bg-[#320D1D] text-[#F3BE53] border border-[#521727] hover:border-[#F3BE53]/60 text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-1.5 active:scale-95"
                  >
                    <span>⚡</span>
                    <span>1-bosishda Demo to'ldirish (Sinash uchun)</span>
                  </button>
                </div>

                {/* Social Login Separator */}
                <div className="relative py-2 flex items-center justify-center">
                  <div className="border-t border-[#3E111E] w-full"></div>
                  <span className="bg-[#1A0610] px-3 text-[10px] text-gray-500 uppercase tracking-widest font-black absolute">
                    yoki tezkor kirish
                  </span>
                </div>

                {/* Social Auth Buttons */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleSocialAuth('telegram')}
                    className="py-2.5 px-3 rounded-xl bg-[#240A15] hover:bg-[#2F0E1B] border border-[#481525] text-xs font-bold text-gray-200 hover:text-white flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-sm"
                  >
                    <span className="text-[#2AABEE] text-base">✈️</span>
                    <span>Telegram</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialAuth('google')}
                    className="py-2.5 px-3 rounded-xl bg-[#240A15] hover:bg-[#2F0E1B] border border-[#481525] text-xs font-bold text-gray-200 hover:text-white flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-sm"
                  >
                    <span className="text-base">🌐</span>
                    <span>Google</span>
                  </button>
                </div>

              </form>

              {/* Card Footer: Switcher link */}
              <div className="mt-6 pt-4 border-t border-[#3E111E]/70 text-center text-xs text-gray-400">
                {isRegister ? (
                  <p>
                    Allaqachon hisobingiz bormi?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="text-[#F3BE53] font-black hover:underline cursor-pointer"
                    >
                      Tizimga kirish
                    </button>
                  </p>
                ) : (
                  <p>
                    Hali hisobingiz yo'qmi?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('register')}
                      className="text-[#F3BE53] font-black hover:underline cursor-pointer"
                    >
                      Ro'yxatdan o'tish (+20 000 ball)
                    </button>
                  </p>
                )}
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Forgot Password Modal */}
      {forgotPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#1C0811] text-white rounded-3xl p-6 max-w-sm w-full border border-[#521727] shadow-2xl relative">
            <button
              onClick={() => setForgotPasswordModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <Icon name="x" className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-[#F3BE53]/20 text-[#F3BE53] flex items-center justify-center mx-auto mb-3 text-2xl font-black">
              🔑
            </div>
            <h3 className="text-lg font-black text-center text-white">Parolni tiklash</h3>
            <p className="text-xs text-gray-400 text-center mt-1 mb-4 leading-relaxed">
              Telefon raqamingizni kiriting, biz sizga SMS orqali yangi bir martalik parol yuboramiz.
            </p>
            <div className="space-y-3">
              <input
                type="tel"
                value={forgotPhone}
                onChange={(e) => handlePhoneInput(e.target.value, setForgotPhone)}
                placeholder="+998 90 123 45 67"
                className="w-full bg-[#280B18] border border-[#501929] text-white font-mono rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#F3BE53]"
              />
              <button
                type="button"
                onClick={() => {
                  showToast('Tasdiqlash kodi telefoningizga yuborildi!');
                  setForgotPasswordModal(false);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#BA1D3D] to-[#9B1832] text-white font-black text-xs shadow-md"
              >
                SMS kodni yuborish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-gray-500 border-t border-[#3E111E]/40 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2026 ISTIQLOL Fast Food. Barcha huquqlar himoyalangan.</p>
        <div className="flex items-center space-x-4 text-gray-400">
          <span className="hover:text-white cursor-pointer" onClick={() => showToast('Maxfiylik siyosati: Sizning ma\'lumotlaringiz shifrlangan holatda saqlanadi.')}>Maxfiylik siyosati</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer" onClick={() => showToast('Yordam: +998 71 200 00 00 raqami orqali bog\'laning')}>Yordam markazi</span>
        </div>
      </footer>

    </div>
  );
};

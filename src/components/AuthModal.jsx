import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';
import { IstiqlolLogo } from './IstiqlolLogo';

export const AuthModal = () => {
  const {
    isAuthModalOpen, setIsAuthModalOpen,
    authMode, setAuthMode, setAppMode,
    loginUser, registerUser,
    showToast, t
  } = useApp();

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

  if (!isAuthModalOpen) return null;

  const isRegister = authMode === 'register';

  // Format phone number as user types (+998 __ ___ __ __)
  const handlePhoneChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith('+998')) {
      val = '+998 ';
    }
    // Clean non-digits after prefix
    const prefix = '+998 ';
    const rawDigits = val.slice(prefix.length).replace(/\D/g, '').slice(0, 9);
    
    let formatted = prefix;
    if (rawDigits.length > 0) formatted += rawDigits.slice(0, 2);
    if (rawDigits.length > 2) formatted += ' ' + rawDigits.slice(2, 5);
    if (rawDigits.length > 5) formatted += ' ' + rawDigits.slice(5, 7);
    if (rawDigits.length > 7) formatted += ' ' + rawDigits.slice(7, 9);

    setPhone(formatted);
  };

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
        showToast('Iltimos, ismingizni kiriting', 'info');
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
      }, 500);

    } else {
      // Login
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

  // Demo fill for quick testing
  const handleQuickDemoFill = () => {
    if (isRegister) {
      setFullName('Azizbek Rahimov');
      setPhone('+998 90 987 65 43');
      setPassword('istiqlol2025');
      setConfirmPassword('istiqlol2025');
      setBirthday('1998-05-15');
      setAgreeTerms(true);
      showToast('⚡ Demo ma\'lumotlar to\'ldirildi! "Ro\'yxatdan o\'tish" tugmasini bosing.');
    } else {
      setPhone('+998 90 123 45 67');
      setPassword('istiqlol2025');
      showToast('⚡ Demo ma\'lumotlar to\'ldirildi! "Kirish" tugmasini bosing.');
    }
  };

  // Social Fast Login simulation
  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const demoNames = {
        telegram: 'Telegram Foydalanuvchisi',
        google: 'Google Mehmon'
      };
      if (isRegister) {
        registerUser({
          name: demoNames[provider] || 'Mehmon',
          phone: '+998 93 777 88 99',
          password: 'social-auth-password'
        });
      } else {
        loginUser({
          name: demoNames[provider] || 'Mehmon',
          phone: '+998 93 777 88 99'
        });
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#18080F] text-[#FFF0F3] rounded-[32px] max-w-md w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-[#4A1624] relative flex flex-col justify-between transition-all">

        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#BA1D3D]/25 to-transparent pointer-events-none rounded-t-[32px]"></div>

        {/* Top Controls: Fullpage & Close */}
        <div className="absolute top-4 right-4 z-20 flex items-center space-x-1.5">
          <button
            type="button"
            onClick={() => {
              setAppMode(authMode);
              setIsAuthModalOpen(false);
            }}
            className="w-9 h-9 rounded-full bg-[#270B16] hover:bg-[#3D1223] text-gray-300 hover:text-white flex items-center justify-center border border-[#4A1624] transition-colors"
            title="Alohida to'liq sahifada ochish"
          >
            <Icon name="external" className="w-4 h-4 text-[#F3BE53]" />
          </button>
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(false)}
            className="w-9 h-9 rounded-full bg-[#270B16] hover:bg-[#3D1223] text-gray-300 hover:text-white flex items-center justify-center border border-[#4A1624] transition-colors"
            title="Yopish"
          >
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Header */}
        <div className="p-6 pb-2 text-center relative z-10">
          <div className="flex justify-center mb-2">
            <div className="relative group">
              <IstiqlolLogo className="w-14 h-14 drop-shadow-[0_0_20px_rgba(225,29,72,0.8)] group-hover:scale-105 transition-transform" />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#F3BE53] rounded-full border-2 border-[#18080F] animate-pulse"></span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 mb-1 notranslate" translate="no">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white">ISTIQLOL</span>
            <span className="w-2 h-2 rounded-full bg-[#F3BE53]"></span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-white">
            {isRegister ? "Yangi hisob yaratish" : "Tizimga xush kelibsiz"}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5 max-w-xs mx-auto leading-relaxed">
            {isRegister
              ? "Ro'yxatdan o'ting va darhol 20 000 bonus ball sovg'a oling!"
              : "Sevimli taomlaringiz va jamg'arilgan bonuslaringizga ega bo'ling"}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 bg-[#230A14] rounded-2xl border border-[#401320] mt-4 text-xs font-black">
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                isRegister
                  ? 'bg-gradient-to-r from-[#BA1D3D] to-[#800F26] text-white shadow-md shadow-[#BA1D3D]/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>🎁</span>
              <span>Ro'yxatdan o'tish</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                !isRegister
                  ? 'bg-gradient-to-r from-[#BA1D3D] to-[#800F26] text-white shadow-md shadow-[#BA1D3D]/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon name="lock" className="w-3.5 h-3.5 text-[#F3BE53]" />
              <span>Kirish</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 pt-3 space-y-3.5 relative z-10 flex-1">

          {/* Welcome Gift Banner */}
          {isRegister && (
            <div className="p-3 rounded-2xl bg-gradient-to-r from-[#500A19]/80 to-[#2A0813] border border-[#F3BE53]/40 flex items-center space-x-3 shadow-md animate-fadeIn">
              <div className="w-10 h-10 rounded-xl bg-[#F3BE53] text-[#131512] font-black flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                🎁
              </div>
              <div className="text-left text-xs">
                <p className="font-black text-[#F3BE53] uppercase tracking-wide text-[11px]">Xush kelibsiz bonusi!</p>
                <p className="text-gray-200 text-[11px] leading-tight">Ro'yxatdan o'tishingiz bilan hisobingizga <strong className="text-white font-black">+20 000 ball</strong> qo'shiladi.</p>
              </div>
            </div>
          )}

          {/* Full Name (Only for Register) */}
          {isRegister && (
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-gray-300 block">
                Ism va Familiya <span className="text-[#BA1D3D]">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="masalan: Azizbek Rahimov"
                  className="w-full bg-[#240B16] border border-[#4A1624] focus:border-[#F3BE53] text-white rounded-2xl px-3.5 pl-10 py-2.5 text-xs placeholder-gray-500 focus:outline-none transition-colors"
                />
                <Icon name="user" className="w-4 h-4 text-[#F3BE53] absolute left-3.5 top-3" />
              </div>
            </div>
          )}

          {/* Phone Number */}
          <div className="space-y-1 text-left">
            <label className="text-[11px] font-bold text-gray-300 block">
              Telefon raqami <span className="text-[#BA1D3D]">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+998 90 123 45 67"
                className="w-full bg-[#240B16] border border-[#4A1624] focus:border-[#F3BE53] text-white font-mono rounded-2xl px-3.5 pl-10 py-2.5 text-xs placeholder-gray-500 focus:outline-none transition-colors"
              />
              <Icon name="phone" className="w-4 h-4 text-[#F3BE53] absolute left-3.5 top-3" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1 text-left">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-gray-300">
                Parol <span className="text-[#BA1D3D]">*</span>
              </label>
              {!isRegister && (
                <button
                  type="button"
                  onClick={() => showToast('Parolni tiklash uchun Call-markazimizga murojaat qiling: +998 71 200 00 00', 'info')}
                  className="text-[10px] text-[#F3BE53] hover:underline font-semibold"
                >
                  Parolni unutdingizmi?
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Kamida 4 ta belgi"
                className="w-full bg-[#240B16] border border-[#4A1624] focus:border-[#F3BE53] text-white rounded-2xl px-3.5 pl-10 pr-10 py-2.5 text-xs placeholder-gray-500 focus:outline-none transition-colors"
              />
              <Icon name="lock" className="w-4 h-4 text-[#F3BE53] absolute left-3.5 top-3" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-gray-400 hover:text-white"
              >
                <Icon name={showPassword ? 'eye-off' : 'eye'} className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Confirm Password (Only for Register) */}
          {isRegister && (
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-gray-300 block">
                Parolni qayta tasdiqlang <span className="text-[#BA1D3D]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Parolni takrorlang"
                  className="w-full bg-[#240B16] border border-[#4A1624] focus:border-[#F3BE53] text-white rounded-2xl px-3.5 pl-10 pr-10 py-2.5 text-xs placeholder-gray-500 focus:outline-none transition-colors"
                />
                <Icon name="lock" className="w-4 h-4 text-[#F3BE53] absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-3 text-gray-400 hover:text-white"
                >
                  <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Optional Birthday (Register only) */}
          {isRegister && (
            <div className="space-y-1 text-left">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-gray-300">
                  Tug'ilgan sana (Ixtiyoriy)
                </label>
                <span className="text-[10px] text-[#F3BE53] font-bold">🎂 Maxsus sovg'a uchun</span>
              </div>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="w-full bg-[#240B16] border border-[#4A1624] focus:border-[#F3BE53] text-white rounded-2xl px-3.5 py-2.5 text-xs placeholder-gray-500 focus:outline-none transition-colors"
              />
            </div>
          )}

          {/* Checkboxes */}
          {isRegister ? (
            <label className="flex items-start space-x-2 text-left cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-[#BA1D3D] rounded"
              />
              <span className="text-[11px] text-gray-300 leading-tight">
                ISTIQLOL xizmat ko'rsatish qoidalari va maxfiylik siyosatiga roziman.
              </span>
            </label>
          ) : (
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 text-gray-300 cursor-pointer text-[11px]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#BA1D3D] rounded"
                />
                <span>Meni eslab qol</span>
              </label>
            </div>
          )}

          {/* Main Submit Action */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#BA1D3D] via-[#D82249] to-[#9B1832] hover:from-[#CF2044] hover:to-[#B01B3A] text-white font-black text-sm tracking-wide shadow-xl shadow-[#BA1D3D]/30 active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-block animate-spin">⏳</span>
            ) : isRegister ? (
              <>
                <span>🎁</span>
                <span>Ro'yxatdan o'tish (+20 000 ball)</span>
              </>
            ) : (
              <>
                <Icon name="lock" className="w-4 h-4 text-[#F3BE53]" />
                <span>Tizimga kirish</span>
              </>
            )}
          </button>

          {/* Quick Demo Autofill Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="w-full py-2 px-3 rounded-xl bg-[#260B16] hover:bg-[#34111F] text-[#F3BE53] border border-[#521727] text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <span>⚡</span>
              <span>1-bosishda Demo to'ldirish (Sinash uchun)</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center space-x-3 pt-2">
            <div className="flex-1 h-px bg-[#35101C]"></div>
            <span className="text-[10px] uppercase font-bold text-gray-500">yoki tezkor kirish</span>
            <div className="flex-1 h-px bg-[#35101C]"></div>
          </div>

          {/* Social 1-tap options */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleSocialLogin('telegram')}
              className="py-2.5 px-3 rounded-2xl bg-[#1C2C3E] hover:bg-[#253A52] text-[#4BB1FF] border border-[#2E4866] text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors active:scale-95"
            >
              <span>✈️</span>
              <span>Telegram</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="py-2.5 px-3 rounded-2xl bg-[#260C16] hover:bg-[#361320] text-gray-200 border border-[#4E1726] text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors active:scale-95"
            >
              <span>🌐</span>
              <span>Google</span>
            </button>
          </div>

        </form>

        {/* Modal Footer / Switcher */}
        <div className="p-4 bg-[#14060C] border-t border-[#3A101C] text-center text-xs text-gray-400 rounded-b-[32px]">
          {isRegister ? (
            <p>
              Profilingiz bormi?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="text-[#F3BE53] hover:underline font-black ml-1"
              >
                Kirish →
              </button>
            </p>
          ) : (
            <p>
              Hali hisobingiz yo'qmi?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className="text-[#F3BE53] hover:underline font-black ml-1"
              >
                Ro'yxatdan o'tish (+20 000 ball) →
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

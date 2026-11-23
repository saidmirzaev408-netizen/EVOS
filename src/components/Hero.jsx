import React from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';
import { IstiqlolLogo } from './IstiqlolLogo';

export const Hero = () => {
  const { t } = useApp();

  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#131512] text-[#F4F5F2] pt-6 pb-12 sm:pt-10 sm:pb-20 border-b border-[#2B3026]">
      {/* Subtle Ambient Burgundy & Gold Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-gradient-to-r from-[#BA1D3D]/20 via-[#800F26]/15 to-[#F3BE53]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left z-10">
            
            {/* Official Brand Badge */}
            <div className="inline-flex items-center space-x-2.5 bg-[#23271E] border border-[#353B2F] px-4 py-1.5 rounded-full text-[#F3BE53] font-black text-xs sm:text-sm shadow-md">
              <IstiqlolLogo className="w-5 h-5 drop-shadow-[0_0_10px_rgba(225,29,72,0.7)]" />
              <span>{t('heroBadge')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              {t('heroTitlePart1')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3BE53] via-[#F8D278] to-[#E5A934]">
                {t('heroTitlePart2')}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 font-medium">
              {t('heroSubtitle')}
            </p>

            {/* Hero CTAs matching luxury gold buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={scrollToMenu}
                className="flex items-center space-x-2 bg-[#F3BE53] hover:bg-[#E5A934] text-[#131512] font-black text-sm sm:text-base px-8 py-3.5 rounded-full shadow-xl shadow-[#F3BE53]/25 transition-transform active:scale-95"
              >
                <span>{t('orderNow')}</span>
                <span>→</span>
              </button>

              <button
                onClick={scrollToMenu}
                className="flex items-center space-x-2 bg-[#23271E] hover:bg-[#2C3227] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-full border border-[#353B2F] transition-colors shadow-sm"
              >
                <Icon name="flame" className="w-5 h-5 text-[#F3BE53]" />
                <span>{t('viewMenu')}</span>
              </button>
            </div>

            {/* Social Proof & Rating Metrics */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 border-t border-[#2C3227]">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#131512] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Avatar" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#131512] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Avatar" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#131512] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" alt="Avatar" />
                </div>
                <div className="text-left">
                  <div className="flex items-center text-[#F3BE53] text-xs">
                    {"★".repeat(5)}
                    <span className="ml-1 text-white font-extrabold">4.95</span>
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium">{t('ratingText')}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs font-semibold text-gray-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00A859]"></span>
                <span>🛵 {t('estimatedTime')}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Food Visual Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Main Hero Food Image */}
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-[#353B2F] transform hover:scale-[1.01] transition-transform bg-[#1C1F18]">
                <img
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85"
                  alt="Tandir Somsa & Desserts"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131512] via-transparent to-black/30"></div>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="bg-[#F3BE53] text-[#131512] font-black text-xs uppercase px-3 py-1 rounded-full tracking-wider shadow-md">
                    Top Tavsiya
                  </span>
                  <h3 className="text-xl font-black mt-1.5 text-white">Issiq Tandir Somsa & Yaxna Moxito</h3>
                  <p className="text-xs text-gray-300">Qatlama xamir, mayin mol go'shti va muzdek yangi yalpiz</p>
                </div>
              </div>

              {/* Floating Badges */}
              <div className="absolute -top-3 -right-3 bg-[#23271E] rounded-2xl p-3 shadow-xl border border-[#353B2F] flex items-center space-x-3 animate-bounce-slow">
                <div className="w-10 h-10 rounded-xl bg-[#F3BE53]/20 flex items-center justify-center text-xl">
                  🥟
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Kun Taomi</p>
                  <p className="text-xs font-black text-white">Tandir Somsa</p>
                  <p className="text-xs font-black text-[#F3BE53]">14 000 UZS</p>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-3 bg-[#23271E] rounded-2xl p-3 shadow-xl border border-[#353B2F] flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#00A859]/20 flex items-center justify-center text-xl">
                  🍹
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Yaxna Ichimlik</p>
                  <p className="text-xs font-black text-white">Yalpizli Moxito</p>
                  <p className="text-xs font-black text-[#00A859]">18 000 UZS</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

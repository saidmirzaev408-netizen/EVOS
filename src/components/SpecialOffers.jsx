import React from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';

export const SpecialOffers = () => {
  const { t, showToast } = useApp();

  const copyPromo = (code) => {
    navigator.clipboard?.writeText(code);
    showToast(`Promokod nusxalandi: ${code}! Savatchada qo'llang.`);
  };

  const offers = [
    {
      id: 1,
      title: 'Somsa & Moxito Aksiya',
      discount: '15 000 UZS',
      subtitle: 'Tandir somsa va muzdek moxito uchun maxsus chegirma',
      code: 'SOMSA',
      badgeBg: 'bg-[#FFF3D6] text-[#9E6500] border border-[#F3BE53]/60 dark:bg-[#F3BE53] dark:text-[#17080E]',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      title: 'ISTIQLOL2025 Chegirmasi',
      discount: '15% OFF',
      subtitle: 'Pirojniy, hot-dog va qofega 15% tejamkorlik',
      code: 'ISTIQLOL2025',
      badgeBg: 'bg-[#FFF3D6] text-[#9E6500] border border-[#F3BE53]/60 dark:bg-[#E5A934] dark:text-[#17080E]',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      title: 'Bepul Yetkazib Berish',
      discount: 'BEPUL',
      subtitle: '40 000 UZS dan yuqori buyurtmalar uchun mutlaqo bepul',
      code: 'BEPUL',
      badgeBg: 'bg-[#FFE6EC] text-[#BA1D3D] border border-[#BA1D3D]/40 dark:bg-[#BA1D3D] dark:text-white',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <section className="py-8 bg-transparent border-b border-[#F0D6DC] dark:border-[#2B3026]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-[#BA1D3D] dark:text-[#F3BE53] text-xs font-black uppercase tracking-wider mb-1">
              <span>🎁</span>
              <span>{t('specialOffersSub')}</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              {t('specialOffers')}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {offers.map(offer => (
            <div
              key={offer.id}
              className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#250C16] border-2 border-[#F0D6DC] dark:border-[#4E1726] p-5 shadow-lg hover:shadow-2xl hover:border-[#BA1D3D]/60 dark:hover:border-[#F3BE53]/60 flex items-center justify-between group transition-all duration-300 hover:-translate-y-1"
            >
              <div className="z-10 space-y-2.5 max-w-[65%]">
                <span className={`${offer.badgeBg} text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase shadow-sm inline-block`}>
                  {offer.discount}
                </span>
                <h3 className="text-base sm:text-lg font-black leading-snug text-gray-900 dark:text-white">
                  {offer.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                  {offer.subtitle}
                </p>
                
                <button
                  type="button"
                  onClick={() => copyPromo(offer.code)}
                  className="inline-flex items-center space-x-1.5 bg-[#FBF4F6] hover:bg-[#F3DEE3] dark:bg-[#18080F] dark:hover:bg-[#230C15] text-xs font-black px-3.5 py-1.5 rounded-full border border-[#F0D6DC] dark:border-[#4A1624] text-[#BA1D3D] dark:text-[#F3BE53] shadow-sm transition-all active:scale-95"
                >
                  <Icon name="tag" className="w-3.5 h-3.5 text-[#BA1D3D] dark:text-[#F3BE53]" />
                  <span>{offer.code}</span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold">nusxalash</span>
                </button>
              </div>

              <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-md border-2 border-[#F0D6DC] dark:border-[#4E1726] flex-shrink-0 group-hover:scale-105 transition-transform bg-[#FDF6F8]">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

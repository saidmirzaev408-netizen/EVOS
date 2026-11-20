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
      bg: 'from-[#252A1E] to-[#1C1F18] border border-[#F3BE53]/40',
      badgeBg: 'bg-[#F3BE53] text-[#131512]',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      title: 'ISTIQLOL2025 Chegirmasi',
      discount: '15% OFF',
      subtitle: 'Pirojniy, hot-dog va qofega 15% tejamkorlik',
      code: 'ISTIQLOL2025',
      bg: 'from-[#2E2818] to-[#1C1A14] border border-[#E5A934]/40',
      badgeBg: 'bg-[#E5A934] text-[#131512]',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      title: 'Bepul Yetkazib Berish',
      discount: 'BEPUL',
      subtitle: '40 000 UZS dan yuqori buyurtmalar uchun mutlaqo bepul',
      code: 'BEPUL',
      bg: 'from-[#192A20] to-[#131F18] border border-[#00A859]/40',
      badgeBg: 'bg-[#00A859] text-white',
      image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <section className="py-8 bg-[#161814] border-b border-[#2B3026]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-[#F3BE53] text-xs font-black uppercase tracking-wider mb-1">
              <span>🎁</span>
              <span>Katta chegirmalar</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Aksiyalar va Maxsus Takliflar
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {offers.map(offer => (
            <div
              key={offer.id}
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${offer.bg} text-white p-5 shadow-xl flex items-center justify-between group transition-transform hover:-translate-y-1 duration-300`}
            >
              <div className="z-10 space-y-2 max-w-[65%]">
                <span className={`${offer.badgeBg} text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase shadow`}>
                  {offer.discount}
                </span>
                <h3 className="text-lg font-black leading-snug text-white">{offer.title}</h3>
                <p className="text-xs text-gray-300 line-clamp-2">{offer.subtitle}</p>
                
                <button
                  type="button"
                  onClick={() => copyPromo(offer.code)}
                  className="inline-flex items-center space-x-1.5 bg-[#131512]/90 hover:bg-[#131512] text-xs font-black px-3 py-1.5 rounded-full border border-[#353B2F] text-[#F3BE53] transition-colors"
                >
                  <Icon name="tag" className="w-3.5 h-3.5 text-[#F3BE53]" />
                  <span>{offer.code}</span>
                  <span className="text-[10px] text-gray-400">nusxalash</span>
                </button>
              </div>

              <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-lg border border-[#353B2F] flex-shrink-0 group-hover:scale-110 transition-transform">
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

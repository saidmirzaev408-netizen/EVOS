import React from 'react';
import { useApp } from '../context/AppContext';

export const ReviewsSection = () => {
  const { t } = useApp();

  const reviews = [
    {
      id: 1,
      name: 'Shahzod Mirzayev',
      role: 'Doimiy mijoz (Toshkent)',
      rating: 5,
      text: 'Har doim issiq va juda mazzali! Sirli lavash va frilari ayniqsa ajoyib. Kuryerlar 25 daqiqada yetkazib berishadi.',
      date: '18.11.2026',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
    },
    {
      id: 2,
      name: 'Malika Karimova',
      role: 'Toshkent',
      rating: 5,
      text: 'EVOS Double Cheeseburger haqiqiy lazzat! Ilovasidagi sodiqlik tizimi ham juda yoqdi, yig\'ilgan ballarga bepul fri oldim.',
      date: '16.11.2026',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80'
    },
    {
      id: 3,
      name: 'Bobur Usmonov',
      role: 'Samarqand',
      rating: 5,
      text: 'Oilaviy kombolar narxi juda maqbul. Bolalarim pitsasini sevib yeyishadi. O\'zbekistondagi eng yaxshi fast-food tarmog\'i!',
      date: '14.11.2026',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80'
    }
  ];

  return (
    <section className="py-14 bg-[#131512] border-b border-[#2B3026]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-black uppercase text-[#F3BE53] tracking-wider">
            Mijozlarimiz Bahosi
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            {t('reviewsSection')}
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            {t('reviewsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map(r => (
            <div
              key={r.id}
              className="p-6 rounded-3xl bg-[#23271E] border border-[#32382B] shadow-lg space-y-4"
            >
              <div className="flex items-center space-x-1 text-amber-500 text-sm">
                {"★".repeat(r.rating)}
              </div>
              <p className="text-xs sm:text-sm text-gray-300 italic">
                "{r.text}"
              </p>
              <div className="flex items-center space-x-3 pt-3 border-t border-[#32382B]">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#353B2F]"
                />
                <div>
                  <h4 className="text-xs font-black text-white">{r.name}</h4>
                  <p className="text-[10px] text-gray-400">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


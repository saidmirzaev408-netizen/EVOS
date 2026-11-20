import React from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';

export const BranchesSection = () => {
  const { lang, t, showToast, branchesData } = useApp();

  return (
    <section className="py-14 bg-[#161814] border-b border-[#2B3026]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <span className="text-xs font-black uppercase text-[#F3BE53] tracking-wider">
              EVOS Locations
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              {t('branchesSection')}
            </h2>
            <p className="text-sm text-gray-400">
              {t('branchesSubtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branchesData.map(branch => (
            <div
              key={branch.id}
              className="rounded-3xl overflow-hidden border border-[#32382B] bg-[#23271E] hover:border-[#F3BE53]/50 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Branch Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={branch.image}
                    alt={branch.name[lang] || branch.name.uz}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase shadow">
                    {branch.workingHours}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center space-x-1">
                    <Icon name="star" className="w-3.5 h-3.5 text-amber-400" />
                    <span>{branch.rating}</span>
                    <span className="text-gray-300 text-[10px]">({branch.reviews})</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-black text-gray-900 dark:text-white">
                    {branch.name[lang] || branch.name.uz}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-start space-x-1.5">
                    <Icon name="map-pin" className="w-4 h-4 text-evos-600 flex-shrink-0 mt-0.5" />
                    <span>{branch.address[lang] || branch.address.uz}</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1.5">
                    <Icon name="phone" className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{branch.phone}</span>
                  </p>

                  {/* Amenities Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {branch.features.map((f, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-md border border-gray-200 dark:border-gray-600"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => showToast(`Filial tanlandi: ${branch.name.uz}`)}
                  className="w-full py-2.5 rounded-xl bg-white dark:bg-gray-700 hover:bg-evos-600 hover:text-white text-gray-900 dark:text-white font-bold text-xs border border-gray-200 dark:border-gray-600 hover:border-transparent transition-all"
                >
                  Olib ketish uchun tanlash
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


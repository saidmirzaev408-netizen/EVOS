import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';
import { formatUZS } from '../utils/formatters';

export const ProductDetailsModal = () => {
  const {
    isDetailsOpen, setIsDetailsOpen,
    activeProductModal, addToCart, lang, t,
    categoryFallbacks, favorites, toggleFavorite, showToast,
    categories
  } = useApp();

  if (!isDetailsOpen || !activeProductModal) return null;

  const isFav = favorites.includes(activeProductModal.id);

  const catObj = categories?.find(c => c.id === activeProductModal?.category);
  const categoryLabel = catObj ? (catObj.name[lang] || catObj.name.ru || catObj.name.uz) : activeProductModal?.category;

  // Portion sizes: Small, Normal, Large, Extra Large (matching screenshot)
  const [portion, setPortion] = useState('Normal');
  const [addons, setAddons] = useState({
    extraSauce: false,
    extraCheese: false,
    crispyOnions: false
  });
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  // Price calculations based on portion
  const portionMultiplier = {
    Small: -3000,
    Normal: 0,
    Large: 5000,
    'Extra Large': 10000
  };

  const portionPrice = portionMultiplier[portion] || 0;
  let addonsPrice = 0;
  if (addons.extraSauce) addonsPrice += 3000;
  if (addons.extraCheese) addonsPrice += 5000;
  if (addons.crispyOnions) addonsPrice += 3000;

  const unitPrice = Math.max(activeProductModal.price + portionPrice + addonsPrice, 5000);
  const totalItemPrice = unitPrice * quantity;

  const handleAdd = () => {
    addToCart(activeProductModal, {
      portion,
      addons,
      quantity,
      notes,
      unitPrice
    });
    setIsDetailsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#1C1F18] text-[#F4F5F2] rounded-[32px] max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#353B2F] relative flex flex-col justify-between">
        
        {/* Top Image Hero with Floating Controls */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#151713]">
          <img
            src={activeProductModal.image}
            alt={activeProductModal.name[lang] || activeProductModal.name.uz}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = categoryFallbacks?.[activeProductModal.category] || categoryFallbacks?.default || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80';
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1F18] via-transparent to-black/40"></div>

          {/* Top Back & Options buttons (matching screenshot) */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between">
            <button
              onClick={() => setIsDetailsOpen(false)}
              className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white flex items-center justify-center transition-colors shadow-md"
              aria-label="Back"
            >
              <Icon name="x" className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleFavorite(activeProductModal.id)}
                className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white flex items-center justify-center transition-transform active:scale-90 shadow-md"
              >
                <Icon name="heart" className="w-5 h-5 text-[#F3BE53]" filled={isFav} />
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  showToast('Havola nusxalandi!', 'info');
                }}
                className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white flex items-center justify-center transition-colors shadow-md"
              >
                <span className="text-sm font-bold">•••</span>
              </button>
            </div>
          </div>

          {/* Category tag */}
          <div className="absolute bottom-4 left-5">
            <span className="bg-[#F3BE53] text-[#131512] text-xs font-black px-3 py-1 rounded-full uppercase shadow-md notranslate" translate="no">
              {categoryLabel}
            </span>
          </div>
        </div>

        {/* Product Details Body */}
        <div className="p-5 sm:p-6 space-y-6 flex-1">
          
          {/* Title & Rating */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-bold text-gray-400">
              <span className="text-[#F3BE53]">★</span>
              <span className="text-white font-extrabold">{activeProductModal.rating}</span>
              <span>({activeProductModal.reviewsCount} sharhlar)</span>
              <span>•</span>
              <span>{activeProductModal.calories}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight notranslate" translate="no">
              {activeProductModal.name[lang] || activeProductModal.name.ru || activeProductModal.name.uz}
            </h2>
          </div>

          {/* Price display */}
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-[#F3BE53]">
              {formatUZS(unitPrice)}
            </span>
            {activeProductModal.oldPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatUZS(activeProductModal.oldPrice)}
              </span>
            )}
          </div>

          {/* Details Description */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
              Tavsif (Details)
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {activeProductModal.description[lang] || activeProductModal.description.uz}
            </p>
          </div>

          {/* Choose Portion Size - Exactly matching the screenshot (Small, Normal, Large, Extra Large) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                Porsiya o'lchami (Choose portion size)
              </label>
              <span className="text-[11px] text-[#F3BE53] font-bold">
                {portion === 'Small' ? '-3 000 UZS' : portion === 'Large' ? '+5 000 UZS' : portion === 'Extra Large' ? '+10 000 UZS' : 'Standart'}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {['Small', 'Normal', 'Large', 'Extra Large'].map(p => {
                const isActive = portion === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPortion(p)}
                    className={`py-2.5 px-2 rounded-2xl text-xs font-extrabold transition-all border text-center truncate ${
                      isActive
                        ? 'bg-[#F3BE53] text-[#131512] border-[#F3BE53] shadow-md shadow-[#F3BE53]/20 scale-[1.02]'
                        : 'bg-[#23271E] text-gray-300 border-[#353B2F] hover:bg-[#2C3227]'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Additional Toppings (matching screenshot) */}
          <div className="space-y-2.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
              Qo'shimchalar (Additional toppings)
            </label>

            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 rounded-2xl bg-[#23271E] border border-[#353B2F] hover:bg-[#2A2F25] cursor-pointer text-xs font-bold transition-colors">
                <span className="flex items-center space-x-2 text-gray-200">
                  <input
                    type="checkbox"
                    checked={addons.extraSauce}
                    onChange={(e) => setAddons(prev => ({ ...prev, extraSauce: e.target.checked }))}
                    className="w-4 h-4 accent-[#F3BE53] rounded"
                  />
                  <span>Maxsus sarimsoqli oq sous</span>
                </span>
                <span className="text-[#F3BE53] font-black">+3 000 UZS</span>
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-[#23271E] border border-[#353B2F] hover:bg-[#2A2F25] cursor-pointer text-xs font-bold transition-colors">
                <span className="flex items-center space-x-2 text-gray-200">
                  <input
                    type="checkbox"
                    checked={addons.extraCheese}
                    onChange={(e) => setAddons(prev => ({ ...prev, extraCheese: e.target.checked }))}
                    className="w-4 h-4 accent-[#F3BE53] rounded"
                  />
                  <span>Erigan qo'shimcha pishloq (Motsarella)</span>
                </span>
                <span className="text-[#F3BE53] font-black">+5 000 UZS</span>
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-[#23271E] border border-[#353B2F] hover:bg-[#2A2F25] cursor-pointer text-xs font-bold transition-colors">
                <span className="flex items-center space-x-2 text-gray-200">
                  <input
                    type="checkbox"
                    checked={addons.crispyOnions}
                    onChange={(e) => setAddons(prev => ({ ...prev, crispyOnions: e.target.checked }))}
                    className="w-4 h-4 accent-[#F3BE53] rounded"
                  />
                  <span>Qarsildoq qovurilgan piyoz</span>
                </span>
                <span className="text-[#F3BE53] font-black">+3 000 UZS</span>
              </label>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between bg-[#23271E] p-3 rounded-2xl border border-[#353B2F]">
            <span className="text-xs font-bold text-gray-300">
              Buyurtma miqdori:
            </span>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full bg-[#181A15] border border-[#353B2F] text-white flex items-center justify-center font-black hover:border-[#F3BE53]"
              >
                -
              </button>
              <span className="text-sm font-black text-white min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(q => q + 1)}
                className="w-8 h-8 rounded-full bg-[#181A15] border border-[#353B2F] text-white flex items-center justify-center font-black hover:border-[#F3BE53]"
              >
                +
              </button>
            </div>
          </div>

          {/* Chef Notes input */}
          <div>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Oshpaz uchun izoh (masalan: piyozsiz, achchiqroq...)"
              className="w-full bg-[#23271E] text-xs text-white border border-[#353B2F] rounded-2xl px-3.5 py-2.5 focus:outline-none focus:border-[#F3BE53] placeholder-gray-500"
            />
          </div>

        </div>

        {/* Bottom Fixed Action Row - EXACTLY MATCHING SCREENSHOT (Total on left, gold pill "Add to cart" on right) */}
        <div className="p-4 sm:p-5 bg-[#171914] border-t border-[#2F3528] flex items-center justify-between sticky bottom-0 rounded-b-[32px]">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              {t('total') || 'Jami'}
            </p>
            <p className="text-xl sm:text-2xl font-black text-white">
              {formatUZS(totalItemPrice)}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="py-3.5 px-7 rounded-full bg-[#F3BE53] hover:bg-[#E5A934] text-[#131512] font-black text-sm tracking-wide shadow-xl shadow-[#F3BE53]/25 active:scale-95 transition-transform flex items-center space-x-2"
          >
            <Icon name="shopping-bag" className="w-4 h-4 text-[#131512]" />
            <span>{t('addToCart') || "Savatchaga qo'shish"}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

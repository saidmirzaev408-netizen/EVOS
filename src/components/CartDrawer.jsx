import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';
import { formatUZS } from '../utils/formatters';

export const CartDrawer = () => {
  const {
    isCartOpen, setIsCartOpen,
    cart, updateCartQuantity, removeFromCart,
    subtotal, deliveryFee, discountAmount, grandTotal,
    appliedPromo, setAppliedPromo,
    setIsCheckoutOpen, lang, showToast, t,
    samplePromoCodes, categoryFallbacks
  } = useApp();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = () => {
    const found = samplePromoCodes.find(
      p => p.code.toUpperCase() === promoInput.trim().toUpperCase()
    );
    if (found) {
      if (subtotal < found.minOrder) {
        showToast(`Ushbu promokod minimal ${formatUZS(found.minOrder)} buyurtmalar uchun!`, 'info');
        return;
      }
      setAppliedPromo(found);
      showToast(t('promoApplied'));
    } else {
      showToast(t('promoInvalid'), 'info');
    }
  };

  const freeDeliveryRemaining = Math.max(0, 80000 - subtotal);
  const freeDeliveryPercent = Math.min(100, (subtotal / 80000) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#1C1F18] text-[#F4F5F2] shadow-2xl flex flex-col justify-between border-l border-[#353B2F]">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#2C3227] flex items-center justify-between bg-[#171914]">
            <div className="flex items-center space-x-2">
              <Icon name="shopping-bag" className="w-5 h-5 text-[#F3BE53]" />
              <h2 className="text-lg font-black text-white">
                {t('cart') || 'Savatcha'} ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-[#242820] text-gray-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <Icon name="x" className="w-4 h-4" />
            </button>
          </div>

          {/* Free delivery progress meter */}
          <div className="bg-[#242116] px-5 py-3 border-b border-[#3E351E]">
            <div className="flex items-center justify-between text-xs font-bold text-amber-200 mb-1.5">
              <span>
                {freeDeliveryRemaining === 0
                  ? '🎉 Bepul yetkazib berish huquqiga egasiz!'
                  : `Yana ${formatUZS(freeDeliveryRemaining)} buyurtma qiling va BEPUL yetkazamiz!`}
              </span>
              <span className="text-[#F3BE53] font-black">{Math.round(freeDeliveryPercent)}%</span>
            </div>
            <div className="w-full bg-[#181A15] rounded-full h-2 overflow-hidden border border-[#353B2F]">
              <div
                className="bg-[#F3BE53] h-2 rounded-full transition-all duration-500"
                style={{ width: `${freeDeliveryPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <div className="text-5xl">🛍️</div>
                <h3 className="text-base font-black text-white">{t('cartEmpty')}</h3>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">{t('cartEmptyDesc')}</p>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.itemKey}
                  className="flex items-center space-x-3 p-3 bg-[#23271E] rounded-2xl border border-[#32382B]"
                >
                  <img
                    src={item.image}
                    alt={item.name[lang] || item.name.uz}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = categoryFallbacks?.[item.category] || categoryFallbacks?.default || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80';
                    }}
                    className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 border border-[#353B2F]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-extrabold text-white truncate">
                      {item.name[lang] || item.name.uz}
                    </h4>
                    <p className="text-[11px] text-gray-400">
                      {item.options.portion ? `Porsiya: ${item.options.portion}` : 'Standart'}
                    </p>
                    <p className="text-xs font-black text-[#F3BE53] mt-0.5">
                      {formatUZS(item.price)}
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center space-x-2 bg-[#181A15] px-2 py-1 rounded-xl border border-[#353B2F]">
                    <button
                      onClick={() => updateCartQuantity(item.itemKey, -1)}
                      className="text-gray-400 hover:text-white font-black px-1 text-xs"
                    >
                      -
                    </button>
                    <span className="text-xs font-black text-white min-w-[14px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.itemKey, 1)}
                      className="text-[#F3BE53] hover:text-white font-black px-1 text-xs"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.itemKey)}
                    className="text-gray-500 hover:text-red-400 p-1"
                  >
                    <Icon name="trash" className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Cart Bottom Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#2C3227] space-y-4 bg-[#171914]">
              
              {/* Promo Code Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promokod (masalan: SOMSA)"
                  className="flex-1 bg-[#23271E] border border-[#353B2F] rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F3BE53]"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="bg-[#2A2F25] hover:bg-[#343B2E] border border-[#3A4234] text-xs font-black px-4 py-2 rounded-xl text-[#F3BE53]"
                >
                  {t('applyPromo') || "Qo'llash"}
                </button>
              </div>

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs font-black text-[#00A859] bg-[#00A859]/10 p-2.5 rounded-xl border border-[#00A859]/30">
                  <span>✓ {t('promoApplied') || 'Promokod faol'}: {appliedPromo.code}</span>
                  <button onClick={() => setAppliedPromo(null)} className="text-gray-400 hover:text-white">✕</button>
                </div>
              )}

              {/* Calculations */}
              <div className="space-y-1.5 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>{t('subtotal') || 'Mahsulotlar summasi'}:</span>
                  <span className="text-white font-bold">{formatUZS(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('deliveryFee') || 'Yetkazib berish'}:</span>
                  <span className={deliveryFee === 0 ? "text-[#00A859] font-black" : "text-white font-bold"}>
                    {deliveryFee === 0 ? (t('freeDelivery') || 'BEPUL') : formatUZS(deliveryFee)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#F3BE53]">
                    <span>{t('discount') || 'Chegirma'}:</span>
                    <span className="font-black">-{formatUZS(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-[#2C3227]">
                  <span>{t('total') || "Jami to'lov"}:</span>
                  <span className="text-xl text-[#F3BE53]">{formatUZS(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-4 rounded-full bg-[#F3BE53] hover:bg-[#E5A934] text-[#131512] font-black text-sm tracking-wide shadow-xl shadow-[#F3BE53]/25 active:scale-95 transition-transform flex items-center justify-center space-x-2"
              >
                <span>{t('checkout') || 'Buyurtmani rasmiylashtirish'}</span>
                <span>→</span>
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

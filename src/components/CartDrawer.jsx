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
    samplePromoCodes
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

  const freeDeliveryRemaining = Math.max(0, 100000 - subtotal);
  const freeDeliveryPercent = Math.min(100, (subtotal / 100000) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col justify-between border-l border-gray-200 dark:border-gray-800">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/30">
            <div className="flex items-center space-x-2">
              <Icon name="shopping-bag" className="w-5 h-5 text-evos-600" />
              <h2 className="text-lg font-black text-gray-900 dark:text-white">
                {t('cart')} ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 transition-colors"
            >
              <Icon name="x" className="w-5 h-5" />
            </button>
          </div>

          {/* Free delivery progress meter */}
          <div className="bg-amber-50 dark:bg-amber-950/30 px-5 py-3 border-b border-amber-200/50 dark:border-amber-800/50">
            <div className="flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-300 mb-1.5">
              <span>
                {freeDeliveryRemaining === 0
                  ? '🎉 Bepul yetkazib berish huquqiga egasiz!'
                  : `Yana ${formatUZS(freeDeliveryRemaining)} xarid qiling va BEPUL yetkazamiz!`}
              </span>
              <span>{Math.round(freeDeliveryPercent)}%</span>
            </div>
            <div className="w-full bg-amber-200 dark:bg-amber-900 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${freeDeliveryPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <div className="text-5xl">🛍️</div>
                <h3 className="text-base font-black text-gray-900 dark:text-white">{t('cartEmpty')}</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">{t('cartEmptyDesc')}</p>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.itemKey}
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-800"
                >
                  <img
                    src={item.image}
                    alt={item.name[lang] || item.name.uz}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=400&q=80';
                    }}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-extrabold text-gray-900 dark:text-white truncate">
                      {item.name[lang] || item.name.uz}
                    </h4>
                    <p className="text-[11px] text-gray-400">
                      {item.options.portion === 'large' ? 'Katta' : 'Standart'}
                      {item.options.addons?.cheese && ' • +Pishloq'}
                      {item.options.addons?.jalapeno && ' • +Xalapeno'}
                    </p>
                    <p className="text-xs font-black text-evos-600 mt-1">
                      {formatUZS(item.price)}
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center space-x-2 bg-white dark:bg-gray-700 px-2 py-1 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600">
                    <button
                      onClick={() => updateCartQuantity(item.itemKey, -1)}
                      className="text-gray-500 hover:text-red-600 font-bold px-1"
                    >
                      -
                    </button>
                    <span className="text-xs font-black min-w-[14px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.itemKey, 1)}
                      className="text-gray-500 hover:text-emerald-600 font-bold px-1"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.itemKey)}
                    className="text-gray-400 hover:text-red-500 p-1"
                  >
                    <Icon name="trash" className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Cart Bottom Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-200 dark:border-gray-800 space-y-4 bg-gray-50/70 dark:bg-gray-800/40">
              
              {/* Promo Code Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder={t('havePromo')}
                  className="flex-1 text-xs uppercase font-bold px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:border-evos-500"
                />
                <button
                  onClick={handleApplyPromo}
                  className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-extrabold text-xs px-4 py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all"
                >
                  {t('applyPromo')}
                </button>
              </div>

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-300/40">
                  <span>✓ {appliedPromo.code} faol: {appliedPromo.description}</span>
                  <button onClick={() => setAppliedPromo(null)} className="font-bold underline ml-2">Bekor</button>
                </div>
              )}

              {/* Calculations */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>{t('subtotal')}</span>
                  <span>{formatUZS(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>{t('deliveryFee')}</span>
                  <span>{deliveryFee === 0 ? <span className="text-emerald-600 font-bold">BEPUL</span> : formatUZS(deliveryFee)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>{t('discount')}</span>
                    <span>-{formatUZS(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span>{t('total')}</span>
                  <span className="text-base text-evos-600">{formatUZS(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full bg-evos-600 hover:bg-evos-700 text-white font-black text-sm py-3.5 rounded-2xl shadow-lg shadow-evos-600/30 active:scale-98 transition-transform flex items-center justify-center space-x-2"
              >
                <span>{t('checkout')}</span>
                <span>→</span>
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};


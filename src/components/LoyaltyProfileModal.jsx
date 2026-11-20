import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';
import { IstiqlolLogo } from './IstiqlolLogo';
import { formatUZS } from '../utils/formatters';

export const LoyaltyProfileModal = () => {
  const {
    isProfileOpen, setIsProfileOpen,
    user, loyaltyPoints, setLoyaltyPoints,
    orders, addToCart, showToast, t,
    loyaltyRewards
  } = useApp();

  if (!isProfileOpen) return null;

  const [activeTab, setActiveTab] = useState('loyalty');

  const handleRedeemReward = (reward) => {
    if (loyaltyPoints < reward.points) {
      showToast(`Ushbu sovrin uchun ballar yetarli emas (kerak: ${reward.points.toLocaleString()})`, 'info');
      return;
    }

    setLoyaltyPoints(prev => prev - reward.points);
    addToCart({
      id: reward.id,
      name: { uz: `${reward.name} (Sovrin)`, ru: `${reward.name} (Подарок)`, en: `${reward.name} (Reward)` },
      category: reward.category,
      price: 0,
      image: reward.image
    });

    showToast(t('redeemSuccess'));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-800">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900 z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-gray-950 font-black flex items-center justify-center text-lg shadow-md">
              ⭐
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900 dark:text-white">{user.name}</h2>
              <p className="text-xs text-gray-500">{user.phone} • {user.tier} Daraja</p>
            </div>
          </div>
          <button
            onClick={() => setIsProfileOpen(false)}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
          >
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>

        {/* Loyalty VIP Card Banner */}
        <div className="p-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-gray-900 via-gray-800 to-amber-950 p-6 text-white shadow-xl border border-amber-500/20">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-widest">
                  ISTIQLOL Club A'zosi
                </span>
                <h3 className="text-2xl font-black mt-1">GOLD VIP TIER</h3>
              </div>
              <IstiqlolLogo className="w-12 h-12 drop-shadow-[0_0_12px_rgba(0,255,100,0.6)]" />
            </div>

            <div className="mt-6 flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-400 font-medium">{t('yourPoints')}</p>
                <p className="text-3xl font-black text-amber-400">
                  {loyaltyPoints.toLocaleString()} <span className="text-sm text-white">pts</span>
                </p>
              </div>
              <div className="text-right">
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black px-3 py-1 rounded-full">
                  5% Cashback
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-800 mt-6 pb-2">
            {[
              { id: 'loyalty', label: 'Sovrinlar Do\'koni' },
              { id: 'history', label: t('orderHistory') }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  activeTab === tab.id
                    ? 'bg-evos-600 text-white'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab: Loyalty Rewards */}
          {activeTab === 'loyalty' && (
            <div className="mt-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Ballaringizni taomlarga almashtiring:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {loyaltyRewards.map(rew => (
                  <div
                    key={rew.id}
                    className="flex items-center space-x-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700"
                  >
                    <img
                      src={rew.image}
                      alt={rew.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-extrabold text-gray-900 dark:text-white truncate">
                        {rew.name}
                      </h5>
                      <p className="text-xs font-black text-amber-600">
                        ⭐ {rew.points.toLocaleString()} ball
                      </p>
                      <button
                        type="button"
                        onClick={() => handleRedeemReward(rew)}
                        className="mt-1 bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-[10px] px-2.5 py-1 rounded-lg active:scale-95 transition-transform"
                      >
                        Olish
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Order History */}
          {activeTab === 'history' && (
            <div className="mt-5 space-y-3">
              {orders.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-8">{t('noOrdersYet')}</p>
              ) : (
                orders.map(order => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-2"
                  >
                    <div className="flex justify-between items-center text-xs font-black">
                      <span className="text-gray-900 dark:text-white">#{order.id}</span>
                      <span className="text-gray-400 font-normal">{order.date}</span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-xs font-black text-evos-600">{formatUZS(order.total)}</span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        {order.status === 5 ? 'Yetkazildi' : 'Jarayonda'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};


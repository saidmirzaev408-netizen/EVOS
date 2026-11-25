import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';
import { formatUZS } from '../utils/formatters';

export const LoyaltyProfileModal = () => {
  const {
    isProfileOpen, setIsProfileOpen,
    setIsLoyaltyOpen,
    user, updateUserProfile, loyaltyPoints,
    orders, products, favorites, toggleFavorite,
    addToCart, setActiveTrackingOrder, setIsTrackingOpen,
    showToast, t, lang, logoutUser
  } = useApp();

  const [activeTab, setActiveTab] = useState('account'); // 'account' | 'orders' | 'favorites'
  const [formData, setFormData] = useState({
    name: user.name || '',
    phone: user.phone || '',
    address: user.address || '',
    birthday: user.birthday || ''
  });

  useEffect(() => {
    if (isProfileOpen) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        birthday: user.birthday || ''
      });
    }
  }, [isProfileOpen, user]);

  if (!isProfileOpen) return null;

  const initials = (user.name || 'M')
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const favoriteProducts = (products || []).filter(p => (favorites || []).includes(p.id));

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Iltimos, ismingizni kiriting', 'info');
      return;
    }
    updateUserProfile({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      birthday: formData.birthday
    });
  };

  const handleTrackOrder = (order) => {
    setActiveTrackingOrder(order);
    setIsProfileOpen(false);
    setIsTrackingOpen(true);
  };

  const switchToLoyalty = () => {
    setIsProfileOpen(false);
    setIsLoyaltyOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={() => setIsProfileOpen(false)}
    >
      <div
        className="bg-white dark:bg-[#180A0F] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E7D3D8] dark:border-[#4E1726]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Burgundy Profile Hero */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#5A0E22] via-[#7A132D] to-[#2B0812] p-6 text-white">
          <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-[#F3BE53]/15 blur-2xl pointer-events-none" />

          <div className="relative flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F3BE53] to-[#C88418] text-[#1E0910] font-black text-2xl flex items-center justify-center shadow-xl border-2 border-white/25">
                  {initials}
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#5A0E22]" title="Faol" />
              </div>
              <div>
                <span className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-[#F3BE53] bg-black/25 px-2.5 py-0.5 rounded-full border border-[#F3BE53]/30">
                  Shaxsiy Kabinet
                </span>
                <h2 className="text-xl sm:text-2xl font-black mt-1 leading-tight">{user.name || 'Foydalanuvchi'}</h2>
                <p className="text-xs text-rose-100/80 font-medium mt-0.5">{user.phone}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsProfileOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Yopish"
            >
              <Icon name="x" className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Account Stats */}
          <div className="relative grid grid-cols-3 gap-2.5 mt-5">
            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className="text-left p-3 rounded-2xl bg-black/25 hover:bg-black/35 border border-white/10 transition-colors"
            >
              <p className="text-[11px] text-rose-100/75 font-semibold">Buyurtmalar</p>
              <p className="text-lg font-black text-white mt-0.5">📦 {orders.length}</p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('favorites')}
              className="text-left p-3 rounded-2xl bg-black/25 hover:bg-black/35 border border-white/10 transition-colors"
            >
              <p className="text-[11px] text-rose-100/75 font-semibold">Sevimlilar</p>
              <p className="text-lg font-black text-white mt-0.5">❤️ {favoriteProducts.length}</p>
            </button>

            <button
              type="button"
              onClick={switchToLoyalty}
              className="text-left p-3 rounded-2xl bg-[#F3BE53]/15 hover:bg-[#F3BE53]/25 border border-[#F3BE53]/40 transition-colors"
              title="Bonus bo'limiga o'tish"
            >
              <p className="text-[11px] text-[#F3BE53] font-semibold">Bonus ballar →</p>
              <p className="text-lg font-black text-[#F3BE53] mt-0.5">⭐ {loyaltyPoints.toLocaleString()}</p>
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {/* Navigation Tabs */}
          <div className="flex space-x-1.5 p-1 rounded-2xl bg-[#F6ECEE] dark:bg-[#250D15] border border-[#E7D3D8] dark:border-[#4E1726]">
            {[
              { id: 'account', label: '👤 Ma\'lumotlarim' },
              { id: 'orders', label: `📦 Buyurtmalar (${orders.length})` },
              { id: 'favorites', label: `❤️ Sevimlilar (${favoriteProducts.length})` }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#9B1832] text-white shadow-md shadow-[#9B1832]/30'
                    : 'text-[#6D4752] dark:text-gray-400 hover:text-[#1E0910] dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Personal Info Editor */}
          {activeTab === 'account' && (
            <form onSubmit={handleSaveProfile} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                    Ism va familiya
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ismingiz"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#250D15] border border-gray-200 dark:border-[#4E1726] text-sm font-bold text-[#1E0910] dark:text-white focus:outline-none focus:border-[#9B1832]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                    Telefon raqam
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+998 90 123 45 67"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#250D15] border border-gray-200 dark:border-[#4E1726] text-sm font-bold text-[#1E0910] dark:text-white focus:outline-none focus:border-[#9B1832]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                  Yetkazib berish manzili
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Shahar, tuman, ko'cha, uy raqami..."
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#250D15] border border-gray-200 dark:border-[#4E1726] text-sm font-bold text-[#1E0910] dark:text-white focus:outline-none focus:border-[#9B1832]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                    Tug'ilgan sana (🎂 sovg'a uchun)
                  </label>
                  <input
                    type="date"
                    value={formData.birthday}
                    onChange={(e) => setFormData(prev => ({ ...prev, birthday: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#250D15] border border-gray-200 dark:border-[#4E1726] text-sm font-bold text-[#1E0910] dark:text-white focus:outline-none focus:border-[#9B1832]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#9B1832] to-[#BA1D3D] hover:brightness-110 text-white font-black text-sm shadow-lg shadow-[#9B1832]/30 active:scale-95 transition-all"
                >
                  O'zgarishlarni saqlash ✓
                </button>
              </div>
            </form>
          )}

          {/* Tab 2: Order History */}
          {activeTab === 'orders' && (
            <div className="mt-5 space-y-3">
              {orders.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-3xl mb-2">📦</p>
                  <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    {t('noOrdersYet') || 'Hozircha buyurtmalar tarixi bo\'sh'}
                  </p>
                </div>
              ) : (
                orders.map(order => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl bg-gray-50 dark:bg-[#230C14] border border-gray-200 dark:border-[#4E1726] space-y-2.5"
                  >
                    <div className="flex justify-between items-center text-xs font-black">
                      <span className="text-[#1E0910] dark:text-white">Buyurtma #{order.id}</span>
                      <span className="text-gray-400 font-medium">{order.date}</span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      {order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                    </div>
                    <div className="flex justify-between items-center pt-2.5 border-t border-gray-200 dark:border-[#3D1422]">
                      <span className="text-sm font-black text-[#9B1832] dark:text-[#F3BE53]">
                        {formatUZS(order.total)}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                          {order.status === 5 ? '✓ Yetkazildi' : '⏳ Jarayonda'}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleTrackOrder(order)}
                          className="text-[11px] font-black px-2.5 py-1 rounded-lg bg-[#9B1832]/15 text-[#9B1832] dark:text-[#F3BE53] hover:bg-[#9B1832]/25 transition-colors"
                        >
                          Kuzatish
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 3: Favorite Foods */}
          {activeTab === 'favorites' && (
            <div className="mt-5">
              {favoriteProducts.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-3xl mb-2">❤️</p>
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-300">Sevimli taomlar hozircha yo'q</p>
                  <p className="text-xs text-gray-400 mt-1">Menyudan yoqtirgan taomlaringizga yurakcha bosing!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {favoriteProducts.map(item => {
                    const itemName = typeof item.name === 'object' ? (item.name[lang] || item.name.uz) : item.name;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3 p-3 rounded-2xl bg-gray-50 dark:bg-[#230C14] border border-gray-200 dark:border-[#4E1726]"
                      >
                        <img
                          src={item.image}
                          alt={itemName}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-black text-[#1E0910] dark:text-white truncate">{itemName}</h5>
                          <p className="text-xs font-black text-[#9B1832] dark:text-[#F3BE53] mt-0.5">
                            {formatUZS(item.price)}
                          </p>
                          <div className="flex items-center space-x-2 mt-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                addToCart(item);
                                showToast(`${itemName} savatga qo'shildi 🛍️`);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#9B1832] text-white text-[10px] font-black hover:brightness-110 active:scale-95 transition-all"
                            >
                              + Savatga
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleFavorite(item.id)}
                              className="px-2 py-1 rounded-lg bg-red-500/10 text-red-500 text-[10px] font-bold hover:bg-red-500/20"
                              title="Sevimlilardan olib tashlash"
                            >
                              O'chirish
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Footer Logout Row */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-[#4E1726] flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Faol hisob: <strong className="text-[#1E0910] dark:text-white">{user.phone}</strong>
            </span>
            <button
              type="button"
              onClick={logoutUser}
              className="text-xs font-black text-red-600 dark:text-red-400 hover:text-white bg-red-500/10 hover:bg-red-600 flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-red-500/25 transition-all active:scale-95"
            >
              <Icon name="logout" className="w-3.5 h-3.5" />
              <span>Hisobdan chiqish</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

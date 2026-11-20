import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';
import { IstiqlolLogo } from './IstiqlolLogo';
import { formatUZS } from '../utils/formatters';

export const AdminDashboard = () => {
  const {
    products, orders, updateOrderStatus,
    addProduct, updateProduct, deleteProduct,
    setAppMode, t, branchesData, samplePromoCodes
  } = useApp();

  const [adminTab, setAdminTab] = useState('dashboard');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form fields
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('lavash');
  const [newPrice, setNewPrice] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('');

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const created = {
      id: `custom-${Date.now()}`,
      category: newCategory,
      name: { uz: newTitle, ru: newTitle, en: newTitle },
      description: { uz: newDesc, ru: newDesc, en: newDesc },
      price: Number(newPrice) || 30000,
      image: newImage || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      calories: '500 kcal',
      weight: '300g',
      rating: 4.8,
      reviewsCount: 1,
      badge: 'New',
      spicy: false,
      isPopular: true
    };
    addProduct(created);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewPrice('');
    setNewDesc('');
    setNewImage('');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 pb-16">
      
      {/* Admin Header */}
      <div className="bg-gray-900 text-white px-6 py-4 border-b border-gray-800 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <IstiqlolLogo className="w-10 h-10 drop-shadow-[0_0_10px_rgba(0,255,100,0.6)]" />
          <div>
            <h1 className="text-lg font-black tracking-tight">{t('adminTitle')}</h1>
            <p className="text-xs text-gray-400">{t('adminSubtitle')}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setAppMode('client')}
          className="bg-evos-600 hover:bg-evos-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-md transition-all flex items-center space-x-1.5"
        >
          <span>←</span>
          <span>{t('clientApp')}</span>
        </button>
      </div>

      {/* Admin Navigation Sub-bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'dashboard', label: t('tabDashboard'), icon: '📊' },
            { id: 'orders', label: `${t('tabOrders')} (${orders.length})`, icon: '📦' },
            { id: 'products', label: `${t('tabProducts')} (${products.length})`, icon: '🍔' },
            { id: 'branches', label: t('tabBranches'), icon: '🏪' },
            { id: 'promos', label: t('tabPromos'), icon: '🏷️' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setAdminTab(tab.id)}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                adminTab === tab.id
                  ? 'bg-gray-900 text-white dark:bg-amber-500 dark:text-gray-950 shadow'
                  : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* TAB: DASHBOARD OVERVIEW */}
        {adminTab === 'dashboard' && (
          <div className="space-y-8">
            
            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('totalOrders')}</p>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white">1 428</h3>
                <p className="text-[11px] text-emerald-600 font-bold">↑ +14.2% o'tgan haftaga nisbatan</p>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('todayRevenue')}</p>
                <h3 className="text-3xl font-black text-evos-600">18 450 000 UZS</h3>
                <p className="text-[11px] text-emerald-600 font-bold">↑ +8.5% reja bajarildi</p>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('monthlyRevenue')}</p>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white">420 800 000 UZS</h3>
                <p className="text-[11px] text-emerald-600 font-bold">Rekord oylik ko'rsatkich</p>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('totalUsers')}</p>
                <h3 className="text-3xl font-black text-amber-500">3 892</h3>
                <p className="text-[11px] text-emerald-600 font-bold">+124 yangi mijoz bugun</p>
              </div>
            </div>

            {/* SVG Revenue Interactive Trend Chart */}
            <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-gray-900 dark:text-white">Haftalik Tushum Dinamikasi</h3>
                  <p className="text-xs text-gray-400">Oxirgi 7 kunlik buyurtmalar statistikasi</p>
                </div>
                <span className="text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full">
                  O'sish sur'ati: +22%
                </span>
              </div>

              <div className="h-64 w-full">
                <svg className="w-full h-full" viewBox="0 0 700 220">
                  <defs>
                    <linearGradient id="adminGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00A859" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00A859" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="url(#adminGrad)"
                    stroke="#00A859"
                    strokeWidth="3.5"
                    points="
                      20,180
                      120,150
                      220,165
                      320,110
                      420,130
                      520,70
                      650,40
                      650,220
                      20,220
                    "
                  />
                  {[
                    { x: 20, y: 180, label: 'Dush' },
                    { x: 120, y: 150, label: 'Sesh' },
                    { x: 220, y: 165, label: 'Chor' },
                    { x: 320, y: 110, label: 'Pay' },
                    { x: 420, y: 130, label: 'Juma' },
                    { x: 520, y: 70, label: 'Shan' },
                    { x: 650, y: 40, label: 'Yak' }
                  ].map((pt, idx) => (
                    <g key={idx}>
                      <circle cx={pt.x} cy={pt.y} r="5" fill="#00A859" stroke="#ffffff" strokeWidth="2" />
                      <text x={pt.x} y="210" textAnchor="middle" fill="#888888" fontSize="11" fontWeight="bold">
                        {pt.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Best Selling Products */}
            <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
              <h3 className="text-base font-black text-gray-900 dark:text-white">Eng ko'p sotilgan taomlar</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {products.slice(0, 3).map((p, idx) => (
                  <div key={p.id} className="flex items-center space-x-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800">
                    <span className="w-8 h-8 rounded-full bg-amber-400 text-gray-950 font-black flex items-center justify-center text-sm">
                      #{idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black truncate">{p.name.uz}</p>
                      <p className="text-[11px] text-gray-500">{formatUZS(p.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB: ORDERS QUEUE */}
        {adminTab === 'orders' && (
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-black text-gray-900 dark:text-white">Mavjud Buyurtmalar Nazorati</h3>
              <span className="text-xs text-gray-500">Holatni o'zgartirish orqali mijozga xabar yuboriladi</span>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 dark:bg-gray-800/60 uppercase font-black text-gray-400 border-b border-gray-200 dark:border-gray-800">
                    <tr>
                      <th className="p-4">ID & Sana</th>
                      <th className="p-4">Taomlar</th>
                      <th className="p-4">Summasi</th>
                      <th className="p-4">Manzil</th>
                      <th className="p-4">To'lov</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
                        <td className="p-4 font-black">
                          <div>#{order.id}</div>
                          <div className="text-[10px] text-gray-400 font-normal">{order.date}</div>
                        </td>
                        <td className="p-4 max-w-xs">
                          {order.items.map((i, idx) => (
                            <div key={idx} className="truncate">
                              {i.name} <span className="text-gray-400 font-bold">x{i.quantity}</span>
                            </div>
                          ))}
                        </td>
                        <td className="p-4 font-black text-evos-600">
                          {formatUZS(order.total)}
                        </td>
                        <td className="p-4 text-gray-500 max-w-xs truncate">
                          {order.address}
                        </td>
                        <td className="p-4 uppercase font-bold text-gray-500">
                          {order.paymentMethod}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                            order.status === 5
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : order.status === 4
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          }`}>
                            {order.status === 1 && '1. Qabul qilindi'}
                            {order.status === 2 && '2. Tayyorlanmoqda'}
                            {order.status === 3 && '3. Qadoqlandi'}
                            {order.status === 4 && '4. Kuryer yo\'lda'}
                            {order.status === 5 && '5. Yetkazildi'}
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, Number(e.target.value))}
                            className="text-xs p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-bold"
                          >
                            <option value="1">1. Qabul qilindi</option>
                            <option value="2">2. Tayyorlanmoqda</option>
                            <option value="3">3. Qadoqlandi</option>
                            <option value="4">4. Kuryer yo'lda</option>
                            <option value="5">5. Yetkazildi</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: PRODUCTS MANAGEMENT */}
        {adminTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white">Menyudagi Taomlar Boshqaruvi</h3>
                <p className="text-xs text-gray-500">Yangi taom qo'shish, narxini o'zgartirish yoki menyudan o'chirish</p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="bg-evos-600 hover:bg-evos-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow flex items-center space-x-1.5"
              >
                <span>+</span>
                <span>{t('addNewProduct')}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(p => (
                <div
                  key={p.id}
                  className="p-4 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex items-center space-x-3.5"
                >
                  <img
                    src={p.image}
                    alt={p.name.uz}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=400&q=80';
                    }}
                    className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase text-evos-600">{p.category}</span>
                    <h4 className="text-xs font-black truncate">{p.name.uz}</h4>
                    <p className="text-xs font-extrabold text-gray-900 dark:text-white">{formatUZS(p.price)}</p>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        const newPriceVal = prompt('Yangi narxni kiriting (UZS):', p.price);
                        if (newPriceVal) {
                          updateProduct({ ...p, price: Number(newPriceVal) });
                        }
                      }}
                      className="p-1.5 text-xs text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg font-bold"
                      title="Narxni o'zgartirish"
                    >
                      Tahrirlash
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Rostdan ham "${p.name.uz}" taomini o'chirmoqchimisiz?`)) {
                          deleteProduct(p.id);
                        }
                      }}
                      className="p-1.5 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg font-bold"
                      title="O'chirish"
                    >
                      O'chirish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: BRANCHES & PROMOS PREVIEWS */}
        {adminTab === 'branches' && (
          <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-base font-black mb-4">EVOS Restoran Filiallari (Barchasi Faol)</h3>
            <div className="space-y-3">
              {branchesData.map(b => (
                <div key={b.id} className="flex justify-between items-center p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 text-xs font-bold">
                  <div>
                    <p className="text-sm font-black">{b.name.uz}</p>
                    <p className="text-gray-500 font-normal">{b.address.uz}</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs">
                    Ishlamoqda (24/7)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {adminTab === 'promos' && (
          <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-base font-black mb-4">Faol Promokodlar va Chegirmalar</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {samplePromoCodes.map((p, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black text-evos-600">{p.code}</span>
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Faol</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{p.description}</p>
                  <p className="text-[11px] text-gray-400 mt-2 font-semibold">Min buyurtma: {formatUZS(p.minOrder)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ADD PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-black text-gray-900 dark:text-white">Yangi Taom Qo'shish</h3>
              <button type="button" onClick={() => setIsAddModalOpen(false)}>
                <Icon name="x" className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-500 block mb-1">Nomi</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Masalan: Mini Tandir Lavash"
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="font-bold text-gray-500 block mb-1">Kategoriya</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                >
                  <option value="lavash">Lavash</option>
                  <option value="burgers">Burgerlar</option>
                  <option value="shawarma">Shaurma</option>
                  <option value="hotdogs">Xot-doglar</option>
                  <option value="pizza">Pitsa</option>
                  <option value="fries">Fri va Gazaklar</option>
                  <option value="chicken">Tovuq</option>
                  <option value="drinks">Ichimliklar</option>
                  <option value="desserts">Desertlar</option>
                  <option value="combos">Kombolar</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-gray-500 block mb-1">Narxi (UZS)</label>
                <input
                  type="number"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="35000"
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="font-bold text-gray-500 block mb-1">Tavsifi</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Tarkibi, go'shti, souslari..."
                  rows="2"
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                ></textarea>
              </div>
              <div>
                <label className="font-bold text-gray-500 block mb-1">Rasm URL manzili</label>
                <input
                  type="url"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold"
                >
                  Bekor
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-evos-600 hover:bg-evos-700 text-white font-black"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};


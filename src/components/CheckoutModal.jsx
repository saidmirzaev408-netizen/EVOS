import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';
import { formatUZS } from '../utils/formatters';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen, setIsCheckoutOpen,
    grandTotal, user, placeOrder,
    loyaltyPoints, setLoyaltyPoints, t,
    branchesData, activeTable,
    deliveryLocation, setIsLocationModalOpen
  } = useApp();

  if (!isCheckoutOpen) return null;

  const isTableActive = activeTable && activeTable.active;

  const [orderType, setOrderType] = useState(isTableActive ? 'table' : 'delivery');
  const [fullName, setFullName] = useState(user.name);
  const [phoneNumber, setPhoneNumber] = useState(user.phone);
  const [city, setCity] = useState(deliveryLocation?.city || 'Toshkent');
  const [street, setStreet] = useState(deliveryLocation?.street || '9-mavze, 24-uy');
  const [apartment, setApartment] = useState(deliveryLocation?.apartment || '15');
  const [entrance, setEntrance] = useState('2');
  const [floor, setFloor] = useState('4');
  const [doorCode, setDoorCode] = useState('15K');
  const [selectedBranchId, setSelectedBranchId] = useState('br-1');
  const [paymentMethod, setPaymentMethod] = useState(isTableActive ? 'waiter' : 'payme');
  const [useCoins, setUseCoins] = useState(false);
  const [notes, setNotes] = useState('');
  const [cutlery, setCutlery] = useState(true);

  // Sync when deliveryLocation updates from LocationModal
  useEffect(() => {
    if (deliveryLocation?.city) setCity(deliveryLocation.city);
    if (deliveryLocation?.street) setStreet(deliveryLocation.street);
    if (deliveryLocation?.apartment) setApartment(deliveryLocation.apartment);
  }, [deliveryLocation]);

  const coinDeduction = useCoins ? Math.min(loyaltyPoints, 20000) : 0;
  const finalCheckoutTotal = Math.max(0, grandTotal - coinDeduction);

  const handleSubmit = (e) => {
    e.preventDefault();
    const branchObj = branchesData.find(b => b.id === selectedBranchId) || branchesData[0];

    if (orderType === 'table') {
      placeOrder({
        type: 'table',
        isTableOrder: true,
        tableNumber: activeTable?.number || 12,
        branch: activeTable?.branch || 'Chilonzor',
        fullName,
        phone: phoneNumber,
        address: `Restoranda / #${activeTable?.number || 12}-stol (${activeTable?.branch || 'Chilonzor'} filiali)`,
        paymentMethod,
        notes,
        cutlery
      });
    } else {
      placeOrder({
        type: orderType,
        isTableOrder: false,
        fullName,
        phone: phoneNumber,
        address: orderType === 'delivery'
          ? (deliveryLocation?.address || `${city}, ${street}, kv.${apartment}`)
          : `Filialdan olib ketish: ${branchObj.name.uz}`,
        branch: branchObj.name.uz,
        paymentMethod,
        notes,
        cutlery
      });
    }

    if (useCoins && coinDeduction > 0) {
      setLoyaltyPoints(prev => prev - coinDeduction);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#1C1F18] text-[#F4F5F2] rounded-[32px] max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#353B2F]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#2C3227] flex items-center justify-between sticky top-0 bg-[#1C1F18]/95 backdrop-blur-md z-10">
          <div className="flex items-center space-x-2.5">
            <span className="w-8 h-8 rounded-full bg-[#F3BE53]/20 text-[#F3BE53] flex items-center justify-center font-black text-sm">
              ✓
            </span>
            <div>
              <h2 className="text-xl font-black text-white">
                {t('checkoutTitle')}
              </h2>
              {isTableActive && (
                <p className="text-[11px] text-[#F3BE53] font-bold">
                  🍽️ #{activeTable.number}-stol ({activeTable.branch} filiali)
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsCheckoutOpen(false)}
            className="w-8 h-8 rounded-full bg-[#242820] text-gray-400 hover:text-white flex items-center justify-center"
          >
            <Icon name="x" className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
          
          {/* Order Type Tabs: Table, Delivery, or Pickup */}
          <div className={`grid ${isTableActive ? 'grid-cols-3' : 'grid-cols-2'} gap-2 p-1.5 bg-[#23271E] rounded-2xl border border-[#32382B]`}>
            {isTableActive && (
              <button
                type="button"
                onClick={() => setOrderType('table')}
                className={`py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center space-x-1.5 transition-all ${
                  orderType === 'table'
                    ? 'bg-[#F3BE53] text-[#131512] shadow-md font-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>🍽️</span>
                <span>#{activeTable.number}-stolda</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setOrderType('delivery')}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center space-x-2 transition-all ${
                orderType === 'delivery'
                  ? 'bg-[#F3BE53] text-[#131512] shadow-md font-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon name="truck" className="w-4 h-4" />
              <span>{t('deliveryOption')}</span>
            </button>

            <button
              type="button"
              onClick={() => setOrderType('pickup')}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center space-x-2 transition-all ${
                orderType === 'pickup'
                  ? 'bg-[#F3BE53] text-[#131512] shadow-md font-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon name="map-pin" className="w-4 h-4" />
              <span>{t('pickupOption')}</span>
            </button>
          </div>

          {/* Recipient Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">
              {t('recipientInfo')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-400 mb-1 block">{t('fullName')}</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs font-semibold p-3 rounded-xl border border-[#353B2F] bg-[#23271E] text-white focus:outline-none focus:border-[#F3BE53]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 mb-1 block">{t('phoneNumber')}</label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full text-xs font-semibold p-3 rounded-xl border border-[#353B2F] bg-[#23271E] text-white focus:outline-none focus:border-[#F3BE53]"
                />
              </div>
            </div>
          </div>

          {/* Address, Branch, or Table Selection */}
          {orderType === 'table' ? (
            <div className="p-4 bg-[#23271E] rounded-2xl border border-[#353B2F] text-xs text-gray-200 space-y-2">
              <div className="flex items-center space-x-2 font-black text-sm text-[#F3BE53]">
                <span className="text-lg">🍽️</span>
                <span>Restoranda xizmat ko'rsatish: #{activeTable?.number || 12}-stol</span>
              </div>
              <p className="text-gray-300">
                Filial: <strong className="text-white">{activeTable?.branch || 'Chilonzor'} filiali</strong>. Buyurtmangiz oshxonaga qabul qilinadi va oshpazlar tayyorlagach, ofitsiant to'g'ridan-to'g'ri stolingizga olib keladi.
              </p>
              <div className="text-[11px] text-[#00A859] font-extrabold flex items-center space-x-1">
                <span>✓ Xizmat haqi va yetkazish: BEPUL (0 UZS)</span>
              </div>
            </div>
          ) : orderType === 'delivery' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">
                  {t('deliveryAddress')}
                </h3>
                {/* Location modal trigger */}
                <button
                  type="button"
                  onClick={() => setIsLocationModalOpen(true)}
                  className="text-xs text-[#F3BE53] font-bold hover:underline flex items-center space-x-1"
                >
                  <Icon name="map-pin" className="w-3.5 h-3.5 text-[#F3BE53]" />
                  <span>Manzilni o'zgartirish</span>
                </button>
              </div>

              {/* Active Location Banner */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#23271E] border border-[#3A4234]">
                <div className="flex items-center space-x-2.5 truncate">
                  <span className="text-lg">📍</span>
                  <div className="truncate">
                    <p className="text-xs font-black text-white truncate">
                      {deliveryLocation?.address || `${city}, ${street}`}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Tezkor yetkazish: 25-35 daqiqa
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLocationModalOpen(true)}
                  className="px-3 py-1 rounded-xl bg-[#F3BE53] text-[#131512] text-xs font-black flex-shrink-0 ml-2"
                >
                  Tanlash
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">{t('apartment')}</label>
                  <input
                    type="text"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    className="w-full text-xs font-semibold p-2.5 rounded-xl border border-[#353B2F] bg-[#23271E] text-white focus:outline-none focus:border-[#F3BE53]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">{t('entrance')}</label>
                  <input
                    type="text"
                    value={entrance}
                    onChange={(e) => setEntrance(e.target.value)}
                    className="w-full text-xs font-semibold p-2.5 rounded-xl border border-[#353B2F] bg-[#23271E] text-white focus:outline-none focus:border-[#F3BE53]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">{t('floor')}</label>
                  <input
                    type="text"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    className="w-full text-xs font-semibold p-2.5 rounded-xl border border-[#353B2F] bg-[#23271E] text-white focus:outline-none focus:border-[#F3BE53]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">{t('doorCode')}</label>
                  <input
                    type="text"
                    value={doorCode}
                    onChange={(e) => setDoorCode(e.target.value)}
                    className="w-full text-xs font-semibold p-2.5 rounded-xl border border-[#353B2F] bg-[#23271E] text-white focus:outline-none focus:border-[#F3BE53]"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">
                {t('selectPickupBranch')}
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {branchesData.map(br => (
                  <div
                    key={br.id}
                    onClick={() => setSelectedBranchId(br.id)}
                    className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-colors ${
                      selectedBranchId === br.id
                        ? 'border-[#F3BE53] bg-[#282E22] text-[#F3BE53]'
                        : 'border-[#353B2F] bg-[#23271E] hover:bg-[#2A2F25] text-gray-300'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-black text-white">{br.name.uz}</p>
                      <p className="text-[11px] text-gray-400">{br.address.uz}</p>
                      <p className="text-[10px] text-[#00A859] font-bold mt-0.5">Ish vaqti: {br.workingHours}</p>
                    </div>
                    <input
                      type="radio"
                      name="branch"
                      checked={selectedBranchId === br.id}
                      onChange={() => setSelectedBranchId(br.id)}
                      className="accent-[#F3BE53]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Methods */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">
              {t('paymentMethod')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                ...(orderType === 'table' ? [{ id: 'waiter', name: 'Ofitsiantga', icon: '🤵' }] : []),
                { id: 'payme', name: 'Payme', icon: '💳' },
                { id: 'click', name: 'Click', icon: '📱' },
                { id: 'uzum', name: 'Uzum Bank', icon: '🍇' },
                ...(orderType !== 'table' ? [{ id: 'cash', name: 'Naqd Pul', icon: '💵' }] : [])
              ].map(pm => (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setPaymentMethod(pm.id)}
                  className={`p-3 rounded-2xl border text-xs font-extrabold flex flex-col items-center justify-center space-y-1 transition-all ${
                    paymentMethod === pm.id
                      ? 'border-[#F3BE53] bg-[#282E22] text-[#F3BE53] ring-1 ring-[#F3BE53]'
                      : 'border-[#353B2F] bg-[#23271E] text-gray-300 hover:bg-[#2A2F25]'
                  }`}
                >
                  <span className="text-xl">{pm.icon}</span>
                  <span>{pm.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Loyalty Bonus Points Checkbox */}
          {loyaltyPoints > 0 && (
            <div className="p-3.5 bg-[#2A2617] rounded-2xl border border-[#F3BE53]/30 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <input
                  type="checkbox"
                  id="useCoins"
                  checked={useCoins}
                  onChange={(e) => setUseCoins(e.target.checked)}
                  className="rounded accent-[#F3BE53] w-4 h-4"
                />
                <label htmlFor="useCoins" className="text-xs font-bold text-amber-200 cursor-pointer">
                  ⭐ ISTIQLOL Coins ishlatish (Mavjud: {loyaltyPoints.toLocaleString()} ball)
                </label>
              </div>
              {useCoins && (
                <span className="text-xs font-black text-[#F3BE53]">
                  -{formatUZS(coinDeduction)}
                </span>
              )}
            </div>
          )}

          {/* Order Notes & Utensils */}
          <div className="space-y-2">
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Oshpaz yoki kuryer uchun maxsus izoh..."
              className="w-full text-xs p-3 rounded-xl border border-[#353B2F] bg-[#23271E] text-white focus:outline-none focus:border-[#F3BE53] placeholder-gray-500"
            />
            <label className="flex items-center space-x-2 text-xs font-semibold text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={cutlery}
                onChange={(e) => setCutlery(e.target.checked)}
                className="rounded accent-[#F3BE53]"
              />
              <span>{t('cutleryReq')}</span>
            </label>
          </div>

          {/* Bottom Grand Total & Place Order Button */}
          <div className="pt-4 border-t border-[#2C3227] flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-semibold">{t('total')}</p>
              <p className="text-xl sm:text-2xl font-black text-white">{formatUZS(finalCheckoutTotal)}</p>
            </div>

            <button
              type="submit"
              className="bg-[#F3BE53] hover:bg-[#E5A934] text-[#131512] font-black text-sm px-8 py-3.5 rounded-full shadow-xl shadow-[#F3BE53]/25 active:scale-95 transition-transform"
            >
              {orderType === 'table' ? `Stol #${activeTable?.number || 12} ga buyurtma berish` : t('placeOrder')}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

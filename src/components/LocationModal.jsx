import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';

export const LocationModal = () => {
  const {
    isLocationModalOpen,
    setIsLocationModalOpen,
    deliveryLocation,
    setDeliveryLocation,
    showToast,
    lang
  } = useApp();

  if (!isLocationModalOpen) return null;

  const cities = [
    { id: 'Toshkent', name: '🏙️ Toshkent shahri & viloyati' },
    { id: 'Samarqand', name: '🏛️ Samarqand viloyati' },
    { id: 'Buxoro', name: '🕌 Buxoro viloyati' },
    { id: 'Andijon', name: '🌸 Andijon viloyati' },
    { id: 'Farg\'ona', name: '🍇 Farg\'ona viloyati' },
    { id: 'Namangan', name: '🌺 Namangan viloyati' },
    { id: 'Xorazm', name: '🏺 Xorazm viloyati (Urganch)' },
    { id: 'Qashqadaryo', name: '🐎 Qashqadaryo viloyati (Qarshi)' },
    { id: 'Surxondaryo', name: '☀️ Surxondaryo viloyati (Termiz)' },
    { id: 'Jizzax', name: '⛰️ Jizzax viloyati' },
    { id: 'Navoiy', name: '🏭 Navoiy viloyati' },
    { id: 'Sirdaryo', name: '🌊 Sirdaryo viloyati (Guliston)' },
    { id: 'Qoraqalpog\'iston', name: '🌾 Qoraqalpog\'iston Respublikasi (Nukus)' }
  ];

  const districtsTashkent = [
    'Chilonzor',
    'Yunusobod',
    'Mirzo Ulug\'bek',
    'Mirobod',
    'Sergeli',
    'Shayxontohur',
    'Yakkasaroy',
    'Yashnobod',
    'Olmazor',
    'Uchtepa'
  ];

  const branches = [
    { name: 'Chilonzor-9 filiali', district: 'Chilonzor', street: 'Qatortol ko\'chasi, 24' },
    { name: 'Yunusobod Mega Planet', district: 'Yunusobod', street: 'Ahmad Donish ko\'chasi, 80' },
    { name: 'Buyuk Ipak Yo\'li', district: 'Mirzo Ulug\'bek', street: 'Buyuk Ipak Yo\'li, 112' },
    { name: 'Oybek filiali', district: 'Mirobod', street: 'Oybek ko\'chasi, 15' },
    { name: 'Samarqand Darvoza', district: 'Shayxontohur', street: 'Qoratosh ko\'chasi, 5A' },
    { name: 'Sergeli filiali', district: 'Sergeli', street: 'Yangi Sergeli ko\'chasi, 12' }
  ];

  const [selectedCity, setSelectedCity] = useState(deliveryLocation?.city || 'Toshkent');
  const [selectedDistrict, setSelectedDistrict] = useState(deliveryLocation?.district || 'Chilonzor');
  const [streetAddress, setStreetAddress] = useState(deliveryLocation?.street || '9-mavze, 24-uy');
  const [apartment, setApartment] = useState(deliveryLocation?.apartment || '15');
  const [isLocating, setIsLocating] = useState(false);

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      setSelectedCity('Toshkent');
      setSelectedDistrict('Chilonzor');
      setStreetAddress('Qatortol ko\'chasi, 28/2-uy');
      showToast('Geo-joylashuv aniqlandi: Toshkent, Chilonzor', 'success');
    }, 900);
  };

  const handleSave = () => {
    const newLocation = {
      city: selectedCity,
      district: selectedDistrict,
      street: streetAddress,
      apartment: apartment,
      address: `${selectedCity}, ${selectedDistrict} tumani${streetAddress ? ', ' + streetAddress : ''}${apartment ? ', ' + apartment + '-xonadon' : ''}`,
      displayText: `${selectedCity}, ${selectedDistrict}`
    };

    setDeliveryLocation(newLocation);
    setIsLocationModalOpen(false);
    showToast(`Yetkazish manzili saqlandi: ${selectedCity}, ${selectedDistrict}`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#1C1F18] text-[#F4F5F2] rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#353B2F] p-5 sm:p-6 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2C3227] pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F3BE53]/15 flex items-center justify-center text-[#F3BE53]">
              <Icon name="map-pin" className="w-5 h-5 text-[#F3BE53]" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                Yetkazib berish manzilini tanlang
              </h3>
              <p className="text-xs text-gray-400">
                Buyurtmangiz aynan shu manzilga tezkor yetkaziladi
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="w-8 h-8 rounded-full bg-[#2A2F25] text-gray-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <Icon name="x" className="w-4 h-4" />
          </button>
        </div>

        {/* GPS Quick Button */}
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          disabled={isLocating}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-[#252A20] hover:bg-[#2C3227] border border-[#3A4234] text-xs font-black text-[#F3BE53] transition-all"
        >
          {isLocating ? (
            <span className="animate-spin">⏳</span>
          ) : (
            <Icon name="map-pin" className="w-4 h-4 text-[#F3BE53]" />
          )}
          <span>{isLocating ? 'Joylashuv aniqlanmoqda...' : '📍 Joriy joylashuvimni aniqlash (GPS)'}</span>
        </button>

        {/* City Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
            1. Shaharni tanlang
          </label>
          <div className="grid grid-cols-3 gap-2">
            {cities.map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCity(c.id)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all truncate border ${
                  selectedCity === c.id
                    ? 'bg-[#F3BE53] text-[#131512] border-[#F3BE53] shadow-md shadow-[#F3BE53]/20 font-black'
                    : 'bg-[#23271E] text-gray-300 border-[#32382B] hover:bg-[#2A2F25]'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* District Selector (for Tashkent) */}
        {selectedCity === 'Toshkent' && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
              2. Tumanni tanlang
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto pr-1">
              {districtsTashkent.map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDistrict(d)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border text-left truncate ${
                    selectedDistrict === d
                      ? 'bg-[#F3BE53] text-[#131512] border-[#F3BE53] font-black'
                      : 'bg-[#23271E] text-gray-300 border-[#32382B] hover:bg-[#2A2F25]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Address inputs */}
        <div className="space-y-3 bg-[#23271E] p-4 rounded-2xl border border-[#32382B]">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
            3. Ko'cha va xonadon
          </label>
          
          <div className="space-y-2">
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              placeholder="Masalan: Qatortol ko'chasi, 24-uy"
              className="w-full bg-[#181A15] border border-[#353B2F] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F3BE53]"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                placeholder="Xonadon / Ofis (ixtiyoriy)"
                className="w-full bg-[#181A15] border border-[#353B2F] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F3BE53]"
              />
              <div className="flex items-center text-[11px] text-gray-400 px-2">
                🛵 O'rtacha yetkazish: <strong className="text-[#F3BE53] ml-1">25-35 daqiqa</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Branch selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Yaqin ISTIQLOL Filiallari
          </label>
          <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
            {branches.map(b => (
              <button
                key={b.name}
                type="button"
                onClick={() => {
                  setSelectedCity('Toshkent');
                  setSelectedDistrict(b.district);
                  setStreetAddress(b.street);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#23271E] hover:bg-[#2A2F25] text-left text-xs transition-colors border border-[#32382B]"
              >
                <div>
                  <span className="font-bold text-white block">{b.name}</span>
                  <span className="text-[11px] text-gray-400">{b.street}</span>
                </div>
                <span className="text-[10px] bg-[#F3BE53]/20 text-[#F3BE53] px-2 py-0.5 rounded-full font-bold">
                  Tanlash
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Action button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#F3BE53] hover:bg-[#E5A934] text-[#131512] font-black text-sm tracking-wide shadow-lg shadow-[#F3BE53]/25 active:scale-[0.99] transition-transform flex items-center justify-center space-x-2"
          >
            <Icon name="check" className="w-4 h-4 text-[#131512]" />
            <span>Manzilni tasdiqlash</span>
          </button>
        </div>

      </div>
    </div>
  );
};

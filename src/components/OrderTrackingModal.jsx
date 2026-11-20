import React from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';

export const OrderTrackingModal = () => {
  const {
    isTrackingOpen, setIsTrackingOpen,
    activeTrackingOrder, updateOrderStatus,
    showToast, t, deliveryLocation
  } = useApp();

  if (!isTrackingOpen || !activeTrackingOrder) return null;

  const currentStage = activeTrackingOrder.status || 1;
  const isTable = Boolean(activeTrackingOrder.isTableOrder);
  const tableNum = activeTrackingOrder.tableNumber || 12;

  const stages = isTable ? [
    { id: 1, title: `Buyurtma qabul qilindi (#${tableNum}-stol)`, desc: 'EVOS oshxonasi stoldan berilgan buyurtmani tasdiqladi', icon: '📝', time: '14:05' },
    { id: 2, title: 'Oshpazlar tayyorlamoqda', desc: 'Somsa va issiq taomlar pechda pishirilmoqda', icon: '👨‍🍳', time: '14:08' },
    { id: 3, title: 'Podnosga terildi', desc: 'Issiq taomlar va yaxna moxito tayyorlandi', icon: '🍱', time: '14:14' },
    { id: 4, title: 'Ofitsiant olib kelmoqda', desc: `Ofitsiant taomni #${tableNum}-stol tomon keltirmoqda`, icon: '🤵', time: '14:17' },
    { id: 5, title: 'Stolga yetkazildi — Yoqimli ishtaha!', desc: 'Taomlaringiz stolingizda. EVOS bilan rohatlaning!', icon: '🎉', time: '14:20' }
  ] : [
    { id: 1, title: t('orderStatus1'), desc: t('orderStatus1Desc'), icon: '📝', time: '19:46' },
    { id: 2, title: t('orderStatus2'), desc: t('orderStatus2Desc'), icon: '👨‍🍳', time: '19:49' },
    { id: 3, title: t('orderStatus3'), desc: t('orderStatus3Desc'), icon: '📦', time: '19:58' },
    { id: 4, title: t('orderStatus4'), desc: t('orderStatus4Desc'), icon: '🛵', time: '20:05' },
    { id: 5, title: t('orderStatus5'), desc: t('orderStatus5Desc'), icon: '🎉', time: '20:18' }
  ];

  const advanceDemo = () => {
    const next = currentStage < 5 ? currentStage + 1 : 1;
    updateOrderStatus(activeTrackingOrder.id, next);
    showToast(`Buyurtma holati: ${stages[next - 1].title}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#1C1F18] text-[#F4F5F2] rounded-[32px] max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#353B2F]">
        
        {/* Header matching screenshot */}
        <div className="p-5 border-b border-[#2C3227] flex items-center justify-between sticky top-0 bg-[#1C1F18] z-10">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsTrackingOpen(false)}
              className="w-9 h-9 rounded-full bg-[#242820] text-gray-300 hover:text-white flex items-center justify-center"
            >
              <Icon name="x" className="w-4 h-4" />
            </button>
            <div>
              <span className="text-[10px] font-black uppercase text-[#F3BE53] tracking-wider">
                {isTable ? `🍽️ #${tableNum}-stol buyurtmasi` : 'Track your order (Kuzatuv)'}
              </span>
              <h2 className="text-base sm:text-lg font-black text-white">
                Buyurtma #{activeTrackingOrder.id}
              </h2>
            </div>
          </div>
          <button
            onClick={() => {
              showToast('Buyurtma kodi nusxalandi: #' + activeTrackingOrder.id, 'info');
            }}
            className="w-9 h-9 rounded-full bg-[#242820] text-gray-300 hover:text-white flex items-center justify-center text-xs font-bold"
          >
            •••
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          
          {/* Dark Map Visual with Gold Route Line (matching screenshot) */}
          <div className="relative h-56 rounded-3xl overflow-hidden bg-[#131512] border border-[#2F3528] shadow-inner flex items-center justify-center">
            {/* Dark map street grid effect */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#F3BE53_1px,transparent_1px)] [background-size:20px_20px]"></div>
            
            {/* Golden Route Path matching reference screenshot */}
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 400 220">
              {/* Background Road lines */}
              <path d="M 30 180 L 120 180 L 220 100 L 320 100 L 370 40" fill="none" stroke="#252A20" strokeWidth="14" strokeLinecap="round" />
              <path d="M 50 50 L 150 140 L 280 140 L 350 190" fill="none" stroke="#252A20" strokeWidth="10" strokeLinecap="round" />
              {/* Active Golden Glowing Courier Path */}
              <path d="M 60 170 Q 180 80 270 140 T 350 70" fill="none" stroke="#F3BE53" strokeWidth="5" strokeLinecap="round" strokeDasharray="8 6" className="animate-pulse" />
            </svg>

            {/* Restaurant Pin */}
            <div className="absolute left-10 bottom-6 flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-[#1C1F18] border-2 border-[#F3BE53] text-[#F3BE53] flex items-center justify-center shadow-lg font-black text-xs">
                🍽️
              </div>
              <span className="text-[9px] font-black text-white bg-black/80 px-2 py-0.5 rounded-full mt-1 border border-[#353B2F]">
                EVOS Filiali
              </span>
            </div>

            {/* Courier Delivery Icon on Map Route */}
            <div
              className="absolute flex flex-col items-center transition-all duration-700"
              style={{
                left: currentStage >= 4 ? '68%' : currentStage === 3 ? '42%' : '20%',
                top: currentStage >= 4 ? '35%' : currentStage === 3 ? '55%' : '65%'
              }}
            >
              <div className="w-10 h-10 rounded-full bg-[#F3BE53] text-[#131512] flex items-center justify-center shadow-xl text-lg animate-bounce border-2 border-white font-black">
                {isTable ? '🤵' : '🛵'}
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full mt-1 bg-[#F3BE53] text-[#131512] shadow-md">
                12 daqiqa
              </span>
            </div>

            {/* Destination Customer Pin */}
            <div className="absolute right-8 top-8 flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-[#00A859] text-white flex items-center justify-center shadow-lg font-black text-xs ring-4 ring-[#00A859]/30 animate-pulse">
                📍
              </div>
              <span className="text-[9px] font-black text-white bg-black/80 px-2 py-0.5 rounded-full mt-1 border border-[#353B2F]">
                Sizning manzilingiz
              </span>
            </div>
          </div>

          {/* Courier Details Card (Exactly matching Screen 3 in screenshot) */}
          <div className="p-4 sm:p-5 bg-[#23271E] rounded-3xl border border-[#353B2F] space-y-4">
            <div className="flex items-center justify-between border-b border-[#2E3426] pb-3.5">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Courier"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#F3BE53]"
                />
                <div>
                  <h4 className="text-sm font-black text-white">
                    {activeTrackingOrder.courier?.name || 'Rafael Smith'}
                  </h4>
                  <p className="text-[11px] text-gray-400">
                    {activeTrackingOrder.courier?.vehicle || 'Scooter (01 A 777 AA)'}
                  </p>
                </div>
              </div>

              {/* Call and Chat action buttons (matching screenshot) */}
              <div className="flex items-center space-x-2">
                <a
                  href={`tel:${activeTrackingOrder.courier?.phone || '+998901234567'}`}
                  className="w-10 h-10 rounded-full bg-[#181A15] border border-[#353B2F] hover:border-[#F3BE53] text-[#F3BE53] flex items-center justify-center transition-colors shadow-sm"
                  title="Qo'ng'iroq qilish"
                >
                  <Icon name="phone" className="w-4 h-4" />
                </a>
                <button
                  onClick={() => showToast('Kuryer bilan tezkor xabar almashish yoqildi', 'info')}
                  className="w-10 h-10 rounded-full bg-[#181A15] border border-[#353B2F] hover:border-[#F3BE53] text-[#F3BE53] flex items-center justify-center relative transition-colors shadow-sm"
                  title="Xabar yozish"
                >
                  <Icon name="chat" className="w-4 h-4" />
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 absolute top-1 right-1 ring-2 ring-[#181A15]"></span>
                </button>
              </div>
            </div>

            {/* Delivery Time & Customer Address info rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start space-x-2.5 bg-[#181A15] p-3 rounded-2xl border border-[#2E3426]">
                <Icon name="clock" className="w-4 h-4 text-[#F3BE53] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">Delivery time</span>
                  <span className="text-white font-black text-xs">12-20 Daqiqa</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 bg-[#181A15] p-3 rounded-2xl border border-[#2E3426]">
                <Icon name="map-pin" className="w-4 h-4 text-[#F3BE53] flex-shrink-0 mt-0.5" />
                <div className="truncate">
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">Your address</span>
                  <span className="text-white font-black text-xs truncate block">
                    {activeTrackingOrder.address || deliveryLocation?.displayText || 'Toshkent, Chilonzor'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Status list */}
          <div className="space-y-3 bg-[#23271E] p-4 rounded-3xl border border-[#353B2F]">
            <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-2">
              Buyurtma bosqichlari
            </h4>
            {stages.map((stage) => {
              const isDone = stage.id <= currentStage;
              const isCurrent = stage.id === currentStage;

              return (
                <div key={stage.id} className="flex items-start space-x-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                    isCurrent
                      ? 'bg-[#F3BE53] text-[#131512] ring-4 ring-[#F3BE53]/25 scale-105'
                      : isDone
                      ? 'bg-[#00A859] text-white'
                      : 'bg-[#181A15] text-gray-500 border border-[#353B2F]'
                  }`}>
                    {isDone ? (isCurrent ? stage.icon : '✓') : stage.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-black ${isCurrent ? 'text-[#F3BE53]' : isDone ? 'text-white' : 'text-gray-500'}`}>
                        {stage.title}
                      </span>
                      <span className="text-[10px] text-gray-500">{stage.time}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-tight">{stage.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Simulation Next Stage Button */}
          <button
            type="button"
            onClick={advanceDemo}
            className="w-full py-3.5 bg-[#F3BE53] hover:bg-[#E5A934] text-[#131512] font-black text-xs rounded-2xl shadow-lg shadow-[#F3BE53]/20 active:scale-98 transition-all flex items-center justify-center space-x-2"
          >
            <span>⚡ Keyingi bosqichni simulyatsiya qilish</span>
          </button>

        </div>

      </div>
    </div>
  );
};

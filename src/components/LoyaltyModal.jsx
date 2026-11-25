import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';
import { IstiqlolLogo } from './IstiqlolLogo';

export const LoyaltyModal = () => {
  const {
    isLoyaltyOpen, setIsLoyaltyOpen,
    user, loyaltyPoints, setLoyaltyPoints,
    addToCart, showToast, t,
    loyaltyRewards
  } = useApp();

  const [activeTab, setActiveTab] = useState('rewards'); // 'rewards' | 'rules'
  const [dailyClaimed, setDailyClaimed] = useState(() => {
    const lastClaim = localStorage.getItem('istiqlol_daily_bonus_date');
    return lastClaim === new Date().toDateString();
  });

  if (!isLoyaltyOpen) return null;

  const nextTierGoal = 50000;
  const progressPct = Math.min(100, Math.round((loyaltyPoints / nextTierGoal) * 100));
  const pointsLeft = Math.max(0, nextTierGoal - loyaltyPoints);
  const currentTier = loyaltyPoints >= nextTierGoal ? 'PLATINUM VIP' : 'GOLD VIP';
  const currentCashback = loyaltyPoints >= nextTierGoal ? '10%' : '5%';

  const handleDailyBonus = () => {
    if (dailyClaimed) {
      showToast('Bugungi kunlik bonusni allaqachon oldingiz! Ertaga keling 🌟', 'info');
      return;
    }
    const bonus = 500;
    const updated = loyaltyPoints + bonus;
    setLoyaltyPoints(updated);
    localStorage.setItem('evos_loyalty', updated.toString());
    localStorage.setItem('istiqlol_daily_bonus_date', new Date().toDateString());
    setDailyClaimed(true);
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    showToast(`Tabriklaymiz! +${bonus} kunlik bonus ball qo'shildi 🎉`);
  };

  const handleRedeemReward = (reward) => {
    if (loyaltyPoints < reward.points) {
      showToast(`Ushbu sovrin uchun ballar yetarli emas (yana ${(reward.points - loyaltyPoints).toLocaleString()} ball kerak)`, 'info');
      return;
    }

    const updated = loyaltyPoints - reward.points;
    setLoyaltyPoints(updated);
    localStorage.setItem('evos_loyalty', updated.toString());
    addToCart({
      id: reward.id,
      name: { uz: `${reward.name} (Sovrin)`, ru: `${reward.name} (Подарок)`, en: `${reward.name} (Reward)` },
      category: reward.category,
      price: 0,
      image: reward.image
    });

    confetti({ particleCount: 55, spread: 60, origin: { y: 0.65 } });
    showToast(t('redeemSuccess') || `🎁 ${reward.name} savatga bepul qo'shildi!`);
  };

  const copyReferral = () => {
    const code = `ISTIQLOL-${(user.name || 'VIP').slice(0, 4).toUpperCase()}`;
    navigator.clipboard?.writeText(code);
    showToast(`Taklif kodi nusxalandi: ${code} 📋`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={() => setIsLoyaltyOpen(false)}
    >
      <div
        className="bg-[#FFFDF9] dark:bg-[#1A0D10] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#F3BE53]/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold-Accent Header */}
        <div className="p-5 border-b border-[#F3BE53]/25 flex items-center justify-between sticky top-0 bg-[#FFFDF9]/95 dark:bg-[#1A0D10]/95 backdrop-blur-md z-10">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#F3BE53] via-[#D99B26] to-[#9B1832] text-[#1A0D10] font-black flex items-center justify-center text-xl shadow-lg shadow-[#F3BE53]/30">
              ⭐
            </div>
            <div>
              <h2 className="text-lg font-black text-[#1E0910] dark:text-[#FFF5E1] tracking-tight">
                ISTIQLOL Bonus & Mukofotlar
              </h2>
              <p className="text-xs text-[#8C6D3F] dark:text-[#F3BE53]/80 font-semibold">
                Ballarni yig'ing va bepul taomlarga almashtiring
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsLoyaltyOpen(false)}
            className="p-2 rounded-full hover:bg-[#F3BE53]/15 text-gray-500 dark:text-gray-300 transition-colors"
            aria-label="Yopish"
          >
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          {/* Metallic Royal Gold VIP Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2B1508] via-[#4A1424] to-[#1A0A0E] p-6 text-white shadow-2xl border border-[#F3BE53]/40">
            {/* Decorative Gold Glows */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#F3BE53]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-[#BA1D3D]/30 blur-3xl pointer-events-none" />

            <div className="relative flex justify-between items-start">
              <div>
                <span className="inline-flex items-center space-x-1.5 text-[10px] font-black uppercase text-[#F3BE53] tracking-[0.2em] bg-[#F3BE53]/10 border border-[#F3BE53]/30 px-2.5 py-1 rounded-full">
                  <span>👑</span>
                  <span>ISTIQLOL VIP CLUB</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-black mt-2 bg-gradient-to-r from-[#FFF5D6] via-[#F3BE53] to-[#E59E2D] bg-clip-text text-transparent">
                  {currentTier}
                </h3>
              </div>
              <IstiqlolLogo className="w-12 h-12 drop-shadow-[0_0_15px_rgba(243,190,83,0.65)]" />
            </div>

            <div className="relative mt-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs text-[#F3BE53]/80 font-semibold uppercase tracking-wider">
                  Mavjud bonus balansingiz
                </p>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="text-4xl font-black text-[#F3BE53] tracking-tight">
                    {loyaltyPoints.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-white/80">ball</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="bg-[#F3BE53]/20 text-[#F3BE53] border border-[#F3BE53]/40 text-xs font-black px-3 py-1.5 rounded-full">
                  ⚡ {currentCashback} Cashback
                </span>
                <button
                  type="button"
                  onClick={handleDailyBonus}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all shadow-md active:scale-95 ${
                    dailyClaimed
                      ? 'bg-white/10 text-white/60 border border-white/15 cursor-default'
                      : 'bg-gradient-to-r from-[#F3BE53] to-[#E09F24] text-[#1A0D10] hover:brightness-110 shadow-[#F3BE53]/30'
                  }`}
                >
                  {dailyClaimed ? '✓ Kunlik olindi' : '🎁 +500 Kunlik'}
                </button>
              </div>
            </div>

            {/* Tier Progress Bar */}
            <div className="relative mt-5 pt-4 border-t border-white/10">
              <div className="flex justify-between text-[11px] font-bold mb-1.5">
                <span className="text-white/80">
                  {pointsLeft > 0
                    ? `PLATINUM VIP (10% Cashback) gacha yana ${pointsLeft.toLocaleString()} ball`
                    : '🎉 Siz eng yuqori PLATINUM VIP darajadasiz!'}
                </span>
                <span className="text-[#F3BE53]">{progressPct}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden border border-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#BA1D3D] via-[#F3BE53] to-[#FFF2B2] transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Tabs: Sovrinlar Do'koni vs Ball Yig'ish */}
          <div className="flex space-x-2 p-1 rounded-2xl bg-[#F6ECEE] dark:bg-[#271117] border border-[#E7D3D8] dark:border-[#4A1C28]">
            {[
              { id: 'rewards', label: '🎁 Sovrinlar Do\'koni' },
              { id: 'rules', label: '✨ Qanday ball yig\'iladi?' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#F3BE53] to-[#DFA22C] text-[#1E0910] shadow-md'
                    : 'text-[#6D4752] dark:text-gray-400 hover:text-[#1E0910] dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Rewards Store */}
          {activeTab === 'rewards' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#8C6D3F] dark:text-[#F3BE53]">
                  Ballaringizni bepul taomlarga almashtiring
                </h4>
                <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400">
                  {loyaltyRewards.length} ta sovrin
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {loyaltyRewards.map(rew => {
                  const canAfford = loyaltyPoints >= rew.points;
                  return (
                    <div
                      key={rew.id}
                      className={`flex items-center space-x-3.5 p-3.5 rounded-2xl border transition-all ${
                        canAfford
                          ? 'bg-white dark:bg-[#241016] border-[#F3BE53]/40 hover:border-[#F3BE53] shadow-sm'
                          : 'bg-gray-50 dark:bg-[#1E0E12]/60 border-gray-200 dark:border-[#3A1721] opacity-80'
                      }`}
                    >
                      <img
                        src={rew.image}
                        alt={rew.name}
                        className="w-16 h-16 rounded-xl object-cover border border-[#F3BE53]/25 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-black text-[#1E0910] dark:text-white truncate">
                          {rew.name}
                        </h5>
                        <p className="text-xs font-black text-[#D49117] dark:text-[#F3BE53] mt-0.5">
                          ⭐ {rew.points.toLocaleString()} ball
                        </p>
                        <button
                          type="button"
                          onClick={() => handleRedeemReward(rew)}
                          className={`mt-2 w-full py-1.5 px-3 rounded-xl text-[11px] font-black transition-all active:scale-95 ${
                            canAfford
                              ? 'bg-gradient-to-r from-[#F3BE53] to-[#E09F24] text-[#1E0910] hover:brightness-105 shadow-sm'
                              : 'bg-gray-200 dark:bg-[#351720] text-gray-500 dark:text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {canAfford ? 'Bepul olish 🎁' : `Yana ${(rew.points - loyaltyPoints).toLocaleString()} ball`}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: How to earn points */}
          {activeTab === 'rules' && (
            <div className="space-y-3">
              {[
                { icon: '🍔', title: 'Har bir buyurtmadan Cashback', desc: `Barcha buyurtmalaringiz summasidan ${currentCashback} bonus ball sifatida qaytadi.`, badge: `+${currentCashback}` },
                { icon: '🎁', title: 'Kunlik tashrif bonusi', desc: 'Har kuni bonus bo\'limiga kiring va +500 bepul ball oling.', badge: '+500 pts' },
                { icon: '🎂', title: 'Tug\'ilgan kun sovg\'asi', desc: 'Tug\'ilgan kuningizda ISTIQLOL tomonidan maxsus bayram bonusi.', badge: '+15 000 pts' },
                { icon: '🤝', title: 'Do\'stingizni taklif qiling', desc: 'Do\'stingiz ilk buyurtmasini berganda ikkalangizga ham bonus beriladi.', badge: '+10 000 pts' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#241016] border border-[#E7D3D8] dark:border-[#4A1C28]"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#F3BE53]/15 border border-[#F3BE53]/30 flex items-center justify-center text-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-[#1E0910] dark:text-white">{item.title}</h5>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <span className="shrink-0 ml-3 bg-[#F3BE53]/20 text-[#B87D0E] dark:text-[#F3BE53] text-[11px] font-black px-2.5 py-1 rounded-full">
                    {item.badge}
                  </span>
                </div>
              ))}

              {/* Referral Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#9B1832]/15 to-[#F3BE53]/15 border border-[#F3BE53]/35 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black text-[#1E0910] dark:text-white">Sizning taklif kodingiz</p>
                  <p className="text-[11px] text-gray-600 dark:text-gray-300">Do'stlaringizga yuboring va ball yig'ing</p>
                </div>
                <button
                  type="button"
                  onClick={copyReferral}
                  className="flex items-center space-x-1.5 bg-[#1E0910] dark:bg-[#F3BE53] text-[#F3BE53] dark:text-[#1E0910] px-4 py-2 rounded-xl text-xs font-black hover:opacity-90 active:scale-95 transition-all"
                >
                  <Icon name="copy" className="w-3.5 h-3.5" />
                  <span>ISTIQLOL-{(user.name || 'VIP').slice(0, 4).toUpperCase()}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


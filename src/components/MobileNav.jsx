import React from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';

export const MobileNav = () => {
  const {
    setIsCartOpen, setIsProfileOpen, setIsTrackingOpen,
    cart, appMode, orders, setActiveTrackingOrder, setIsLocationModalOpen
  } = useApp();

  if (appMode === 'admin') return null;

  const totalCart = cart.reduce((s, i) => s + i.quantity, 0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openLatestTracking = () => {
    if (orders && orders.length > 0) {
      setActiveTrackingOrder(orders[0]);
    }
    setIsTrackingOpen(true);
  };

  return (
    <div className="md:hidden fixed bottom-4 inset-x-4 z-40 max-w-sm mx-auto">
      <div className="bg-[#1C1F18]/95 backdrop-blur-lg border border-[#353B2F] rounded-full py-2 px-3 shadow-2xl flex items-center justify-around text-gray-400">
        
        {/* Active Home Circle (matching screenshot) */}
        <button
          type="button"
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-[#F3BE53] text-[#131512] flex items-center justify-center shadow-lg shadow-[#F3BE53]/30 active:scale-95 transition-transform"
          aria-label="Home"
        >
          <Icon name="home" className="w-5 h-5 text-[#131512]" />
        </button>

        {/* Menu Search */}
        <button
          type="button"
          onClick={scrollToMenu}
          className="w-10 h-10 rounded-full hover:bg-[#2A2F25] flex items-center justify-center hover:text-white transition-colors"
          aria-label="Menu"
        >
          <Icon name="search" className="w-5 h-5" />
        </button>

        {/* Cart Button with Count */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="w-10 h-10 rounded-full hover:bg-[#2A2F25] flex items-center justify-center hover:text-white transition-colors relative"
          aria-label="Cart"
        >
          <Icon name="shopping-bag" className="w-5 h-5" />
          {totalCart > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#F3BE53] text-[#131512] text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-md">
              {totalCart}
            </span>
          )}
        </button>

        {/* Orders Tracking */}
        <button
          type="button"
          onClick={openLatestTracking}
          className="w-10 h-10 rounded-full hover:bg-[#2A2F25] flex items-center justify-center hover:text-white transition-colors"
          aria-label="Track Order"
        >
          <Icon name="clock" className="w-5 h-5" />
        </button>

        {/* Profile */}
        <button
          type="button"
          onClick={() => setIsProfileOpen(true)}
          className="w-10 h-10 rounded-full hover:bg-[#2A2F25] flex items-center justify-center hover:text-white transition-colors"
          aria-label="Profile"
        >
          <Icon name="user" className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
};

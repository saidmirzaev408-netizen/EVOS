import React from 'react';
import { useApp } from './context/AppContext';
import { ToastContainer } from './components/ToastContainer';
import { Header } from './components/Header';
import { TableBanner } from './components/TableBanner';
import { Hero } from './components/Hero';
import { SpecialOffers } from './components/SpecialOffers';
import { CategoryBar } from './components/CategoryBar';
import { FoodMenu } from './components/FoodMenu';
import { BranchesSection } from './components/BranchesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';

// Modals & Interactive Overlays
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { LocationModal } from './components/LocationModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { LoyaltyProfileModal } from './components/LoyaltyProfileModal';
import { LoyaltyModal } from './components/LoyaltyModal';
import { AuthModal } from './components/AuthModal';
import { AuthPage } from './components/AuthPage';
import { QrModal } from './components/QrModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { MobileNav } from './components/MobileNav';
import { AdminDashboard } from './components/AdminDashboard';

export function App() {
  const { appMode, isAuthenticated, isAdmin } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF6F7] dark:bg-[#18090E] text-[#1E0910] dark:text-[#FFF0F3] antialiased font-sans selection:bg-[#BA1D3D] selection:text-white transition-colors duration-300">
      <ToastContainer />
      
      {appMode === 'admin' && isAuthenticated && isAdmin ? (
        <AdminDashboard />
      ) : appMode === 'login' || appMode === 'register' ? (
        <AuthPage />
      ) : (
        <>
          <Header />
          <TableBanner />
          <main className="flex-1">
            <Hero />
            <SpecialOffers />
            <CategoryBar />
            <FoodMenu />
            <BranchesSection />
            <ReviewsSection />
          </main>
          <Footer />

          {/* Interactive Modals & Drawers */}
          <LocationModal />
          <ProductDetailsModal />
          <CartDrawer />
          <CheckoutModal />
          <OrderTrackingModal />
          <LoyaltyProfileModal />
          <LoyaltyModal />
          <AuthModal />
          <QrModal />
          <LiveChatWidget />
          <MobileNav />
        </>
      )}
    </div>
  );
}

export default App;


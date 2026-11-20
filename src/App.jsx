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
import { QrModal } from './components/QrModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { MobileNav } from './components/MobileNav';
import { AdminDashboard } from './components/AdminDashboard';

export function App() {
  const { appMode } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#131512] text-[#F4F5F2] antialiased font-sans selection:bg-[#F3BE53] selection:text-[#131512]">
      <ToastContainer />
      
      {appMode === 'admin' ? (
        <AdminDashboard />
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
          <QrModal />
          <LiveChatWidget />
          <MobileNav />
        </>
      )}
    </div>
  );
}

export default App;


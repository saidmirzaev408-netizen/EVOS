# EVOS — Professional Fast Food Ordering Platform (React JS + Vite)

A premium, modern, fully responsive fast-food ordering web application inspired by the **EVOS** brand in Uzbekistan.

Built with **React 18**, **Vite**, **Tailwind CSS**, and modern modular **JavaScript (ESM)**.

---

## ⚡ Quick Start (React JS)

### 1. Install dependencies:
```bash
npm install
```

### 2. Start development server:
```bash
npm run dev
```
The app will launch at `http://localhost:3000`.

### 3. Build for production:
```bash
npm run build
```

---

## 📁 Modular Project Structure

```
EVOS/
├── index.html                   # Vite HTML entry point
├── package.json                 # React 18, Vite, Tailwind CSS, Lucide, Confetti
├── vite.config.js               # Vite configuration with React plugin
├── tailwind.config.js           # EVOS brand colors, fonts, animations
├── postcss.config.js            # PostCSS configuration
├── README.md                    # Documentation
└── src/
    ├── main.jsx                 # React root entry point
    ├── App.jsx                  # Main App component & layout controller
    ├── index.css                # Tailwind directives & custom scrollbars
    ├── context/
    │   └── AppContext.jsx       # Global React Context state (Cart, User, Orders, Theme, i18n)
    ├── data/
    │   ├── products.js          # 10 food categories, 20+ dishes, combos, promo codes
    │   ├── branches.js          # Restaurant locations in Tashkent and Samarkand
    │   ├── i18n.js              # Full trilingual dictionary (UZ, RU, EN)
    │   └── bundleData.js        # Data bundle fallback
    ├── utils/
    │   └── formatters.js        # UZS currency formatter (e.g. "36 000 UZS")
    └── components/
        ├── Header.jsx           # Sticky nav, location picker, search, theme, lang, cart counter
        ├── Hero.jsx             # Hero banner with appetizing visual composition & CTAs
        ├── SpecialOffers.jsx    # Promo cards with 1-click copy codes (EVOS2025, BEPUL, YANGI)
        ├── CategoryBar.jsx      # Scrollable horizontal food category tabs
        ├── FoodMenu.jsx         # Menu grid with category filtering & instant search
        ├── ProductCard.jsx      # Food card with image, badges, ratings, price, and quick-add
        ├── ProductDetailsModal.jsx # Size, spiciness, toppings, sauces, and chef notes modal
        ├── CartDrawer.jsx       # Slide-over cart with free delivery progress & coupon box
        ├── CheckoutModal.jsx    # Courier delivery vs Pickup, address inputs, payment methods
        ├── OrderTrackingModal.jsx # 5 live order stages, animated map & courier profile
        ├── LoyaltyProfileModal.jsx # EVOS Club VIP tier, coin balance, and rewards catalog
        ├── BranchesSection.jsx  # Restaurant branches with working hours (24/7) and amenities
        ├── ReviewsSection.jsx   # Verified customer testimonials
        ├── QrModal.jsx          # Table QR code ordering modal (#Table 12)
        ├── LiveChatWidget.jsx   # Customer support chat with intelligent auto-replies
        ├── MobileNav.jsx        # Bottom app bar (Home, Search, Cart, Support, Profile)
        ├── Footer.jsx           # Complete brand footer with contacts & links
        ├── ToastContainer.jsx   # Interactive toast notifications
        ├── Icons.jsx            # Zero-dependency SVG icon system
        └── AdminDashboard.jsx   # Full management console (Stats, Chart, Orders, Menu CRUD)
```

---

## 🍔 Features Implemented

1. **Visual Design & Brand Identity**:
   - Official EVOS Green (`#00A859`), deep dark theme, amber accents, and clean white.
   - Typography powered by Google Fonts **Plus Jakarta Sans**.
   - Curated high-resolution food photography.
   - Smooth transitions and interactive UI states.
   - **Dark & Light Mode** with persistent `localStorage` synchronization.

2. **Food Menu (10 Categories)**:
   - Lavash, Burgers, Shawarma, Hot Dogs, Pizza, French Fries, Chicken, Drinks, Desserts, and Combo Meals.
   - Interactive customization (portion size, spicy levels, Dutch cheese, jalapeno, bacon, white garlic and BBQ sauces).

3. **Shopping Cart & Coupons**:
   - Slide-over drawer with quantity controls (`+` / `-`).
   - Free delivery progress meter toward 100,000 UZS.
   - Discount codes: `EVOS2025` (15% off), `BEPUL` (Free delivery), `YANGI` (20,000 UZS off).

4. **Checkout System**:
   - Courier delivery or in-store pickup branch selection.
   - Gateways: **Payme**, **Click**, **Uzum Bank**, **Cash on Delivery**.
   - Option to apply EVOS loyalty coins for instant discount.
   - Confetti celebration upon confirmation.

5. **Live 5-Stage Order Tracker**:
   - 1. Order Received → 2. Preparing → 3. Ready for Courier → 4. Courier on the Way → 5. Delivered.
   - Animated visual map route with restaurant, moving courier scooter, and customer pins.
   - Courier profile with phone call simulation.

6. **EVOS Club Loyalty System**:
   - Gold VIP tier with 5% cashback on all orders.
   - Rewards store to exchange points for free meals.
   - Past order history with instant reorder functionality.

7. **Admin Back-Office**:
   - Real-time revenue & orders statistics.
   - SVG interactive trend charts.
   - Order status dispatcher (change status across all 5 stages).
   - Food items CRUD (Create, update price, delete).

8. **Trilingual & Mobile Navigation**:
   - Trilingual support: **O'zbekcha (UZ)**, **Русский (RU)**, and **English (EN)**.
   - Mobile bottom navigation bar matching modern food delivery apps.
   - Live customer support chat widget.

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { initialProducts, initialCategories, samplePromoCodes, loyaltyRewards, categoryFallbacks } from '../data/products';
import { branchesData } from '../data/branches';
import { translations, languageOptions } from '../data/i18n';
import { foodNameTranslations } from '../data/foodTranslations';
import confetti from 'canvas-confetti';

const enrichProducts = (items) => {
  return (items || []).map(p => ({
    ...p,
    name: {
      ...p.name,
      ...(foodNameTranslations[p.id] || {})
    }
  }));
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Language: 'uz', 'ru', 'en', 'kk', 'tg', 'tr', 'ar', 'zh', 'ko', 'de', 'fr', 'ja', 'hi'
  const [lang, setLangState] = useState(() => localStorage.getItem('evos_lang') || 'uz');
  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('evos_lang', newLang);
  };
  // Theme: 'light', 'dark'
  const [theme, setTheme] = useState(() => localStorage.getItem('evos_theme') || 'dark');
  // App Mode: 'client' or 'admin'
  const [appMode, setAppMode] = useState('client');
  // Delivery Location state
  const [deliveryLocation, setDeliveryLocation] = useState(() => {
    const saved = localStorage.getItem('evos_location');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      city: 'Toshkent',
      district: 'Chilonzor',
      street: 'Qatortol ko\'chasi, 24-uy',
      apartment: '15',
      address: 'Toshkent sh., Chilonzor tumani, Qatortol ko\'chasi, 24-uy',
      displayText: 'Toshkent, Chilonzor'
    };
  });
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Products list with fresh catalog priority
  const [products, setProducts] = useState(() => {
    // Clear legacy corrupted image caches
    try {
      localStorage.removeItem('evos_products_v5');
      localStorage.removeItem('evos_products_v4');
      localStorage.removeItem('evos_products_v3');
      localStorage.removeItem('evos_products_v2');
      localStorage.removeItem('evos_products');
    } catch (e) { }

    return enrichProducts(initialProducts);
  });
  // Cart items
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('evos_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [];
  });
  // Favorites product IDs
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('evos_favorites');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return ['lav-1', 'burg-1', 'piz-1'];
  });
  // Applied promo code
  const [appliedPromo, setAppliedPromo] = useState(null);
  // Loyalty points
  const [loyaltyPoints, setLoyaltyPoints] = useState(() => {
    return Number(localStorage.getItem('evos_loyalty') || 18500);
  });
  // User profile
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('istiqlol_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      name: 'Jasur Aliyev',
      phone: '+998 90 123 45 67',
      tier: 'Gold',
      tierDiscount: 5,
      address: 'Toshkent sh., Chilonzor tumani, 9-mavze, 24-uy'
    };
  });
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('istiqlol_is_auth');
    return saved !== null ? saved === 'true' : false;
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('istiqlol_is_admin') === 'true';
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register'); // 'register' | 'login'

  const openAuthModal = (mode = 'register') => {
    setAuthMode(mode);
    setAppMode(mode);
    setIsAuthModalOpen(false);
  };

  const goToLogin = () => {
    setAuthMode('login');
    setAppMode('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToRegister = () => {
    setAuthMode('register');
    setAppMode('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginUser = ({ phone, password, name }) => {
    const digits = (phone || '').replace(/\D/g, '');
    const isAdminPhone = digits === '998971082442' || digits === '971082442';

    if (isAdminPhone) {
      if (password !== 'said201011') {
        showToast('❌ Admin paroli noto\'g\'ri! Qaytadan urinib ko\'ring.', 'info');
        return false;
      }
      const adminUser = {
        ...user,
        phone: '+998 97 108 24 42',
        name: 'Said (Admin)',
        role: 'admin',
        tier: 'ADMIN VIP',
        tierDiscount: 15
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem('istiqlol_is_auth', 'true');
      localStorage.setItem('istiqlol_is_admin', 'true');
      localStorage.setItem('istiqlol_user', JSON.stringify(adminUser));
      setIsAuthModalOpen(false);
      setAppMode('admin');
      confetti({ particleCount: 95, spread: 75, origin: { y: 0.65 } });
      showToast('👑 Admin sifatida xush kelibsiz, Said!');
      return true;
    }

    const loggedUser = {
      ...user,
      phone: phone || user.phone,
      name: name || (user.role === 'admin' ? 'Mijoz' : user.name) || 'Mijoz',
      role: 'client'
    };
    setUser(loggedUser);
    setIsAuthenticated(true);
    setIsAdmin(false);
    localStorage.setItem('istiqlol_is_auth', 'true');
    localStorage.setItem('istiqlol_is_admin', 'false');
    localStorage.setItem('istiqlol_user', JSON.stringify(loggedUser));
    setIsAuthModalOpen(false);
    setAppMode('client');
    confetti({ particleCount: 75, spread: 65, origin: { y: 0.65 } });
    showToast(`Xush kelibsiz, ${loggedUser.name}!`);
    return true;
  };

  const registerUser = ({ name, phone, password, birthday }) => {
    const welcomeBonus = 20000;
    const newPoints = loyaltyPoints + welcomeBonus;
    setLoyaltyPoints(newPoints);
    localStorage.setItem('evos_loyalty', newPoints.toString());

    const newUser = {
      name: name || 'Mehmon',
      phone: phone || '+998 90 000 00 00',
      role: 'client',
      tier: 'Gold VIP',
      tierDiscount: 5,
      birthday: birthday || '',
      registeredAt: new Date().toLocaleDateString(),
      address: user.address || 'Toshkent sh., Chilonzor'
    };
    setUser(newUser);
    setIsAuthenticated(true);
    setIsAdmin(false);
    localStorage.setItem('istiqlol_is_auth', 'true');
    localStorage.setItem('istiqlol_is_admin', 'false');
    localStorage.setItem('istiqlol_user', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
    setAppMode('client');
    confetti({ particleCount: 110, spread: 85, origin: { y: 0.6 } });
    showToast(`Tabriklaymiz, ${newUser.name}! +20 000 bonus ball berildi 🎉`);
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.setItem('istiqlol_is_auth', 'false');
    localStorage.setItem('istiqlol_is_admin', 'false');
    setIsProfileOpen(false);
    setIsLoyaltyOpen(false);
    setAppMode('client');
    showToast('Tizimdan chiqildi');
  };

  const updateUserProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('istiqlol_user', JSON.stringify(updated));
    showToast('Profil ma\'lumotlari muvaffaqiyatli saqlandi! ✅');
  };
  // Orders list
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('evos_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [
      {
        id: 'EVOS-9402',
        date: '19.11.2026, 19:45',
        items: [
          { name: 'Klassik Go\'shtli Lavash', quantity: 2, price: 36000 },
          { name: 'Qarsildoq Kartoshka Fri', quantity: 1, price: 18000 },
          { name: 'Pepsi 0.5L (Muzdek)', quantity: 2, price: 11000 }
        ],
        subtotal: 112000,
        deliveryFee: 0,
        discount: 11200,
        total: 100800,
        status: 4, // Courier on the way
        paymentMethod: 'Payme',
        address: 'Chilonzor-9, 24-uy, 15-xonadon',
        courier: { name: 'Dilshod Karimov', phone: '+998 90 123 45 67', vehicle: 'Scooter (01 A 777 AA)' }
      },
      {
        id: 'EVOS-8821',
        date: '17.11.2026, 13:20',
        items: [
          { name: 'EVOS Double Cheeseburger', quantity: 1, price: 44000 },
          { name: 'Moxito Klassik / Yalpizli', quantity: 1, price: 18000 }
        ],
        subtotal: 62000,
        deliveryFee: 12000,
        discount: 0,
        total: 74000,
        status: 5, // Delivered
        paymentMethod: 'Click',
        address: 'Yunusobod-4, 12-uy',
        courier: { name: 'Rustam Saidov', phone: '+998 93 456 78 90', vehicle: 'Matiz (01 B 123 BB)' }
      }
    ];
  });

  // Modals & UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState(null);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [toasts, setToasts] = useState([]);

  // Active Restaurant Table Mode (QR Table Ordering)
  const [activeTable, setActiveTable] = useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const tableParam = urlParams.get('table');
      const branchParam = urlParams.get('branch');
      if (tableParam) {
        return { number: Number(tableParam) || 12, branch: branchParam || 'Chilonzor', active: true };
      }
      const saved = localStorage.getItem('evos_active_table');
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return { number: 12, branch: 'Chilonzor', active: false };
  });

  useEffect(() => {
    localStorage.setItem('evos_active_table', JSON.stringify(activeTable));
  }, [activeTable]);

  // Show welcome toast when opened via Table QR code URL parameter
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const tableParam = urlParams.get('table');
      const branchParam = urlParams.get('branch');
      if (tableParam) {
        showToast(`🍽️ Xush kelibsiz! #${tableParam}-stoldan buyurtma berish faollashtirildi (${branchParam || 'Chilonzor'})`);
      }
    } catch (e) { }
  }, []);

  // Theme toggle
  useEffect(() => {
    localStorage.setItem('evos_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('evos_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('evos_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('evos_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('evos_products_v6', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('evos_location', JSON.stringify(deliveryLocation));
  }, [deliveryLocation]);

  useEffect(() => {
    localStorage.setItem('evos_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('evos_loyalty', loyaltyPoints.toString());
  }, [loyaltyPoints]);

  // Toast notification helper
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  // Add to cart with custom options
  const addToCart = (product, options = {}) => {
    const portionExtra = options.portion === 'large' ? 6000 : 0;
    let addonsExtra = 0;
    if (options.addons) {
      if (options.addons.cheese) addonsExtra += 4000;
      if (options.addons.jalapeno) addonsExtra += 3000;
      if (options.addons.bacon) addonsExtra += 6000;
    }

    const unitPrice = product.price + portionExtra + addonsExtra;
    const itemKey = `${product.id}-${options.portion || 'std'}-${options.sauce || 'def'}-${Boolean(options.addons?.cheese)}-${Boolean(options.addons?.jalapeno)}-${Boolean(options.addons?.bacon)}`;

    setCart(prev => {
      const existing = prev.find(item => item.itemKey === itemKey);
      if (existing) {
        return prev.map(item => item.itemKey === itemKey ? { ...item, quantity: item.quantity + (options.quantity || 1) } : item);
      } else {
        return [...prev, {
          itemKey,
          id: product.id,
          name: product.name,
          category: product.category,
          price: unitPrice,
          basePrice: product.price,
          image: product.image,
          quantity: options.quantity || 1,
          options: {
            portion: options.portion || 'standard',
            spiciness: options.spiciness || 'mild',
            sauce: options.sauce || 'garlicSauce',
            addons: options.addons || {},
            notes: options.notes || ''
          }
        }];
      }
    });

    showToast(`${product.name[lang] || product.name.uz} savatchaga qo'shildi! 🛒`);
  };

  const updateCartQuantity = (itemKey, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.itemKey === itemKey) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (itemKey) => {
    setCart(prev => prev.filter(item => item.itemKey !== itemKey));
    showToast('Taom savatchadan o\'chirildi', 'info');
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        showToast('Sevimlilardan olib tashlandi', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Sevimlilarga qo\'shildi! ❤️');
        return [...prev, productId];
      }
    });
  };

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const deliveryFee = useMemo(() => {
    if (subtotal === 0) return 0;
    if (activeTable && activeTable.active) return 0; // Table ordering has free table delivery
    if (appliedPromo && appliedPromo.freeDelivery) return 0;
    return subtotal >= 100000 ? 0 : 12000;
  }, [subtotal, appliedPromo, activeTable]);

  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.discountPercent) {
      return Math.round((subtotal * appliedPromo.discountPercent) / 100);
    }
    if (appliedPromo.fixedDiscount) {
      return appliedPromo.fixedDiscount;
    }
    return 0;
  }, [subtotal, appliedPromo]);

  const grandTotal = Math.max(0, subtotal + deliveryFee - discountAmount);
  const pointsToEarn = Math.round(grandTotal * 0.05);

  const placeOrder = (orderData) => {
    const newOrderId = `EVOS-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newOrder = {
      id: newOrderId,
      date: dateStr,
      items: cart.map(i => ({
        name: i.name[lang] || i.name.uz,
        quantity: i.quantity,
        price: i.price,
        options: i.options
      })),
      subtotal,
      deliveryFee,
      discount: discountAmount,
      total: grandTotal,
      status: 1, // Order Received
      paymentMethod: orderData.paymentMethod,
      address: orderData.address,
      type: orderData.type,
      branch: orderData.branch,
      notes: orderData.notes,
      isTableOrder: Boolean(orderData.isTableOrder || (activeTable && activeTable.active)),
      tableNumber: orderData.tableNumber || (activeTable && activeTable.active ? activeTable.number : null),
      courier: (orderData.isTableOrder || (activeTable && activeTable.active)) ? {
        name: 'Sardorbek (Ofitsiant)',
        phone: '+998 71 200 00 00',
        vehicle: `🍽️ ${orderData.branch || activeTable.branch} • Stol #${orderData.tableNumber || activeTable.number}`
      } : {
        name: 'Dilshod Karimov',
        phone: '+998 90 123 45 67',
        vehicle: 'Honda Dio (01 A 777 AA)'
      }
    };

    setOrders(prev => [newOrder, ...prev]);
    setLoyaltyPoints(prev => prev + pointsToEarn);
    setCart([]);
    setAppliedPromo(null);
    setIsCheckoutOpen(false);
    setActiveTrackingOrder(newOrder);
    setIsTrackingOpen(true);

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    showToast(`Buyurtma #${newOrderId} muvaffaqiyatli qabul qilindi! 🎉`);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (activeTrackingOrder && activeTrackingOrder.id === orderId) {
      setActiveTrackingOrder(prev => ({ ...prev, status: newStatus }));
    }
    showToast(`Buyurtma #${orderId} statusi yangilandi: Bosqich ${newStatus}`);
  };

  const addProduct = (newProd) => {
    setProducts(prev => [newProd, ...prev]);
    showToast('Yangi taom muvaffaqiyatli qo\'shildi!');
  };

  const updateProduct = (updatedProd) => {
    setProducts(prev => prev.map(p => p.id === updatedProd.id ? updatedProd : p));
    showToast('Taom ma\'lumotlari yangilandi!');
  };

  const deleteProduct = (prodId) => {
    setProducts(prev => prev.filter(p => p.id !== prodId));
    showToast('Taom menyudan o\'chirildi', 'info');
  };

  const value = {
    lang, setLang,
    theme, setTheme,
    appMode, setAppMode,
    products, setProducts,
    cart, setCart,
    favorites, toggleFavorite,
    appliedPromo, setAppliedPromo,
    loyaltyPoints, setLoyaltyPoints,
    user, setUser,
    orders, setOrders,
    subtotal, deliveryFee, discountAmount, grandTotal, pointsToEarn,
    addToCart, updateCartQuantity, removeFromCart, placeOrder,
    updateOrderStatus, addProduct, updateProduct, deleteProduct,
    isCartOpen, setIsCartOpen,
    isCheckoutOpen, setIsCheckoutOpen,
    isDetailsOpen, setIsDetailsOpen,
    activeProductModal, setActiveProductModal,
    isTrackingOpen, setIsTrackingOpen,
    activeTrackingOrder, setActiveTrackingOrder,
    isProfileOpen, setIsProfileOpen,
    isLoyaltyOpen, setIsLoyaltyOpen,
    updateUserProfile,
    isAuthenticated, setIsAuthenticated,
    isAdmin, setIsAdmin,
    isAuthModalOpen, setIsAuthModalOpen,
    authMode, setAuthMode,
    openAuthModal,
    goToLogin, goToRegister,
    loginUser, registerUser, logoutUser,
    isLocationModalOpen, setIsLocationModalOpen,
    deliveryLocation, setDeliveryLocation,
    isQrModalOpen, setIsQrModalOpen,
    activeTable, setActiveTable,
    activateTable: (number = 12, branch = 'Chilonzor') => {
      setActiveTable({ number: Number(number), branch, active: true });
      showToast(`🍽️ #${number}-stol (${branch} filiali) faollashtirildi! Taomlarni tanlang va buyurtma bering.`);
    },
    deactivateTable: () => {
      setActiveTable(prev => ({ ...prev, active: false }));
      showToast(`Stol rejimidan chiqildi. Oddiy buyurtma yoqildi.`, 'info');
    },
    isChatOpen, setIsChatOpen,
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory,
    toasts, showToast,
    categories: initialCategories,
    samplePromoCodes,
    loyaltyRewards,
    categoryFallbacks,
    branchesData,
    languageOptions,
    t: (key) => translations[lang]?.[key] || translations['uz']?.[key] || key
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);


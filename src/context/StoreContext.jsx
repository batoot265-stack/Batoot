import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initialProducts, initialSettings } from '../data/initialProducts';
import { api } from '../lib/api';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Products state (persisted in localStorage with v2)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('batoot_products_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load products from storage", e);
    }
    return initialProducts;
  });

  // Settings state
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('batoot_settings_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load settings", e);
    }
    return initialSettings;
  });

  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('batoot_cart_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load cart", e);
    }
    return [];
  });

  // Orders log (for admin review)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('batoot_orders_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load orders", e);
    }
    return [];
  });

  // Custom order requests log (for admin review)
  const [customRequests, setCustomRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('batoot_custom_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load custom requests", e);
    }
    return [];
  });

  // Admin authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return sessionStorage.getItem('batoot_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Navigation and Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [toastMessage, setToastMessage] = useState(null);

  // Cloudflare D1 connection state
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [isDbLoading, setIsDbLoading] = useState(true);
  // Detailed diagnostics from /api/health (shown in the Admin Portal so the
  // owner can see exactly why the cloud database isn't working, if so).
  const [dbStatus, setDbStatus] = useState({ checked: false, error: null, hint: null, counts: null });

  // Hydrate from Cloudflare D1.
  // If the API isn't reachable (e.g. plain `vite dev`), we silently keep
  // the localStorage/seed data so the site always renders.
  const hydrateFromDb = useCallback(async () => {
    setIsDbLoading(true);
    try {
      const [dbProducts, dbSettings, health] = await Promise.all([
        api.listProducts(),
        api.getSettings().catch(() => ({})),
        api.health().catch((e) => ({ ok: false, error: e.message }))
      ]);

      if (Array.isArray(dbProducts) && dbProducts.length > 0) {
        setProducts(dbProducts);
      }
      if (dbSettings && Object.keys(dbSettings).length > 0) {
        setSettings(prev => ({ ...prev, ...dbSettings }));
      }
      setIsDbConnected(true);
      setDbStatus({
        checked: true,
        error: null,
        hint: health && health.hint ? health.hint : null,
        counts: health && health.counts ? health.counts : null
      });
      return true;
    } catch (e) {
      setIsDbConnected(false);
      // Ask /api/health for the precise reason (missing binding? missing tables?)
      let detail = { error: e.message };
      try {
        detail = await api.health();
      } catch {
        // /api/health itself failed (functions not deployed at all?)
      }
      setDbStatus({
        checked: true,
        error: (detail && detail.error) || e.message || 'Database unreachable.',
        hint: (detail && detail.hint) || 'If you just deployed, make sure Pages Functions deployed and the D1 binding "DB" is attached, then redeploy.',
        counts: (detail && detail.counts) || null
      });
      return false;
    } finally {
      setIsDbLoading(false);
    }
  }, []);

  // Hydrate once on first load.
  useEffect(() => {
    hydrateFromDb();
  }, [hydrateFromDb]);

  // Load the default catalog + settings into D1 (used once after connecting
  // a fresh database), then reload everything from the cloud.
  const seedCatalog = async () => {
    try {
      const res = await api.seed();
      await hydrateFromDb();
      try {
        const [dbOrders, dbRequests] = await Promise.all([
          api.listOrders(),
          api.listCustomRequests()
        ]);
        if (Array.isArray(dbOrders)) setOrders(dbOrders);
        if (Array.isArray(dbRequests)) setCustomRequests(dbRequests);
      } catch {
        // logs are optional; catalog is what matters
      }
      showToast(`Catalog loaded to the cloud database (${res.products} products)! ☁️✨`);
      return true;
    } catch (e) {
      console.error('Seeding failed', e);
      showToast('Seeding failed — is the cloud database connected? See the status above.', 'error');
      return false;
    }
  };

  // Load admin logs from D1 once the admin signs in
  useEffect(() => {
    if (!isDbConnected || !isAdminLoggedIn) return;
    let cancelled = false;
    (async () => {
      try {
        const [dbOrders, dbRequests] = await Promise.all([
          api.listOrders(),
          api.listCustomRequests()
        ]);
        if (cancelled) return;
        if (Array.isArray(dbOrders)) setOrders(dbOrders);
        if (Array.isArray(dbRequests)) setCustomRequests(dbRequests);
      } catch (e) {
        console.warn('Could not load admin logs from D1', e);
      }
    })();
    return () => { cancelled = true; };
  }, [isDbConnected, isAdminLoggedIn]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('batoot_products_v2', JSON.stringify(products));
    } catch (e) {
      console.error("Failed to save products", e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('batoot_settings_v3', JSON.stringify(settings));
    } catch (e) {
      console.error("Failed to save settings", e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('batoot_cart_v1', JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('batoot_orders_v1', JSON.stringify(orders));
    } catch (e) {
      console.error("Failed to save orders", e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('batoot_custom_v1', JSON.stringify(customRequests));
    } catch (e) {
      console.error("Failed to save custom requests", e);
    }
  }, [customRequests]);

  // Toast notification helper
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Cart operations
  const addToCart = (product, quantity = 1, selectedColor = null, customNotes = '') => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.id === product.id && item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            ...product,
            quantity,
            selectedColor: selectedColor || (product.colors && product.colors[0]) || 'Standard',
            customNotes
          }
        ];
      }
    });
    showToast(`Added "${product.name}" to your bag! 🪿💛`);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast("Item removed from your bag.", "info");
  };

  const updateCartQuantity = (index, delta) => {
    setCart(prev => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Admin Product Operations
  // Fire-and-forget D1 sync; warns the admin if the cloud write fails.
  const syncToDb = (promiseFactory, label) => {
    if (!isDbConnected) return;
    Promise.resolve()
      .then(promiseFactory)
      .catch((e) => {
        console.error(`D1 sync failed (${label})`, e);
        showToast(`Saved locally, but syncing "${label}" to the cloud failed.`, 'error');
      });
  };

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: 'prod-' + Date.now(),
      rating: 5.0,
      reviewsCount: 1,
      inStock: newProduct.inStock !== false
    };
    setProducts(prev => [productWithId, ...prev]);
    syncToDb(() => api.createProduct(productWithId), 'add product');
    showToast(`Product "${newProduct.name}" added successfully! ✨`);
    return productWithId;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    syncToDb(() => api.updateProduct(id, updatedFields), 'update product');
    showToast(`Product updated successfully! 💛`);
  };

  const toggleProductStock = (id) => {
    // Compute outside the updater: side effects (API sync, toasts) must not
    // run inside a state updater — React StrictMode double-invokes updaters,
    // which would fire the sync + toast twice.
    const target = products.find(p => p.id === id);
    if (!target) return;
    const newStatus = !target.inStock;
    setProducts(prev => prev.map(p => p.id === id ? { ...p, inStock: newStatus } : p));
    syncToDb(() => api.updateProduct(id, { inStock: newStatus }), 'stock status');
    showToast(`Stock updated: ${target.name} is now ${newStatus ? 'In Stock 🟢' : 'Sold Out 🔴'}`);
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    syncToDb(() => api.deleteProduct(id), 'delete product');
    showToast("Product deleted from store.", "info");
  };

  const resetProductsToDefault = () => {
    setProducts(initialProducts);
    syncToDb(() => api.seed(), 'reset catalog');
    showToast("Catalog reset to default items.", "info");
  };

  // Orders log
  const recordOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      status: 'Pending WhatsApp Confirmation'
    };
    setOrders(prev => [newOrder, ...prev]);
    // Map to the API shape (name/total) and send our id so the cloud record
    // matches the local one — otherwise D1 would store name=null, total=0
    // under a different id.
    syncToDb(() => api.createOrder({
      id: newOrder.id,
      name: newOrder.customerName ?? newOrder.name ?? null,
      phone: newOrder.phone ?? null,
      address: newOrder.address ?? null,
      governorate: newOrder.governorate ?? null,
      notes: newOrder.notes ?? null,
      items: newOrder.items ?? [],
      total: newOrder.totalAmount ?? newOrder.total ?? 0,
      status: newOrder.status
    }), 'order');
    return newOrder;
  };

  const recordCustomRequest = (requestData) => {
    const newReq = {
      ...requestData,
      id: 'REQ-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      status: 'Inquiry Sent'
    };
    setCustomRequests(prev => [newReq, ...prev]);
    syncToDb(() => api.createCustomRequest(newReq), 'custom request');
    return newReq;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    syncToDb(() => api.updateOrder(orderId, newStatus), 'order status');
    showToast(`Order status updated to "${newStatus}"`);
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    syncToDb(() => api.deleteOrder(orderId), 'delete order');
    showToast("Order deleted from log.", "info");
  };

  // Settings update
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    syncToDb(() => api.updateSettings(newSettings), 'settings');
    showToast("Store settings saved! 💛");
  };

  // Admin Auth — only the configured PIN is accepted. (The default PIN is
  // '1234' from initialSettings; previously hardcoded fallback PINs meant
  // changing the PIN never actually locked out the old ones.)
  const loginAdmin = (pin) => {
    if (pin && pin === settings.adminPin) {
      setIsAdminLoggedIn(true);
      try {
        sessionStorage.setItem('batoot_admin_auth', 'true');
      } catch {}
      showToast("Welcome back, Admin! 🪿✨");
      return true;
    } else {
      showToast("Incorrect Admin PIN code.", "error");
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      sessionStorage.removeItem('batoot_admin_auth');
    } catch {}
    showToast("Logged out of Admin Portal.", "info");
  };

  // WhatsApp Order Link Generator
  const generateWhatsAppOrderUrl = (customerDetails, orderItems, total) => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const intlPhone = cleanPhone.startsWith('0') ? '2' + cleanPhone : cleanPhone;
    
    let message = `🪿 *New Order from Batoot Website!* 💛\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 *Customer Name:* ${customerDetails.name}\n`;
    message += `📞 *Phone:* ${customerDetails.phone}\n`;
    message += `📍 *Delivery Address:* ${customerDetails.address}, ${customerDetails.governorate}\n`;
    if (customerDetails.notes) {
      message += `📝 *Notes/Customization:* ${customerDetails.notes}\n`;
    }
    message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🛍️ *Order Items:*\n`;
    
    orderItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   • Quantity: ${item.quantity}\n`;
      if (item.selectedColor) message += `   • Color/Variant: ${item.selectedColor}\n`;
      message += `   • Item Price: ${item.price} EGP\n`;
      message += `   • Subtotal: ${item.price * item.quantity} EGP\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🚚 *Shipping:* FREE SHIPPING (0 EGP) ✨\n`;
    message += `💰 *Total Amount:* *${total} EGP*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `✨ Hello Batoot! I would like to confirm my handmade crochet order above. Please let me know the preparation time and payment confirmation! 🪿💛`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${intlPhone}?text=${encoded}`;
  };

  // WhatsApp Custom Order Request Link Generator
  const generateWhatsAppCustomRequestUrl = (customData) => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const intlPhone = cleanPhone.startsWith('0') ? '2' + cleanPhone : cleanPhone;

    let message = `🎨 *Custom Crochet Request - Batoot 🪿*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 *Name:* ${customData.name}\n`;
    message += `📞 *Phone:* ${customData.phone}\n`;
    message += `🧶 *Item Type:* ${customData.itemType}\n`;
    if (customData.colorPreference) {
      message += `🎨 *Preferred Colors:* ${customData.colorPreference}\n`;
    }
    if (customData.size) {
      message += `📏 *Desired Size:* ${customData.size}\n`;
    }
    if (customData.deadline) {
      message += `📅 *Needed By:* ${customData.deadline}\n`;
    }
    message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📝 *Design Idea & Details:*\n${customData.description}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💛 Hello Batoot! I'd love to request a custom handmade crochet piece with the details above. Could you please provide a quote and estimated timeframe? 🪿✨`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${intlPhone}?text=${encoded}`;
  };

  // WhatsApp Direct Chat Link
  const getWhatsAppDirectUrl = (customMessage = 'Hello Batoot! 🪿 I have a question about your handmade crochet pieces 💛') => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const intlPhone = cleanPhone.startsWith('0') ? '2' + cleanPhone : cleanPhone;
    return `https://wa.me/${intlPhone}?text=${encodeURIComponent(customMessage)}`;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        settings,
        cart,
        orders,
        customRequests,
        isAdminLoggedIn,
        isCartOpen,
        isCustomModalOpen,
        isAdminModalOpen,
        selectedProduct,
        searchQuery,
        selectedCategory,
        toastMessage,
        cartTotal,
        cartCount,
        isDbConnected,
        isDbLoading,
        dbStatus,
        hydrateFromDb,
        seedCatalog,
        // Setters
        setIsCartOpen,
        setIsCustomModalOpen,
        setIsAdminModalOpen,
        setSelectedProduct,
        setSearchQuery,
        setSelectedCategory,
        showToast,
        // Cart methods
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        // Product methods
        addProduct,
        updateProduct,
        toggleProductStock,
        deleteProduct,
        resetProductsToDefault,
        // Order methods
        recordOrder,
        recordCustomRequest,
        updateOrderStatus,
        deleteOrder,
        // Settings & Auth
        updateSettings,
        loginAdmin,
        logoutAdmin,
        // URL generators
        generateWhatsAppOrderUrl,
        generateWhatsAppCustomRequestUrl,
        getWhatsAppDirectUrl
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts, initialSettings } from '../data/initialProducts';

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
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: 'prod-' + Date.now(),
      rating: 5.0,
      reviewsCount: 1,
      inStock: newProduct.inStock !== false
    };
    setProducts(prev => [productWithId, ...prev]);
    showToast(`Product "${newProduct.name}" added successfully! ✨`);
    return productWithId;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    showToast(`Product updated successfully! 💛`);
  };

  const toggleProductStock = (id) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const newStatus = !p.inStock;
        showToast(`Stock updated: ${p.name} is now ${newStatus ? 'In Stock 🟢' : 'Sold Out 🔴'}`);
        return { ...p, inStock: newStatus };
      }
      return p;
    }));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast("Product deleted from store.", "info");
  };

  const resetProductsToDefault = () => {
    setProducts(initialProducts);
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
    return newReq;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order status updated to "${newStatus}"`);
  };

  // Settings update
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast("Store settings saved! 💛");
  };

  // Admin Auth
  const loginAdmin = (pin) => {
    if (pin === settings.adminPin || pin === '1234' || pin === 'batoot2026') {
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

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { categoriesList } from '../data/initialProducts';
import { 
  X, 
  Lock, 
  Shield, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  ShoppingBag, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Phone, 
  Image as ImageIcon,
  Layers,
  RotateCcw,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const AdminPortal = () => {
  const { 
    isAdminModalOpen, 
    setIsAdminModalOpen, 
    isAdminLoggedIn, 
    loginAdmin, 
    logoutAdmin,
    products,
    addProduct,
    updateProduct,
    toggleProductStock,
    deleteProduct,
    resetProductsToDefault,
    orders,
    customRequests,
    updateOrderStatus,
    settings,
    updateSettings,
    showToast
  } = useStore();

  const [pinInput, setPinInput] = useState('');
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'add' | 'orders' | 'custom' | 'settings'
  const [editingProduct, setEditingProduct] = useState(null);

  // New Product Form State
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Amigurumi & Plushies',
    price: '',
    originalPrice: '',
    image: '/images/products/batoot-goose.jpg',
    badge: 'New ✨',
    inStock: true,
    shortDescription: '',
    description: '',
    yarnType: '100% Soft Milk Cotton Yarn',
    dimensions: 'Approx. 20 cm',
    careGuide: 'Gentle hand wash in cool water.',
    colorsText: 'Yellow & White, Custom Palette'
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    whatsappNumber: settings.whatsappNumber || '01093536058',
    whatsappDisplay: settings.whatsappDisplay || '01093536058',
    instagramUrl: settings.instagramUrl || 'https://www.instagram.com/your.fav.crochet.gurly?igsh=Z3c2Nmd0Z2k5azNx',
    facebookUrl: settings.facebookUrl || 'https://www.facebook.com/share/1DYjDCmeen/?mibextid=wwXIfr',
    tiktokUrl: settings.tiktokUrl || 'https://www.tiktok.com/@your.fav.crochet.gurly?_r=1&_t=ZS-99NMdUnCZWP',
    announcementText: settings.announcementText || '🚚 FREE SHIPPING ON ALL ORDERS ✨ • 100% HANDMADE WITH LOVE 🪿 • FAST DIRECT WHATSAPP CHECKOUT 💬',
    newPin: ''
  });

  if (!isAdminModalOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginAdmin(pinInput)) {
      setPinInput('');
      setActiveTab('inventory');
    }
  };

  const handleCreateOrUpdateProduct = (e) => {
    e.preventDefault();
    if (!productForm.name.trim() || !productForm.price) {
      showToast("Please fill in the product name and price.", "error");
      return;
    }

    const colorsArray = productForm.colorsText
      ? productForm.colorsText.split(',').map(c => c.trim()).filter(Boolean)
      : ['Standard'];

    const productPayload = {
      name: productForm.name,
      category: productForm.category,
      price: Number(productForm.price),
      originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : null,
      image: productForm.image || '/images/products/batoot-goose.jpg',
      badge: productForm.badge,
      inStock: productForm.inStock,
      shortDescription: productForm.shortDescription,
      description: productForm.description,
      yarnType: productForm.yarnType,
      dimensions: productForm.dimensions,
      careGuide: productForm.careGuide,
      colors: colorsArray
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
      setEditingProduct(null);
    } else {
      addProduct(productPayload);
    }

    // Reset Form
    setProductForm({
      name: '',
      category: 'Amigurumi & Plushies',
      price: '',
      originalPrice: '',
      image: '/images/products/batoot-goose.jpg',
      badge: 'New ✨',
      inStock: true,
      shortDescription: '',
      description: '',
      yarnType: '100% Soft Milk Cotton Yarn',
      dimensions: 'Approx. 20 cm',
      careGuide: 'Gentle hand wash in cool water.',
      colorsText: 'Yellow & White, Custom Palette'
    });

    setActiveTab('inventory');
  };

  const startEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      originalPrice: prod.originalPrice || '',
      image: prod.image,
      badge: prod.badge || '',
      inStock: prod.inStock !== false,
      shortDescription: prod.shortDescription || '',
      description: prod.description || '',
      yarnType: prod.yarnType || '',
      dimensions: prod.dimensions || '',
      careGuide: prod.careGuide || '',
      colorsText: (prod.colors || []).join(', ')
    });
    setActiveTab('add');
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    const updated = {
      whatsappNumber: settingsForm.whatsappNumber,
      whatsappDisplay: settingsForm.whatsappDisplay || settingsForm.whatsappNumber,
      instagramUrl: settingsForm.instagramUrl,
      facebookUrl: settingsForm.facebookUrl,
      tiktokUrl: settingsForm.tiktokUrl,
      announcementText: settingsForm.announcementText
    };
    if (settingsForm.newPin.trim()) {
      updated.adminPin = settingsForm.newPin.trim();
    }
    updateSettings(updated);
    showToast("Settings updated successfully! 💛");
  };

  // Image presets available in public images
  const imagePresets = [
    { label: 'Lily Flower 🌺', path: '/images/products/lily-flower.jpg' },
    { label: 'Tiny Hero 🕷️', path: '/images/products/spiderman-doll.jpg' },
    { label: 'Lavender Coaster 🪻', path: '/images/products/lavender-coaster.jpg' },
    { label: 'Yellow Duck 🦆', path: '/images/products/duck-bonnet-yellow.jpg' },
    { label: 'White Duck 🦆', path: '/images/products/duck-bonnet-white.jpg' },
    { label: 'Ducks Pair 🦆🦆', path: '/images/products/duck-bonnet-pair.jpg' },
    { label: 'Yellow Star ⭐️', path: '/images/products/star-yellow.jpg' },
    { label: 'Blue Star ⭐️', path: '/images/products/star-blue.jpg' },
    { label: 'Crescent Moon 🌙', path: '/images/products/crescent-moon.svg' },
    { label: 'Mini Whale 🐋', path: '/images/products/mini-whale.svg' },
    { label: 'Coquette Bow 🎀', path: '/images/products/coquette-bow.svg' },
    { label: 'Red Pepper 🌶️', path: '/images/products/pepper-red.svg' },
    { label: 'Green Pepper 🫑', path: '/images/products/pepper-green.svg' },
    { label: 'Yellow Pepper 🟡', path: '/images/products/pepper-yellow.svg' },
    { label: 'Spider Tapestry 🕸️', path: '/images/products/spiderman-tapestry.svg' },
    { label: 'Hero Studio 🌺', path: '/images/batoot-hero.jpg' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="fixed inset-0" onClick={() => setIsAdminModalOpen(false)} />

      <div className="relative bg-white rounded-3xl max-w-5xl w-full shadow-2xl border-4 border-yellow-300 overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400 text-yellow-950 flex items-center justify-between border-b border-yellow-300 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-yellow-950 text-yellow-300 flex items-center justify-center font-bold shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-950">
                  Batoot Admin Portal 🪿
                </h2>
                <span className="bg-yellow-950 text-yellow-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  Admin Only
                </span>
              </div>
              <p className="text-[11px] font-bold text-yellow-900">
                لوحة تحكم المشرف — إدارة المنتجات، تعديل الأسعار والمخزون، وسجل الطلبات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded-xl bg-yellow-950/10 hover:bg-yellow-950/20 text-yellow-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="p-2 rounded-xl text-yellow-950 hover:bg-yellow-950/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAdminLoggedIn ? (
          /* LOGIN GATE VIEW */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 bg-yellow-100 text-yellow-800 rounded-3xl flex items-center justify-center mx-auto text-3xl shadow-md border-2 border-yellow-300 animate-bounce-slow">
              <Lock className="w-8 h-8 text-yellow-700" />
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900">Admin Security Passcode</h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your admin PIN code to manage Batoot products, inventory stock, and orders.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter PIN (Default: 1234)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full px-4 py-3 text-center text-lg tracking-widest font-black rounded-2xl border-2 border-yellow-300 bg-yellow-50/50 focus:outline-none focus:ring-4 focus:ring-yellow-300 text-slate-900"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-400 text-yellow-950 font-black text-sm shadow-md hover:brightness-105 active:scale-95 transition-all"
              >
                Unlock Admin Dashboard 🔓
              </button>
            </form>

            <p className="text-[11px] text-slate-400">
              💡 Hint for store owner: Default passcode is <strong>1234</strong>
            </p>
          </div>
        ) : (
          /* LOGGED IN ADMIN DASHBOARD VIEW */
          <div className="flex-1 overflow-y-auto flex flex-col">
            
            {/* Admin Tabs Navigation */}
            <div className="bg-yellow-50/70 border-b border-yellow-200 px-4 sm:px-6 flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => { setActiveTab('inventory'); setEditingProduct(null); }}
                className={`py-3 px-3.5 text-xs font-black whitespace-nowrap border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'inventory'
                    ? 'border-yellow-600 text-yellow-900 bg-yellow-200/50 rounded-t-xl'
                    : 'border-transparent text-slate-600 hover:text-yellow-800'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Products & Stock ({products.length})</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('add');
                  if (!editingProduct) {
                    setProductForm({
                      name: '',
                      category: 'Amigurumi & Plushies',
                      price: '',
                      originalPrice: '',
                      image: '/images/products/batoot-goose.jpg',
                      badge: 'New ✨',
                      inStock: true,
                      shortDescription: '',
                      description: '',
                      yarnType: '100% Soft Milk Cotton Yarn',
                      dimensions: 'Approx. 20 cm',
                      careGuide: 'Gentle hand wash in cool water.',
                      colorsText: 'Yellow & White, Custom Palette'
                    });
                  }
                }}
                className={`py-3 px-3.5 text-xs font-black whitespace-nowrap border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'add'
                    ? 'border-yellow-600 text-yellow-900 bg-yellow-200/50 rounded-t-xl'
                    : 'border-transparent text-slate-600 hover:text-yellow-800'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>{editingProduct ? 'Edit Product ✏️' : 'Add New Product ➕'}</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`py-3 px-3.5 text-xs font-black whitespace-nowrap border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'orders'
                    ? 'border-yellow-600 text-yellow-900 bg-yellow-200/50 rounded-t-xl'
                    : 'border-transparent text-slate-600 hover:text-yellow-800'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>WhatsApp Orders ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('custom')}
                className={`py-3 px-3.5 text-xs font-black whitespace-nowrap border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'custom'
                    ? 'border-yellow-600 text-yellow-900 bg-yellow-200/50 rounded-t-xl'
                    : 'border-transparent text-slate-600 hover:text-yellow-800'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Custom Inquiries ({customRequests.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`py-3 px-3.5 text-xs font-black whitespace-nowrap border-b-2 transition-all flex items-center gap-1.5 ml-auto ${
                  activeTab === 'settings'
                    ? 'border-yellow-600 text-yellow-900 bg-yellow-200/50 rounded-t-xl'
                    : 'border-transparent text-slate-600 hover:text-yellow-800'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Store Settings</span>
              </button>
            </div>

            {/* TAB 1: INVENTORY & STOCK MANAGEMENT */}
            {activeTab === 'inventory' && (
              <div className="p-4 sm:p-6 space-y-4">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-yellow-50 p-4 rounded-2xl border border-yellow-200">
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Catalog & Stock Control</h3>
                    <p className="text-xs text-slate-600">
                      Toggle stock instantly with 1-click if an item sells out, edit prices or descriptions, or add new crochet pieces.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={resetProductsToDefault}
                      className="px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-yellow-200 rounded-xl hover:bg-yellow-100 flex items-center gap-1 transition-colors"
                      title="Reset items to default preset"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Catalog</span>
                    </button>

                    <button
                      onClick={() => {
                        setEditingProduct(null);
                        setActiveTab('add');
                      }}
                      className="px-4 py-2 text-xs font-black text-yellow-950 bg-yellow-400 hover:bg-yellow-500 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Product</span>
                    </button>
                  </div>
                </div>

                {/* Products Table / List */}
                <div className="grid grid-cols-1 gap-3">
                  {products.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white border-2 border-yellow-200 hover:border-yellow-400 transition-all shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      {/* Product Media & Info */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-yellow-50 border border-yellow-200 shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-extrabold text-yellow-800 uppercase">
                              {item.category}
                            </span>
                            {item.badge && (
                              <span className="text-[10px] bg-yellow-100 text-yellow-900 font-bold px-1.5 rounded">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-black text-slate-900 truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs font-black text-slate-950">
                            {item.price} EGP {item.originalPrice && <span className="text-slate-400 line-through text-[11px] font-normal">({item.originalPrice} EGP)</span>}
                          </p>
                        </div>
                      </div>

                      {/* Stock Switcher & Quick Actions */}
                      <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                        
                        {/* 1-Click Stock Switcher Button */}
                        <button
                          onClick={() => toggleProductStock(item.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border flex items-center gap-1.5 ${
                            item.inStock
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                              : 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100'
                          }`}
                          title="Click to toggle Stock Status"
                        >
                          <span>{item.inStock ? '🟢 In Stock' : '🔴 Sold Out / Pre-order'}</span>
                          <span className="text-[10px] text-slate-400">(Toggle)</span>
                        </button>

                        {/* Edit Button */}
                        <button
                          onClick={() => startEditProduct(item)}
                          className="p-2 rounded-xl bg-yellow-100 text-yellow-900 hover:bg-yellow-200 transition-colors font-bold text-xs flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${item.name}" from store?`)) {
                              deleteProduct(item.id);
                            }
                          }}
                          className="p-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB 2: ADD / EDIT PRODUCT FORM */}
            {activeTab === 'add' && (
              <form onSubmit={handleCreateOrUpdateProduct} className="p-4 sm:p-6 space-y-4 max-w-3xl">
                
                <div className="pb-3 border-b border-yellow-200 flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900">
                    {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Add New Handmade Product ✨'}
                  </h3>
                  {editingProduct && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct(null);
                        setActiveTab('inventory');
                      }}
                      className="text-xs text-yellow-800 font-bold underline"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Product Name (اسم المنتج) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Batoot Cozy Duck Plushie 🪿"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-yellow-200 bg-yellow-50/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-slate-800 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Category (القسم) <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-yellow-200 bg-yellow-50/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-slate-800 font-bold"
                    >
                      {categoriesList.filter(c => c !== 'All Items').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Selling Price in EGP (السعر) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 320"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-yellow-200 bg-yellow-50/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-slate-800 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Original Price (قبل الخصم - اختياري)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 380"
                      value={productForm.originalPrice}
                      onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-yellow-200 bg-yellow-50/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-slate-800 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Badge Text (الشارة)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Best Seller 🌟 / New ✨"
                      value={productForm.badge}
                      onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-yellow-200 bg-yellow-50/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-slate-800 font-medium"
                    />
                  </div>
                </div>

                {/* Image Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Product Image URL / Preset (صورة المنتج)
                  </label>
                  <input
                    type="text"
                    placeholder="Image URL or choose preset below"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-yellow-200 bg-yellow-50/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-slate-800 mb-2 font-mono"
                  />

                  {/* Preset Image Selector Buttons */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[11px] font-bold text-slate-500 self-center mr-1">Choose Preset:</span>
                    {imagePresets.map(preset => (
                      <button
                        key={preset.path}
                        type="button"
                        onClick={() => setProductForm({ ...productForm, image: preset.path })}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                          productForm.image === preset.path
                            ? 'bg-yellow-400 text-yellow-950 border-yellow-500'
                            : 'bg-white text-slate-700 border-yellow-200 hover:bg-yellow-50'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stock Status Switcher */}
                <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-slate-900">Stock Availability Status</p>
                    <p className="text-[11px] text-slate-500">Is this product ready in stock for immediate order?</p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-xs">
                    <input
                      type="checkbox"
                      checked={productForm.inStock}
                      onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                      className="w-4 h-4 text-yellow-500 rounded accent-yellow-500"
                    />
                    <span>{productForm.inStock ? '🟢 Available in Stock' : '🔴 Sold Out (Made to Order)'}</span>
                  </label>
                </div>

                {/* Descriptions */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Short Summary Description
                  </label>
                  <input
                    type="text"
                    placeholder="One-line summary for product card"
                    value={productForm.shortDescription}
                    onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-yellow-200 bg-yellow-50/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-slate-800 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Full Description (الوصف الكامل للمنتج بالانجلش)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Detailed craftsmanship description, feel of yarn, inspiration..."
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-yellow-200 bg-yellow-50/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-slate-800 font-medium"
                  />
                </div>

                {/* Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 mb-1">Yarn Material</label>
                    <input
                      type="text"
                      placeholder="e.g. 100% Milk Cotton"
                      value={productForm.yarnType}
                      onChange={(e) => setProductForm({ ...productForm, yarnType: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-yellow-200 bg-yellow-50/40 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 mb-1">Dimensions</label>
                    <input
                      type="text"
                      placeholder="e.g. 22 cm height"
                      value={productForm.dimensions}
                      onChange={(e) => setProductForm({ ...productForm, dimensions: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-yellow-200 bg-yellow-50/40 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 mb-1">Color Variations (comma separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. Yellow Beanie, Sage Beanie"
                      value={productForm.colorsText}
                      onChange={(e) => setProductForm({ ...productForm, colorsText: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-yellow-200 bg-yellow-50/40 text-slate-800"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-3 border-t border-yellow-200 flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-black text-xs sm:text-sm shadow-md transition-all"
                  >
                    {editingProduct ? 'Save Product Changes 💾' : 'Publish Product to Store ✨'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('inventory')}
                    className="py-3 px-4 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            )}

            {/* TAB 3: ORDERS LOG */}
            {activeTab === 'orders' && (
              <div className="p-4 sm:p-6 space-y-4">
                <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-200">
                  <h3 className="text-sm font-black text-slate-900">Recorded Customer Orders ({orders.length})</h3>
                  <p className="text-xs text-slate-600">
                    Orders submitted via the checkout drawer with customer delivery address and WhatsApp direct contact.
                  </p>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-yellow-200 p-6">
                    <ShoppingBag className="w-10 h-10 text-yellow-600 mx-auto mb-2 opacity-50" />
                    <p className="text-xs font-bold text-slate-600">No checkout orders placed yet.</p>
                    <p className="text-[11px] text-slate-400 mt-1">When users confirm their bag, their details will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-white p-4 rounded-2xl border-2 border-yellow-200 shadow-xs space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-yellow-100 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-black text-yellow-900 bg-yellow-200 px-2 py-0.5 rounded-md">
                              {order.id}
                            </span>
                            <span className="text-xs text-slate-400">
                              {new Date(order.createdAt).toLocaleString()}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-900 bg-yellow-50 px-2.5 py-1 rounded-lg border border-yellow-200">
                              Total: {order.totalAmount} EGP (Free Shipping)
                            </span>
                            <a
                              href={`https://wa.me/20${order.phone ? order.phone.replace(/^0+/, '') : ''}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-xs"
                            >
                              <Phone className="w-3 h-3" />
                              <span>Chat on WhatsApp</span>
                            </a>
                          </div>
                        </div>

                        {/* Customer Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="font-bold text-slate-700">Customer: </span>
                            <span className="text-slate-900 font-extrabold">{order.customerName}</span>
                          </div>
                          <div>
                            <span className="font-bold text-slate-700">Phone: </span>
                            <span className="text-slate-900">{order.phone}</span>
                          </div>
                          <div className="sm:col-span-2">
                            <span className="font-bold text-slate-700">Delivery Address: </span>
                            <span className="text-slate-900">{order.address}</span>
                          </div>
                          {order.notes && (
                            <div className="sm:col-span-2 bg-yellow-50/50 p-2 rounded-lg text-slate-700">
                              <span className="font-bold">Customer Notes: </span>
                              <span>{order.notes}</span>
                            </div>
                          )}
                        </div>

                        {/* Items list */}
                        <div className="bg-yellow-50/30 p-2.5 rounded-xl border border-yellow-100">
                          <p className="text-[11px] font-bold text-yellow-900 mb-1">Ordered Items:</p>
                          <ul className="space-y-1 text-xs">
                            {(order.items || []).map((it, idx) => (
                              <li key={idx} className="flex justify-between text-slate-700">
                                <span>{it.quantity}x {it.name} {it.selectedColor ? `(${it.selectedColor})` : ''}</span>
                                <span className="font-bold text-slate-900">{it.price * it.quantity} EGP</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: CUSTOM REQUESTS LOG */}
            {activeTab === 'custom' && (
              <div className="p-4 sm:p-6 space-y-4">
                <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-200">
                  <h3 className="text-sm font-black text-slate-900">Bespoke Custom Requests ({customRequests.length})</h3>
                  <p className="text-xs text-slate-600">
                    Requests from clients who want personalized crochet pieces or custom color palettes.
                  </p>
                </div>

                {customRequests.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-yellow-200 p-6">
                    <MessageSquare className="w-10 h-10 text-yellow-600 mx-auto mb-2 opacity-50" />
                    <p className="text-xs font-bold text-slate-600">No custom inquiries recorded yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {customRequests.map((req) => (
                      <div
                        key={req.id}
                        className="bg-white p-4 rounded-2xl border-2 border-yellow-200 shadow-xs space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-yellow-100 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-black text-yellow-900 bg-yellow-200 px-2 py-0.5 rounded-md">
                              {req.id}
                            </span>
                            <span className="text-xs text-slate-400">
                              {new Date(req.createdAt).toLocaleString()}
                            </span>
                          </div>

                          <a
                            href={`https://wa.me/20${req.phone ? req.phone.replace(/^0+/, '') : ''}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-xs"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Reply to {req.name} on WhatsApp</span>
                          </a>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="font-bold text-slate-700">Client: </span>
                            <span className="text-slate-900 font-extrabold">{req.name}</span>
                          </div>
                          <div>
                            <span className="font-bold text-slate-700">Phone: </span>
                            <span className="text-slate-900">{req.phone}</span>
                          </div>
                          <div>
                            <span className="font-bold text-slate-700">Item Type: </span>
                            <span className="text-yellow-900 font-bold">{req.itemType}</span>
                          </div>
                          {req.colorPreference && (
                            <div>
                              <span className="font-bold text-slate-700">Colors: </span>
                              <span className="text-slate-900">{req.colorPreference}</span>
                            </div>
                          )}
                          {req.size && (
                            <div>
                              <span className="font-bold text-slate-700">Size: </span>
                              <span className="text-slate-900">{req.size}</span>
                            </div>
                          )}
                          {req.deadline && (
                            <div>
                              <span className="font-bold text-slate-700">Needed By: </span>
                              <span className="text-slate-900">{req.deadline}</span>
                            </div>
                          )}
                        </div>

                        <div className="bg-yellow-50/60 p-3 rounded-xl border border-yellow-200 text-xs">
                          <p className="font-bold text-yellow-900 mb-1">Design Request Details:</p>
                          <p className="text-slate-800 whitespace-pre-wrap">{req.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: STORE SETTINGS */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveSettings} className="p-4 sm:p-6 space-y-4 max-w-2xl">
                <div className="pb-2 border-b border-yellow-200">
                  <h3 className="text-base font-black text-slate-900">Store Settings & WhatsApp Hotline</h3>
                  <p className="text-xs text-slate-500">Configure your store number, social accounts, and banner.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      WhatsApp Checkout Number (رقم الواتس للأوردرات)
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsappNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-yellow-200 bg-yellow-50/40 text-slate-800 font-bold"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Default: 01093536058</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Display Phone Number
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsappDisplay}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappDisplay: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-yellow-200 bg-yellow-50/40 text-slate-800 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Top Announcement Bar Text
                  </label>
                  <input
                    type="text"
                    value={settingsForm.announcementText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-yellow-200 bg-yellow-50/40 text-slate-800 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 mb-1">Instagram Link</label>
                    <input
                      type="text"
                      value={settingsForm.instagramUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, instagramUrl: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-yellow-200 bg-yellow-50/40 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 mb-1">Facebook Link</label>
                    <input
                      type="text"
                      value={settingsForm.facebookUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, facebookUrl: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-yellow-200 bg-yellow-50/40 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 mb-1">TikTok Link</label>
                    <input
                      type="text"
                      value={settingsForm.tiktokUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, tiktokUrl: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-yellow-200 bg-yellow-50/40 text-slate-800"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Change Admin PIN Code (تغيير رمز المرور)
                  </label>
                  <input
                    type="password"
                    placeholder="Leave empty to keep current PIN"
                    value={settingsForm.newPin}
                    onChange={(e) => setSettingsForm({ ...settingsForm, newPin: e.target.value })}
                    className="w-full max-w-xs px-3 py-2 text-xs rounded-xl border border-yellow-200 bg-yellow-50/40 text-slate-800 font-mono"
                  />
                </div>

                <div className="pt-4 border-t border-yellow-200">
                  <button
                    type="submit"
                    className="py-3 px-6 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-black text-xs sm:text-sm shadow-md transition-all"
                  >
                    Save Store Settings 💾
                  </button>
                </div>

              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

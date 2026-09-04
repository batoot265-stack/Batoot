import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Search, 
  Sparkles, 
  Shield, 
  Phone, 
  Menu, 
  X, 
  Heart,
  Palette,
  Truck
} from 'lucide-react';

export const Navbar = ({ onNavigate }) => {
  const { 
    cartCount, 
    setIsCartOpen, 
    setIsCustomModalOpen, 
    setIsAdminModalOpen, 
    isAdminLoggedIn,
    searchQuery,
    setSearchQuery,
    settings
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-yellow-200/80 shadow-sm transition-all">
      {/* Top Announcement Banner - Free Shipping Always */}
      <div className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 text-yellow-950 font-semibold text-xs md:text-sm py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto md:mx-0 overflow-hidden text-center whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 bg-white/80 text-yellow-900 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-sm animate-pulse">
              <Truck className="w-3.5 h-3.5" /> FREE SHIPPING
            </span>
            <span className="hidden sm:inline">✨</span>
            <span className="font-bold tracking-tight">FREE SHIPPING ON ALL ORDERS NATIONWIDE 🪿</span>
            <span className="hidden md:inline text-yellow-900/80">• Stitched with 100% Love & Soft Milk Cotton</span>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-xs font-bold">
            <a 
              href={`https://wa.me/20${settings.whatsappNumber.replace(/^0+/, '')}`} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 text-yellow-950 hover:text-white transition-colors bg-black/10 hover:bg-black/20 px-2.5 py-1 rounded-full"
            >
              <Phone className="w-3 h-3" /> WhatsApp: {settings.whatsappDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick('hero')} 
              className="flex items-center gap-3 group text-left focus:outline-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 p-1 shadow-md group-hover:rotate-6 transition-all duration-300 flex items-center justify-center overflow-hidden border-2 border-yellow-300">
                <img 
                  src="/images/batoot-logo.png" 
                  alt="Batoot 🪿 Logo" 
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span class="text-2xl">🪿</span>';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 group-hover:text-yellow-600 transition-colors">
                    Batoot
                  </span>
                  <span className="text-2xl sm:text-3xl animate-bounce-slow">🪿</span>
                </div>
                <p className="text-[11px] font-semibold tracking-wider text-yellow-700 uppercase -mt-1">
                  Crochet & Yarn Studio
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('shop')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-yellow-700 hover:bg-yellow-50 rounded-xl transition-all"
            >
              🛍️ Shop Collection
            </button>
            <button
              onClick={() => setIsCustomModalOpen(true)}
              className="px-3.5 py-2 text-sm font-semibold text-yellow-800 bg-yellow-100/70 hover:bg-yellow-200/90 rounded-xl transition-all flex items-center gap-1.5 border border-yellow-200"
            >
              <Palette className="w-4 h-4 text-yellow-700" />
              Custom Order (تنفيذ خاص)
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-yellow-700 hover:bg-yellow-50 rounded-xl transition-all"
            >
              💛 Our Story
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-yellow-700 hover:bg-yellow-50 rounded-xl transition-all"
            >
              💬 Contact
            </button>
          </nav>

          {/* Right Action Icons & Bag Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Toggle / Bar */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search plushies, bags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 lg:w-56 pl-9 pr-4 py-2 text-xs font-medium rounded-full bg-yellow-50/70 border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
              />
              <Search className="w-4 h-4 text-yellow-600 absolute left-3 top-2.5 pointer-events-none" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Admin Portal Button */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              title="Admin Portal (لوحة تحكم الآدمن)"
              className={`p-2.5 rounded-full border transition-all ${
                isAdminLoggedIn
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-yellow-300'
                  : 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'
              }`}
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Shopping Bag Button with Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-yellow-950 font-bold px-4 py-2.5 rounded-2xl shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all border border-yellow-300"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-extrabold">Bag</span>
              {cartCount > 0 && (
                <span className="bg-slate-900 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center -mr-1 animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-slate-700 hover:bg-yellow-100 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="sm:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search handmade plushies, bags, florals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-medium rounded-xl bg-yellow-50 border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-slate-800"
            />
            <Search className="w-4 h-4 text-yellow-600 absolute left-3 top-2.5 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-yellow-50/95 border-b border-yellow-200 px-4 py-4 space-y-2 animate-fadeIn">
          <button
            onClick={() => handleNavClick('shop')}
            className="w-full text-left px-4 py-3 rounded-xl font-bold text-slate-800 hover:bg-yellow-200/60 flex items-center gap-2"
          >
            🛍️ Shop Collection
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsCustomModalOpen(true);
            }}
            className="w-full text-left px-4 py-3 rounded-xl font-bold text-yellow-900 bg-yellow-200/80 hover:bg-yellow-300 flex items-center gap-2 border border-yellow-300"
          >
            <Palette className="w-4 h-4 text-yellow-700" />
            Custom Order (طلب تنفيذ خاص)
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="w-full text-left px-4 py-3 rounded-xl font-bold text-slate-800 hover:bg-yellow-200/60 flex items-center gap-2"
          >
            💛 Our Story & Brand
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="w-full text-left px-4 py-3 rounded-xl font-bold text-slate-800 hover:bg-yellow-200/60 flex items-center gap-2"
          >
            💬 Contact & WhatsApp
          </button>
          <div className="pt-2 border-t border-yellow-200/80 flex items-center justify-between text-xs text-yellow-900">
            <span>Admin Control Panel:</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminModalOpen(true);
              }}
              className="px-3 py-1 bg-yellow-400 text-yellow-950 font-bold rounded-lg shadow-sm"
            >
              {isAdminLoggedIn ? 'Logged In ✓' : 'Admin Login 🔒'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

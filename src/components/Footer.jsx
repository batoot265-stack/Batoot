import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, Phone, Instagram, Facebook, Shield, Truck, Sparkles } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  const { settings, setIsCustomModalOpen, setIsAdminModalOpen, getWhatsAppDirectUrl } = useStore();

  const handleNav = (id) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#2B231A] text-yellow-50 pt-16 pb-12 border-t-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-yellow-900/50">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-300 to-amber-400 text-yellow-950 flex items-center justify-center font-bold text-2xl shadow-md border-2 border-yellow-200">
                🪿
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                  Batoot 🪿
                </span>
                <p className="text-xs text-yellow-400 font-bold tracking-wider uppercase">
                  Handmade Crochet Art Studio
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-yellow-100/70 leading-relaxed max-w-sm">
              Crafting cozy handmade crochet plushies, trendy tote bags, everlasting florals, and customized gifts. Stitched with love, patience, and ultra-soft hypoallergenic yarn.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-yellow-900/50 hover:bg-yellow-400 hover:text-yellow-950 text-yellow-300 flex items-center justify-center transition-all shadow-xs"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-yellow-900/50 hover:bg-yellow-400 hover:text-yellow-950 text-yellow-300 flex items-center justify-center transition-all shadow-xs"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href={getWhatsAppDirectUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-yellow-900/50 hover:bg-emerald-500 hover:text-white text-yellow-300 flex items-center justify-center transition-all shadow-xs"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-yellow-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium text-yellow-100/80">
              <li>
                <button onClick={() => handleNav('hero')} className="hover:text-yellow-300 transition-colors">
                  🏠 Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-yellow-300 transition-colors">
                  🛍️ Shop Collection
                </button>
              </li>
              <li>
                <button onClick={() => setIsCustomModalOpen(true)} className="hover:text-yellow-300 transition-colors">
                  🎨 Custom Orders (تنفيذ خاص)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-yellow-300 transition-colors">
                  💛 Our Story
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-yellow-300 transition-colors">
                  💬 Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Free Shipping Highlight */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-yellow-400">
              Contact & Orders
            </h4>
            
            <div className="space-y-2 text-xs text-yellow-100/80">
              <p className="flex items-center gap-2">
                <span className="text-yellow-400 font-bold">WhatsApp:</span>
                <a 
                  href={`https://wa.me/20${settings.whatsappNumber.replace(/^0+/, '')}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="font-mono font-bold text-white hover:text-yellow-300 underline"
                >
                  {settings.whatsappDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-yellow-400 font-bold">Direct Phone:</span>
                <span className="font-mono text-white">{settings.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-yellow-400 font-bold">Shipping:</span>
                <span className="text-emerald-400 font-bold">FREE SHIPPING Nationwide 🚚</span>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-yellow-900/60 hover:bg-yellow-800 text-yellow-300 text-[11px] font-bold border border-yellow-700/50 transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Portal Login</span>
              </button>
            </div>
          </div>

        </div>

        {/* Copyright & Signoff */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-yellow-200/60">
          <p>© {new Date().getFullYear()} Batoot 🪿 — All Rights Reserved.</p>
          <p className="flex items-center gap-1 font-medium">
            <span>Handmade with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>in Egypt</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

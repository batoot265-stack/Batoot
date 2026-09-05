import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, Phone, Instagram, Facebook, Shield, Truck, Sparkles, ExternalLink } from 'lucide-react';

const TikTokIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.32 0 .62.06.9.16V9.42a6.34 6.34 0 0 0-.9-.07A6.33 6.33 0 0 0 3.16 15.68 6.33 6.33 0 0 0 9.49 22a6.33 6.33 0 0 0 6.33-6.32V8.71a8.28 8.28 0 0 0 4.84 1.57V6.83c-.36 0-.72-.05-1.07-.14z"/>
  </svg>
);

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
    <footer className="bg-[#241C14] text-yellow-50 pt-16 pb-12 border-t-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-yellow-900/50">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-300 to-amber-400 text-yellow-950 flex items-center justify-center font-bold text-2xl shadow-md border-2 border-yellow-200 overflow-hidden">
                <img src="/images/batoot-logo.png" alt="Batoot Logo" className="w-full h-full object-cover" />
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
              Handcrafted crochet companions, floral bouquets, and bespoke accessories. Woven stitch-by-stitch with ultra-soft hypoallergenic yarn.
            </p>

            {/* Social Icons Bar */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-yellow-900/60 hover:bg-[#E1306C] text-yellow-200 hover:text-white flex items-center justify-center transition-all shadow-sm"
                title="Follow on Instagram (@your.fav.crochet.gurly)"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href={settings.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-yellow-900/60 hover:bg-black text-yellow-200 hover:text-[#00f2fe] flex items-center justify-center transition-all shadow-sm"
                title="Watch on TikTok (@your.fav.crochet.gurly)"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>

              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-yellow-900/60 hover:bg-[#1877F2] text-yellow-200 hover:text-white flex items-center justify-center transition-all shadow-sm"
                title="Follow on Facebook"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href={`https://wa.me/20${settings.whatsappNumber.replace(/^0+/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-yellow-900/60 hover:bg-emerald-500 text-yellow-200 hover:text-white flex items-center justify-center transition-all shadow-sm"
                title="Chat on WhatsApp (01093536058)"
                aria-label="WhatsApp"
              >
                <Phone className="w-5 h-5" />
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
                  🏠 Home & Hero
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
                  💬 Contact & WhatsApp
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

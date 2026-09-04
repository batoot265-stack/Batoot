import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, MessageCircle, Instagram, Facebook, Sparkles, Send, ExternalLink, Heart } from 'lucide-react';

// TikTok Icon SVG Component
const TikTokIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.32 0 .62.06.9.16V9.42a6.34 6.34 0 0 0-.9-.07A6.33 6.33 0 0 0 3.16 15.68 6.33 6.33 0 0 0 9.49 22a6.33 6.33 0 0 0 6.33-6.32V8.71a8.28 8.28 0 0 0 4.84 1.57V6.83c-.36 0-.72-.05-1.07-.14z"/>
  </svg>
);

export const SocialsAndContact = () => {
  const { settings, getWhatsAppDirectUrl } = useStore();
  const [quickMsg, setQuickMsg] = useState('');

  const handleSendQuickMsg = (e) => {
    e.preventDefault();
    if (!quickMsg.trim()) return;
    const url = getWhatsAppDirectUrl(quickMsg);
    window.open(url, '_blank');
    setQuickMsg('');
  };

  return (
    <section id="contact" className="py-16 bg-white border-b border-yellow-200/60 relative overflow-hidden">
      
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-yellow-100 text-yellow-900 text-xs font-black uppercase tracking-wider mb-3 border border-yellow-200">
            <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
            <span>Follow Our Cozy Community</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Connect with Batoot 🪿💛
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Follow our daily crochet creations, behind-the-scenes tutorials, and message us directly anytime!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Direct Channels & Socials */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 1. Official WhatsApp Card */}
            <a
              href={`https://wa.me/20${settings.whatsappNumber.replace(/^0+/, '')}`}
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-emerald-200 hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                  💬
                </div>
                <h3 className="text-lg font-black">Official WhatsApp</h3>
                <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
                  Fastest customer support, inquiries & instant custom orders.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-400/50 flex items-center justify-between font-mono font-black text-sm">
                <span>{settings.whatsappDisplay}</span>
                <span className="text-xs font-sans bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  Chat Now <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>

            {/* 2. Instagram Card */}
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-3xl bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-lg hover:shadow-pink-200 hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                  <Instagram className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black">Instagram</h3>
                <p className="text-xs text-pink-100 mt-1">
                  New yarn drops, daily crochet stories & photo reels!
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between font-bold text-xs">
                <span>@your.fav.crochet.gurly</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1">
                  Follow <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>

            {/* 3. TikTok Card */}
            <a
              href={settings.tiktokUrl}
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-neutral-900 to-black text-white shadow-lg hover:shadow-slate-300 hover:-translate-y-1 transition-all flex flex-col justify-between group border border-slate-800"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform text-[#00f2fe]">
                  <TikTokIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black flex items-center gap-1.5">
                  <span>TikTok</span>
                  <span className="text-[10px] bg-rose-500 text-white font-extrabold px-1.5 py-0.2 rounded-full">Viral</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Watch soothing crochet ASMR videos & behind the scenes!
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between font-bold text-xs">
                <span>@your.fav.crochet.gurly</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1">
                  Watch <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>

            {/* 4. Facebook Card */}
            <a
              href={settings.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-3xl bg-gradient-to-br from-[#1877F2] to-[#0D65D9] text-white shadow-lg hover:shadow-blue-200 hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                  <Facebook className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black">Facebook Page</h3>
                <p className="text-xs text-blue-100 mt-1">
                  Customer reviews, photo albums & community discussions.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between font-bold text-xs">
                <span>Batoot Crochet</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1">
                  Visit <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>

          </div>

          {/* Right Column: Quick Direct Message on WhatsApp Box */}
          <div className="lg:col-span-5 bg-gradient-to-b from-yellow-100/70 to-yellow-50 p-6 sm:p-8 rounded-3xl border-2 border-yellow-300 shadow-xl shadow-yellow-100/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🪿💬</span>
                <h3 className="text-xl font-black text-slate-900">Direct Chat with Batoot</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Type your message below to start an instant WhatsApp conversation with our crochet artisan on <strong>{settings.whatsappDisplay}</strong>.
              </p>

              <form onSubmit={handleSendQuickMsg} className="space-y-3">
                <textarea
                  rows={4}
                  required
                  placeholder="Hi Batoot! 🪿 I have a question about custom designs / delivery..."
                  value={quickMsg}
                  onChange={(e) => setQuickMsg(e.target.value)}
                  className="w-full p-3.5 text-xs rounded-2xl border border-yellow-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 font-medium text-slate-800 shadow-inner"
                />

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Send to WhatsApp (01093536058) 💬</span>
                </button>
              </form>
            </div>

            <div className="pt-4 mt-4 border-t border-yellow-200/80 flex items-center justify-between text-[11px] text-yellow-900 font-bold">
              <span>🚚 Free Shipping on all orders</span>
              <span>💛 Made with love in Egypt</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

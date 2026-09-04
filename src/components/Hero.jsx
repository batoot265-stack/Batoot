import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, Heart, ShieldCheck, Palette, Truck, Star } from 'lucide-react';

export const Hero = () => {
  const { setIsCustomModalOpen, setSelectedProduct, products, getWhatsAppDirectUrl } = useStore();

  const heroLily = products.find(p => p.id === 'prod-lily-flower') || products[0];

  const handleScrollToShop = () => {
    const el = document.getElementById('shop');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-yellow-100/70 via-[#FFFDF5] to-white py-12 lg:py-20 border-b border-yellow-100">
      
      {/* Soft Background Accents */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-200/80 border border-yellow-300 text-yellow-900 text-xs sm:text-sm font-bold shadow-sm animate-pulse-subtle">
              <span className="text-lg">🪿</span>
              <span>100% Artisan Handmade Crochet</span>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-600"></span>
              <span className="text-yellow-800 font-extrabold">Free Shipping Always</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Crafted with <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600">Warmth</span>, <br />
              Stitched with <span className="underline decoration-yellow-400 decoration-wavy decoration-2">Love</span> 🪿💛
            </h1>

            {/* English Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Welcome to <strong className="text-yellow-900 font-bold">Batoot 🪿</strong> — your cozy sanctuary for handmade crochet treasures. 
              From cuddly amigurumi plushies and aesthetic daisy tote bags to everlasting floral bouquets, 
              every single piece is lovingly hand-hooked stitch-by-stitch with ultra-soft milk cotton yarn.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={handleScrollToShop}
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-slate-950 px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base shadow-lg shadow-yellow-200/70 hover:shadow-xl hover:scale-[1.02] active:scale-98 transition-all border border-yellow-300"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsCustomModalOpen(true)}
                className="flex items-center gap-2 bg-white text-yellow-950 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base border-2 border-yellow-300 hover:bg-yellow-50 hover:border-yellow-400 shadow-sm transition-all"
              >
                <Palette className="w-4 h-4 text-yellow-600" />
                <span>Request Custom Piece</span>
              </button>

              <a
                href={getWhatsAppDirectUrl('Hello Batoot! 🪿 I would love to check out your crochet collection!')}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-5 py-3.5 rounded-2xl font-bold text-sm border border-emerald-200 hover:bg-emerald-100 transition-all"
              >
                <span className="text-base">💬</span>
                <span>WhatsApp: 01093536058</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-yellow-200/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/70 border border-yellow-100 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-yellow-100 text-yellow-800 flex items-center justify-center font-bold shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900">Free Shipping</p>
                  <p className="text-[10px] text-slate-500">All orders nationwide</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/70 border border-yellow-100 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-yellow-100 text-yellow-800 flex items-center justify-center font-bold shrink-0">
                  🧶
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900">100% Handmade</p>
                  <p className="text-[10px] text-slate-500">Milk cotton yarn</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/70 border border-yellow-100 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-yellow-100 text-yellow-800 flex items-center justify-center font-bold shrink-0">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900">Custom Designs</p>
                  <p className="text-[10px] text-slate-500">Colors & sizes</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/70 border border-yellow-100 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-yellow-100 text-yellow-800 flex items-center justify-center font-bold shrink-0">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900">Made with Love</p>
                  <p className="text-[10px] text-slate-500">Gift-ready packaging</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Showcase Image / Mascot Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Decorative Floating Mascot Badges */}
            <div className="relative w-full max-w-md">
              
              {/* Main Hero Card */}
              <div className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-2xl shadow-yellow-200/60 border-4 border-yellow-200 transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                
                {/* Hero Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-yellow-50 group">
                  <img
                    src="/images/batoot-hero.jpg"
                    alt="Batoot 🪿 Handmade Crochet Collection"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Floating Top Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-yellow-200 shadow-md flex items-center gap-1.5">
                    <span className="text-base">🪿</span>
                    <span className="text-xs font-extrabold text-yellow-950">Batoot Signature</span>
                  </div>

                  <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-950 text-xs font-black px-3 py-1.5 rounded-full shadow-md">
                    FREE DELIVERY 🚚
                  </div>

                  {/* Bottom Image Overlay Card */}
                  <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-yellow-200 shadow-lg flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">A Lily Flower 🌺</h4>
                      <p className="text-[11px] font-semibold text-yellow-700">490 EGP • Free Shipping</p>
                    </div>
                    {heroLily && (
                      <button
                        onClick={() => setSelectedProduct(heroLily)}
                        className="text-xs font-bold bg-yellow-400 hover:bg-yellow-500 text-yellow-950 px-3 py-1.5 rounded-xl transition-colors shadow-xs"
                      >
                        Quick View 👁️
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {/* Cute Floating Floating Pill #1 */}
              <div className="absolute -top-4 -left-4 bg-white px-3.5 py-2 rounded-2xl shadow-lg border border-yellow-200 flex items-center gap-2 animate-float">
                <span className="text-xl">🌼</span>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">100% Soft</p>
                  <p className="text-xs font-black text-slate-800">Milk Cotton</p>
                </div>
              </div>

              {/* Cute Floating Floating Pill #2 */}
              <div className="absolute -bottom-4 -right-4 bg-white px-3.5 py-2 rounded-2xl shadow-lg border border-yellow-200 flex items-center gap-2 animate-float-delayed">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <p className="text-xs font-extrabold text-slate-800">5.0 Star Rated</p>
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

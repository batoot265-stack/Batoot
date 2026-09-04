import React from 'react';
import { Heart, Sparkles, ShieldCheck, Smile, Gift, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutSection = () => {
  const { setIsCustomModalOpen } = useStore();

  return (
    <section id="about" className="py-16 lg:py-24 bg-[#FFFDF6] relative overflow-hidden border-b border-yellow-100">
      
      {/* Decorative Crochet Dots Background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-200/90 text-yellow-900 text-xs font-black uppercase tracking-wider mb-4 border border-yellow-300">
            <span>🪿 Handcrafted with Passion</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            The Story of <span className="text-yellow-600">Batoot 🪿</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            Where gentle stitches meet boundless imagination. Discover how our crochet studio weaves warmth and happiness into every single creation.
          </p>
        </div>

        {/* Narrative & Feature Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Narrative Box */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-yellow-200 shadow-xl shadow-yellow-100/50 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-yellow-100 text-yellow-800 flex items-center justify-center font-bold text-xl">
                  🧶
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Every Stitch Tells a Cozy Story 💛
                </h3>
              </div>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Born out of a pure love for the soothing art of crochet, <strong>Batoot 🪿</strong> is more than just a brand — it is a celebration of slow, mindful craftsmanship. In a fast-paced world of mass manufacturing, we slow down to hook every row with patience, attention to detail, and a whole lot of heart.
              </p>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Our signature pieces — from the cheerful <strong>Batoot Goose</strong> to whimsical floral bouquets, daisy tote bags, and personalized baby keepsakes — are crafted using only the softest, hypoallergenic milk cotton and velvet yarns. They are designed to bring a warm smile, cozy vibes, and lasting companionship into your home.
              </p>

              <div className="pt-4 border-t border-yellow-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🪿</span>
                  <div>
                    <p className="text-xs font-black text-slate-900">Crafted with Love in Egypt</p>
                    <p className="text-[11px] text-yellow-700 font-bold">100% Unique & Hand-hooked</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCustomModalOpen(true)}
                  className="text-xs font-black text-yellow-950 bg-yellow-300 hover:bg-yellow-400 px-4 py-2 rounded-xl transition-all shadow-sm"
                >
                  Custom Request ✨
                </button>
              </div>
            </div>
          </div>

          {/* Right 4 Value Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-yellow-200 hover:border-yellow-400 shadow-sm hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 group-hover:bg-yellow-400 text-yellow-900 flex items-center justify-center font-bold mb-3 transition-colors">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900">Made With 100% Love</h4>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                No factory molds. Every piece is hand-hooked one stitch at a time with infinite care and artistic soul.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-yellow-200 hover:border-yellow-400 shadow-sm hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 group-hover:bg-yellow-400 text-yellow-900 flex items-center justify-center font-bold mb-3 transition-colors">
                <Sparkles className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900">Premium Soft Yarn</h4>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Hypoallergenic, pill-resistant, ultra-soft milk cotton and velvety plush yarn suitable for all ages.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-yellow-200 hover:border-yellow-400 shadow-sm hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 group-hover:bg-yellow-400 text-yellow-900 flex items-center justify-center font-bold mb-3 transition-colors">
                <Award className="w-5 h-5 text-yellow-700" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900">Always Free Shipping</h4>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Enjoy hassle-free nationwide free delivery on every single order without minimum spend thresholds.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-yellow-200 hover:border-yellow-400 shadow-sm hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 group-hover:bg-yellow-400 text-yellow-900 flex items-center justify-center font-bold mb-3 transition-colors">
                <Gift className="w-5 h-5 text-yellow-700" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900">Bespoke Customization</h4>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Have a unique vision? We customize colors, sizes, and entirely new patterns to bring your dream to life.
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

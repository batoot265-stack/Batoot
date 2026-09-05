import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Palette, Sparkles, Send, Heart, Clock, Truck, ShieldCheck, X } from 'lucide-react';

export const CustomOrderSection = () => {
  const { isCustomModalOpen, setIsCustomModalOpen, generateWhatsAppCustomRequestUrl, recordCustomRequest, showToast, settings } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    itemType: 'Amigurumi Plushie 🪿',
    colorPreference: '',
    size: '',
    deadline: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const itemTypes = [
    'Amigurumi Plushie 🪿',
    'Custom Crochet Bag / Tote 🌼',
    'Everlasting Flower Bouquet 🌷',
    'Bucket Hat / Beanie / Wearable 🌻',
    'Mini Keychain / Set 🐥',
    'Baby Blanket / Keepsake 🧸',
    'Other Unique Design 🎨'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.description.trim()) {
      showToast("Please fill in your name, phone number, and description.", "error");
      return;
    }

    setIsSubmitting(true);
    // Record in local admin system
    recordCustomRequest(formData);

    // Generate WhatsApp link
    const waUrl = generateWhatsAppCustomRequestUrl(formData);
    
    showToast("Opening WhatsApp with your custom request! 🪿💛");
    
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setIsSubmitting(false);
      setIsCustomModalOpen(false);
      // Reset form
      setFormData({
        name: '',
        phone: '',
        itemType: 'Amigurumi Plushie 🪿',
        colorPreference: '',
        size: '',
        deadline: '',
        description: ''
      });
    }, 400);
  };

  const renderFormContent = () => (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Your Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Farida Ahmed"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-yellow-200 bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-xs font-medium text-slate-800"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            WhatsApp Phone Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="e.g. 01012345678"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-yellow-200 bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-xs font-medium text-slate-800"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Item Category <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.itemType}
            onChange={(e) => setFormData({ ...formData, itemType: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-yellow-200 bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-xs font-bold text-slate-800"
          >
            {itemTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Color Palette Preferences
          </label>
          <input
            type="text"
            placeholder="e.g. Butter yellow, creamy white, sage"
            value={formData.colorPreference}
            onChange={(e) => setFormData({ ...formData, colorPreference: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-yellow-200 bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-xs font-medium text-slate-800"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Approximate Dimensions / Size
          </label>
          <input
            type="text"
            placeholder="e.g. 20 cm height / Large tote"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-yellow-200 bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-xs font-medium text-slate-800"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Needed By (Optional Deadline)
          </label>
          <input
            type="text"
            placeholder="e.g. Next week for a birthday"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-yellow-200 bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-xs font-medium text-slate-800"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-800 mb-1">
          Describe Your Dream Design Idea <span className="text-rose-500">*</span>
        </label>
        <textarea
          required
          rows={3}
          placeholder="Tell us what you have in mind! Mention characters, specific patterns, custom embroidery names, or anything you'd like us to hook for you..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-yellow-200 bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-xs font-medium text-slate-800"
        />
      </div>

      <div className="p-3 bg-yellow-50/80 rounded-xl border border-yellow-200 text-xs text-yellow-950 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-yellow-700 shrink-0" />
        <span>We will review your idea, estimate the timeline & quote, and reply promptly on WhatsApp!</span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-yellow-950 font-black text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 border border-yellow-300"
      >
        <Send className="w-4 h-4" />
        <span>{isSubmitting ? 'Opening WhatsApp...' : 'Send Custom Request via WhatsApp (01093536058)'}</span>
      </button>
    </form>
  );

  return (
    <>
      {/* On-page Custom Order Section */}
      <section id="custom" className="py-16 bg-gradient-to-b from-[#FFFDF5] to-yellow-100/40 border-b border-yellow-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl border-4 border-yellow-200 p-6 sm:p-10 shadow-xl shadow-yellow-100/60">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Info & Process */}
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-200 text-yellow-900 text-xs font-black uppercase tracking-wider border border-yellow-300">
                  <Palette className="w-3.5 h-3.5" />
                  <span>Custom Orders (تنفيذ خاص)</span>
                </div>

                <h2 className="text-3xl font-black text-slate-900 leading-tight">
                  Have a Unique Crochet Idea in Mind? 🎨🪿
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Looking for a custom character plushie, a personalized bag in your favorite colors, or a bespoke anniversary gift? We hand-crochet custom pieces tailored precisely to your imagination!
                </p>

                {/* 3 Step Process */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-yellow-400 text-yellow-950 font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                      1
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-slate-900">Share Your Idea & Colors</p>
                      <p className="text-[11px] text-slate-500">Fill the form or message us directly with reference photos.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-yellow-400 text-yellow-950 font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                      2
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-slate-900">Quote & Yarn Selection</p>
                      <p className="text-[11px] text-slate-500">We confirm yarn colors, size, price, and estimated completion time.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-yellow-400 text-yellow-950 font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                      3
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-slate-900">Hooked with Love & Free Shipping</p>
                      <p className="text-[11px] text-slate-500">Your bespoke creation is carefully handmade and shipped to your door.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-xs font-bold text-yellow-800 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-yellow-600" />
                  <span>Free shipping applies to custom orders too! ✨</span>
                </div>
              </div>

              {/* Right Column: Interactive Form */}
              <div className="lg:col-span-7 bg-[#FFFDF5] p-6 rounded-2xl border-2 border-yellow-200">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-yellow-200/80">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <span>✨ Custom Request Form</span>
                  </h3>
                  <span className="text-[11px] font-bold text-yellow-800">Direct to WhatsApp: {settings.whatsappDisplay}</span>
                </div>

                {renderFormContent()}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Pop-up Custom Modal (when triggered from navbar or cards) */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="fixed inset-0" onClick={() => setIsCustomModalOpen(false)} />
          
          <div className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border-4 border-yellow-200 overflow-hidden z-10 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsCustomModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-yellow-100 text-slate-700 hover:bg-yellow-400 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🎨🪿</span>
              <div>
                <h3 className="text-xl font-black text-slate-900">Custom Crochet Request</h3>
                <p className="text-xs text-yellow-800 font-bold">طلب تنفيذ كروشية خاص</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 mb-6">
              Let us know what you want to create! We'll prepare a tailored quote and connect with you on WhatsApp at <strong>{settings.whatsappDisplay}</strong>.
            </p>

            {renderFormContent()}
          </div>
        </div>
      )}
    </>
  );
};

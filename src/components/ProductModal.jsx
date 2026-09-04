import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, ShoppingBag, Star, Truck, ShieldCheck, Heart, Sparkles, Phone } from 'lucide-react';

export const ProductModal = () => {
  const { selectedProduct, setSelectedProduct, addToCart, getWhatsAppDirectUrl } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [customNote, setCustomNote] = useState('');

  if (!selectedProduct) return null;

  const handleClose = () => {
    setSelectedProduct(null);
    setQuantity(1);
    setSelectedColor(null);
    setCustomNote('');
  };

  const currentColor = selectedColor || (selectedProduct.colors && selectedProduct.colors[0]) || 'Standard Handcrafted';

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, currentColor, customNote);
    handleClose();
  };

  const handleWhatsAppOrder = () => {
    let msg = `Hello Batoot! 🪿 I want to order:\n`;
    msg += `• *Product:* ${selectedProduct.name}\n`;
    msg += `• *Quantity:* ${quantity}\n`;
    msg += `• *Color/Variation:* ${currentColor}\n`;
    msg += `• *Price:* ${selectedProduct.price * quantity} EGP (Free Shipping!)\n`;
    if (customNote.trim()) {
      msg += `• *Custom Request:* ${customNote.trim()}\n`;
    }
    msg += `Please confirm my order! 💛`;
    window.open(getWhatsAppDirectUrl(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={handleClose} />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border-4 border-yellow-200 overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 text-slate-700 hover:bg-yellow-400 hover:text-slate-900 border border-yellow-200 flex items-center justify-center shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Left Image Column */}
            <div className="md:col-span-5 space-y-3">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-yellow-50 border-2 border-yellow-200">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                {selectedProduct.badge && (
                  <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-950 font-black text-xs px-3 py-1 rounded-full shadow-md">
                    {selectedProduct.badge}
                  </span>
                )}
              </div>

              {/* Free Shipping Tag */}
              <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200 flex items-center gap-2 text-xs font-bold text-yellow-950">
                <Truck className="w-4 h-4 text-yellow-700 shrink-0" />
                <span>Free Shipping on this order nationwide! 🚚</span>
              </div>
            </div>

            {/* Right Product Details Column */}
            <div className="md:col-span-7 space-y-4">
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-yellow-700 font-bold uppercase tracking-wider text-[11px]">
                    {selectedProduct.category}
                  </span>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{selectedProduct.rating || '5.0'}</span>
                    <span className="text-slate-400">({selectedProduct.reviewsCount || 24} reviews)</span>
                  </div>
                </div>

                <h2 className="text-2xl font-black text-slate-900 leading-snug">
                  {selectedProduct.name}
                </h2>

                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-3xl font-black text-slate-950">
                    {selectedProduct.price} <span className="text-sm font-bold text-yellow-800">EGP</span>
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      {selectedProduct.originalPrice} EGP
                    </span>
                  )}
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    selectedProduct.inStock 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}>
                    {selectedProduct.inStock ? '🟢 In Stock - Ready to Ship' : '🔴 Made to Order (3-5 days)'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-[#FFFDF5] p-3.5 rounded-2xl border border-yellow-100">
                <p>{selectedProduct.description}</p>
              </div>

              {/* Specifications Pills */}
              <div className="space-y-1.5 text-xs">
                {selectedProduct.yarnType && (
                  <div className="flex items-start gap-2 text-slate-700">
                    <span className="font-bold text-slate-900 shrink-0">🧶 Yarn Material:</span>
                    <span className="text-slate-600">{selectedProduct.yarnType}</span>
                  </div>
                )}
                {selectedProduct.dimensions && (
                  <div className="flex items-start gap-2 text-slate-700">
                    <span className="font-bold text-slate-900 shrink-0">📏 Dimensions:</span>
                    <span className="text-slate-600">{selectedProduct.dimensions}</span>
                  </div>
                )}
                {selectedProduct.careGuide && (
                  <div className="flex items-start gap-2 text-slate-700">
                    <span className="font-bold text-slate-900 shrink-0">✨ Care Instructions:</span>
                    <span className="text-slate-600">{selectedProduct.careGuide}</span>
                  </div>
                )}
              </div>

              {/* Color/Variant Selection if available */}
              {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Choose Color / Style:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                          currentColor === color
                            ? 'bg-yellow-400 text-yellow-950 border-yellow-500 shadow-xs'
                            : 'bg-white text-slate-700 border-yellow-200 hover:bg-yellow-50'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Optional Custom Note */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Customization Note (optional):
                </label>
                <input
                  type="text"
                  placeholder="e.g. Specific beanie color, gift card message..."
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-yellow-200 bg-yellow-50/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-slate-800"
                />
              </div>

              {/* Quantity Selector & Action Buttons */}
              <div className="pt-2 border-t border-yellow-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">Quantity:</span>
                    <div className="flex items-center border-2 border-yellow-300 rounded-xl bg-yellow-50 overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 font-bold text-yellow-900 hover:bg-yellow-200"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 font-black text-xs text-slate-900 min-w-[28px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1 font-bold text-yellow-900 hover:bg-yellow-200"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Subtotal</p>
                    <p className="text-lg font-black text-slate-900">
                      {selectedProduct.price * quantity} <span className="text-xs text-yellow-700">EGP</span>
                    </p>
                  </div>
                </div>

                {/* Primary Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-yellow-950 font-black text-xs sm:text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 border border-yellow-300"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Order on WhatsApp (01093536058)</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Eye, Star, Truck, Check, Sparkles } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart, setSelectedProduct, getWhatsAppDirectUrl } = useStore();

  const handleQuickWhatsApp = (e) => {
    e.stopPropagation();
    const msg = `Hello Batoot! 🪿 I would love to order "${product.name}" (${product.price} EGP) with Free Shipping! Is it available? 💛`;
    window.open(getWhatsAppDirectUrl(msg), '_blank');
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!product.inStock) {
      // Trigger WhatsApp pre-order inquiry
      const msg = `Hello Batoot! 🪿 I saw that "${product.name}" is currently sold out, but I'd like to request a custom make-to-order! Can you make one for me? 💛`;
      window.open(getWhatsAppDirectUrl(msg), '_blank');
      return;
    }
    addToCart(product, 1);
  };

  return (
    <div 
      onClick={() => setSelectedProduct(product)}
      className="group bg-white rounded-3xl overflow-hidden border-2 border-yellow-200/80 hover:border-yellow-400 hover:shadow-2xl hover:shadow-yellow-100/70 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-yellow-50/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          onError={(e) => {
            e.target.src = '/images/batoot-hero.jpg';
          }}
        />

        {/* Floating Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          {product.badge ? (
            <span className="bg-yellow-400/95 text-yellow-950 text-[11px] font-black px-2.5 py-1 rounded-full shadow-sm backdrop-blur-xs">
              {product.badge}
            </span>
          ) : (
            <span />
          )}

          {/* In Stock or Sold Out pill */}
          <span 
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm ${
              product.inStock 
                ? 'bg-emerald-100/90 text-emerald-800 border border-emerald-200' 
                : 'bg-rose-100/90 text-rose-800 border border-rose-200'
            }`}
          >
            {product.inStock ? '🟢 In Stock' : '🔴 Made to Order'}
          </span>
        </div>

        {/* Quick View Hover Button */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="bg-white/95 text-slate-900 font-bold px-4 py-2 rounded-xl text-xs shadow-lg flex items-center gap-1.5 hover:bg-yellow-400 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View Details
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-yellow-700 font-bold uppercase tracking-wider text-[10px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating || '5.0'}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-yellow-700 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Short Excerpt */}
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.shortDescription || product.description}
          </p>
        </div>

        {/* Price & Free Shipping */}
        <div className="pt-2 border-t border-yellow-100">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg sm:text-xl font-black text-slate-950">
              {product.price} <span className="text-xs font-bold text-yellow-800">EGP</span>
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through font-medium">
                {product.originalPrice} EGP
              </span>
            )}
            <span className="ml-auto text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
              <Truck className="w-3 h-3" /> Free Shipping
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className={`w-full py-2.5 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                product.inStock
                  ? 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 text-yellow-950 hover:brightness-105 active:scale-95'
                  : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{product.inStock ? 'Add to Bag' : 'Pre-Order 💬'}</span>
            </button>

            <button
              onClick={handleQuickWhatsApp}
              title="Quick Order via WhatsApp (01093536058)"
              className="w-full py-2.5 px-2 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center gap-1 transition-all"
            >
              <span>💬 WhatsApp</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

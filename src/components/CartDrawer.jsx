import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Phone,
  User,
  MapPin,
  FileText
} from 'lucide-react';

export const CartDrawer = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart, 
    cartTotal, 
    cartCount,
    generateWhatsAppOrderUrl,
    recordOrder,
    showToast,
    settings
  } = useStore();

  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    governorate: 'Cairo',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const governorates = [
    'Cairo (القاهرة)',
    'Giza (الجيزة)',
    'Alexandria (الإسكندرية)',
    'Dakahlia / Mansoura (الدقهلية)',
    'Sharqia (الشرقية)',
    'Gharbia / Tanta (الغربية)',
    'Qalyubia (القليوبية)',
    'Monufia (المنوفية)',
    'Beheira (البحيرة)',
    'Kafr El Sheikh (كفر الشيخ)',
    'Damietta (دمياط)',
    'Port Said (بورسعيد)',
    'Ismailia (الإسماعيلية)',
    'Suez (السويس)',
    'Fayoum (الفيوم)',
    'Beni Suef (بني سويف)',
    'Minya (المنيا)',
    'Asyut (أسيوط)',
    'Sohag (سوهاج)',
    'Qena (قنا)',
    'Luxor (الأقصر)',
    'Aswan (أسوان)',
    'Red Sea / Hurghada (البحر الأحمر)',
    'South Sinai / Sharm (جنوب سيناء)',
    'Matruh / North Coast (مطروح)'
  ];

  if (!isCartOpen) return null;

  const handleClose = () => {
    setIsCartOpen(false);
    if (checkoutStep === 'success') {
      setCheckoutStep('cart');
    }
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (!customerDetails.name.trim() || !customerDetails.phone.trim() || !customerDetails.address.trim()) {
      showToast("Please provide your name, phone number, and address.", "error");
      return;
    }

    setIsSubmitting(true);

    // 1. Record order in admin history
    const placedOrder = recordOrder({
      customerName: customerDetails.name,
      phone: customerDetails.phone,
      address: `${customerDetails.address}, ${customerDetails.governorate}`,
      governorate: customerDetails.governorate,
      notes: customerDetails.notes,
      items: cart,
      totalAmount: cartTotal,
      shipping: 0
    });

    // 2. Generate WhatsApp link
    const waUrl = generateWhatsAppOrderUrl(customerDetails, cart, cartTotal);

    showToast("Opening WhatsApp to complete your order! 🪿💛");

    // 3. Open WhatsApp and clear cart
    setTimeout(() => {
      window.open(waUrl, '_blank');
      clearCart();
      setIsSubmitting(false);
      setCheckoutStep('success');
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={handleClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l-4 border-yellow-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-yellow-200 bg-gradient-to-r from-yellow-100/70 to-yellow-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-yellow-400 text-yellow-950 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900">
                  {checkoutStep === 'cart' && 'Your Shopping Bag 🪿'}
                  {checkoutStep === 'checkout' && 'Checkout & WhatsApp Order 💬'}
                  {checkoutStep === 'success' && 'Order Received! 🎉'}
                </h2>
                <p className="text-[11px] font-bold text-yellow-800">
                  {cartCount} item{cartCount !== 1 ? 's' : ''} in bag • Free Nationwide Shipping
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-yellow-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Alert Bar */}
          <div className="bg-yellow-300/60 px-4 py-2 text-xs font-black text-yellow-950 flex items-center justify-center gap-2 border-b border-yellow-200">
            <Truck className="w-4 h-4 text-yellow-900 animate-bounce-slow" />
            <span>🎉 FREE SHIPPING UNLOCKED ON YOUR ORDER!</span>
          </div>

          {/* Main Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            
            {/* STEP 1: CART ITEMS VIEW */}
            {checkoutStep === 'cart' && (
              <>
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <span className="text-6xl block animate-bounce-slow">🪿</span>
                    <h3 className="text-lg font-black text-slate-900">Your bag is empty!</h3>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Explore our handmade crochet collection and pick something warm and cuddly!
                    </p>
                    <button
                      onClick={handleClose}
                      className="bg-yellow-400 text-yellow-950 font-black text-xs px-6 py-3 rounded-2xl shadow-md hover:bg-yellow-500 transition-colors"
                    >
                      Explore Products 🛍️
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item, index) => (
                      <div
                        key={`${item.id}-${index}`}
                        className="bg-yellow-50/40 p-3.5 rounded-2xl border border-yellow-200 flex gap-3 items-center group hover:bg-yellow-50 transition-colors"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-xl bg-yellow-100 overflow-hidden shrink-0 border border-yellow-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {item.name}
                          </h4>
                          {item.selectedColor && (
                            <p className="text-[10px] text-yellow-800 font-medium truncate">
                              Style: {item.selectedColor}
                            </p>
                          )}
                          <p className="text-xs font-black text-slate-950 mt-1">
                            {item.price} EGP <span className="text-[10px] text-slate-400 font-normal">each</span>
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center border border-yellow-300 rounded-lg bg-white overflow-hidden shadow-sm">
                              <button
                                onClick={() => updateCartQuantity(index, -1)}
                                className="px-2 py-0.5 text-xs font-bold text-yellow-900 hover:bg-yellow-100"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2.5 py-0.5 text-xs font-black text-slate-900 min-w-[20px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(index, 1)}
                                className="px-2 py-0.5 text-xs font-bold text-yellow-900 hover:bg-yellow-100"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-xs font-extrabold text-slate-900 ml-auto">
                              {item.price * item.quantity} EGP
                            </span>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(index)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors self-start"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* STEP 2: CHECKOUT & ADDRESS FORM */}
            {checkoutStep === 'checkout' && (
              <form id="checkout-form" onSubmit={handleConfirmOrder} className="space-y-4">
                
                {/* Order Summary Mini Box */}
                <div className="p-3 bg-yellow-50 rounded-2xl border border-yellow-200 text-xs">
                  <div className="flex justify-between font-bold text-slate-700 pb-1 border-b border-yellow-200">
                    <span>Selected Items ({cartCount}):</span>
                    <span>{cartTotal} EGP</span>
                  </div>
                  <div className="pt-1.5 space-y-1 text-slate-600 text-[11px]">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span className="truncate max-w-[220px]">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-bold">{item.price * item.quantity} EGP</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Details Inputs */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-yellow-700" />
                      <span>Full Name (الاسم بالكامل)</span> <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sara Mohamed"
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-yellow-200 bg-yellow-50/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-medium text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-yellow-700" />
                      <span>WhatsApp Phone Number (رقم الواتساب)</span> <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 01012345678"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-yellow-200 bg-yellow-50/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-medium text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-yellow-700" />
                      <span>Governorate (المحافظة)</span> <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={customerDetails.governorate}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, governorate: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-yellow-200 bg-yellow-50/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-bold text-slate-800"
                    >
                      {governorates.map(gov => (
                        <option key={gov} value={gov}>{gov}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-yellow-700" />
                      <span>Full Street Address & Landmark (العنوان بالتفصيل)</span> <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Street name, building number, apartment, landmark..."
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-yellow-200 bg-yellow-50/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-medium text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-yellow-700" />
                      <span>Order Notes / Custom Requests (اختياري)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Gift wrapping, special date, specific notes..."
                      value={customerDetails.notes}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, notes: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-yellow-200 bg-yellow-50/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-medium text-slate-800"
                    />
                  </div>
                </div>

                {/* WhatsApp Dispatch Notice */}
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
                  <span className="text-base">💬</span>
                  <p className="leading-relaxed text-[11px]">
                    When you click confirm, WhatsApp will open automatically to send your order details directly to <strong>{settings.whatsappDisplay}</strong> with your greeting & product names!
                  </p>
                </div>

              </form>
            )}

            {/* STEP 3: ORDER SENT SUCCESS VIEW */}
            {checkoutStep === 'success' && (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-sm">
                  ✓
                </div>
                <h3 className="text-xl font-black text-slate-900">Thank You for Ordering! 🪿💛</h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                  Your order details have been forwarded to our WhatsApp hotline (<strong>{settings.whatsappDisplay}</strong>). We'll confirm the order with you immediately and begin crafting your cozy crochet piece!
                </p>
                <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-200 text-xs text-yellow-900 font-bold">
                  <span>Free shipping included • Stitched with love 💛</span>
                </div>
                <button
                  onClick={handleClose}
                  className="w-full py-3 rounded-2xl bg-yellow-400 text-yellow-950 font-black text-xs shadow-md hover:bg-yellow-500 transition-colors"
                >
                  Continue Shopping 🛍️
                </button>
              </div>
            )}

          </div>

          {/* Footer Pricing & Actions */}
          {cart.length > 0 && checkoutStep !== 'success' && (
            <div className="p-4 sm:p-5 border-t border-yellow-200 bg-yellow-50/50 space-y-3">
              
              {/* Calculations */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-bold text-slate-900">{cartTotal} EGP</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Free Shipping:
                  </span>
                  <span>0 EGP (FREE)</span>
                </div>
                <div className="pt-2 border-t border-yellow-200 flex justify-between items-baseline">
                  <span className="text-sm font-black text-slate-900">Total Price:</span>
                  <span className="text-xl font-black text-slate-950">
                    {cartTotal} <span className="text-xs text-yellow-800">EGP</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              {checkoutStep === 'cart' ? (
                <button
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-yellow-950 font-black text-xs sm:text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 border border-yellow-300"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="py-3 px-3 rounded-2xl bg-white border border-yellow-200 text-slate-700 font-bold text-xs hover:bg-yellow-50"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{isSubmitting ? 'Confirming...' : 'Confirm Order on WhatsApp 💬'}</span>
                  </button>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

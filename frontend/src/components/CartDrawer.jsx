import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onProceedToCheckout 
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const estimatedShipping = subtotal > 0 ? 150 : 0;
  const grandTotal = subtotal + estimatedShipping;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md transition-opacity">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 text-white shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold font-display text-white">Your Guest Cart</h2>
              <span className="text-xs bg-slate-800 text-amber-400 font-mono px-2 py-0.5 rounded-full border border-amber-500/20">
                {cartItems.length} ITEMS
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto" />
                <h3 className="text-base font-bold text-white">Your Guest Cart is Empty</h3>
                <p className="text-xs text-slate-400">
                  Browse our vintage catalog or engine blueprint inspector to add rare parts to your order.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex gap-3 items-center group"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-800"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-bold text-white truncate font-display">
                      {item.title}
                    </h4>
                    <div className="text-[10px] font-mono text-slate-400">
                      OEM: {item.oemNumber}
                    </div>
                    <div className="text-xs font-bold text-amber-400 font-display">
                      ${(item.price * item.quantity).toLocaleString()} USD
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded-lg p-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono font-bold text-white px-1">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Trigger */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-slate-800 space-y-4 bg-slate-950/80">
              
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>SUBTOTAL:</span>
                  <span className="text-white">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>INSURED FREIGHT (EST.):</span>
                  <span className="text-white">${estimatedShipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-amber-400 border-t border-slate-800 pt-2">
                  <span>GRAND TOTAL:</span>
                  <span>${grandTotal.toLocaleString()} USD</span>
                </div>
              </div>

              {/* Guest Auth Guard Notice */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-2 text-[11px] text-amber-300">
                <Lock className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <span>Login or Account Sign In required at checkout to complete order placement.</span>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 py-4 rounded-xl font-extrabold text-sm shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.02]"
              >
                <span>Proceed To Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

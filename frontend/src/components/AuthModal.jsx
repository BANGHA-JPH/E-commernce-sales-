import React, { useState } from 'react';
import { X, Lock, Mail, Key, ShieldCheck, ArrowRight, UserCheck, Flame } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, cartTotal }) {
  if (!isOpen) return null;

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [signedInUser, setSignedInUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const user = { name: name || 'Restorer Enthusiast', email: email || 'collector@vintagemotors.com' };
      setSignedInUser(user);
      if (onAuthSuccess) {
        onAuthSuccess(user);
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {signedInUser ? (
          /* Order Confirmation Screen post auth */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <UserCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display text-white">
              Welcome, {signedInUser.name}!
            </h3>
            <p className="text-xs text-slate-300 font-mono">
              Account Authenticated. Proceeding to finalize your vintage order of <span className="text-amber-400 font-bold">${cartTotal ? cartTotal.toLocaleString() : '0'} USD</span>.
            </p>
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 py-3 rounded-xl font-bold text-sm shadow-lg shadow-amber-500/20"
              >
                Complete Order & Track Shipment
              </button>
            </div>
          </div>
        ) : (
          /* Auth Form */
          <div>
            <div className="text-center mb-6 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                {isRegister ? 'Create Restorer Account' : 'Sign In To Order'}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {isRegister 
                  ? 'Register to save vintage garage wishlists and track orders.' 
                  : 'Log in to complete your checkout and verify delivery address.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">FULL NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="Lord Shelby"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">EMAIL ADDRESS</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="restorer@classicv8.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">PASSWORD</label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-amber-500/20 transition-all mt-4"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>{isRegister ? 'Create Account & Checkout' : 'Sign In & Place Order'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-400 border-t border-slate-800 pt-4">
              <span>{isRegister ? 'Already have an account?' : 'New to Aura Vintage?'} </span>
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-amber-400 font-bold hover:underline font-mono"
              >
                {isRegister ? 'Sign In Here' : 'Create Account'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

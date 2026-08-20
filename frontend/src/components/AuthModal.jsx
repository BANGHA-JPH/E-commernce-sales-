import React, { useState } from 'react';
import { X, Lock, Mail, Key, ShieldCheck, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, cartTotal }) {
  if (!isOpen) return null;

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const endpoint = isRegister 
      ? `${API_BASE_URL}/api/auth/register` 
      : `${API_BASE_URL}/api/auth/login`;


    const payload = isRegister 
      ? { name, email, password } 
      : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Authentication failed. Please check your credentials.');
      }

      setLoading(false);
      if (onAuthSuccess) {
        onAuthSuccess(data.user, data.token);
      }
      onClose();
      setEmail('');
      setPassword('');
      setName('');
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Connection error. Make sure the backend server is running.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto font-technical-data select-none">
      <div className="relative w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Auth Form */}
        <div>
          <div className="text-center mb-6 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-display text-white">
              {isRegister ? 'Create Restorer Account' : 'Sign In To Dashboard'}
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              {isRegister 
                ? 'Register to manage your vintage garage and track requests.' 
                : 'Log in to access your Restorer Dashboard and orders.'}
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-500/15 border border-red-500/40 rounded-xl text-red-400 text-xs flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

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
                  <span>{isRegister ? 'Create Account & Open Dashboard' : 'Sign In & Open Dashboard'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400 border-t border-slate-800 pt-4">
            <span>{isRegister ? 'Already have an account?' : 'New to Classic Aircooled VW Works?'} </span>
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setErrorMsg('');
              }}
              className="text-amber-400 font-bold hover:underline font-mono"
            >
              {isRegister ? 'Sign In Here' : 'Create Account'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

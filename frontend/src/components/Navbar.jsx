import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Shield, User, Menu, X, Flame } from 'lucide-react';

export default function Navbar({ cartCount, wishlistCount, onOpenCart, onSearchChange, searchTerm, onOpenAuth }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0D0F12]/85 backdrop-blur-md border-b border-slate-800 text-white transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0D0F12] rounded-[10px] flex items-center justify-center">
                <Flame className="w-6 h-6 text-amber-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-wider text-white font-display block leading-none">
                AURA <span className="text-amber-400">VINTAGE</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-mono">
                ENGINEERING & PARTS
              </span>
            </div>
          </div>

          {/* Search Bar (Guest Accessible) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search models, engine parts, OEM casting codes..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/70 rounded-full pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#models" className="hover:text-amber-400 transition-colors">Models</a>
            <a href="#blueprint" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Blueprint Inspector
            </a>
            <a href="#catalog" className="hover:text-amber-400 transition-colors">Catalog</a>
            <a href="#workshop" className="hover:text-amber-400 transition-colors">Workshop Videos</a>
          </div>

          {/* User & Cart Action Controls */}
          <div className="flex items-center space-x-4">
            
            {/* Wishlist Counter */}
            <button className="relative p-2.5 text-slate-300 hover:text-amber-400 transition-colors rounded-lg hover:bg-slate-800/60">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-amber-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button 
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-4 py-2 rounded-xl font-semibold shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline text-xs uppercase tracking-wider font-bold">Cart</span>
              {cartCount > 0 && (
                <span className="bg-slate-950 text-amber-400 text-xs font-mono font-bold px-2 py-0.5 rounded-md border border-amber-400/40">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Guest / Account Status Button */}
            <button 
              onClick={onOpenAuth}
              className="hidden sm:flex items-center gap-2 border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-300 px-3.5 py-2 rounded-xl text-xs font-medium transition-all hover:border-slate-500"
            >
              <User className="w-4 h-4 text-amber-400" />
              <span>Guest Mode</span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded uppercase font-mono">Sign In</span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-6 space-y-4">
          <div className="relative w-full mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search vintage parts..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200"
            />
          </div>
          <a href="#models" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-amber-400 py-1">Models</a>
          <a href="#blueprint" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-amber-400 py-1">Blueprint Inspector</a>
          <a href="#catalog" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-amber-400 py-1">Spare Parts Catalog</a>
          <a href="#workshop" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-amber-400 py-1">Workshop Videos</a>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
            className="w-full mt-2 flex items-center justify-center gap-2 bg-slate-900 border border-amber-500/40 text-amber-400 py-2 rounded-lg text-sm"
          >
            <User className="w-4 h-4" /> Sign In / Account
          </button>
        </div>
      )}
    </header>
  );
}

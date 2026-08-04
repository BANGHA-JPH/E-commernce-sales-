import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, User, Menu, X, Wrench } from 'lucide-react';

export default function Navbar({ cartCount, wishlistCount, onOpenCart, onSearchChange, searchTerm, onOpenAuth }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#131314]/90 backdrop-blur-xl border-b border-[#584236]/30 text-white transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand Logo Header */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-[#ff7a1a] flex items-center justify-center text-black font-bold group-hover:bg-[#ffb68e] transition-colors">
            <Wrench className="w-5 h-5 text-black" />
          </div>
          <div>
            <span className="font-h2 text-lg md:text-xl font-bold tracking-tighter text-[#ff7a1a] block leading-none">
              RUSTY AIRCOOLED
            </span>
            <span className="text-[10px] tracking-widest text-[#a78b7d] uppercase font-technical-data font-bold">
              VW WORKS
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 font-label-caps text-xs tracking-wider uppercase">
          <a href="#catalog" className="text-[#e0c0b1] hover:text-[#ff7a1a] hover:bg-[#ff7a1a]/10 transition-colors px-2.5 py-1.5">Catalog</a>
          <a href="#blueprint" className="text-[#e0c0b1] hover:text-[#ff7a1a] hover:bg-[#ff7a1a]/10 transition-colors px-2.5 py-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#83cffb] animate-pulse"></span>
            Inspector
          </a>
          <a href="#vehicles" className="text-[#e0c0b1] hover:text-[#ff7a1a] hover:bg-[#ff7a1a]/10 transition-colors px-2.5 py-1.5">Vehicles</a>
          <a href="#workshop" className="text-[#e0c0b1] hover:text-[#ff7a1a] hover:bg-[#ff7a1a]/10 transition-colors px-2.5 py-1.5">Showcase</a>
          <a href="#reviews" className="text-[#e0c0b1] hover:text-[#ff7a1a] hover:bg-[#ff7a1a]/10 transition-colors px-2.5 py-1.5">Reviews</a>
        </nav>

        {/* Global Live Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xs mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a78b7d]" />
            <input
              type="text"
              placeholder="Search parts, casting numbers..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#201f20] border border-[#584236]/50 pl-9 pr-3 py-1.5 text-xs text-[#e5e2e3] placeholder-[#a78b7d] focus:outline-none focus:border-[#ff7a1a] font-technical-data transition-all"
            />
          </div>
        </div>

        {/* Action Buttons: Wishlist, Cart Drawer, Auth */}
        <div className="flex items-center space-x-4">
          
          {/* Wishlist Icon */}
          <button className="relative p-2 text-[#e0c0b1] hover:text-[#ff7a1a] transition-colors" title="Wishlist">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ff7a1a] text-black text-[10px] font-technical-data font-bold px-1 leading-none py-[2px]">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button 
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-[#201f20] hover:bg-[#353436] text-[#e5e2e3] border border-[#584236]/60 px-3 py-1.5 transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-[#ff7a1a]" />
            <span className="hidden sm:inline font-label-caps text-xs uppercase tracking-wider">Cart</span>
            <span className="bg-[#ff7a1a] text-black text-[10px] font-technical-data font-bold px-1.5 py-0.5">
              {cartCount}
            </span>
          </button>

          {/* Create Account / Sign In CTA */}
          <button 
            onClick={onOpenAuth}
            className="hidden sm:block font-label-caps text-xs text-black bg-[#ff7a1a] hover:bg-[#ffb68e] px-4 py-2 glow-button uppercase font-bold tracking-wider"
          >
            Create Account
          </button>

          {/* Mobile Navigation Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#e0c0b1] hover:text-[#ff7a1a]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#131314] border-b border-[#584236]/40 px-6 py-6 space-y-4 font-label-caps text-sm">
          <div className="relative w-full mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a78b7d]" />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#201f20] border border-[#584236] pl-9 pr-3 py-2 text-xs text-white"
            />
          </div>
          <a href="#catalog" onClick={() => setMobileMenuOpen(false)} className="block text-[#e0c0b1] hover:text-[#ff7a1a] py-1">Catalog</a>
          <a href="#blueprint" onClick={() => setMobileMenuOpen(false)} className="block text-[#e0c0b1] hover:text-[#ff7a1a] py-1">Blueprint Inspector</a>
          <a href="#vehicles" onClick={() => setMobileMenuOpen(false)} className="block text-[#e0c0b1] hover:text-[#ff7a1a] py-1">Vehicles</a>
          <a href="#workshop" onClick={() => setMobileMenuOpen(false)} className="block text-[#e0c0b1] hover:text-[#ff7a1a] py-1">Showcase</a>
          <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="block text-[#e0c0b1] hover:text-[#ff7a1a] py-1">Customer Reviews</a>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
            className="w-full mt-3 font-label-caps text-xs text-black bg-[#ff7a1a] py-2.5 uppercase font-bold tracking-wider"
          >
            Create Account / Sign In
          </button>
        </div>
      )}
    </header>
  );
}



import React from 'react';
import { Lock, MapPin, Phone, Clock } from 'lucide-react';

export default function Footer({ onOpenAdminLogin }) {
  return (
    <footer className="w-full mt-24 bg-[#0e0e0f] border-t border-[#584236]/20 text-[#e0c0b1]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-16 py-16 max-w-[1440px] mx-auto font-body-md text-sm">
        
        {/* Brand & Address Column */}
        <div className="col-span-1 md:col-span-1 space-y-3">
          <div className="font-h3 text-lg text-[#ff7a1a] font-bold tracking-tighter">
            CLASSIC AIRCOOLED VW WORKS
          </div>
          <p className="font-technical-data text-xs text-[#a78b7d] max-w-xs leading-relaxed">
            Precision OEM-grade components verified against original mechanical blueprints for air-cooled restorations.
          </p>
          <div className="pt-2 text-xs font-technical-data text-[#e0c0b1] flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#ff7a1a] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">14826 Yarberry St</span>
              <br />
              <span className="text-[#a78b7d]">Houston, TX 77039, USA</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-3 font-label-caps text-xs tracking-wider uppercase">
          <a className="hover:text-[#ff7a1a] transition-colors" href="#vintage-cars">Vintage Cars</a>
          <a className="hover:text-[#ff7a1a] transition-colors" href="#catalog">Parts Catalog</a>
          <a className="hover:text-[#ff7a1a] transition-colors" href="#reviews">Customer Reviews</a>
          <a className="hover:text-[#ff7a1a] transition-colors flex items-center gap-1.5" href="#workshop-location">
            <MapPin className="w-3 h-3 text-[#ff7a1a]" /> Workshop Map
          </a>
        </div>

        <div className="flex flex-col gap-3 font-label-caps text-xs tracking-wider uppercase">
          <a className="hover:text-[#ff7a1a] transition-colors" href="#workshop">Video Showcase</a>
          <a className="hover:text-[#ff7a1a] transition-colors" href="#workshop-location">Visit Our Garage</a>
          <button onClick={onOpenAdminLogin} className="hover:text-[#ff7a1a] text-left transition-colors flex items-center gap-1.5 cursor-pointer uppercase">
            <Lock className="w-3 h-3 text-[#ff7a1a]" /> Admin Portal
          </button>
        </div>

        {/* Technical Specs & Status Footer Note */}
        <div className="flex flex-col gap-2 font-technical-data text-xs text-[#a78b7d]">
          <span className="text-[#83cffb] font-bold">SYSTEM STATUS // ONLINE</span>
          <span className="flex items-center gap-1 text-[#e0c0b1]">
            <Clock className="w-3 h-3 text-[#ff7a1a]" /> Mon-Fri: 8AM-6PM CST | Sat: 9AM-4PM
          </span>
          <span>Casting Verification Active</span>
          <span>© {new Date().getFullYear()} CLASSIC AIRCOOLED VW WORKS. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
}

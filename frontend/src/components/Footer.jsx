import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full mt-24 bg-[#0e0e0f] border-t border-[#584236]/20 text-[#e0c0b1]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-16 py-16 max-w-[1440px] mx-auto font-body-md text-sm">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1">
          <div className="font-h3 text-lg text-[#ff7a1a] font-bold mb-3 tracking-tighter">
            RUSTY AIRCOOLED VW WORKS
          </div>
          <p className="font-technical-data text-xs text-[#a78b7d] max-w-xs leading-relaxed">
            Precision OEM-grade components verified against original mechanical blueprints for air-cooled restorations.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-3 font-label-caps text-xs tracking-wider uppercase">
          <a className="hover:text-[#ff7a1a] transition-colors" href="#catalog">Catalog</a>
          <a className="hover:text-[#ff7a1a] transition-colors" href="#blueprint">Blueprint Inspector</a>
          <a className="hover:text-[#ff7a1a] transition-colors" href="#vehicles">Vehicles</a>
        </div>

        <div className="flex flex-col gap-3 font-label-caps text-xs tracking-wider uppercase">
          <a className="hover:text-[#ff7a1a] transition-colors" href="#workshop">Showcase</a>
          <a className="hover:text-[#ff7a1a] transition-colors" href="#reviews">Customer Reviews</a>
          <a className="hover:text-[#ff7a1a] transition-colors" href="#support">Contact Support</a>
        </div>

        {/* Technical Specs Footer Note */}
        <div className="flex flex-col gap-2 font-technical-data text-xs text-[#a78b7d]">
          <span className="text-[#83cffb] font-bold">SYSTEM STATUS // ONLINE</span>
          <span>Casting Verification Active</span>
          <span>© {new Date().getFullYear()} RUSTY AIRCOOLED VW WORKS. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
}

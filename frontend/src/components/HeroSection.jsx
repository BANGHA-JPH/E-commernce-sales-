import React from 'react';
import heroEngineImage from '../assets/hero_engine.png';

export default function HeroSection({ onSelectCarModel }) {
  const scrollToCatalog = () => {
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBlueprint = () => {
    const blueprintEl = document.getElementById('blueprint');
    if (blueprintEl) {
      blueprintEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[870px] min-h-[600px] flex items-center justify-center overflow-hidden mb-32 border-b border-[#584236]/10">
      
      {/* Background Engine Image Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-40"
          style={{ 
            backgroundImage: `url(${heroEngineImage})` 
          }}
        />
        {/* Gradient dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131314] via-transparent to-[#131314]/80"></div>
      </div>

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 z-1 bg-blueprint-grid opacity-30 pointer-events-none"></div>

      {/* Hero Central Content */}
      <div className="relative z-10 text-center px-4 md:px-16 max-w-4xl mx-auto flex flex-col items-center pt-16">
        
        {/* Technical Status Badge */}
        <span className="font-technical-data text-xs text-[#83cffb] tracking-[0.2em] mb-6 uppercase border border-[#83cffb]/30 px-3 py-1 bg-[#131314]/50 backdrop-blur-sm">
          SYS.READY // 01
        </span>

        {/* H1 Heading */}
        <h1 className="font-h1 text-3xl sm:text-5xl md:text-6xl text-[#e5e2e3] font-bold mb-6 tracking-tight drop-shadow-lg leading-[1.1]">
          Rusty Aircooled.<br />
          Precision Parts.<br />
          <span className="text-[#ff7a1a]">Delivered.</span>
        </h1>

        {/* Value Proposition */}
        <p className="font-body-lg text-base sm:text-lg text-[#e0c0b1] mb-10 max-w-2xl leading-relaxed">
          Engineered precision for high-end VW & classic engine restorations. OEM-grade components verified against original mechanical blueprints for Flat-Four, Flat-Six, and Performance V8 Engines.
        </p>

        {/* Action Buttons (Solid High Contrast - No Gradients) */}
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <button 
            onClick={scrollToCatalog}
            className="bg-[#ff7a1a] hover:bg-[#ffb68e] text-black font-label-caps text-xs sm:text-sm px-8 py-4 glow-button uppercase font-bold tracking-wider transition-all"
          >
            Shop the Catalog
          </button>

          <button 
            onClick={scrollToBlueprint}
            className="ghost-button text-[#83cffb] font-technical-data text-xs sm:text-sm px-8 py-4 uppercase bg-[#131314]/30 backdrop-blur-md transition-all"
          >
            Open Blueprint Inspector
          </button>
        </div>
      </div>

      {/* Trust Strip Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 w-full bg-[#0e0e0f]/80 backdrop-blur-md border-t border-[#584236]/10 py-4 z-20">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-wrap justify-around items-center opacity-60 font-technical-data text-xs text-[#e0c0b1] gap-4">
          <span className="hover:text-[#ff7a1a] transition-colors cursor-pointer">VW CLASSIC PARTS</span>
          <span className="hidden md:inline text-[#584236]">|</span>
          <span className="hover:text-[#ff7a1a] transition-colors cursor-pointer">EMPI AUTHENTIC</span>
          <span className="hidden md:inline text-[#584236]">|</span>
          <span className="hover:text-[#ff7a1a] transition-colors cursor-pointer">MAHLE MOTORSPORT</span>
          <span className="hidden md:inline text-[#584236]">|</span>
          <span className="hover:text-[#ff7a1a] transition-colors cursor-pointer">WEBER CARBURETORS</span>
        </div>
      </div>

    </section>
  );
}


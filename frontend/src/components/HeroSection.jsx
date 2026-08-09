import React from 'react';
import heroEngineImage from '../assets/hero_engine.png';
import { Car, ChevronDown, Wrench, ShieldCheck } from 'lucide-react';

export default function HeroSection({ onSelectCarModel }) {
  const scrollToCatalog = () => {
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToVintageCars = () => {
    const vintageCarsEl = document.getElementById('vintage-cars');
    if (vintageCarsEl) {
      vintageCarsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden border-b border-[#584236]/20 bg-[#131314] pt-12 pb-20">
      
      {/* Background Engine Image Overlay */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div 
          className="w-full h-full bg-contain bg-center bg-no-repeat opacity-30 mix-blend-screen"
          style={{ 
            backgroundImage: `url(${heroEngineImage})` 
          }}
        />
        {/* Gradient dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131314] via-[#131314]/80 to-[#131314]"></div>
      </div>

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 z-1 bg-blueprint-grid opacity-20 pointer-events-none"></div>

      {/* Hero Central Content */}
      <div className="relative z-10 text-center px-4 md:px-16 max-w-4xl mx-auto flex flex-col items-center pt-8">
        
        {/* Technical Status Badge */}
        <div className="inline-flex items-center gap-2 font-technical-data text-xs text-[#83cffb] tracking-[0.15em] mb-6 uppercase border border-[#83cffb]/30 px-3.5 py-1.5 bg-[#131314]/70 backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-[#ff7a1a]" />
          <span>OEM VINTAGE AUTO PARTS & ENGINE INVENTORY</span>
        </div>

        {/* Main H1 Heading */}
        <h1 className="font-h1 text-3xl sm:text-5xl md:text-6xl text-[#e5e2e3] font-bold mb-6 tracking-tight drop-shadow-lg leading-[1.1]">
          Vintage Cars.<br />
          Authentic Engines.<br />
          <span className="text-[#ff7a1a]">Precision Spare Parts.</span>
        </h1>

        {/* Value Proposition */}
        <p className="font-body-lg text-base sm:text-lg text-[#e0c0b1] mb-10 max-w-2xl leading-relaxed">
          Select your vintage car model to discover exact OEM casting numbers, dual-port carburetors, engine pistons, and hard-to-find restoration components.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <button 
            onClick={scrollToVintageCars}
            className="bg-[#ff7a1a] hover:bg-[#ffb68e] text-black font-label-caps text-xs sm:text-sm px-8 py-4 glow-button uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <Car className="w-4 h-4" />
            Select Your Vintage Car
          </button>

          <button 
            onClick={scrollToCatalog}
            className="ghost-button text-[#83cffb] border border-[#83cffb]/30 font-technical-data text-xs sm:text-sm px-8 py-4 uppercase bg-[#131314]/50 backdrop-blur-md hover:bg-[#83cffb]/10 transition-all flex items-center justify-center gap-2"
          >
            <Wrench className="w-4 h-4" />
            Browse Full Parts Catalog
          </button>
        </div>
      </div>

      {/* Trust Strip Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 w-full bg-[#0e0e0f]/90 backdrop-blur-md border-t border-[#584236]/20 py-3.5 z-20">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-wrap justify-around items-center opacity-75 font-technical-data text-xs text-[#e0c0b1] gap-4">
          <span className="hover:text-[#ff7a1a] transition-colors">VOLKSWAGEN AIRCOOLED</span>
          <span className="hidden md:inline text-[#584236]">|</span>
          <span className="hover:text-[#ff7a1a] transition-colors">FORD SHELBY GT500</span>
          <span className="hidden md:inline text-[#584236]">|</span>
          <span className="hover:text-[#ff7a1a] transition-colors">PORSCHE 911 FLAT-SIX</span>
          <span className="hidden md:inline text-[#584236]">|</span>
          <span className="hover:text-[#ff7a1a] transition-colors">MERCEDES 300SL GULLWING</span>
          <span className="hidden md:inline text-[#584236]">|</span>
          <span className="hover:text-[#ff7a1a] transition-colors">CHEVROLET CORVETTE C2</span>
        </div>
      </div>

    </section>
  );
}

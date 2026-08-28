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
    <section className="relative min-h-[520px] sm:min-h-[640px] flex items-center justify-center overflow-hidden border-b border-[#584236]/20 bg-[#131314] pt-8 sm:pt-12 pb-14 sm:pb-20">
      
      {/* Background Engine Image Overlay */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div 
          className="w-full h-full bg-contain bg-center bg-no-repeat opacity-25 sm:opacity-30 mix-blend-screen"
          style={{ 
            backgroundImage: `url(${heroEngineImage})` 
          }}
        />
        {/* Gradient dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131314] via-[#131314]/85 to-[#131314]"></div>
      </div>

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 z-1 bg-blueprint-grid opacity-20 pointer-events-none"></div>

      {/* Hero Central Content */}
      <div className="relative z-10 text-center px-3 sm:px-6 md:px-12 max-w-4xl mx-auto flex flex-col items-center pt-4 sm:pt-8">
        
        {/* Technical Status Badge */}
        <div className="inline-flex items-center gap-1.5 font-technical-data text-[10px] sm:text-xs text-[#83cffb] tracking-[0.12em] mb-4 sm:mb-6 uppercase border border-[#83cffb]/30 px-2.5 py-1 sm:px-3.5 sm:py-1.5 bg-[#131314]/80 backdrop-blur-md rounded-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#ff7a1a]" />
          <span>CLASSIC AIRCOOLED VW WORKS // OEM PARTS & ENGINES</span>
        </div>

        {/* Main H1 Heading */}
        <h1 className="font-h1 text-xl min-[380px]:text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#e5e2e3] font-bold mb-4 sm:mb-6 tracking-tight drop-shadow-lg leading-[1.2] sm:leading-[1.1]">
          Classic Aircooled VW Works.<br />
          Authentic Engines.<br />
          <span className="text-[#ff7a1a]">Precision Spare Parts.</span>
        </h1>

        {/* Value Proposition */}
        <p className="font-body-lg text-xs sm:text-sm md:text-base text-[#e0c0b1] mb-6 sm:mb-8 max-w-2xl leading-relaxed px-2">
          Select your vehicle model to discover exact OEM casting numbers, dual-port carburetors, engine pistons, and hard-to-find restoration components.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-2 sm:px-0">
          <button 
            onClick={scrollToVintageCars}
            className="w-full sm:w-auto min-h-[44px] bg-[#ff7a1a] hover:bg-[#ffb68e] text-black font-label-caps text-xs sm:text-sm px-5 py-3 sm:px-7 sm:py-3.5 glow-button uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-2 rounded-xs cursor-pointer shadow-lg"
          >
            <Car className="w-4 h-4" />
            Select Your Vehicle
          </button>

          <button 
            onClick={scrollToCatalog}
            className="w-full sm:w-auto min-h-[44px] ghost-button text-[#83cffb] border border-[#83cffb]/30 font-technical-data text-xs sm:text-sm px-5 py-3 sm:px-7 sm:py-3.5 uppercase bg-[#131314]/60 backdrop-blur-md hover:bg-[#83cffb]/10 transition-all flex items-center justify-center gap-2 rounded-xs cursor-pointer"
          >
            <Wrench className="w-4 h-4" />
            Browse Full Parts Catalog
          </button>
        </div>
      </div>

      {/* Trust Strip Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 w-full bg-[#0e0e0f]/90 backdrop-blur-md border-t border-[#584236]/20 py-2 sm:py-3 z-20 overflow-x-auto no-scrollbar">
        <div className="max-w-[1440px] mx-auto px-4 flex flex-nowrap sm:flex-wrap justify-start sm:justify-around items-center opacity-75 font-technical-data text-[10px] sm:text-xs text-[#e0c0b1] gap-3 sm:gap-4 whitespace-nowrap">
          <span className="hover:text-[#ff7a1a] transition-colors">VOLKSWAGEN AIRCOOLED</span>
          <span className="text-[#584236]">|</span>
          <span className="hover:text-[#ff7a1a] transition-colors">FORD SHELBY GT500</span>
          <span className="text-[#584236]">|</span>
          <span className="hover:text-[#ff7a1a] transition-colors">PORSCHE 911 FLAT-SIX</span>
          <span className="text-[#584236]">|</span>
          <span className="hover:text-[#ff7a1a] transition-colors">MERCEDES 300SL GULLWING</span>
          <span className="text-[#584236]">|</span>
          <span className="hover:text-[#ff7a1a] transition-colors">CHEVROLET CORVETTE C2</span>
        </div>
      </div>

    </section>
  );
}

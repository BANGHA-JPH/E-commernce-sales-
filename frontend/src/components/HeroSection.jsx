import React, { useState } from 'react';
import { ShieldCheck, Cpu, ChevronRight, Gauge, Wrench, Sparkles, Award } from 'lucide-react';
import { VINTAGE_CARS } from '../data/partsData';

export default function HeroSection({ onSelectCarModel }) {
  const [activeCarIndex, setActiveCarIndex] = useState(0);
  const activeCar = VINTAGE_CARS[activeCarIndex];

  return (
    <section id="models" className="relative min-h-[85vh] bg-[#0D0F12] overflow-hidden flex flex-col justify-center border-b border-slate-800">
      
      {/* Background Decorative Gradients & Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/20 via-[#0D0F12] to-[#0D0F12] pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium tracking-wide mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>AUTHENTICATED NOS & FACTORY RESTORED VINTAGE PARTS</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Hero Content & Specs */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none font-display">
              Preserving <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500">
                Automotive Royalty
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              Precision-matched original parts, casting-verified components, and museum-grade engine assemblies for legendary 1950s–1980s vintage classics.
            </p>

            {/* Active Car Highlight Box */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                  Featured Model & Engine
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {activeCar.era}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white mb-1 font-display">
                {activeCar.name}
              </h2>

              <div className="flex items-center gap-2 text-sm text-slate-400 mb-4 font-mono">
                <Cpu className="w-4 h-4 text-amber-400" />
                <span>{activeCar.engineName}</span>
              </div>

              {/* Quick Spec Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/80 text-xs">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="text-slate-500 text-[10px]">OUTPUT</div>
                    <div className="font-semibold text-slate-200">{activeCar.horsepower}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="text-slate-500 text-[10px]">ENGINE TYPE</div>
                    <div className="font-semibold text-slate-200">{activeCar.engineType}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#catalog"
                onClick={() => onSelectCarModel(activeCar.id)}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-6 py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-amber-500/20 hover:scale-105 transition-all"
              >
                <span>Browse {activeCar.make} Parts</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="#blueprint"
                className="flex items-center gap-2 bg-slate-900/90 border border-slate-700 hover:border-slate-500 text-slate-200 px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-all"
              >
                <Cpu className="w-4 h-4 text-amber-400" />
                <span>Inspect Engine Blueprint</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Vintage Car Visualizer */}
          <div className="lg:col-span-6 relative">
            
            {/* Visual Framing Container */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 group">
              <img 
                src={activeCar.image} 
                alt={activeCar.name}
                className="w-full h-[400px] sm:h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-transparent to-transparent opacity-90" />

              {/* Floating Quality Badge */}
              <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 flex items-center gap-3 text-xs text-white">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-100">Grade A Provenance</div>
                  <div className="text-[10px] text-slate-400">Casting Code Verified</div>
                </div>
              </div>

              {/* Car Selector Slider Controls */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md border border-slate-800 p-3 rounded-2xl">
                <div className="text-[11px] font-mono text-slate-400 mb-2 uppercase tracking-wider text-center">
                  Select Vintage Car Model & Engine Architecture
                </div>
                
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {VINTAGE_CARS.map((car, idx) => (
                    <button
                      key={car.id}
                      onClick={() => setActiveCarIndex(idx)}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeCarIndex === idx
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {car.make}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Global Key Trust Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-slate-800/80">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-center">
            <div className="text-2xl font-extrabold text-amber-400 font-display">12,400+</div>
            <div className="text-xs text-slate-400 font-mono mt-1">NOS & Restored Parts</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-center">
            <div className="text-2xl font-extrabold text-white font-display">100%</div>
            <div className="text-xs text-slate-400 font-mono mt-1">Casting Authenticated</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-center">
            <div className="text-2xl font-extrabold text-amber-400 font-display">50+</div>
            <div className="text-xs text-slate-400 font-mono mt-1">Classic Car Models</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-center">
            <div className="text-2xl font-extrabold text-white font-display">Worldwide</div>
            <div className="text-xs text-slate-400 font-mono mt-1">Insured Restorer Freight</div>
          </div>
        </div>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { Cpu, Eye, ShoppingBag, Sparkles, CheckCircle2, Crosshair, HelpCircle } from 'lucide-react';
import { ENGINE_HOTSPOTS, SPARE_PARTS } from '../data/partsData';

export default function EngineBlueprintInspector({ onAddToCart, onViewPartDetails }) {
  const [activeHotspot, setActiveHotspot] = useState(ENGINE_HOTSPOTS[0]);
  const matchedPart = SPARE_PARTS.find(p => p.id === activeHotspot.partId) || SPARE_PARTS[0];

  return (
    <section id="blueprint" className="py-20 bg-slate-950 relative border-b border-slate-800">
      
      {/* Blueprint Grid Styling Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Crosshair className="w-3.5 h-3.5 animate-spin" />
            <span>INTERACTIVE EXPLODED DIAGRAM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Vintage Engine <span className="text-amber-400">Blueprint Inspector</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base">
            Hover and click on engine component hotspots below to inspect original casting codes, technical schematics, and add rare parts directly to your cart.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Schematic Canvas */}
          <div className="lg:col-span-7 relative bg-slate-900/90 rounded-3xl border border-cyan-900/50 p-6 shadow-2xl overflow-hidden group">
            
            {/* Blueprint Header */}
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-4 mb-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-cyan-400">
                <Cpu className="w-4 h-4" />
                <span>SPECIMEN: 7.0L V8 COBRA JET (SCHEMATIC VERSION 1967.4)</span>
              </div>
              <span className="text-slate-500">SCALE: 1:1 OEM SPEC</span>
            </div>

            {/* Schematic Image with Hotspot Pins */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 min-h-[380px] flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80"
                alt="Engine Blueprint Visual"
                className="w-full h-[400px] object-cover opacity-60 mix-blend-luminosity filter contrast-125"
              />

              <div className="absolute inset-0 bg-cyan-950/20 pointer-events-none" />

              {/* Glowing Hotspot Pins */}
              {ENGINE_HOTSPOTS.map((hotspot) => {
                const isActive = activeHotspot.id === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    onClick={() => setActiveHotspot(hotspot)}
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group/pin transition-all duration-300 ${
                      isActive ? 'z-20 scale-125' : 'z-10 hover:scale-110'
                    }`}
                  >
                    <span className={`relative flex h-8 w-8 items-center justify-center rounded-full border ${
                      isActive 
                        ? 'bg-amber-500 border-white text-slate-950 shadow-lg shadow-amber-500/50' 
                        : 'bg-cyan-950/90 border-cyan-400 text-cyan-300 hover:bg-amber-500 hover:text-slate-950'
                    }`}>
                      <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                        isActive ? 'bg-amber-400' : 'bg-cyan-400'
                      }`} />
                      <Crosshair className="w-4 h-4 relative z-10" />
                    </span>
                    
                    {/* Hotspot Label Tooltip on Hover */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/pin:block bg-slate-950 text-white text-[10px] font-mono font-bold px-2 py-1 rounded shadow border border-slate-700 whitespace-nowrap z-30">
                      {hotspot.name}
                    </div>
                  </button>
                );
              })}

            </div>

            {/* Quick Hotspot Pill Selectors */}
            <div className="flex items-center gap-2 overflow-x-auto pt-4 scrollbar-none">
              {ENGINE_HOTSPOTS.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setActiveHotspot(h)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeHotspot.id === h.id
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {h.name}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Dynamic Hotspot Part Inspector Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl relative">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-semibold">
                  HOTSPOT COMPONENT # {matchedPart.id.toUpperCase()}
                </span>
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  IN STOCK ({matchedPart.stock} UNITS)
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white font-display mb-2">
                {matchedPart.title}
              </h3>

              <p className="text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed">
                {activeHotspot.shortDesc}
              </p>

              {/* Part Image & Spec Matrix */}
              <div className="rounded-xl overflow-hidden border border-slate-800 mb-4 h-44 relative group">
                <img
                  src={matchedPart.image}
                  alt={matchedPart.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-mono">
                  <span>CASTING: {matchedPart.castingCode}</span>
                  <span className="text-amber-400 font-bold">${matchedPart.price.toLocaleString()} USD</span>
                </div>
              </div>

              {/* Part Specifications Preview */}
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 text-xs space-y-2 mb-6">
                {matchedPart.specifications.slice(0, 3).map((spec, i) => (
                  <div key={i} className="flex items-center justify-between text-slate-300 font-mono">
                    <span className="text-slate-500">{spec.key}:</span>
                    <span className="font-semibold text-slate-200">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Component Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onViewPartDetails(matchedPart)}
                  className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 rounded-xl text-xs font-semibold border border-slate-700 transition-all"
                >
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>Full Technical Specs</span>
                </button>

                <button
                  onClick={() => onAddToCart(matchedPart)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 py-3 rounded-xl text-xs font-bold shadow-lg shadow-amber-500/20 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Cart</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

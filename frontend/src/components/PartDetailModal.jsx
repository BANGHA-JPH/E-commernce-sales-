import React from 'react';
import { X, ShoppingBag, ShieldCheck, CheckCircle2, Award, Cpu, FileText, Wrench } from 'lucide-react';

export default function PartDetailModal({ part, onClose, onAddToCart }) {
  if (!part) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-8 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-12">
          
          {/* Left Column: Image & Authenticity Badges */}
          <div className="md:col-span-5 bg-slate-950 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
            <div className="space-y-4">
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-800">
                <img
                  src={part.image}
                  alt={part.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-xs font-mono font-bold px-3 py-1 rounded-md">
                  {part.condition}
                </span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Award className="w-4 h-4" />
                  <span>Rarity Score: {part.rarityScore}</span>
                </div>
                <div className="text-slate-400">
                  CASTING CODE: <span className="text-slate-200">{part.castingCode}</span>
                </div>
                <div className="text-slate-400">
                  OEM NUMBER: <span className="text-slate-200">{part.oemNumber}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Certified Vintage Authenticity Guarantee Included</span>
            </div>
          </div>

          {/* Right Column: Part Specs & Details */}
          <div className="md:col-span-7 p-6 space-y-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wide mb-1">
                {part.carModelName} • {part.era}
              </div>

              <h2 className="text-2xl font-bold text-white font-display mb-2">
                {part.title}
              </h2>

              <div className="text-2xl font-extrabold text-amber-400 font-display mb-4">
                ${part.price.toLocaleString()} USD
              </div>

              {/* Provenance Story */}
              <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800 mb-4">
                <div className="text-[10px] font-mono text-amber-400 uppercase mb-1 flex items-center gap-1">
                  <FileText className="w-3 h-3" /> PROVENANCE & CONDITION HISTORY
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {part.provenance}
                </p>
              </div>

              {/* Technical Specifications List */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Wrench className="w-3.5 h-3.5 text-amber-400" /> Technical Specifications:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {part.specifications.map((spec, i) => (
                    <div key={i} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">{spec.key}</span>
                      <span className="text-slate-200 font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compatible Vehicle List */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-amber-400" /> Vehicle Compatibility Matrix:
                </div>
                <ul className="text-xs text-slate-300 space-y-1 font-mono pl-2">
                  {part.compatibleVehicles.map((v, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-800 flex items-center gap-4">
              <button
                onClick={() => {
                  onAddToCart(part);
                  onClose();
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-amber-500/20 transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add To Guest Cart (${part.price.toLocaleString()})</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

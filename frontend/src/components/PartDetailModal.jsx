import React from 'react';
import { X, ShoppingBag, ShieldCheck, CheckCircle2, Award, Cpu, FileText, Wrench, Box, MessageCircle, Phone } from 'lucide-react';

export default function PartDetailModal({ part, onClose, onAddToCart, onRequestItem, onReserveItem }) {
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
                  <span>Rarity Score: {part.rarityScore || 'Specialist Grade'}</span>
                </div>
                <div className="text-slate-400">
                  SKU / P/N: <span className="text-slate-200">{part.sku || part.oemNumber || 'NOS-GENUINE'}</span>
                </div>
                <div className="text-slate-400">
                  SYSTEM / SUB: <span className="text-slate-200">{part.partSubcategory || part.specificPartCategory || part.systemCategory || 'Engine System'}</span>
                </div>
                {part.storageLocation && (
                  <div className="text-slate-400">
                    LOCATION: <span className="text-slate-200">{part.storageLocation}</span>
                  </div>
                )}
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
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wide mb-1 flex items-center justify-between">
                <span>{part.carModelName || part.modelYearRange || 'VW Air-Cooled'} • {part.era || part.modelYearRange || 'All Years'}</span>
                <span className="text-emerald-400 font-bold">{part.status || (part.inStock ? 'Available' : 'Out of Stock')}</span>
              </div>

              <h2 className="text-2xl font-bold text-white font-display mb-2">
                {part.title}
              </h2>

              <div className="text-2xl font-extrabold text-amber-400 font-display mb-4">
                ${part.price ? part.price.toLocaleString() : '0.00'} USD
              </div>

              {/* Provenance / Technical Description */}
              <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800 mb-4">
                <div className="text-[10px] font-mono text-amber-400 uppercase mb-1 flex items-center gap-1">
                  <FileText className="w-3 h-3" /> PROVENANCE & TECHNICAL DESCRIPTION
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {part.description || part.provenance || 'No description provided.'}
                </p>
              </div>

              {/* Technical Specifications List */}
              {Array.isArray(part.specifications) && part.specifications.length > 0 && (
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
              )}

              {/* Engine & Vehicle Compatibility List */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-amber-400" /> Compatibility Matrix:
                </div>
                <ul className="text-xs text-slate-300 space-y-1 font-mono pl-2">
                  {(part.compatibleModels || part.compatibleVehicles || [part.modelYearRange || 'Universal Fitment']).map((v, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{v}</span>
                    </li>
                  ))}
                  {Array.isArray(part.compatibleEngineSizes) && part.compatibleEngineSizes.length > 0 && (
                    <li className="flex items-center gap-2 text-amber-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>Engines: {part.compatibleEngineSizes.join(', ')}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (onRequestItem) onRequestItem(part);
                    onClose();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#ff7a1a] hover:bg-[#ffb68e] text-black py-3 rounded-xl font-bold text-sm shadow-xl transition-all uppercase tracking-wider"
                >
                  <Box className="w-4 h-4" />
                  <span>Request Item (${part.price.toLocaleString()})</span>
                </button>

                <button
                  onClick={() => {
                    if (onReserveItem) onReserveItem(part);
                    onClose();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-purple-600/30 hover:bg-purple-600 border border-purple-500/50 text-purple-200 hover:text-white py-3 rounded-xl font-bold text-sm transition-all uppercase tracking-wider"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Reserve Item</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

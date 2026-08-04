import React, { useState, useMemo } from 'react';
import { Filter, Search, ShoppingBag, Eye, Heart, ShieldCheck, Tag, Sparkles, Layers } from 'lucide-react';
import { SPARE_PARTS, VINTAGE_CARS } from '../data/partsData';

export default function CatalogSection({ 
  onAddToCart, 
  onViewPartDetails, 
  onToggleWishlist, 
  wishlistIds, 
  searchTerm, 
  selectedCarModelId 
}) {
  const [selectedEra, setSelectedEra] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedCarFilter, setSelectedCarFilter] = useState(selectedCarModelId || 'ALL');
  const [sortBy, setSortBy] = useState('FEATURED');

  // Categories list
  const categories = ['ALL', 'Fuel & Carburetion', 'Engine Block & Internals', 'Ignition & Electrical', 'Transmission & Clutch'];
  const eras = ['ALL', '1950s', '1960s', '1970s'];

  // Filter & Sort Logic
  const filteredParts = useMemo(() => {
    return SPARE_PARTS.filter((part) => {
      // Search match
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        part.title.toLowerCase().includes(searchLower) ||
        part.oemNumber.toLowerCase().includes(searchLower) ||
        part.carModelName.toLowerCase().includes(searchLower) ||
        part.castingCode.toLowerCase().includes(searchLower);

      // Era match
      const matchesEra = selectedEra === 'ALL' || part.era === selectedEra;

      // Category match
      const matchesCategory = selectedCategory === 'ALL' || part.category === selectedCategory;

      // Car Model match
      const matchesCar = selectedCarFilter === 'ALL' || part.carModelId === selectedCarFilter;

      return matchesSearch && matchesEra && matchesCategory && matchesCar;
    }).sort((a, b) => {
      if (sortBy === 'PRICE_LOW') return a.price - b.price;
      if (sortBy === 'PRICE_HIGH') return b.price - a.price;
      if (sortBy === 'RARITY') return b.rarityScore.localeCompare(a.rarityScore);
      return 0; // FEATURED
    });
  }, [searchTerm, selectedEra, selectedCategory, selectedCarFilter, sortBy]);

  return (
    <section id="catalog" className="py-20 bg-[#0D0F12] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>AUTHENTICATED CATALOG (GUEST BROWSING)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Spare Parts <span className="text-amber-400">Inventory</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Browse original casting-coded engine components, carburetion systems, and vintage assemblies.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono py-2 px-3 rounded-xl focus:outline-none focus:border-amber-500"
            >
              <option value="FEATURED">Featured Inventory</option>
              <option value="PRICE_LOW">Price: Low to High</option>
              <option value="PRICE_HIGH">Price: High to Low</option>
              <option value="RARITY">Rarity Score</option>
            </select>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-10">
          
          {/* Era Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Era:
            </span>
            {eras.map((era) => (
              <button
                key={era}
                onClick={() => setSelectedEra(era)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedEra === era
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {era === 'ALL' ? 'All Eras' : era}
              </button>
            ))}
          </div>

          {/* Model Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mr-2">Car Model:</span>
            <button
              onClick={() => setSelectedCarFilter('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCarFilter === 'ALL'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              All Vintage Models
            </button>
            {VINTAGE_CARS.map((car) => (
              <button
                key={car.id}
                onClick={() => setSelectedCarFilter(car.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCarFilter === car.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {car.make}
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mr-2">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-slate-700 text-white font-semibold border border-slate-500'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat === 'ALL' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredParts.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800">
            <Search className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1 font-display">No Spare Parts Found</h3>
            <p className="text-slate-400 text-xs">Try clearing search keywords or resetting your model/era filters.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredParts.map((part) => {
              const isWishlisted = wishlistIds.includes(part.id);
              return (
                <div
                  key={part.id}
                  className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10"
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative h-52 overflow-hidden bg-slate-950">
                      <img
                        src={part.image}
                        alt={part.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                      {/* Condition Badge */}
                      <span className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-sm border border-amber-500/40 text-amber-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md">
                        {part.condition}
                      </span>

                      {/* Wishlist Button */}
                      <button
                        onClick={() => onToggleWishlist(part.id)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all ${
                          isWishlisted
                            ? 'bg-rose-500 border-rose-400 text-white'
                            : 'bg-slate-950/70 border-slate-700 text-slate-300 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>

                      {/* OEM Badge */}
                      <div className="absolute bottom-2 left-3 right-3 text-[10px] font-mono text-slate-300 truncate">
                        OEM: {part.oemNumber}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 space-y-3">
                      <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wide">
                        {part.carModelName}
                      </div>

                      <h3 className="text-base font-bold text-white line-clamp-2 leading-snug group-hover:text-amber-300 transition-colors font-display">
                        {part.title}
                      </h3>

                      <div className="text-xs text-slate-400 space-y-1 font-mono">
                        <div className="flex justify-between">
                          <span className="text-slate-500">ENGINE:</span>
                          <span className="text-slate-300 font-semibold">{part.engineType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">CASTING:</span>
                          <span className="text-slate-300">{part.castingCode}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Price & CTA Actions */}
                  <div className="p-4 pt-0 space-y-3">
                    <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                      <div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase">PRICE (USD)</div>
                        <div className="text-lg font-extrabold text-amber-400 font-display">
                          ${part.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-mono text-slate-500">RARITY SCORE</div>
                        <div className="text-xs font-mono font-bold text-emerald-400">{part.rarityScore}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onViewPartDetails(part)}
                        className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 rounded-xl text-xs font-semibold border border-slate-700 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>Specs</span>
                      </button>

                      <button
                        onClick={() => onAddToCart(part)}
                        className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 transition-all"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}

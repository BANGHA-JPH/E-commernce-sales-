import React, { useState, useMemo } from 'react';
import { Filter, Search, ShoppingBag, Eye, Heart, Layers, Check } from 'lucide-react';
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
  const [addedIds, setAddedIds] = useState([]);

  // Categories list
  const categories = ['ALL', 'Fuel & Carburetion', 'Engine Block & Internals', 'Ignition & Electrical', 'Transmission & Clutch'];
  const eras = ['ALL', '1950s', '1960s', '1970s'];

  // Handle Add To Cart with instant feedback
  const handleAdd = (part) => {
    onAddToCart(part);
    setAddedIds(prev => [...prev, part.id]);
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== part.id));
    }, 2000);
  };

  // Filter & Sort Logic
  const filteredParts = useMemo(() => {
    return SPARE_PARTS.filter((part) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        part.title.toLowerCase().includes(searchLower) ||
        part.oemNumber.toLowerCase().includes(searchLower) ||
        part.carModelName.toLowerCase().includes(searchLower) ||
        part.castingCode.toLowerCase().includes(searchLower);

      const matchesEra = selectedEra === 'ALL' || part.era === selectedEra;
      const matchesCategory = selectedCategory === 'ALL' || part.category === selectedCategory;
      const matchesCar = selectedCarFilter === 'ALL' || part.carModelId === selectedCarFilter;

      return matchesSearch && matchesEra && matchesCategory && matchesCar;
    }).sort((a, b) => {
      if (sortBy === 'PRICE_LOW') return a.price - b.price;
      if (sortBy === 'PRICE_HIGH') return b.price - a.price;
      if (sortBy === 'RARITY') return b.rarityScore.localeCompare(a.rarityScore);
      return 0;
    });
  }, [searchTerm, selectedEra, selectedCategory, selectedCarFilter, sortBy]);

  return (
    <section id="catalog" className="py-20 bg-[#131314] relative border-b border-[#584236]/20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#584236]/30 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#ff7a1a]/10 border border-[#ff7a1a]/30 text-[#ff7a1a] font-technical-data text-xs mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>SHOP THE FULL INVENTORY // GUEST BROWSING ENABLED</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-[#e5e2e3] font-h2">
              Spare Parts <span className="text-[#ff7a1a]">Catalog</span>
            </h2>
            <p className="text-[#e0c0b1] text-xs md:text-sm mt-1">
              Complete inventory of OEM-grade casting components, carburetion kits, and engine restoration parts.
            </p>
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-technical-data text-[#a78b7d]">SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#201f20] border border-[#584236]/60 text-[#e5e2e3] text-xs font-technical-data py-2 px-3 rounded-sm focus:outline-none focus:border-[#ff7a1a]"
            >
              <option value="FEATURED">Featured Inventory</option>
              <option value="PRICE_LOW">Price: Low to High</option>
              <option value="PRICE_HIGH">Price: High to Low</option>
              <option value="RARITY">Rarity Score</option>
            </select>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-10 font-label-caps text-xs">
          
          {/* Era Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="font-technical-data text-[#a78b7d] uppercase mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Era:
            </span>
            {eras.map((era) => (
              <button
                key={era}
                onClick={() => setSelectedEra(era)}
                className={`px-3.5 py-1.5 rounded-sm transition-all whitespace-nowrap uppercase tracking-wider ${
                  selectedEra === era
                    ? 'bg-[#ff7a1a] text-black font-bold glow-button'
                    : 'bg-[#201f20] text-[#e0c0b1] hover:text-[#ff7a1a] border border-[#584236]/40'
                }`}
              >
                {era === 'ALL' ? 'All Eras' : era}
              </button>
            ))}
          </div>

          {/* Model Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="font-technical-data text-[#a78b7d] uppercase mr-2">Car Model:</span>
            <button
              onClick={() => setSelectedCarFilter('ALL')}
              className={`px-3.5 py-1.5 rounded-sm transition-all whitespace-nowrap uppercase tracking-wider ${
                selectedCarFilter === 'ALL'
                  ? 'bg-[#ff7a1a] text-black font-bold glow-button'
                  : 'bg-[#201f20] text-[#e0c0b1] hover:text-[#ff7a1a] border border-[#584236]/40'
              }`}
            >
              All Vintage Models
            </button>
            {VINTAGE_CARS.map((car) => (
              <button
                key={car.id}
                onClick={() => setSelectedCarFilter(car.id)}
                className={`px-3.5 py-1.5 rounded-sm transition-all whitespace-nowrap uppercase tracking-wider ${
                  selectedCarFilter === car.id
                    ? 'bg-[#ff7a1a] text-black font-bold glow-button'
                    : 'bg-[#201f20] text-[#e0c0b1] hover:text-[#ff7a1a] border border-[#584236]/40'
                }`}
              >
                {car.make}
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="font-technical-data text-[#a78b7d] uppercase mr-2">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-sm font-technical-data transition-all whitespace-nowrap text-[11px] ${
                  selectedCategory === cat
                    ? 'bg-[#353436] text-[#ff7a1a] font-bold border border-[#ff7a1a]/50'
                    : 'bg-[#0e0e0f] text-[#a78b7d] hover:text-[#e5e2e3] border border-[#584236]/30'
                }`}
              >
                {cat === 'ALL' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

        </div>

        {/* Product Grid */}
        {filteredParts.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-sm">
            <Search className="w-12 h-12 text-[#a78b7d] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#e5e2e3] mb-1 font-h3">No Spare Parts Match Search</h3>
            <p className="text-[#a78b7d] text-xs font-technical-data">Try resetting model or category filters.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredParts.map((part) => {
              const isWishlisted = wishlistIds.includes(part.id);
              const isAdded = addedIds.includes(part.id);

              return (
                <div
                  key={part.id}
                  className="glass-panel p-4 flex flex-col justify-between rounded-sm group hover:border-[#ff7a1a] transition-all"
                >
                  <div>
                    {/* Part Image Box */}
                    <div className="relative h-48 overflow-hidden bg-[#0e0e0f] rounded-sm mb-4">
                      <img
                        src={part.image}
                        alt={part.title}
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />

                      {/* Condition Badge */}
                      <span className="absolute top-2 left-2 bg-[#131314]/90 border border-[#ff7a1a]/40 text-[#ff7a1a] text-[10px] font-technical-data font-bold px-2 py-0.5 rounded-sm">
                        {part.condition}
                      </span>

                      {/* Wishlist Button */}
                      <button
                        onClick={() => onToggleWishlist(part.id)}
                        className={`absolute top-2 right-2 p-1.5 rounded-sm backdrop-blur-md transition-all ${
                          isWishlisted
                            ? 'bg-[#ff7a1a] text-black'
                            : 'bg-[#131314]/80 text-[#e0c0b1] hover:text-[#ff7a1a]'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>

                      {/* OEM Number Tag */}
                      <div className="absolute bottom-2 left-2 right-2 text-[10px] font-technical-data text-[#83cffb] truncate bg-[#131314]/80 px-2 py-0.5 rounded-sm border border-[#83cffb]/20">
                        OEM // {part.oemNumber}
                      </div>
                    </div>

                    {/* Part Content */}
                    <div className="space-y-2 mb-4">
                      <div className="text-[10px] font-technical-data text-[#ff7a1a] uppercase">
                        {part.carModelName}
                      </div>

                      <h3 className="font-h3 text-sm font-bold text-[#e5e2e3] line-clamp-2 leading-snug group-hover:text-[#ff7a1a] transition-colors">
                        {part.title}
                      </h3>

                      <div className="text-xs text-[#a78b7d] font-technical-data space-y-1 pt-1">
                        <div className="flex justify-between">
                          <span>ENGINE:</span>
                          <span className="text-[#e0c0b1] font-bold">{part.engineType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>CASTING:</span>
                          <span className="text-[#e0c0b1]">{part.castingCode}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Pricing & Action Buttons */}
                  <div className="pt-3 border-t border-[#584236]/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[9px] font-technical-data text-[#a78b7d] uppercase">PRICE</div>
                        <div className="text-lg font-bold text-[#ff7a1a] font-technical-data">
                          ${part.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] font-technical-data text-[#a78b7d]">RARITY</div>
                        <div className="text-xs font-technical-data font-bold text-[#83cffb]">{part.rarityScore}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onViewPartDetails(part)}
                        className="p-2 border border-[#83cffb]/40 text-[#83cffb] hover:bg-[#83cffb]/10 text-xs font-label-caps uppercase font-bold rounded-sm flex items-center justify-center gap-1 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Specs</span>
                      </button>

                      <button
                        onClick={() => handleAdd(part)}
                        className={`p-2 font-label-caps text-xs uppercase font-bold tracking-wider rounded-sm flex items-center justify-center gap-1 transition-all ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#ff7a1a] hover:bg-[#ffb68e] text-black glow-button'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Added
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" /> Add
                          </>
                        )}
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

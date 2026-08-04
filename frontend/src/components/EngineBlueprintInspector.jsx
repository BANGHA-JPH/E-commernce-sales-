import React, { useState } from 'react';
import { Eye, Plus, Check } from 'lucide-react';

const BLUEPRINT_HOTSPOTS = [
  {
    id: 'carb-01',
    name: 'NOS Holley 4150 Carburetor',
    partNumber: 'PART // C7ZX-9510-A',
    price: 849.00,
    top: '25%',
    left: '35%',
    category: 'Fuel & Carburetion',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
    description: 'Original high-performance 4-barrel carburetor for classic flat-four & V8 engine platforms.'
  },
  {
    id: 'head-02',
    name: 'Dual-Port Aluminum Cylinder Head Set',
    partNumber: 'PART // VW-113-101-065',
    price: 425.00,
    top: '48%',
    left: '72%',
    category: 'Engine Block & Internals',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80',
    description: 'High-density aluminum alloy dual-port cylinder head set with hardened valve seats.'
  },
  {
    id: 'piston-03',
    name: 'Mahle Forged Piston & Cylinder Kit',
    partNumber: 'PART // MAHLE-85.5MM',
    price: 620.00,
    top: '68%',
    left: '48%',
    category: 'Engine Block & Internals',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80',
    description: 'Forged aluminum pistons with cast iron cylinders, wrist pins, and stainless rings.'
  }
];

export default function EngineBlueprintInspector({ onAddToCart, onViewPartDetails }) {
  const [selectedHotspot, setSelectedHotspot] = useState(BLUEPRINT_HOTSPOTS[0]);
  const [addedIds, setAddedIds] = useState([]);

  const handleAdd = (item) => {
    onAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      partNumber: item.partNumber,
      image: item.image,
      category: item.category
    });
    setAddedIds(prev => [...prev, item.id]);
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== item.id));
    }, 2000);
  };

  return (
    <section id="blueprint" className="max-w-[1440px] mx-auto px-4 md:px-8 mb-32 pt-8">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="font-h2 text-2xl md:text-4xl text-[#e5e2e3] font-bold mb-4">
          Inspect the Engine. Find the Part.
        </h2>
        <p className="font-body-md text-sm md:text-base text-[#e0c0b1] max-w-xl mx-auto">
          Interactive exploded schematics linked directly to our inventory database.
        </p>
      </div>

      {/* Blueprint Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[580px] h-[600px]">
        
        {/* Interactive Schematic View (Left Column) */}
        <div className="lg:col-span-2 glass-panel relative overflow-hidden flex items-center justify-center group cursor-crosshair">
          
          {/* Blueprint Grid Lines */}
          <div className="absolute inset-0 bg-blueprint-grid opacity-30"></div>
          
          {/* Technical Engine Schematic Diagram Background */}
          <div 
            className="w-full h-full bg-contain bg-center bg-no-repeat opacity-80 z-10 transition-transform duration-700 group-hover:scale-105"
            style={{ 
              backgroundImage: `url("https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80")` 
            }}
          />

          {/* Blueprint Header Label */}
          <div className="absolute top-4 left-4 font-technical-data text-xs text-[#83cffb]/70 z-20 uppercase tracking-widest bg-[#131314]/80 px-2.5 py-1 border border-[#83cffb]/20">
            SCHEMATIC // VW-T1-1600-FLAT4
          </div>

          {/* Interactive Pulsing Hotspots */}
          {BLUEPRINT_HOTSPOTS.map((hotspot) => {
            const isSelected = selectedHotspot?.id === hotspot.id;
            return (
              <button
                key={hotspot.id}
                onClick={() => setSelectedHotspot(hotspot)}
                style={{ top: hotspot.top, left: hotspot.left }}
                className={`absolute z-30 transform -translate-x-1/2 -translate-y-1/2 group/pin transition-all duration-300 ${
                  isSelected ? 'scale-125' : 'hover:scale-110'
                }`}
              >
                <span className={`block w-5 h-5 rounded-full border-2 ${
                  isSelected ? 'border-[#ff7a1a] bg-[#ff7a1a]/30' : 'border-[#83cffb] bg-[#83cffb]/20'
                } animate-pulse`} />
                <span className={`absolute top-0 left-0 w-5 h-5 rounded-full ${
                  isSelected ? 'bg-[#ff7a1a]' : 'bg-[#83cffb]'
                } opacity-75 blur-sm`} />
              </button>
            );
          })}

          {/* Active Blueprint Overlay Description Box */}
          {selectedHotspot && (
            <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-md bg-[#131314]/95 border border-[#ff7a1a]/40 p-4 z-30 backdrop-blur-md">
              <div className="flex justify-between items-start mb-1">
                <span className="font-technical-data text-[10px] text-[#ff7a1a] uppercase font-bold">
                  HOTSPOT ACTIVE // {selectedHotspot.category}
                </span>
                <span className="font-technical-data text-xs text-[#ff7a1a] font-bold">
                  ${selectedHotspot.price.toFixed(2)}
                </span>
              </div>
              <h3 className="font-h3 text-base text-[#e5e2e3] font-bold">
                {selectedHotspot.name}
              </h3>
              <p className="text-xs text-[#e0c0b1] mt-1 font-technical-data">
                {selectedHotspot.partNumber}
              </p>
            </div>
          )}

        </div>

        {/* Detail Inventory Panel (Right Column) */}
        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar h-full">
          {BLUEPRINT_HOTSPOTS.map((part) => {
            const isSelected = selectedHotspot?.id === part.id;
            const isAdded = addedIds.includes(part.id);
            return (
              <div 
                key={part.id}
                onClick={() => setSelectedHotspot(part)}
                className={`glass-panel p-4 flex flex-col gap-3 cursor-pointer transition-all ${
                  isSelected ? 'border-[#ff7a1a] bg-[#201f20]' : 'hover:border-[#584236]'
                }`}
              >
                <div className="aspect-square bg-[#353436] overflow-hidden relative group/img">
                  <img 
                    src={part.image} 
                    alt={part.name} 
                    className="w-full h-full object-cover opacity-80 group-hover/img:opacity-100 transition-opacity"
                  />
                  <div className="absolute top-2 right-2 bg-[#131314]/80 px-2 py-0.5 text-[10px] font-technical-data text-[#83cffb]">
                    {part.category}
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-h3 text-base text-[#e5e2e3] font-bold">
                      {part.name}
                    </h4>
                    <p className="font-technical-data text-xs text-[#ff7a1a] mt-0.5">
                      {part.partNumber}
                    </p>
                  </div>
                  <span className="text-[#ff7a1a] font-technical-data font-bold text-base">
                    ${part.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-xs text-[#a78b7d] line-clamp-2">
                  {part.description}
                </p>

                <div className="flex items-center gap-2 pt-2 border-t border-[#584236]/30">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAdd(part);
                    }}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 font-label-caps text-xs uppercase font-bold tracking-wider transition-all ${
                      isAdded 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-[#ff7a1a] hover:bg-[#ffb68e] text-black glow-button'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Added to Cart
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" /> Add to Cart
                      </>
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewPartDetails(part);
                    }}
                    className="p-2 border border-[#83cffb]/40 text-[#83cffb] hover:bg-[#83cffb]/10 transition-colors"
                    title="View Technical Specs"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}


import React from 'react';
import { Car, Cpu, Wrench, ArrowRight, Image as ImageIcon, ChevronRight, Layers, Flame, Zap, Disc, Sliders, Cog, Wind, Shield, Armchair, Sparkles, X, Pin } from 'lucide-react';
import { VEHICLE_SYSTEMS, DIRECT_PART_CATEGORIES, DETAILED_ENGINES } from '../data/vwNavigationData';

export default function MegaMenu({ 
  category, 
  isPinned,
  onSelectFilter, 
  onCloseMenu 
}) {
  if (!category) return null;

  const isPartsMenu = category.menuType === 'parts';

  const handleSelectModel = (modelId) => {
    onSelectFilter({ categoryId: category?.id || 'ALL', modelId, navMode: 'vehicle' });
    onCloseMenu();
  };

  const handleSelectEngine = (engineSize) => {
    onSelectFilter({ categoryId: category?.id || 'ALL', engineSize, navMode: 'vehicle' });
    onCloseMenu();
  };

  const handleSelectSystem = (systemId) => {
    onSelectFilter({ categoryId: category?.id || 'ALL', systemId, navMode: isPartsMenu ? 'parts' : 'vehicle' });
    onCloseMenu();
  };

  const handleSelectDirectPart = (directPartId, systemId) => {
    onSelectFilter({ directPartId, systemId: systemId || 'ALL', navMode: 'parts' });
    onCloseMenu();
  };

  const handleViewAllCategory = () => {
    if (isPartsMenu) {
      onSelectFilter({ navMode: 'parts', categoryId: 'ALL', systemId: 'ALL' });
    } else {
      onSelectFilter({ categoryId: category.id, navMode: 'vehicle' });
    }
    onCloseMenu();
  };

  return (
    <div 
      className="absolute top-full left-0 w-full bg-[#181719]/98 backdrop-blur-2xl border-b border-[#ff7a1a]/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-50 text-white font-technical-data transition-all duration-200 animate-in fade-in slide-in-from-top-2"
      onMouseLeave={() => {
        if (!isPinned) {
          onCloseMenu();
        }
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6">
        
        {/* Header Bar with Pinned Indicator & Close Controls */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#584236]/40">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] text-[#ff7a1a] uppercase tracking-widest font-bold">
                {isPartsMenu ? 'DIRECT MECHANICS NAVIGATION (CB PERFORMANCE DEPTH)' : 'VEHICLE-BASED DISCOVERY (JBUGS SIMPLICITY)'}
              </span>

              {isPinned && (
                <span className="inline-flex items-center gap-1 bg-[#ff7a1a]/20 border border-[#ff7a1a]/60 text-[#ff7a1a] text-[9px] font-bold px-2 py-0.5 rounded-xs uppercase">
                  <Pin className="w-3 h-3 fill-current" />
                  <span>Pinned Open</span>
                </span>
              )}
            </div>

            <h3 className="text-lg md:text-xl font-bold text-[#e5e2e3] font-h2 flex items-center gap-2">
              {isPartsMenu ? 'Browse All Parts Systems & Direct Components' : category.name}
              {!isPartsMenu && category.description && (
                <span className="text-xs font-normal text-[#a78b7d] font-technical-data">
                  ({category.description})
                </span>
              )}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleViewAllCategory}
              className="text-xs text-black bg-[#ff7a1a] hover:bg-[#ffb68e] font-bold px-4 py-2 rounded-xs flex items-center gap-1.5 transition-all glow-button uppercase tracking-wider"
            >
              <span>{isPartsMenu ? 'Explore Full Parts Catalog' : `Browse All ${category.name}`}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {isPinned && (
              <button
                onClick={onCloseMenu}
                className="text-xs text-[#83cffb] hover:text-white bg-[#201f20] hover:bg-[#353436] border border-[#83cffb]/40 font-bold px-3 py-2 rounded-xs flex items-center gap-1 transition-all"
                title="Close Navigation Menu"
              >
                <X className="w-4 h-4 text-[#ff7a1a]" />
                <span>Close ✕</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Content based on Menu Type */}
        {isPartsMenu ? (
          /* PARTS-FIRST MEGA MENU: 10 Systems + Direct Component Categories */
          <div className="grid grid-cols-12 gap-8">
            
            {/* Column 1: 10 CB Performance Vehicle Systems (7 Cols) */}
            <div className="col-span-7 border-r border-[#584236]/30 pr-6">
              <h4 className="text-xs uppercase tracking-wider text-[#ff7a1a] font-bold mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#ff7a1a]" />
                <span>7 Core Vehicle Systems (Click to Select)</span>
              </h4>

              <div className="grid grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pr-1">
                {VEHICLE_SYSTEMS.map((system) => (
                  <div
                    key={system.id}
                    onClick={() => handleSelectSystem(system.id)}
                    className="group p-2.5 rounded-xs bg-[#201f20] hover:bg-[#ff7a1a]/15 border border-[#584236]/30 hover:border-[#ff7a1a]/80 cursor-pointer transition-all flex items-start gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-xs bg-[#131314] flex items-center justify-center shrink-0 border border-[#584236]/50 group-hover:border-[#ff7a1a] text-sm">
                      {system.emoji || '⚙️'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-[#e5e2e3] group-hover:text-[#ff7a1a] block truncate transition-colors">
                        {system.name}
                      </span>
                      <span className="text-[10px] text-[#a78b7d] block line-clamp-1">
                        {system.subcategories?.length || 0} Subcategories
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Direct Mechanic Parts Quick Browsing (5 Cols) */}
            <div className="col-span-5">
              <h4 className="text-xs uppercase tracking-wider text-[#ff7a1a] font-bold mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#ff7a1a]" />
                <span>Direct Component Categories</span>
              </h4>

              <div className="grid grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pr-1">
                {DIRECT_PART_CATEGORIES.map((directPart) => (
                  <button
                    key={directPart.id}
                    onClick={() => handleSelectDirectPart(directPart.id, directPart.systemId)}
                    className="text-left text-xs p-2 rounded-xs bg-[#201f20] hover:bg-[#ff7a1a]/15 border border-[#584236]/40 hover:border-[#ff7a1a] text-[#e0c0b1] hover:text-[#ff7a1a] transition-all flex flex-col justify-between"
                  >
                    <span className="font-bold text-[#e5e2e3] block group-hover:text-[#ff7a1a]">
                      {directPart.name}
                    </span>
                    <span className="text-[9px] text-[#83cffb] font-technical-data">
                      {directPart.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* VEHICLE-FIRST MEGA MENU: Models | Engines | Systems */
          <div className="grid grid-cols-12 gap-8">
            
            {/* Column 1: Vehicle Models (5 Columns wide) */}
            <div className="col-span-5 border-r border-[#584236]/30 pr-6">
              <h4 className="text-xs uppercase tracking-wider text-[#ff7a1a] font-bold mb-3 flex items-center gap-2">
                <Car className="w-4 h-4 text-[#ff7a1a]" />
                <span>Vehicle Models (Click to Choose Directly)</span>
              </h4>

              {category.models && category.models.length > 0 ? (
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {category.models.map((model) => (
                    <div
                      key={model.id}
                      onClick={() => handleSelectModel(model.id)}
                      className="group flex items-center gap-3 p-2 rounded-xs bg-[#201f20] hover:bg-[#ff7a1a]/15 border border-[#584236]/30 hover:border-[#ff7a1a]/70 cursor-pointer transition-all"
                    >
                      <div className="w-12 h-10 rounded-xs bg-[#131314] border border-[#584236]/60 flex items-center justify-center shrink-0 group-hover:border-[#ff7a1a]">
                        {model.image ? (
                          <img src={model.image} alt={model.name} className="w-full h-full object-cover rounded-xs" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-[#584236] group-hover:text-[#ff7a1a] transition-colors" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#e5e2e3] group-hover:text-[#ff7a1a] truncate transition-colors">
                          {model.name}
                        </div>
                        <div className="text-[10px] text-[#a78b7d]">
                          {model.era} • {model.partsCount}
                        </div>
                      </div>

                      <ChevronRight className="w-3.5 h-3.5 text-[#584236] group-hover:text-[#ff7a1a] transition-colors" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-[#a78b7d] py-4 bg-[#201f20] p-3 rounded-xs border border-[#584236]/30">
                  All models in this category share universal air-cooled specifications.
                </div>
              )}
            </div>

            {/* Column 2: Engine Sizes (3 Columns wide) */}
            <div className="col-span-3 border-r border-[#584236]/30 pr-6">
              <h4 className="text-xs uppercase tracking-wider text-[#ff7a1a] font-bold mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#ff7a1a]" />
                <span>Engine Sizes</span>
              </h4>

              <div className="grid grid-cols-2 gap-2">
                {DETAILED_ENGINES.slice(0, 8).map((eng) => (
                  <button
                    key={eng.size}
                    onClick={() => handleSelectEngine(eng.size)}
                    className="text-left text-xs p-2 rounded-xs bg-[#201f20] hover:bg-[#ff7a1a]/20 border border-[#584236]/40 hover:border-[#ff7a1a] text-[#e0c0b1] hover:text-[#ff7a1a] font-bold transition-all flex items-center justify-between"
                  >
                    <span>{eng.size}</span>
                    <span className="text-[9px] text-[#a78b7d]">{eng.category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: 7 Core Systems Overview (4 Columns wide) */}
            <div className="col-span-4">
              <h4 className="text-xs uppercase tracking-wider text-[#ff7a1a] font-bold mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#ff7a1a]" />
                <span>Supported Systems</span>
              </h4>

              <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
                {VEHICLE_SYSTEMS.map((sys) => (
                  <div
                    key={sys.id}
                    onClick={() => handleSelectSystem(sys.id)}
                    className="group flex items-center justify-between p-2 rounded-xs bg-[#201f20]/70 hover:bg-[#201f20] border border-[#584236]/20 hover:border-[#ff7a1a]/50 cursor-pointer transition-all text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#e5e2e3] group-hover:text-[#ff7a1a] transition-colors flex items-center gap-1.5">
                        <span>{sys.emoji || '⚙️'}</span>
                        <span>{sys.name}</span>
                      </span>
                      <span className="text-[10px] text-[#a78b7d] block line-clamp-1">
                        {sys.description}
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#584236] group-hover:text-[#ff7a1a] shrink-0" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

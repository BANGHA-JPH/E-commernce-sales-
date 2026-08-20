import React, { useState } from 'react';
import { VW_NAV_CATEGORIES, VEHICLE_SYSTEMS, DETAILED_ENGINES } from '../data/vwNavigationData';
import { Car, Cpu, Wrench, ChevronRight, ArrowLeft, ArrowRight, Image as ImageIcon, Sparkles, CheckCircle2, SlidersHorizontal, Flame, Zap, Cog, Wind, Sliders, Disc, Shield, Armchair, Layers } from 'lucide-react';

export default function VWVehicleShowcase({ 
  onSelectVehicle, 
  onOpenGuidedSearch 
}) {
  const [navMode, setNavMode] = useState('vehicle'); // 'vehicle' | 'systems'
  const [currentStep, setCurrentStep] = useState(1); // 1: Category, 2: Model, 3: Engine, 4: Systems & Subcategories
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedMod, setSelectedMod] = useState(null);
  const [selectedEng, setSelectedEng] = useState(null);
  const [selectedSys, setSelectedSys] = useState(null);
  const [expandedSystemId, setExpandedSystemId] = useState(null);

  // Icon Map Helper for 10 Vehicle Systems
  const renderSystemIcon = (systemId) => {
    switch (systemId) {
      case 'engine-system': return <Cpu className="w-6 h-6 text-[#ff7a1a]" />;
      case 'fuel-system': return <Flame className="w-6 h-6 text-[#ff7a1a]" />;
      case 'electrical-system': return <Zap className="w-6 h-6 text-[#ff7a1a]" />;
      case 'transmission-system': return <Cog className="w-6 h-6 text-[#ff7a1a]" />;
      case 'cooling-system': return <Wind className="w-6 h-6 text-[#ff7a1a]" />;
      case 'suspension-system': return <Sliders className="w-6 h-6 text-[#ff7a1a]" />;
      case 'brake-system': return <Disc className="w-6 h-6 text-[#ff7a1a]" />;
      case 'body-system': return <Shield className="w-6 h-6 text-[#ff7a1a]" />;
      case 'interior-system': return <Armchair className="w-6 h-6 text-[#ff7a1a]" />;
      case 'restoration-system': return <Sparkles className="w-6 h-6 text-[#ff7a1a]" />;
      default: return <Wrench className="w-6 h-6 text-[#ff7a1a]" />;
    }
  };

  // Vehicle Step Handlers
  const handleSelectCategory = (category) => {
    setSelectedCat(category);
    setSelectedMod(null);
    setSelectedEng(null);
    setSelectedSys(null);
    setCurrentStep(2);
  };

  const handleSelectModel = (model) => {
    setSelectedMod(model);
    setSelectedEng(null);
    setSelectedSys(null);
    setCurrentStep(3);
  };

  const handleSelectEngine = (engine) => {
    setSelectedEng(engine);
    setSelectedSys(null);
    setCurrentStep(4);
  };

  const handleSelectSystem = (system) => {
    setSelectedSys(system);
    onSelectVehicle({
      categoryId: selectedCat?.id || 'ALL',
      modelId: selectedMod?.id || 'ALL',
      engineSize: selectedEng?.size || 'ALL',
      systemId: system.id,
      navMode: 'vehicle'
    });

    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSubcategory = (systemId, subcatId) => {
    onSelectVehicle({
      categoryId: selectedCat?.id || 'ALL',
      modelId: selectedMod?.id || 'ALL',
      engineSize: selectedEng?.size || 'ALL',
      systemId,
      subcatId,
      navMode: navMode === 'systems' ? 'parts' : 'vehicle'
    });

    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetToCategory = () => {
    setCurrentStep(1);
    setSelectedCat(null);
    setSelectedMod(null);
    setSelectedEng(null);
    setSelectedSys(null);
  };

  return (
    <section id="vw-showcase" className="py-20 bg-[#131314] relative border-b border-[#584236]/30 overflow-hidden font-technical-data">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#ff7a1a]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 pb-6 border-b border-[#584236]/30 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff7a1a]/10 border border-[#ff7a1a]/30 text-[#ff7a1a] text-xs font-bold mb-3 tracking-wider uppercase">
              <Car className="w-4 h-4" />
              <span>PRECISION VEHICLE DISCOVERY // CLASSIC AIRCOOLED VW WORKS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#e5e2e3] font-h2 tracking-tight">
              Find Parts For Your <span className="text-[#ff7a1a]">Volkswagen</span>
            </h2>
            <p className="text-[#e0c0b1] text-xs md:text-sm mt-2 max-w-2xl leading-relaxed">
              Select your vehicle category and model to instantly isolate 100% compatible air-cooled spare parts.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenGuidedSearch}
              className="px-5 py-2.5 text-xs font-bold bg-[#ff7a1a] hover:bg-[#ffb68e] text-black rounded-xs transition-all uppercase tracking-wider flex items-center gap-2 glow-button"
            >
              <Sparkles className="w-4 h-4" />
              <span>Guided Parts Finder</span>
            </button>
          </div>
        </div>

        {/* MODE 1: VEHICLE-FIRST NAVIGATION FLOW */}
        {navMode === 'vehicle' && (
          <div>
            {/* 3-Step Breadcrumb Navigation (Category -> Model -> Systems) */}
            <div className="mb-10 bg-[#181719]/90 backdrop-blur-md border border-[#584236]/40 p-4 rounded-xs flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 md:gap-3 text-xs font-bold flex-wrap">
                
                {/* Step 1 Pill */}
                <button
                  onClick={handleResetToCategory}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xs transition-all ${
                    currentStep === 1 
                      ? 'bg-[#ff7a1a] text-black font-bold' 
                      : 'bg-[#201f20] text-[#e0c0b1] hover:text-[#ff7a1a] border border-[#584236]/40'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-black/20 text-current text-[10px] flex items-center justify-center font-bold">1</span>
                  <span>1. Category</span>
                </button>

                <ChevronRight className="w-4 h-4 text-[#584236]" />

                {/* Step 2 Pill */}
                <button
                  onClick={() => selectedCat && setCurrentStep(2)}
                  disabled={!selectedCat}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xs transition-all ${
                    currentStep === 2 
                      ? 'bg-[#ff7a1a] text-black font-bold' 
                      : selectedCat 
                        ? 'bg-[#201f20] text-[#e0c0b1] hover:text-[#ff7a1a] border border-[#584236]/40' 
                        : 'bg-[#181719] text-[#584236] cursor-not-allowed border border-[#584236]/20'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-black/20 text-current text-[10px] flex items-center justify-center font-bold">2</span>
                  <span>2. Model {selectedMod ? `(${selectedMod.name})` : selectedCat ? `(${selectedCat.name})` : ''}</span>
                </button>

                <ChevronRight className="w-4 h-4 text-[#584236]" />

                {/* Step 3 Pill */}
                <button
                  onClick={() => selectedMod && setCurrentStep(3)}
                  disabled={!selectedMod}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xs transition-all ${
                    currentStep === 3 
                      ? 'bg-[#ff7a1a] text-black font-bold' 
                      : selectedMod 
                        ? 'bg-[#201f20] text-[#e0c0b1] hover:text-[#ff7a1a] border border-[#584236]/40' 
                        : 'bg-[#181719] text-[#584236] cursor-not-allowed border border-[#584236]/20'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-black/20 text-current text-[10px] flex items-center justify-center font-bold">3</span>
                  <span>3. Vehicle Systems</span>
                </button>

              </div>

              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="text-xs text-[#83cffb] hover:underline flex items-center gap-1.5 font-bold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              )}
            </div>

            {/* STEP 1: VEHICLE CATEGORY CARDS */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {VW_NAV_CATEGORIES.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => handleSelectCategory(category)}
                    className="group relative cursor-pointer rounded-xs overflow-hidden border border-[#584236]/40 hover:border-[#ff7a1a] transition-all duration-300 bg-[#201f20]/60 backdrop-blur-md shadow-xl hover:shadow-[0_10px_35px_rgba(255,122,26,0.25)] hover:-translate-y-1 click-press flex flex-col justify-between"
                  >
                    <div className="relative h-56 bg-black/70 overflow-hidden flex items-center justify-center">
                      {category.image ? (
                        <img 
                          src={category.image} 
                          alt={category.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                        />
                      ) : (
                        <div className="w-full h-full bg-[#181719] flex flex-col items-center justify-center text-[#584236] group-hover:text-[#ff7a1a] transition-colors p-6 text-center">
                          <ImageIcon className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform duration-500" />
                          <span className="text-xs text-[#a78b7d] font-bold uppercase tracking-wider">
                            {category.name}
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#131314] via-transparent to-black/40"></div>

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="bg-[#131314]/90 backdrop-blur-md border border-[#ff7a1a]/40 text-[#ff7a1a] text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-xs">
                          {category.modelsCount}
                        </span>
                        <span className="bg-[#131314]/90 backdrop-blur-md border border-[#584236]/60 text-[#83cffb] text-[10px] font-bold px-2.5 py-1 rounded-xs">
                          {category.partsCount}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 bg-[#201f20]/90 backdrop-blur-xl border-t border-[#584236]/30 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[10px] text-[#ff7a1a] uppercase font-bold tracking-widest block mb-1">
                          {category.subtitle}
                        </span>
                        <h3 className="text-xl font-bold text-[#e5e2e3] group-hover:text-[#ff7a1a] transition-colors font-h2">
                          {category.name}
                        </h3>
                        <p className="text-xs text-[#a78b7d] mt-2 leading-relaxed line-clamp-2">
                          {category.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#584236]/30 flex items-center justify-between">
                        <span className="text-xs font-bold text-[#e0c0b1] group-hover:text-[#ff7a1a] transition-colors flex items-center gap-1.5 uppercase tracking-wider">
                          <span>Select Models</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#ff7a1a]" />
                        </span>
                        <span className="w-7 h-7 rounded-full bg-[#131314] border border-[#584236]/60 group-hover:border-[#ff7a1a] flex items-center justify-center text-[#ff7a1a]">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* STEP 2: VEHICLE MODEL SELECTION */}
            {currentStep === 2 && selectedCat && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl md:text-2xl font-bold text-[#e5e2e3] font-h2">
                    Step 2: Select Model for <span className="text-[#ff7a1a]">{selectedCat.name}</span>
                  </h3>
                  <span className="text-xs text-[#a78b7d]">Showing {selectedCat.models.length} Models</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedCat.models.map((model) => (
                    <div
                      key={model.id}
                      onClick={() => handleSelectModel(model)}
                      className="group cursor-pointer p-5 bg-[#201f20]/80 backdrop-blur-md border border-[#584236]/40 hover:border-[#ff7a1a] rounded-xs transition-all duration-300 hover:-translate-y-1 click-press flex flex-col justify-between hover:shadow-[0_8px_25px_rgba(255,122,26,0.2)]"
                    >
                      <div className="space-y-4">
                        <div className="h-36 bg-[#131314] border border-[#584236]/40 rounded-xs overflow-hidden flex items-center justify-center group-hover:border-[#ff7a1a]/60 transition-colors relative">
                          {model.image ? (
                            <img src={model.image} alt={model.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-center text-[#584236] group-hover:text-[#ff7a1a] transition-colors p-4">
                              <Car className="w-8 h-8 mx-auto mb-1" />
                              <span className="text-[10px] text-[#a78b7d] block font-bold">{model.name}</span>
                            </div>
                          )}
                          
                          <span className="absolute top-2 right-2 bg-[#131314]/90 text-[#83cffb] text-[9px] font-bold px-2 py-0.5 border border-[#83cffb]/30">
                            {model.era}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-[#e5e2e3] group-hover:text-[#ff7a1a] transition-colors">
                            {model.name}
                          </h4>
                          <p className="text-xs text-[#a78b7d] mt-1">
                            Era: <span className="text-[#e0c0b1] font-bold">{model.era}</span>
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#584236]/30 flex items-center justify-between text-xs">
                        <span className="text-[#83cffb] font-bold">{model.partsCount}</span>
                        <span className="text-[#ff7a1a] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform uppercase text-[10px]">
                          Select Systems <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: SHOW 10 VEHICLE SYSTEMS */}
            {currentStep === 3 && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#e5e2e3] font-h2">
                      Step 3: Select Vehicle System for <span className="text-[#ff7a1a]">{selectedMod?.name || selectedCat?.name}</span>
                    </h3>
                    <p className="text-xs text-[#a78b7d] mt-1">Select a mechanical system to isolate 100% compatible spare parts and restoration items.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {VEHICLE_SYSTEMS.map((system) => (
                    <div
                      key={system.id}
                      onClick={() => handleSelectSystem(system)}
                      className="group cursor-pointer p-3 bg-[#201f20] border border-[#584236]/50 hover:border-[#ff7a1a] rounded-xs transition-all click-press flex flex-col justify-between hover:shadow-[0_6px_20px_rgba(255,122,26,0.2)] space-y-2.5"
                    >
                      <div className="space-y-2">
                        <div className="w-9 h-9 rounded-xs bg-[#131314] border border-[#584236]/50 flex items-center justify-center group-hover:border-[#ff7a1a] text-lg">
                          {system.emoji || renderSystemIcon(system.id)}
                        </div>
                        <h4 className="text-xs font-bold text-[#e5e2e3] group-hover:text-[#ff7a1a] truncate">
                          {system.name}
                        </h4>
                        <p className="text-[10px] text-[#a78b7d] line-clamp-2">
                          {system.description}
                        </p>

                        {/* Subcategories preview tags */}
                        {system.subcategories && system.subcategories.length > 0 && (
                          <div className="pt-2 flex flex-wrap gap-1">
                            {system.subcategories.slice(0, 3).map(sub => (
                              <span key={sub.id} className="text-[9px] bg-[#131314] text-[#e0c0b1] px-1.5 py-0.5 border border-[#584236]/30 rounded-xs">
                                {sub.name}
                              </span>
                            ))}
                            {system.subcategories.length > 3 && (
                              <span className="text-[9px] text-[#ff7a1a] font-bold">
                                +{system.subcategories.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#584236]/30 flex items-center justify-between text-[10px] text-[#ff7a1a] font-bold uppercase">
                        <span>Browse Spare Parts</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* MODE 2: PARTS-FIRST SYSTEM TREE (CB PERFORMANCE DEPTH) */}
        {navMode === 'systems' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {VEHICLE_SYSTEMS.map((system) => {
                const isExpanded = expandedSystemId === system.id;

                return (
                  <div
                    key={system.id}
                    className="bg-[#201f20] border border-[#584236]/40 hover:border-[#ff7a1a]/60 rounded-xs p-5 transition-all"
                  >
                    <div 
                      onClick={() => setExpandedSystemId(isExpanded ? null : system.id)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xs bg-[#131314] border border-[#584236]/50 flex items-center justify-center text-[#ff7a1a]">
                          {renderSystemIcon(system.id)}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-[#e5e2e3] hover:text-[#ff7a1a] font-h2">
                            {system.name}
                          </h3>
                          <p className="text-xs text-[#a78b7d]">{system.description}</p>
                        </div>
                      </div>

                      <span className="text-xs font-technical-data font-bold text-[#83cffb] bg-[#131314] px-3 py-1.5 rounded-xs border border-[#584236]/40 flex items-center gap-1">
                        <span>{system.subcategories?.length || 0} Subcats</span>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90 text-[#ff7a1a]' : ''}`} />
                      </span>
                    </div>

                    {/* Expandable Subcategories Grid */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-[#584236]/30 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in duration-200">
                        {system.subcategories?.map((subcat) => (
                          <div
                            key={subcat.id}
                            onClick={() => handleSelectSubcategory(system.id, subcat.id)}
                            className="p-3 bg-[#131314] border border-[#584236]/40 hover:border-[#ff7a1a] rounded-xs cursor-pointer group transition-all"
                          >
                            <span className="text-xs font-bold text-[#e5e2e3] group-hover:text-[#ff7a1a] flex items-center justify-between">
                              <span>{subcat.name}</span>
                              <ArrowRight className="w-3 h-3 text-[#584236] group-hover:text-[#ff7a1a] group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {subcat.parts?.slice(0, 3).map((p) => (
                                <span key={p} className="text-[9px] bg-[#201f20] text-[#a78b7d] px-1.5 py-0.5 border border-[#584236]/30">
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

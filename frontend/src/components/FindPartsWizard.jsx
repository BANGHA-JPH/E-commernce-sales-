import React, { useState } from 'react';
import { VW_NAV_CATEGORIES, ENGINE_SIZES, VEHICLE_SYSTEMS } from '../data/vwNavigationData';
import { Car, Cpu, Wrench, Search, CheckCircle2, RotateCcw, ArrowRight, Layers, ChevronRight } from 'lucide-react';

export default function FindPartsWizard({ onApplyFilter }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedEngine, setSelectedEngine] = useState('');
  const [selectedSystem, setSelectedSystem] = useState('');
  const [selectedSubcat, setSelectedSubcat] = useState('');

  const currentCategoryObj = VW_NAV_CATEGORIES.find(c => c.id === selectedCategory);
  const availableModels = currentCategoryObj ? currentCategoryObj.models : [];
  const availableEngines = ENGINE_SIZES;
  const currentSystemObj = VEHICLE_SYSTEMS.find(s => s.id === selectedSystem);
  const availableSubcategories = currentSystemObj ? currentSystemObj.subcategories : [];

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setSelectedModel('');
    setSelectedEngine('');
    setSelectedSystem('');
    setSelectedSubcat('');
  };

  const handleSystemChange = (sysId) => {
    setSelectedSystem(sysId);
    setSelectedSubcat('');
  };

  const handleReset = () => {
    setSelectedCategory('');
    setSelectedModel('');
    setSelectedEngine('');
    setSelectedSystem('');
    setSelectedSubcat('');
    onApplyFilter({
      categoryId: 'ALL',
      modelId: 'ALL',
      engineSize: 'ALL',
      systemId: 'ALL',
      subcatId: 'ALL',
      navMode: 'vehicle'
    });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    onApplyFilter({
      categoryId: selectedCategory || 'ALL',
      modelId: selectedModel || 'ALL',
      engineSize: selectedEngine || 'ALL',
      systemId: selectedSystem || 'ALL',
      subcatId: selectedSubcat || 'ALL',
      navMode: 'vehicle'
    });

    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickSystemSelect = (sysId, subcatId = '') => {
    setSelectedSystem(sysId);
    setSelectedSubcat(subcatId);
    onApplyFilter({
      categoryId: selectedCategory || 'ALL',
      modelId: selectedModel || 'ALL',
      engineSize: selectedEngine || 'ALL',
      systemId: sysId,
      subcatId: subcatId || 'ALL',
      navMode: 'vehicle'
    });
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="vehicle-finder" className="py-12 bg-[#181719] border-b border-[#584236]/30 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Widget Container */}
        <div className="bg-[#201f20] border border-[#ff7a1a]/40 rounded-sm p-6 md:p-8 shadow-2xl relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-[#584236]/40">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#ff7a1a]/10 border border-[#ff7a1a]/30 text-[#ff7a1a] font-technical-data text-xs mb-2">
                <Search className="w-3.5 h-3.5" />
                <span>PRIMARY NAVIGATION // VEHICLE SYSTEM DISCOVERY & CLASSIFICATION</span>
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-[#e5e2e3] font-h2">
                Find Parts For <span className="text-[#ff7a1a]">My VW</span>
              </h2>
              <p className="text-[#e0c0b1] text-xs md:text-sm mt-1 font-technical-data">
                Step 1: Category • Step 2: Model • Step 3: Engine • Step 4: System & Specific Part Classification
              </p>
            </div>

            {(selectedCategory || selectedModel || selectedEngine || selectedSystem || selectedSubcat) && (
              <button
                type="button"
                onClick={handleReset}
                className="self-start lg:self-auto text-xs font-technical-data text-[#83cffb] hover:underline flex items-center gap-1.5 bg-[#131314] px-3.5 py-2 border border-[#83cffb]/30 rounded-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Selector</span>
              </button>
            )}
          </div>

          {/* 4 Step Selector Row */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Step 1: Select Vehicle Category */}
              <div className="space-y-2 font-technical-data">
                <label className="text-xs uppercase tracking-wider text-[#ff7a1a] font-bold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#ff7a1a] text-black text-[10px] flex items-center justify-center font-bold">1</span>
                  <span>Select Category</span>
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategorySelect(e.target.value)}
                  className="w-full bg-[#131314] border border-[#584236] text-[#e5e2e3] text-xs p-3 rounded-xs focus:outline-none focus:border-[#ff7a1a]"
                >
                  <option value="">-- Choose VW Category --</option>
                  {VW_NAV_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.models.length} Models)
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2: Select Model */}
              <div className="space-y-2 font-technical-data">
                <label className="text-xs uppercase tracking-wider text-[#ff7a1a] font-bold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#ff7a1a] text-black text-[10px] flex items-center justify-center font-bold">2</span>
                  <span>Select Model</span>
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={!selectedCategory || availableModels.length === 0}
                  className="w-full bg-[#131314] border border-[#584236] text-[#e5e2e3] text-xs p-3 rounded-xs focus:outline-none focus:border-[#ff7a1a] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {!selectedCategory 
                      ? '-- Select Category First --' 
                      : availableModels.length === 0 
                        ? 'Universal Category Models' 
                        : '-- Choose Model Variant --'}
                  </option>
                  {availableModels.map(mod => (
                    <option key={mod.id} value={mod.id}>
                      {mod.name} ({mod.era})
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 3: Select Engine */}
              <div className="space-y-2 font-technical-data">
                <label className="text-xs uppercase tracking-wider text-[#ff7a1a] font-bold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#ff7a1a] text-black text-[10px] flex items-center justify-center font-bold">3</span>
                  <span>Select Engine Level</span>
                </label>
                <select
                  value={selectedEngine}
                  onChange={(e) => setSelectedEngine(e.target.value)}
                  className="w-full bg-[#131314] border border-[#584236] text-[#e5e2e3] text-xs p-3 rounded-xs focus:outline-none focus:border-[#ff7a1a]"
                >
                  <option value="">-- All Engine Sizes --</option>
                  {availableEngines.map(size => (
                    <option key={size} value={size}>
                      {size} Air-Cooled Engine
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 4: Parts System */}
              <div className="space-y-2 font-technical-data">
                <label className="text-xs uppercase tracking-wider text-[#ff7a1a] font-bold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#ff7a1a] text-black text-[10px] flex items-center justify-center font-bold">4</span>
                  <span>Vehicle System</span>
                </label>
                <select
                  value={selectedSystem}
                  onChange={(e) => handleSystemChange(e.target.value)}
                  className="w-full bg-[#131314] border border-[#584236] text-[#e5e2e3] text-xs p-3 rounded-xs focus:outline-none focus:border-[#ff7a1a]"
                >
                  <option value="">-- All 7 Vehicle Systems --</option>
                  {VEHICLE_SYSTEMS.map(sys => (
                    <option key={sys.id} value={sys.id}>
                      {sys.emoji || '⚙️'} {sys.name}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Step 4 Systems & Subcategories Overview */}
            <div className="pt-4 border-t border-[#584236]/30 font-technical-data">
              <span className="text-[11px] text-[#a78b7d] uppercase font-bold block mb-3 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#ff7a1a]" />
                <span>Vehicle System & Detailed Subcategory Classification</span>
              </span>

              {/* System selector buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-4">
                {VEHICLE_SYSTEMS.map((sys) => {
                  const isSysActive = selectedSystem === sys.id;
                  return (
                    <button
                      key={sys.id}
                      type="button"
                      onClick={() => handleQuickSystemSelect(sys.id)}
                      className={`p-2.5 rounded-xs border text-left transition-all flex flex-col justify-between ${
                        isSysActive
                          ? 'bg-[#ff7a1a] text-black border-[#ff7a1a] font-bold shadow-md'
                          : 'bg-[#131314] text-[#e0c0b1] border-[#584236]/40 hover:border-[#ff7a1a] hover:text-[#ff7a1a]'
                      }`}
                    >
                      <span className="text-xs block truncate font-bold flex items-center gap-1.5">
                        <span>{sys.emoji}</span>
                        <span className="truncate">{sys.name}</span>
                      </span>
                      <span className={`text-[10px] block mt-1 ${isSysActive ? 'text-black/80 font-bold' : 'text-[#a78b7d]'}`}>
                        {sys.subcategories?.length || 0} subcats
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Subcategories Breakdown Pills when a System is selected */}
              {selectedSystem && currentSystemObj && (
                <div className="p-3.5 bg-[#131314] border border-[#ff7a1a]/40 rounded-xs animate-in fade-in duration-200">
                  <div className="text-xs font-bold text-[#ff7a1a] mb-2 flex items-center justify-between">
                    <span>Filter Specific Subcategories in {currentSystemObj.emoji} {currentSystemObj.name}:</span>
                    {selectedSubcat && (
                      <button
                        type="button"
                        onClick={() => setSelectedSubcat('')}
                        className="text-[10px] text-[#83cffb] underline hover:text-white"
                      >
                        Clear Subcategory Filter
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSubcat('')}
                      className={`text-xs px-3 py-1.5 rounded-xs font-bold transition-all border ${
                        !selectedSubcat
                          ? 'bg-[#ff7a1a] text-black border-[#ff7a1a]'
                          : 'bg-[#201f20] text-[#e0c0b1] border-[#584236]/50 hover:border-[#ff7a1a]'
                      }`}
                    >
                      All {currentSystemObj.name} Parts
                    </button>
                    {availableSubcategories.map((sub) => {
                      const isSubActive = selectedSubcat === sub.id || selectedSubcat === sub.name;
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => handleQuickSystemSelect(selectedSystem, sub.name)}
                          className={`text-xs px-3 py-1.5 rounded-xs font-bold transition-all border ${
                            isSubActive
                              ? 'bg-[#ff7a1a] text-black border-[#ff7a1a]'
                              : 'bg-[#201f20] text-[#e0c0b1] border-[#584236]/50 hover:border-[#ff7a1a] hover:text-[#ff7a1a]'
                          }`}
                        >
                          {sub.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="w-full md:w-auto font-label-caps text-xs text-black bg-[#ff7a1a] hover:bg-[#ffb68e] px-8 py-3.5 rounded-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 glow-button transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Isolate Compatible Parts</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}

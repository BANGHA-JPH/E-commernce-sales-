import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, User, Menu, X, Wrench, ChevronDown, ChevronRight, Layers, Sparkles, Lock } from 'lucide-react';
import { VW_NAV_CATEGORIES } from '../data/vwNavigationData';
import MegaMenu from './MegaMenu';

export default function Navbar({ 
  cartCount, 
  userRequestsCount = 0,
  wishlistCount, 
  onOpenCart, 
  onOpenUserDashboard,
  onSearchChange, 
  searchTerm, 
  onOpenAuth,
  onOpenAdminLogin,
  activeFilter,
  onSelectFilter,
  currentUser,
  onLogout,
  onNavigateToShop
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHoverCat, setActiveHoverCat] = useState(null);
  const [pinnedCat, setPinnedCat] = useState(null);
  const [expandedMobileCat, setExpandedMobileCat] = useState(null);

  // Active Menu display object (pinned takes precedence)
  const currentMenuObj = pinnedCat || activeHoverCat;

  // Hover delay handling for smooth response
  const handleMouseEnter = (cat) => {
    if (!pinnedCat) {
      setActiveHoverCat(cat);
    }
  };

  const handleMouseLeave = () => {
    if (!pinnedCat) {
      setActiveHoverCat(null);
    }
  };

  const handleCategoryClick = (cat, filterObj) => {
    const isSameCat = pinnedCat && (pinnedCat.id === cat.id && pinnedCat.menuType === cat.menuType);

    if (isSameCat) {
      // Toggle off pin
      setPinnedCat(null);
      setActiveHoverCat(null);
    } else {
      // Pin menu open directly without scrolling down
      setPinnedCat(cat);
      setActiveHoverCat(cat);
      if (filterObj) {
        onSelectFilter(filterObj, { preventScroll: true });
      }
    }
  };

  const handleCloseMenu = () => {
    setPinnedCat(null);
    setActiveHoverCat(null);
  };

  const toggleMobileAccordion = (catId) => {
    setExpandedMobileCat(expandedMobileCat === catId ? null : catId);
  };

  const handleMobileSelectFilter = (filterObj) => {
    onSelectFilter(filterObj);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#131314]/95 backdrop-blur-xl border-b border-[#584236]/30 text-white transition-all duration-300">
      
      {/* Top Header Bar */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4 border-b border-[#584236]/20">
        
        {/* Brand Logo Header */}
        <button 
          onClick={onNavigateToShop} 
          className="flex items-center space-x-3 group shrink-0 text-left focus:outline-none"
        >
          <div className="w-10 h-10 bg-[#ff7a1a] flex items-center justify-center text-black font-bold group-hover:bg-[#ffb68e] transition-colors">
            <Wrench className="w-5 h-5 text-black" />
          </div>
          <div>
            <div className="font-h2 text-base md:text-lg font-bold tracking-tighter text-[#ff7a1a] flex items-center leading-none select-none">
              {"RUSTY AIRCOOLED".split('').map((char, index) => (
                <span
                  key={index}
                  className="animate-jump-swing"
                  style={{
                    animationDelay: `${index * 0.08}s`,
                    display: 'inline-block',
                    width: char === ' ' ? '0.3em' : 'auto'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
            <span className="text-[9px] tracking-widest text-[#a78b7d] uppercase font-technical-data font-bold block mt-0.5">
              VINTAGE VOLKSWAGEN SPARE PARTS
            </span>
          </div>
        </button>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-sm mx-4">
          <div className="relative w-full font-technical-data">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a78b7d]" />
            <input
              type="text"
              placeholder="Search VW parts, casting codes, OEM numbers..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#201f20] border border-[#584236]/50 pl-9 pr-3 py-1.5 text-xs text-[#e5e2e3] placeholder-[#a78b7d] focus:outline-none focus:border-[#ff7a1a] transition-all"
            />
          </div>
        </div>

        {/* Action Buttons: Wishlist, Cart Drawer, Auth / Dashboard */}
        <div className="flex items-center space-x-3 shrink-0">
          
          {/* Wishlist Button */}
          <button className="relative p-2 text-[#e0c0b1] hover:text-[#ff7a1a] transition-colors" title="Wishlist">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ff7a1a] text-black text-[10px] font-technical-data font-bold px-1 leading-none py-[2px]">
                {wishlistCount}
              </span>
            )}
          </button>

          {currentUser ? (
            <>
              {/* User Dashboard & Requests Trigger */}
              <button 
                onClick={onOpenUserDashboard}
                className="relative flex items-center gap-2 bg-[#ff7a1a] hover:bg-[#ffb68e] text-black border border-[#ff7a1a] px-3 py-1.5 transition-all rounded-xs font-bold"
                title="User Dashboard & Garage"
              >
                <User className="w-4 h-4 text-black" />
                <span className="hidden sm:inline font-label-caps text-xs uppercase tracking-wider">My Dashboard</span>
                <span className="bg-black text-[#ff7a1a] text-[10px] font-technical-data font-bold px-1.5 py-0.5 rounded-xs">
                  {userRequestsCount}
                </span>
              </button>

              {/* Logout Button */}
              {onLogout && (
                <button 
                  onClick={onLogout}
                  className="hidden sm:flex items-center gap-1 font-label-caps text-xs text-[#a78b7d] hover:text-[#ff7a1a] border border-[#584236]/40 px-2.5 py-1.5 uppercase font-bold tracking-wider rounded-xs"
                  title="Sign Out"
                >
                  <span>Sign Out</span>
                </button>
              )}
            </>
          ) : (
            /* Auth Modal Trigger (Login / Register) */
            <button 
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 font-label-caps text-xs text-black bg-[#ff7a1a] hover:bg-[#ffb68e] border border-[#ff7a1a] px-3.5 py-1.5 uppercase font-bold tracking-wider rounded-xs transition-all shadow-md"
            >
              <User className="w-4 h-4 text-black" />
              <span>Login / Register</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#e0c0b1] hover:text-[#ff7a1a]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Navigation Bar with Dual Mode Switcher & Click-to-Pin Dropdown */}
      <nav className="hidden lg:block bg-[#181719] border-b border-[#584236]/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between font-label-caps text-xs tracking-wider uppercase">
          
          {/* Left Side: Clean Vehicle Categories */}
          <div className="flex items-center space-x-1" onMouseLeave={handleMouseLeave}>
            {VW_NAV_CATEGORIES.map((cat) => {
              const catObj = { ...cat, menuType: 'vehicle' };
              const isHovered = activeHoverCat?.id === cat.id && activeHoverCat?.menuType === 'vehicle';
              const isPinned = pinnedCat?.id === cat.id && pinnedCat?.menuType === 'vehicle';
              const isActive = isHovered || isPinned;

              return (
                <div 
                  key={cat.id}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(catObj)}
                >
                  <button
                    onClick={() => handleCategoryClick(catObj, { categoryId: cat.id, navMode: 'vehicle' })}
                    className={`py-3 px-3.5 flex items-center gap-1.5 transition-colors font-bold ${
                      isPinned
                        ? 'text-black bg-[#ff7a1a] font-bold shadow-md'
                        : isHovered
                          ? 'text-[#ff7a1a] bg-[#201f20]' 
                          : 'text-[#e0c0b1] hover:text-[#ff7a1a] hover:bg-[#201f20]/50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${isActive ? 'rotate-180 text-current' : 'text-[#a78b7d]'}`} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Side: Browse All Parts Dropdown Button */}
          <div className="flex items-center space-x-2" onMouseLeave={handleMouseLeave}>
            {(() => {
              const partsObj = { menuType: 'parts', id: 'all-parts' };
              const isPinned = pinnedCat?.menuType === 'parts';
              const isHovered = activeHoverCat?.menuType === 'parts';

              return (
                <button
                  onMouseEnter={() => handleMouseEnter(partsObj)}
                  onClick={() => handleCategoryClick(partsObj, { navMode: 'parts', categoryId: 'ALL', systemId: 'ALL' })}
                  className={`py-2 px-4 font-bold rounded-xs flex items-center gap-2 transition-all glow-button uppercase tracking-wider ${
                    isPinned
                      ? 'bg-white text-black ring-2 ring-[#ff7a1a]'
                      : 'bg-[#ff7a1a] text-black hover:bg-[#ffb68e]'
                  }`}
                >
                  <Layers className="w-4 h-4 text-black" />
                  <span>Browse All Parts</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-black transition-transform ${isPinned || isHovered ? 'rotate-180' : ''}`} />
                </button>
              );
            })()}
          </div>

        </div>
      </nav>

      {/* Desktop Mega Dropdown Overlay (Pinned or Hover-based) */}
      <div onMouseEnter={() => {}} onMouseLeave={handleMouseLeave}>
        {currentMenuObj && (
          <MegaMenu 
            category={currentMenuObj}
            isPinned={!!pinnedCat}
            onSelectFilter={onSelectFilter} 
            onCloseMenu={handleCloseMenu} 
          />
        )}
      </div>

      {/* Mobile Accordion Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#131314] border-b border-[#584236]/40 px-6 py-6 space-y-4 font-technical-data max-h-[85vh] overflow-y-auto">
          
          {/* Search Input for Mobile */}
          <div className="relative w-full mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a78b7d]" />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#201f20] border border-[#584236] pl-9 pr-3 py-2 text-xs text-white"
            />
          </div>

          {/* Accordion Categories */}
          <div className="space-y-2">
            <span className="text-[10px] text-[#ff7a1a] uppercase tracking-wider font-bold block mb-1">
              VW AIR-COOLED CATEGORIES
            </span>

            {VW_NAV_CATEGORIES.map((cat) => {
              const isExpanded = expandedMobileCat === cat.id;

              return (
                <div key={cat.id} className="bg-[#201f20] border border-[#584236]/40 rounded-xs">
                  <button
                    onClick={() => toggleMobileAccordion(cat.id)}
                    className="w-full p-3 flex items-center justify-between text-xs font-bold text-[#e5e2e3] hover:text-[#ff7a1a]"
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className={`w-4 h-4 text-[#a78b7d] transition-transform ${isExpanded ? 'rotate-90 text-[#ff7a1a]' : ''}`} />
                  </button>

                  {/* Accordion Content */}
                  {isExpanded && (
                    <div className="p-3 bg-[#181719] border-t border-[#584236]/30 space-y-3">
                      
                      {/* Models List */}
                      {cat.models.length > 0 && (
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-[#ff7a1a] font-bold block mb-1">Models:</span>
                          <div className="space-y-1 pl-2">
                            {cat.models.map(m => (
                              <div 
                                key={m.id}
                                onClick={() => handleMobileSelectFilter({ categoryId: cat.id, modelId: m.id })}
                                className="text-xs text-[#e0c0b1] hover:text-[#ff7a1a] py-1 cursor-pointer"
                              >
                                • {m.name} ({m.era})
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Engines List */}
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-[#ff7a1a] font-bold block mb-1">Engine Sizes:</span>
                        <div className="flex flex-wrap gap-1.5 pl-2">
                          {cat.engines.map(s => (
                            <span 
                              key={s}
                              onClick={() => handleMobileSelectFilter({ categoryId: cat.id, engineSize: s })}
                              className="text-[10px] bg-[#201f20] text-[#e0c0b1] px-2 py-0.5 border border-[#584236]/40 cursor-pointer"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Browse All Category */}
                      <button
                        onClick={() => handleMobileSelectFilter({ categoryId: cat.id })}
                        className="w-full mt-2 text-xs bg-[#ff7a1a] text-black font-bold py-2 uppercase tracking-wider text-center"
                      >
                        Browse All {cat.name}
                      </button>

                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {currentUser ? (
            <div className="space-y-2 pt-2">
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenUserDashboard(); }}
                className="w-full font-label-caps text-xs text-black bg-[#ff7a1a] py-2.5 uppercase font-bold tracking-wider flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>My Dashboard ({userRequestsCount})</span>
              </button>
              {onLogout && (
                <button 
                  onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                  className="w-full font-label-caps text-xs text-[#a78b7d] bg-[#201f20] border border-[#584236]/40 py-2 uppercase font-bold tracking-wider"
                >
                  Sign Out ({currentUser.name || 'User'})
                </button>
              )}
            </div>
          ) : (
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
              className="w-full mt-4 font-label-caps text-xs text-black bg-[#ff7a1a] py-2.5 uppercase font-bold tracking-wider flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4 text-black" />
              <span>Sign In / Register</span>
            </button>
          )}
        </div>
      )}

    </header>
  );
}

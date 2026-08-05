import React, { useState, useRef, useEffect } from 'react';
import { Eye, Plus, Check, RotateCw, RefreshCw, Move } from 'lucide-react';
import engineAngle0 from '../assets/engine_angle_0.png';
import engineAngle90 from '../assets/engine_angle_90.png';
import engineAngle180 from '../assets/engine_angle_180.png';
import engineAngle270 from '../assets/engine_angle_270.png';

const BLUEPRINT_HOTSPOTS = [
  {
    id: 'carb-01',
    name: 'NOS Holley 4150 Carburetor',
    partNumber: 'PART // C7ZX-9510-A',
    price: 849.00,
    baseX: 49,
    baseY: 20,
    category: 'Fuel & Carburetion',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
    description: 'Original high-performance 4-barrel carburetor for classic flat-four & V8 engine platforms.'
  },
  {
    id: 'head-02',
    name: 'Dual-Port Aluminum Cylinder Head Set',
    partNumber: 'PART // VW-113-101-065',
    price: 425.00,
    baseX: 66,
    baseY: 44,
    category: 'Engine Block & Internals',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80',
    description: 'High-density aluminum alloy dual-port cylinder head set with hardened valve seats.'
  },
  {
    id: 'piston-03',
    name: 'Mahle Forged Piston & Cylinder Kit',
    partNumber: 'PART // MAHLE-85.5MM',
    price: 620.00,
    baseX: 38,
    baseY: 68,
    category: 'Engine Block & Internals',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80',
    description: 'Forged aluminum pistons with cast iron cylinders, wrist pins, and stainless rings.'
  }
];

export default function EngineBlueprintInspector({ onAddToCart, onViewPartDetails }) {
  const [selectedHotspot, setSelectedHotspot] = useState(BLUEPRINT_HOTSPOTS[0]);
  const [addedIds, setAddedIds] = useState([]);

  // 360 Degree Interactive Multi-Angle Rotation States
  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);

  const containerRef = useRef(null);

  // Auto-Spin 360° Animation Loop
  useEffect(() => {
    let interval;
    if (isAutoSpinning) {
      interval = setInterval(() => {
        setRotationY((prev) => (prev + 2) % 360);
      }, 40);
    }
    return () => clearInterval(interval);
  }, [isAutoSpinning]);

  // Mouse / Touch Drag Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsAutoSpinning(false);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setRotationY((prev) => (prev + deltaX * 0.6) % 360);
    setRotationX((prev) => Math.max(-30, Math.min(30, prev - deltaY * 0.3)));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setIsAutoSpinning(false);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStart.x;
    const deltaY = e.touches[0].clientY - dragStart.y;

    setRotationY((prev) => (prev + deltaX * 0.6) % 360);
    setRotationX((prev) => Math.max(-30, Math.min(30, prev - deltaY * 0.3)));
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleAdd = (item) => {
    onAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      partNumber: item.partNumber,
      image: item.image,
      category: item.category
    });
    setAddedIds((prev) => [...prev, item.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== item.id));
    }, 2000);
  };

  // Normalized 0 to 360 Angle
  const normalizedAngle = ((Math.round(rotationY) % 360) + 360) % 360;

  // Determine current active multi-angle real photo asset
  const getActiveAngleImage = () => {
    if (normalizedAngle >= 45 && normalizedAngle < 135) {
      return { img: engineAngle90, label: 'RIGHT SIDE (90°)' };
    }
    if (normalizedAngle >= 135 && normalizedAngle < 225) {
      return { img: engineAngle180, label: 'REAR VIEW (180°)' };
    }
    if (normalizedAngle >= 225 && normalizedAngle < 315) {
      return { img: engineAngle270, label: 'LEFT SIDE (270°)' };
    }
    return { img: engineAngle0, label: 'FRONT VIEW (0°)' };
  };

  const activeAngle = getActiveAngleImage();

  // Dynamic Hotspot Style with 3D Depth Sway
  const getHotspotStyle = (hotspot) => {
    const rad = (rotationY * Math.PI) / 180;
    const offsetX = Math.sin(rad) * 18;
    const left = `calc(${hotspot.baseX}% + ${offsetX}px)`;
    const top = `calc(${hotspot.baseY}% + ${rotationX * 0.2}px)`;

    return { left, top };
  };

  return (
    <section id="blueprint" className="max-w-[1440px] mx-auto px-4 md:px-8 mb-32 pt-8">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#83cffb]/10 border border-[#83cffb]/30 text-[#83cffb] font-technical-data text-xs uppercase mb-3">
          <RotateCw className="w-3.5 h-3.5" /> 360° MULTI-ANGLE REAL PHOTO INSPECTOR
        </div>
        <h2 className="font-h2 text-2xl md:text-4xl text-[#e5e2e3] font-bold mb-3">
          Inspect the Engine. Rotate 360°.
        </h2>
        <p className="font-body-md text-sm md:text-base text-[#e0c0b1] max-w-xl mx-auto">
          Multi-angle photo view allows seamless 360° inspection from front, sides, and rear without flattening.
        </p>
      </div>

      {/* Main Inspector Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[620px]">
        
        {/* Interactive Multi-Angle Photo Rotation View (Left Column) */}
        <div className="lg:col-span-2 glass-panel relative overflow-hidden flex flex-col justify-between group rounded-none select-none min-h-[520px]">
          
          {/* Top Control Bar & Badges */}
          <div className="relative z-20 flex flex-wrap items-center justify-between p-4 border-b border-[#584236]/30 bg-[#131314]/90 backdrop-blur-md gap-3">
            <div className="font-technical-data text-xs text-[#83cffb] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff7a1a] animate-pulse"></span>
              <span>{activeAngle.label} // {normalizedAngle}°</span>
            </div>

            {/* Quick Angle Preset Buttons */}
            <div className="flex items-center gap-2 font-technical-data text-xs">
              <button 
                onClick={() => { setRotationY(0); setRotationX(0); setIsAutoSpinning(false); }}
                className={`px-2.5 py-1 transition-all ${normalizedAngle < 45 || normalizedAngle >= 315 ? 'bg-[#ff7a1a] text-black font-bold' : 'bg-[#201f20] text-[#e0c0b1] hover:text-[#ff7a1a]'}`}
              >
                0° Front
              </button>
              <button 
                onClick={() => { setRotationY(90); setRotationX(0); setIsAutoSpinning(false); }}
                className={`px-2.5 py-1 transition-all ${normalizedAngle >= 45 && normalizedAngle < 135 ? 'bg-[#ff7a1a] text-black font-bold' : 'bg-[#201f20] text-[#e0c0b1] hover:text-[#ff7a1a]'}`}
              >
                90° Side
              </button>
              <button 
                onClick={() => { setRotationY(180); setRotationX(0); setIsAutoSpinning(false); }}
                className={`px-2.5 py-1 transition-all ${normalizedAngle >= 135 && normalizedAngle < 225 ? 'bg-[#ff7a1a] text-black font-bold' : 'bg-[#201f20] text-[#e0c0b1] hover:text-[#ff7a1a]'}`}
              >
                180° Rear
              </button>
              <button 
                onClick={() => { setRotationY(270); setRotationX(0); setIsAutoSpinning(false); }}
                className={`px-2.5 py-1 transition-all ${normalizedAngle >= 225 && normalizedAngle < 315 ? 'bg-[#ff7a1a] text-black font-bold' : 'bg-[#201f20] text-[#e0c0b1] hover:text-[#ff7a1a]'}`}
              >
                270° Side
              </button>
              <button 
                onClick={() => setIsAutoSpinning(!isAutoSpinning)}
                className={`px-3 py-1 flex items-center gap-1.5 transition-all ${isAutoSpinning ? 'bg-[#83cffb] text-black font-bold' : 'bg-[#201f20] text-[#83cffb] border border-[#83cffb]/40'}`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isAutoSpinning ? 'animate-spin' : ''}`} />
                <span>{isAutoSpinning ? 'Spinning' : '360° Spin'}</span>
              </button>
            </div>
          </div>

          {/* Rotatable Multi-Angle Viewport */}
          <div 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            className="relative flex-1 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
          >
            {/* Blueprint Grid Lines Background */}
            <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none"></div>

            {/* Drag Hint Tooltip */}
            <div className="absolute top-4 right-4 font-technical-data text-[11px] text-[#a78b7d] bg-[#131314]/80 px-3 py-1.5 border border-[#584236]/40 pointer-events-none flex items-center gap-1.5 z-20">
              <Move className="w-3.5 h-3.5 text-[#ff7a1a]" />
              <span>Drag to Rotate 360° (Multi-Angle Real View)</span>
            </div>

            {/* Multi-Angle Real Photo Render Container */}
            <div 
              className="w-full h-full max-w-[550px] max-h-[550px] bg-contain bg-center bg-no-repeat opacity-95 mix-blend-screen transition-all duration-300"
              style={{ 
                backgroundImage: `url(${activeAngle.img})`,
                transform: `rotateX(${rotationX * 0.3}deg)`
              }}
            />

            {/* Interactive Hotspots Layer */}
            {BLUEPRINT_HOTSPOTS.map((hotspot) => {
              const isSelected = selectedHotspot?.id === hotspot.id;
              const posStyle = getHotspotStyle(hotspot);
              return (
                <button
                  key={hotspot.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedHotspot(hotspot);
                  }}
                  style={{
                    top: posStyle.top,
                    left: posStyle.left
                  }}
                  className={`absolute z-30 transform -translate-x-1/2 -translate-y-1/2 group/pin transition-all duration-300 ${
                    isSelected ? 'scale-125' : 'hover:scale-110'
                  }`}
                >
                  <span className={`block w-5 h-5 rounded-full border-2 ${
                    isSelected ? 'border-[#ff7a1a] bg-[#ff7a1a]/40' : 'border-[#83cffb] bg-[#83cffb]/20'
                  } animate-pulse`} />
                  <span className={`absolute top-0 left-0 w-5 h-5 rounded-full ${
                    isSelected ? 'bg-[#ff7a1a]' : 'bg-[#83cffb]'
                  } opacity-75 blur-sm`} />
                </button>
              );
            })}

            {/* Active Hotspot Description Card */}
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

          {/* Bottom Interactive 360° Angle Slider */}
          <div className="p-4 border-t border-[#584236]/30 bg-[#131314]/90 flex items-center gap-4">
            <span className="font-technical-data text-xs text-[#a78b7d] whitespace-nowrap">
              ROTATION SLIDER:
            </span>
            <input 
              type="range"
              min="0"
              max="360"
              value={normalizedAngle}
              onChange={(e) => {
                setIsAutoSpinning(false);
                setRotationY(parseFloat(e.target.value));
              }}
              className="w-full accent-[#ff7a1a] cursor-pointer"
            />
            <span className="font-technical-data text-xs text-[#ff7a1a] font-bold w-12 text-right">
              {normalizedAngle}°
            </span>
          </div>

        </div>

        {/* Detail Inventory Panel (Right Column) */}
        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar h-[600px]">
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

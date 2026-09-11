import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Gauge, 
  Film, 
  Sparkles,
  Wrench,
  Flame
} from 'lucide-react';
import { WORKSHOP_REELS } from '../data/partsData';

export default function VideoShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [totalDuration, setTotalDuration] = useState('0:00');
  const [isLooping, setIsLooping] = useState(true);

  const videoRef = useRef(null);
  const progressBarRef = useRef(null);

  const activeReel = WORKSHOP_REELS[activeIdx] || WORKSHOP_REELS[0];

  // Auto-play when active reel changes if already playing
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setProgress(0);
      if (isPlaying) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            setIsPlaying(false);
          });
        }
      }
    }
  }, [activeIdx]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const toggleLoop = (e) => {
    e?.stopPropagation();
    setIsLooping(!isLooping);
  };

  const toggleFullscreen = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs === Infinity) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    if (dur && dur > 0) {
      setProgress((curr / dur) * 100);
      setCurrentTime(formatTime(curr));
      setTotalDuration(formatTime(dur));
    }
  };

  const handleProgressClick = (e) => {
    e.stopPropagation();
    if (!progressBarRef.current || !videoRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const target = Math.max(0, Math.min(1, pos)) * videoRef.current.duration;
    videoRef.current.currentTime = target;
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? WORKSHOP_REELS.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setActiveIdx((prev) => (prev === WORKSHOP_REELS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="workshop" className="py-20 bg-[#0f0f10] relative border-t border-b border-[#584236]/30 overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#ff7a1a]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#ff7a1a]/10 border border-[#ff7a1a]/30 text-[#ff7a1a] font-technical-data text-xs uppercase tracking-widest">
            <Film className="w-4 h-4" />
            <span>LIVE WORKSHOP REELS & SOUND TESTS</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-[#e5e2e3] font-h2 tracking-tight">
            Air-Cooled Engine <span className="text-[#ff7a1a]">Workshop Reels</span>
          </h2>

          <p className="text-[#a78b7d] text-sm md:text-base max-w-2xl mx-auto font-sans leading-relaxed">
            Raw dyno runs, precision machine work, and hand-built boxer engine turn-keys directly from our workshop floor.
          </p>
        </div>

        {/* Main Showcase Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Vertical 9:16 Reel Player */}
          <div className="lg:col-span-6 xl:col-span-5 flex justify-center">
            <div className="w-full max-w-[380px] bg-[#141415] rounded-2xl border border-[#584236]/50 shadow-2xl p-3 relative group">
              
              {/* Phone-Style Bezel Container */}
              <div 
                className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black cursor-pointer select-none shadow-inner"
                onClick={togglePlay}
              >
                {/* Native HTML5 Video */}
                <video
                  ref={videoRef}
                  src={activeReel.videoUrl}
                  playsInline
                  loop={isLooping}
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleTimeUpdate}
                  onEnded={() => {
                    if (!isLooping) setIsPlaying(false);
                  }}
                  className="w-full h-full object-cover"
                />

                {/* Top Overlay Header */}
                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between z-20 pointer-events-auto">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ff7a1a]/90 text-black text-[10px] font-technical-data font-bold tracking-wider shadow">
                    <Flame className="w-3 h-3 fill-current" />
                    {activeReel.badge}
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Mute Toggle */}
                    <button
                      type="button"
                      onClick={toggleMute}
                      title={isMuted ? "Unmute Sound" : "Mute Sound"}
                      className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-[#ff7a1a] hover:text-black transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    {/* Fullscreen Button */}
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      title="Fullscreen"
                      className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-[#ff7a1a] hover:text-black transition-colors"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Center Play/Pause Overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      className="w-20 h-20 rounded-full bg-[#ff7a1a] text-black shadow-2xl flex items-center justify-center hover:scale-110 hover:bg-[#ff9645] transition-all duration-300 glow-button"
                    >
                      <Play className="w-9 h-9 ml-1 fill-current" />
                    </button>
                    <span className="absolute bottom-16 px-3 py-1 rounded-full bg-black/70 text-xs font-technical-data text-[#ff7a1a] border border-[#ff7a1a]/30">
                      Tap to Play
                    </span>
                  </div>
                )}

                {/* Bottom Overlay Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-20 pointer-events-auto space-y-2">
                  
                  {/* Title & Subtitle */}
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-bold text-white font-h2 leading-snug line-clamp-1">
                      {activeReel.title}
                    </h3>
                    <p className="text-[11px] text-[#e0c0b1]/80 font-technical-data line-clamp-1">
                      {activeReel.subtitle}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div 
                    ref={progressBarRef}
                    onClick={handleProgressClick}
                    className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer group/bar relative"
                  >
                    <div 
                      className="h-full bg-[#ff7a1a] rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Control Row */}
                  <div className="flex items-center justify-between text-[11px] font-technical-data text-[#a78b7d] pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlay();
                        }}
                        className="text-white hover:text-[#ff7a1a] transition-colors"
                      >
                        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>
                      <span className="text-white/80">{currentTime} / {totalDuration}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={toggleLoop}
                        title={isLooping ? "Loop On" : "Loop Off"}
                        className={`text-xs px-1.5 py-0.5 rounded transition-colors ${
                          isLooping ? 'text-[#ff7a1a] bg-[#ff7a1a]/20' : 'text-white/40'
                        }`}
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1 border-l border-white/10 pl-2">
                        <button
                          type="button"
                          onClick={handlePrev}
                          title="Previous Reel"
                          className="p-1 text-white hover:text-[#ff7a1a] transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          title="Next Reel"
                          className="p-1 text-white hover:text-[#ff7a1a] transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
              
              {/* Bottom bezel branding note */}
              <div className="text-center pt-2 text-[10px] font-technical-data uppercase tracking-widest text-[#a78b7d]/60">
                Pure Workshop Sound • 100% In-House Engine Work
              </div>

            </div>
          </div>

          {/* Right Column: Active Reel Details & Full Playlist Grid */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6">
            
            {/* Active Reel Technical Specs Card */}
            <div className="glass-panel p-6 rounded-xl border border-[#584236]/40 bg-[#141415]/80 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#584236]/30">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-[#ff7a1a]" />
                  <span className="text-xs font-technical-data text-[#ff7a1a] uppercase tracking-wider font-bold">
                    {activeReel.category}
                  </span>
                </div>
                <span className="text-xs font-technical-data text-[#a78b7d]">
                  REEL {activeIdx + 1} OF {WORKSHOP_REELS.length}
                </span>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-[#e5e2e3] font-h2">
                  {activeReel.title}
                </h3>
                <p className="text-xs md:text-sm text-[#ff7a1a] font-technical-data mt-1">
                  {activeReel.subtitle}
                </p>
              </div>

              <p className="text-sm text-[#e0c0b1] font-sans leading-relaxed">
                {activeReel.description}
              </p>

              {/* Technical Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeReel.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="text-[11px] font-technical-data px-2.5 py-1 rounded bg-[#201f20] text-[#e0c0b1] border border-[#584236]/40"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Playlist Grid Header */}
            <div className="flex items-center justify-between pt-2">
              <h4 className="text-xs font-technical-data uppercase tracking-widest text-[#a78b7d] font-bold flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-[#ff7a1a]" />
                Select Workshop Reel ({WORKSHOP_REELS.length})
              </h4>
              <span className="text-[11px] font-technical-data text-[#a78b7d]">
                Click any reel to play
              </span>
            </div>

            {/* 6-Reel Interactive Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {WORKSHOP_REELS.map((reel, index) => {
                const isActive = index === activeIdx;
                return (
                  <button
                    key={reel.id}
                    type="button"
                    onClick={() => {
                      setActiveIdx(index);
                      setIsPlaying(true);
                    }}
                    className={`relative text-left p-2.5 rounded-lg transition-all duration-300 group overflow-hidden border ${
                      isActive 
                        ? 'bg-[#201f20] border-[#ff7a1a] shadow-lg shadow-[#ff7a1a]/10 ring-1 ring-[#ff7a1a]'
                        : 'bg-[#141415]/70 border-[#584236]/30 hover:border-[#584236] hover:bg-[#1a191a]'
                    }`}
                  >
                    {/* Vertical Mini-Thumbnail Container */}
                    <div className="relative aspect-[9/12] w-full rounded overflow-hidden bg-black mb-2">
                      <video
                        src={`${reel.videoUrl}#t=0.5`}
                        preload="metadata"
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                      
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                      {/* Top Badge */}
                      <div className="absolute top-1.5 left-1.5">
                        <span className="text-[9px] font-technical-data px-1.5 py-0.5 rounded bg-black/70 text-[#ff7a1a] border border-[#ff7a1a]/30">
                          {reel.duration}
                        </span>
                      </div>

                      {/* Center Play Icon / Playing Indicator */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {isActive && isPlaying ? (
                          <div className="w-8 h-8 rounded-full bg-[#ff7a1a] text-black flex items-center justify-center animate-pulse">
                            <span className="w-2.5 h-2.5 bg-black rounded-sm" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-[#ff7a1a] group-hover:text-black transition-all">
                            <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Text Details */}
                    <div className="space-y-1">
                      <div className="text-[9px] font-technical-data text-[#ff7a1a] uppercase font-bold truncate">
                        {reel.category}
                      </div>
                      <h5 className={`text-xs font-bold leading-snug line-clamp-2 ${
                        isActive ? 'text-[#ff7a1a]' : 'text-[#e5e2e3] group-hover:text-white'
                      }`}>
                        {reel.title}
                      </h5>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

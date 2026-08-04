import React, { useState } from 'react';
import { Play, Video, Film } from 'lucide-react';
import { YOUTUBE_SHOWCASE } from '../data/partsData';

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState(YOUTUBE_SHOWCASE[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [customYoutubeUrl, setCustomYoutubeUrl] = useState('');

  const getYoutubeId = (urlOrId) => {
    if (!urlOrId) return activeVideo.youtubeId;
    const match = urlOrId.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : urlOrId;
  };

  const currentYoutubeId = getYoutubeId(customYoutubeUrl || activeVideo.youtubeId);

  return (
    <section id="workshop" className="py-20 bg-[#131314] relative border-t border-b border-[#584236]/30">
      
      <div className="relative max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#ff7a1a]/10 border border-[#ff7a1a]/30 text-[#ff7a1a] font-technical-data text-xs uppercase">
            <Video className="w-4 h-4" />
            <span>IN THE ENGINE WORKSHOP</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold text-[#e5e2e3] font-h2">
            Vintage Engine <span className="text-[#ff7a1a]">Live Showcase</span>
          </h2>

          <p className="text-[#e0c0b1] text-xs md:text-sm">
            Watch live engine dyno runs, exhaust sound tests, NOS engine component unboxings, and tuning walkthroughs.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Video Player Container */}
          <div className="lg:col-span-8">
            <div className="glass-panel p-4 sm:p-6 shadow-2xl relative overflow-hidden group">
              
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#584236]/30 text-xs font-technical-data text-[#a78b7d]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff7a1a] inline-block animate-pulse" />
                  <span className="text-[#e5e2e3] font-bold">{activeVideo.title}</span>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-[11px]">
                  <span>DURATION: {activeVideo.duration}</span>
                  <span className="bg-[#ff7a1a]/20 text-[#ff7a1a] px-2 py-0.5 font-technical-data">4K ULTRA HD</span>
                </div>
              </div>

              {/* Viewport */}
              <div className="relative aspect-video bg-[#0e0e0f] border border-[#584236]/40 shadow-inner">
                {isPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${currentYoutubeId}?autoplay=1&rel=0`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={activeVideo.thumbnail}
                      alt={activeVideo.title}
                      className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131314] via-[#131314]/40 to-transparent" />

                    {/* Play Button */}
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="relative z-10 flex items-center justify-center w-20 h-20 bg-[#ff7a1a] text-black shadow-2xl hover:scale-110 hover:bg-[#ffb68e] transition-all duration-300 group/play glow-button"
                    >
                      <Play className="w-8 h-8 ml-1 fill-current group-hover/play:scale-110 transition-transform" />
                    </button>

                    {/* Info */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#e0c0b1] font-technical-data">
                      <span>CATEGORY: {activeVideo.category}</span>
                      <span className="bg-[#131314]/80 px-3 py-1 border border-[#584236]/40">Click to Play Video</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Custom YouTube Input */}
              <div className="mt-4 pt-4 border-t border-[#584236]/30 flex flex-col sm:flex-row items-center gap-3 text-xs font-technical-data">
                <span className="text-[#a78b7d] whitespace-nowrap flex items-center gap-1">
                  <Film className="w-3.5 h-3.5 text-[#ff7a1a]" /> Custom YouTube Link:
                </span>
                <input
                  type="text"
                  placeholder="Paste YouTube Video URL or ID..."
                  value={customYoutubeUrl}
                  onChange={(e) => {
                    setCustomYoutubeUrl(e.target.value);
                    setIsPlaying(false);
                  }}
                  className="flex-1 w-full bg-[#0e0e0f] border border-[#584236]/60 px-3 py-2 text-[#e5e2e3] focus:outline-none focus:border-[#ff7a1a]"
                />
              </div>

            </div>
          </div>

          {/* Right Column: Playlist */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-technical-data uppercase tracking-widest text-[#a78b7d] font-bold mb-2">
              Engine Workshop Playlist
            </h3>

            <div className="space-y-3">
              {YOUTUBE_SHOWCASE.map((video) => {
                const isActive = activeVideo.id === video.id;
                return (
                  <button
                    key={video.id}
                    onClick={() => {
                      setActiveVideo(video);
                      setIsPlaying(false);
                      setCustomYoutubeUrl('');
                    }}
                    className={`w-full text-left p-4 transition-all flex items-start gap-4 ${
                      isActive
                        ? 'bg-[#201f20] border border-[#ff7a1a]'
                        : 'glass-panel hover:border-[#584236] text-[#a78b7d]'
                    }`}
                  >
                    <div className="relative w-24 h-16 overflow-hidden flex-shrink-0 bg-[#0e0e0f]">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-85" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="w-4 h-4 text-[#ff7a1a] fill-current" />
                      </div>
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="text-[10px] font-technical-data text-[#ff7a1a] uppercase font-bold">
                        {video.category} • {video.duration}
                      </div>
                      <h4 className={`text-xs font-bold font-h3 line-clamp-2 ${isActive ? 'text-[#e5e2e3]' : 'text-[#e0c0b1]'}`}>
                        {video.title}
                      </h4>
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

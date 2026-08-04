import React, { useState } from 'react';
import { Play, Video, Volume2, Sparkles, Tv, CheckCircle2, Film } from 'lucide-react';
import { YOUTUBE_SHOWCASE } from '../data/partsData';

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState(YOUTUBE_SHOWCASE[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [customYoutubeUrl, setCustomYoutubeUrl] = useState('');

  // Extract YouTube ID from custom URL or ID
  const getYoutubeId = (urlOrId) => {
    if (!urlOrId) return activeVideo.youtubeId;
    const match = urlOrId.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : urlOrId;
  };

  const currentYoutubeId = getYoutubeId(customYoutubeUrl || activeVideo.youtubeId);

  return (
    <section id="workshop" className="py-20 bg-slate-950 relative border-t border-b border-slate-800">
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
            <Video className="w-4 h-4" />
            <span>IN THE RESTORER'S WORKSHOP</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Vintage Engine <span className="text-red-500">Live Video Showcase</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base">
            Watch live dyno runs, engine sound checks, NOS parts unboxing, and master restorer tuning videos directly in guest mode.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: YouTube Embedded Video Player Container */}
          <div className="lg:col-span-8">
            <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden group">
              
              {/* Chrome Top Bar styling */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 inline-block animate-pulse" />
                  <span className="text-white font-bold">{activeVideo.title}</span>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-[11px]">
                  <span>DURATION: {activeVideo.duration}</span>
                  <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-mono">4K ULTRA HD</span>
                </div>
              </div>

              {/* Player Viewport */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-black border border-slate-800 shadow-inner">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Play Button Overlay */}
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-red-600 text-white shadow-2xl shadow-red-600/50 hover:scale-110 hover:bg-red-500 transition-all duration-300 group/play"
                    >
                      <Play className="w-8 h-8 ml-1 fill-current group-hover/play:scale-110 transition-transform" />
                      <span className="absolute -inset-2 rounded-full border border-red-500/50 animate-ping pointer-events-none" />
                    </button>

                    {/* Overlay Info */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 font-mono">
                      <span>CATEGORY: {activeVideo.category}</span>
                      <span className="bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700">Click to Play Video</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Custom YouTube Slot Input Bar */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-3 text-xs font-mono">
                <span className="text-slate-400 whitespace-nowrap flex items-center gap-1">
                  <Film className="w-3.5 h-3.5 text-red-400" /> Insert Your Custom YouTube Video Link:
                </span>
                <input
                  type="text"
                  placeholder="Paste YouTube Video URL or ID (e.g., https://youtu.be/...)"
                  value={customYoutubeUrl}
                  onChange={(e) => {
                    setCustomYoutubeUrl(e.target.value);
                    setIsPlaying(false);
                  }}
                  className="flex-1 w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-red-500"
                />
              </div>

            </div>
          </div>

          {/* Right Column: Playlist Selector */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-widest text-slate-400 font-semibold mb-2">
              Featured Workshop Playlist
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
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                      isActive
                        ? 'bg-slate-900 border-red-500/60 shadow-lg shadow-red-500/10'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-950">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-4 h-4 text-white fill-current" />
                      </div>
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="text-[10px] font-mono text-red-400 uppercase font-semibold">
                        {video.category} • {video.duration}
                      </div>
                      <h4 className={`text-xs font-bold font-display line-clamp-2 ${isActive ? 'text-white' : 'text-slate-300'}`}>
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

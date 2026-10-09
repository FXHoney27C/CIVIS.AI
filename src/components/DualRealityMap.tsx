import React, { useState } from 'react';
import { Shield, Compass, Eye, AlertOctagon, Utensils, Landmark, Video, Radio, Zap, Sparkles, X, ChevronRight } from 'lucide-react';
import { URBAN_WAYPOINTS } from '../data/urbanData.ts';
import { Waypoint, MapMode } from '../types/index.ts';

export const DualRealityMap: React.FC = () => {
  const [activeMode, setActiveMode] = useState<MapMode>('safeguard');
  const [selectedWaypoint, setSelectedWaypoint] = useState<Waypoint | null>(URBAN_WAYPOINTS[0]);
  const [showLumensLayer, setShowLumensLayer] = useState(true);
  const [showCCTVLayer, setShowCCTVLayer] = useState(true);
  const [splitSliderPosition, setSplitSliderPosition] = useState(50);
  const [viewMode, setViewMode] = useState<'toggle' | 'split'>('toggle');

  return (
    <section id="dual-map" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs tracking-wider text-slate-400 uppercase font-mono mb-3">
          <span className="text-[#00E5FF]">Spatial Intelligence</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Dual Layer Navigation</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
          The Dual-Reality Map
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Standard maps force a compromise between speed and safety. CIVIS gives you two realities in a single pane of glass: tactical illumination when you need security, and unfiltered cultural vibrancy when you are ready to explore.
        </p>
      </div>

      {/* Mode Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl tactical-glass mb-6 border border-white/10">
        
        {/* Toggle Mode Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveMode('safeguard');
              setViewMode('toggle');
            }}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'toggle' && activeMode === 'safeguard'
                ? 'bg-[#00E5FF] text-[#0B0F19] glow-cyan-sm shadow-md'
                : 'text-slate-300 hover:text-white bg-white/5 hover:bg-white/10'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Safeguard Mode</span>
          </button>

          <button
            onClick={() => {
              setActiveMode('explore');
              setViewMode('toggle');
            }}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'toggle' && activeMode === 'explore'
                ? 'bg-[#FFD700] text-[#0B0F19] glow-gold shadow-md'
                : 'text-slate-300 hover:text-white bg-white/5 hover:bg-white/10'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Explore Mode</span>
          </button>

          <button
            onClick={() => setViewMode('split')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'split'
                ? 'bg-white/20 text-white border border-white/30'
                : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Split Screen</span>
          </button>
        </div>

        {/* Layer Filters */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setShowLumensLayer(!showLumensLayer)}
            className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
              showLumensLayer
                ? 'border-[#00E5FF]/50 bg-[#00E5FF]/10 text-[#00E5FF]'
                : 'border-white/10 text-slate-400'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Street Lumens</span>
          </button>

          <button
            onClick={() => setShowCCTVLayer(!showCCTVLayer)}
            className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
              showCCTVLayer
                ? 'border-[#00E5FF]/50 bg-[#00E5FF]/10 text-[#00E5FF]'
                : 'border-white/10 text-slate-400'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>CCTV Coverage</span>
          </button>
        </div>

      </div>

      {/* Main Interactive Map Stage */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#070A11] min-h-[580px] sm:min-h-[640px] flex flex-col justify-between p-6">
        
        {/* Tactical Grid Overlay */}
        <div className="absolute inset-0 tactical-grid opacity-75 pointer-events-none" />

        {/* Stylized Urban Vectors & Safe Route Networks */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cyanPath" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="goldPath" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glowEffect">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Grid Street Lines */}
          <line x1="10%" y1="30%" x2="90%" y2="30%" stroke="#1E293B" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#1E293B" strokeWidth="2" />
          <line x1="10%" y1="70%" x2="90%" y2="70%" stroke="#1E293B" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="30%" y1="10%" x2="30%" y2="90%" stroke="#1E293B" strokeWidth="2" />
          <line x1="55%" y1="10%" x2="55%" y2="90%" stroke="#1E293B" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="75%" y1="10%" x2="75%" y2="90%" stroke="#1E293B" strokeWidth="2" />

          {/* Primary Safeguard Route (Cyan Vector) */}
          {(viewMode === 'toggle' ? activeMode === 'safeguard' : true) && (
            <path
              d="M 280 435 Q 380 340 540 320 T 780 200"
              fill="transparent"
              stroke="#00E5FF"
              strokeWidth="4"
              filter="url(#glowEffect)"
              strokeDasharray="6 3"
              className="transition-all duration-700"
            />
          )}

          {/* Explore Route (Gold Vector) */}
          {(viewMode === 'toggle' ? activeMode === 'explore' : true) && (
            <path
              d="M 280 435 Q 260 280 500 210 T 800 180"
              fill="transparent"
              stroke="#FFD700"
              strokeWidth="4"
              filter="url(#glowEffect)"
              className="transition-all duration-700"
            />
          )}

          {/* Hazard Choke Point Warning Circle */}
          <circle 
            cx="42%" 
            cy="62%" 
            r="36" 
            fill="#FF3366" 
            fillOpacity="0.12" 
            stroke="#FF3366" 
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
        </svg>

        {/* Top Floating Map Telemetry Status */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="tactical-glass px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-xs font-mono text-slate-200">
              {viewMode === 'split' ? (
                <span>Dual Spatial Split: Safeguard (Left) · Explore (Right)</span>
              ) : activeMode === 'safeguard' ? (
                <span>Active Layer: <strong className="text-[#00E5FF]">Safeguard Mode</strong> · High Lumen & Patrols</span>
              ) : (
                <span>Active Layer: <strong className="text-[#FFD700]">Explore Mode</strong> · Cultural Gems & Vibe Radar</span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            {showLumensLayer && (
              <div className="tactical-glass px-3 py-1.5 rounded-lg border border-[#00E5FF]/20 text-[#00E5FF]">
                Avg Illumination: 104 Lux
              </div>
            )}
            {showCCTVLayer && (
              <div className="tactical-glass px-3 py-1.5 rounded-lg border border-white/15 text-slate-300">
                12 Active Feeds
              </div>
            )}
          </div>
        </div>

        {/* Interactive Waypoint Pins on the Map */}
        <div className="relative w-full h-[380px] sm:h-[420px] my-auto">
          {URBAN_WAYPOINTS.map((wp) => {
            const isSelected = selectedWaypoint?.id === wp.id;
            const isHazard = wp.category === 'hazard';
            const isSafety = wp.category === 'safety';
            const isFood = wp.category === 'food';
            const isHistory = wp.category === 'history';

            return (
              <div
                key={wp.id}
                onClick={() => setSelectedWaypoint(wp)}
                style={{ left: `${wp.x}%`, top: `${wp.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              >
                {/* Pin Halo */}
                <div 
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected ? 'scale-125 ring-2 ring-white shadow-2xl' : 'hover:scale-115'
                  } ${
                    isHazard
                      ? 'bg-[#FF3366]/20 border border-[#FF3366] text-[#FF3366] glow-red'
                      : isSafety
                      ? 'bg-[#00E5FF]/20 border border-[#00E5FF] text-[#00E5FF] glow-cyan-sm'
                      : 'bg-[#FFD700]/20 border border-[#FFD700] text-[#FFD700] glow-gold'
                  }`}
                >
                  {isHazard && <AlertOctagon className="w-5 h-5" />}
                  {isSafety && <Shield className="w-5 h-5" />}
                  {isFood && <Utensils className="w-5 h-5" />}
                  {isHistory && <Landmark className="w-5 h-5" />}
                </div>

                {/* Pin Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 pointer-events-none">
                  <div className="tactical-glass-elevated px-3 py-1.5 rounded-lg text-xs font-semibold text-white whitespace-nowrap border border-white/20 shadow-xl">
                    {wp.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Waypoint Telemetry Drawer */}
        {selectedWaypoint && (
          <div className="relative z-20 tactical-glass-elevated rounded-2xl p-4 sm:p-6 border border-white/15 max-w-2xl mx-auto w-full shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${
                  selectedWaypoint.category === 'hazard' 
                    ? 'bg-[#FF3366]/20 text-[#FF3366]' 
                    : selectedWaypoint.category === 'safety' 
                    ? 'bg-[#00E5FF]/20 text-[#00E5FF]' 
                    : 'bg-[#FFD700]/20 text-[#FFD700]'
                }`}>
                  {selectedWaypoint.category === 'hazard' && <AlertOctagon className="w-5 h-5" />}
                  {selectedWaypoint.category === 'safety' && <Shield className="w-5 h-5" />}
                  {selectedWaypoint.category === 'food' && <Utensils className="w-5 h-5" />}
                  {selectedWaypoint.category === 'history' && <Landmark className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white font-display">
                    {selectedWaypoint.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
                    <span>{selectedWaypoint.vibeLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>Crowd: {selectedWaypoint.crowdLevel}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedWaypoint(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              {selectedWaypoint.description}
            </p>

            {selectedWaypoint.historicalLore && (
              <div className="mt-2 text-xs text-[#FFD700]/90 bg-[#FFD700]/10 p-2.5 rounded-lg border border-[#FFD700]/20">
                <strong>Historical Lore:</strong> {selectedWaypoint.historicalLore}
              </div>
            )}

            {selectedWaypoint.incidentHistory && (
              <div className={`mt-2 text-xs p-2.5 rounded-lg border ${
                selectedWaypoint.category === 'hazard' 
                  ? 'text-[#FF3366] bg-[#FF3366]/10 border-[#FF3366]/30' 
                  : 'text-slate-300 bg-white/5 border-white/10'
              }`}>
                <strong>Safety Analysis:</strong> {selectedWaypoint.incidentHistory}
              </div>
            )}

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-center font-mono">
              <div className="bg-white/5 p-2 rounded-lg">
                <div className="text-xs text-slate-400">Safety Index</div>
                <div className="text-sm font-bold text-[#00E5FF] tabular-nums">{selectedWaypoint.safetyScore}/100</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg">
                <div className="text-xs text-slate-400">Vibe Rating</div>
                <div className="text-sm font-bold text-[#FFD700] tabular-nums">{selectedWaypoint.vibeScore}%</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg">
                <div className="text-xs text-slate-400">Illumination</div>
                <div className="text-sm font-bold text-white tabular-nums">{selectedWaypoint.luxLighting} Lux</div>
              </div>
            </div>
          </div>
        )}

      </div>

    </section>
  );
};

import React, { useState, useRef, useCallback } from 'react';
import { Sliders, Shield, AlertTriangle, Eye, Sparkles, MapPin, Sun, Moon, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { IndianMetropolis } from '../types/index.ts';

interface CityComparisonData {
  city: IndianMetropolis;
  corridor: string;
  traditionalRisk: string;
  civisSafetyScore: string;
  traditionalLux: string;
  civisLux: string;
  traditionalHazards: string;
  civisSafeguards: string;
}

const COMPARISON_DATA: Record<IndianMetropolis, CityComparisonData> = {
  Pune: {
    city: 'Pune',
    corridor: 'Fergusson College Rd to Deccan Gymkhana',
    traditionalRisk: 'High (68% Collision & Unlit Alley Risk)',
    civisSafetyScore: '96% Safe Route (4.8/5 Safety Index)',
    traditionalLux: '18 Lux (Dark byway behind college wall)',
    civisLux: '124 Lux (Solar smart streetlights active)',
    traditionalHazards: '2 unlit blind curves, high two-wheeler conflict rate',
    civisSafeguards: 'Main arterial boulevard, 2 police booths, CCTV corridor'
  },
  Mumbai: {
    city: 'Mumbai',
    corridor: 'Marine Drive to Fort Heritage Quarter',
    traditionalRisk: 'Moderate-High (Night cross-choke points)',
    civisSafetyScore: '98% Safe Route (4.9/5 Safety Index)',
    traditionalLux: '32 Lux in narrow bazaar byways',
    civisLux: '145 Lux along seaside promenade',
    traditionalHazards: 'Dadar TT circle choke, deserted dockyard spur',
    civisSafeguards: '24/7 lit promenade, rapid transit feeder, PCR vans'
  },
  Bengaluru: {
    city: 'Bengaluru',
    corridor: 'Koramangala 80ft Rd to HSR Sector 2',
    traditionalRisk: 'Severe (Silk Board junction gridlock & pothole hazard)',
    civisSafetyScore: '94% Safe Route (4.7/5 Safety Index)',
    traditionalLux: '22 Lux in underpass service road',
    civisLux: '118 Lux via kinetic pedestrian greenway',
    traditionalHazards: 'Silk board 45-min bottleneck, waterlogged curb',
    civisSafeguards: 'Automated detour around Silk Board, illuminated skywalk'
  },
  Hyderabad: {
    city: 'Hyderabad',
    corridor: 'Cyber Towers to HITEC City Phase 2',
    traditionalRisk: 'Moderate (High-speed flyover merging hazard)',
    civisSafetyScore: '95% Safe Route (4.8/5 Safety Index)',
    traditionalLux: '28 Lux along outer perimeter trail',
    civisLux: '132 Lux on smart tech-patrol boulevard',
    traditionalHazards: 'Unmarked speed breakers, dark software park backlane',
    civisSafeguards: 'Illuminated IT corridor, emergency callboxes every 200m'
  },
  Delhi: {
    city: 'Delhi',
    corridor: 'Connaught Place Inner Circle to Barakhamba',
    traditionalRisk: 'High (Blind service lanes & isolated parking lots)',
    civisSafetyScore: '97% Safe Route (4.9/5 Safety Index)',
    traditionalLux: '25 Lux in colonial colonnade alleys',
    civisLux: '140 Lux along main radial avenues',
    traditionalHazards: 'Unlit rear alleys, subway underpass hazard after 10 PM',
    civisSafeguards: 'Delhi Police booth presence, high-intensity LED masts'
  }
};

export const ImageComparison: React.FC = () => {
  const [activeCity, setActiveCity] = useState<IndianMetropolis>('Pune');
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 to 100 percentage
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const cityData = COMPARISON_DATA[activeCity];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(clampedPercentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section 
      id="image-comparison" 
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10"
      aria-label="Route Safety Comparison Section"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs tracking-wider text-[#00E5FF] uppercase font-mono mb-3">
          <Sliders className="w-4 h-4 text-[#00E5FF]" />
          <span>Interactive Visual Proof</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Optical Safety Telemetry</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
          Conventional Navigation vs. CIVIS Safe Grid
        </h2>
        <p className="text-base sm:text-lg text-slate-300">
          Standard GPS apps prioritize raw speed, cutting through unlit alleys and collision bottlenecks. Drag the interactive split slider to witness the CIVIS AI transformation.
        </p>
      </div>

      {/* City Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {(Object.keys(COMPARISON_DATA) as IndianMetropolis[]).map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => setActiveCity(city)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeCity === city
                ? 'bg-[#00E5FF] text-[#0B0F19] shadow-lg shadow-[#00E5FF]/20 font-bold'
                : 'tactical-glass text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {city} Hub
          </button>
        ))}
      </div>

      {/* Active Corridor Card */}
      <div className="mb-6 p-4 rounded-xl tactical-glass border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF]">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Evaluation Corridor</span>
            <div className="text-sm font-bold text-white">{cityData.corridor}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>Before: {sliderPosition > 50 ? `${Math.round(100 - sliderPosition)}%` : `${Math.round(100 - sliderPosition)}% View`}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#00E5FF]">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF]"></span>
            <span>CIVIS Safe Mode: {Math.round(sliderPosition)}% View</span>
          </div>
        </div>
      </div>

      {/* Interactive Visual Split Comparison Box */}
      <div 
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[420px] sm:h-[480px] rounded-2xl overflow-hidden border border-white/20 select-none cursor-ew-resize tactical-glass-elevated shadow-2xl"
        role="region"
        aria-label="Interactive visual comparison between conventional and CIVIS safe routing"
      >
        {/* RIGHT LAYER: Conventional Navigation (Speed Priority, Dark & Dangerous) */}
        <div className="absolute inset-0 bg-[#070A10] flex flex-col justify-between p-6">
          {/* Visual Canvas Representation */}
          <svg 
            className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Schematic vector map of unlit hazard corridor"
            role="img"
          >
            <title>Unlit conventional navigation route</title>
            <desc>Map diagram of dark alleys, high collision danger areas, and unlit alleys under 20 Lux</desc>
            {/* Dark street grid */}
            <pattern id="darkGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="#070A10" />
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#161F30" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#darkGrid)" />
            
            {/* Hazardous route path (Jagged, red) */}
            <path 
              d="M 50 360 L 220 330 L 320 220 L 460 270 L 620 180 L 800 240 L 1050 120" 
              fill="none" 
              stroke="#FF3366" 
              strokeWidth="5" 
              strokeDasharray="6,4"
            />
            {/* Danger choke hotspots */}
            <circle cx="320" cy="220" r="32" fill="#FF3366" fillOpacity="0.25" stroke="#FF3366" strokeWidth="2" />
            <circle cx="620" cy="180" r="40" fill="#FF3366" fillOpacity="0.3" stroke="#FF3366" strokeWidth="2" />
            <circle cx="800" cy="240" r="30" fill="#FF3366" fillOpacity="0.2" stroke="#FF3366" strokeWidth="2" />
          </svg>

          {/* Conventional Labels (Top Right) */}
          <div className="relative z-10 flex justify-end">
            <div className="p-4 rounded-xl bg-black/80 border border-rose-500/40 backdrop-blur-md max-w-xs text-right">
              <div className="flex items-center justify-end gap-2 text-rose-400 font-mono text-xs font-bold uppercase mb-1">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <span>Standard Dijkstra (Speed Only)</span>
              </div>
              <div className="text-xl font-bold text-white font-display mb-1">
                {cityData.traditionalLux}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {cityData.traditionalHazards}
              </p>
              <div className="mt-2 text-xs font-mono text-rose-300 font-semibold">
                Risk: {cityData.traditionalRisk}
              </div>
            </div>
          </div>

          <div className="relative z-10 text-right text-xs font-mono text-rose-400">
            Unlit Alleyways · High Collision Chokepoint
          </div>
        </div>

        {/* LEFT LAYER: CIVIS Safe Constellation (Illuminated, Police Patrols, Protected) */}
        <div 
          className="absolute inset-0 overflow-hidden bg-[#0A1224]"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="absolute inset-0 w-full h-full min-w-[320px] p-6 flex flex-col justify-between">
            {/* Visual Canvas Representation */}
            <svg 
              className="absolute inset-0 w-full h-full opacity-80 pointer-events-none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Schematic vector map of CIVIS illuminated corridor"
              role="img"
            >
              <title>CIVIS Safe Illuminated Corridor Map</title>
              <desc>Map diagram featuring high lumen solar smart streetlights, police booths, and verified safe detour around danger zones</desc>
              <pattern id="safeGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect width="40" height="40" fill="#0A1224" />
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1A2D4F" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#safeGrid)" />

              {/* Glowing Safe Constellation Route */}
              <path 
                d="M 50 360 C 180 370 280 290 440 290 C 580 290 680 140 850 140 L 1050 120" 
                fill="none" 
                stroke="#00E5FF" 
                strokeWidth="6" 
                strokeLinecap="round"
              />
              <path 
                d="M 50 360 C 180 370 280 290 440 290 C 580 290 680 140 850 140 L 1050 120" 
                fill="none" 
                stroke="#00E676" 
                strokeWidth="2" 
                strokeDasharray="4,6"
              />

              {/* Verified Safe Patrol Checkpoints */}
              <circle cx="280" cy="290" r="18" fill="#00E676" fillOpacity="0.3" stroke="#00E676" strokeWidth="2" />
              <circle cx="680" cy="140" r="18" fill="#00E676" fillOpacity="0.3" stroke="#00E676" strokeWidth="2" />
              <circle cx="850" cy="140" r="22" fill="#00E5FF" fillOpacity="0.3" stroke="#00E5FF" strokeWidth="2" />
            </svg>

            {/* CIVIS Details (Top Left) */}
            <div className="relative z-10 max-w-xs">
              <div className="p-4 rounded-xl bg-[#0B1528]/90 border border-[#00E5FF]/40 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#00E5FF] font-mono text-xs font-bold uppercase mb-1">
                  <Shield className="w-4 h-4 text-[#00E5FF]" />
                  <span>CIVIS AI Smart Constellation</span>
                </div>
                <div className="text-xl font-bold text-white font-display mb-1 flex items-center gap-2">
                  <span>{cityData.civisLux}</span>
                  <Sun className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {cityData.civisSafeguards}
                </p>
                <div className="mt-2 text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{cityData.civisSafetyScore}</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 text-xs font-mono text-[#00E5FF] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#00E676]" />
              <span>Smart Solar Illuminance · Active Foot-Patrol Corridors</span>
            </div>
          </div>
        </div>

        {/* DRAGGABLE DIVIDER LINE */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,229,255,1)] pointer-events-none z-30"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Center Handle Badge */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0B0F19] border-2 border-[#00E5FF] flex items-center justify-center text-white shadow-xl glow-cyan-sm">
            <Sliders className="w-4 h-4 text-[#00E5FF]" />
          </div>
        </div>

        {/* Quick presets bottom overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[11px] text-slate-300 font-mono">
          <span>Drag Slider</span>
          <span className="text-slate-500">|</span>
          <button 
            type="button" 
            onClick={() => setSliderPosition(20)}
            className="hover:text-[#FF3366] cursor-pointer"
          >
            Show Before
          </button>
          <span className="text-slate-500">·</span>
          <button 
            type="button" 
            onClick={() => setSliderPosition(50)}
            className="hover:text-white cursor-pointer font-bold"
          >
            50/50
          </button>
          <span className="text-slate-500">·</span>
          <button 
            type="button" 
            onClick={() => setSliderPosition(80)}
            className="hover:text-[#00E5FF] cursor-pointer"
          >
            Show CIVIS
          </button>
        </div>
      </div>

      {/* Proof Strip Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <div className="p-5 rounded-xl tactical-glass border border-white/10 text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#00E5FF] font-display mb-1">
            +110 Lux
          </div>
          <div className="text-xs font-bold text-white mb-0.5">Average Illumination Boost</div>
          <div className="text-[11px] text-slate-400">Guarantees zero dark alleys on pedestrian paths</div>
        </div>

        <div className="p-5 rounded-xl tactical-glass border border-white/10 text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#00E676] font-display mb-1">
            -42% Risk
          </div>
          <div className="text-xs font-bold text-white mb-0.5">Collision &amp; Harassment Evasion</div>
          <div className="text-[11px] text-slate-400">Verified across Pune, Mumbai, &amp; Bengaluru crash data</div>
        </div>

        <div className="p-5 rounded-xl tactical-glass border border-white/10 text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#FFD700] font-display mb-1">
            100% Detour
          </div>
          <div className="text-xs font-bold text-white mb-0.5">Around Major Indian Chokepoints</div>
          <div className="text-[11px] text-slate-400">Avoids Silk Board, Dadar TT Circle, &amp; Hinjewadi choke nodes</div>
        </div>
      </div>
    </section>
  );
};

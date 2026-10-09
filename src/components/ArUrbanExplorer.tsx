import React, { useState } from 'react';
import { Camera, Sparkles, Shield, Footprints, Landmark, MessageSquare, Compass, Eye, CheckCircle2 } from 'lucide-react';

interface ScenePerspective {
  id: string;
  name: string;
  buildingName: string;
  historyText: string;
  safetyScore: number;
  sentimentText: string;
  lumenCount: number;
}

const PERSPECTIVES: ScenePerspective[] = [
  {
    id: 'scene-1',
    name: 'Shaniwar Wada Heritage Gateway, Pune',
    buildingName: 'Dilli Darwaza & Peshwa Fortress (Est. 1732)',
    historyText: 'Iconic seat of the Maratha Empire; heavy teakwood bastions with brass spikes survived artillery fire. Today illuminated with heritage smart lanterns.',
    safetyScore: 97,
    sentimentText: 'Chill & Welcoming (95%) · "Great evening stroll, historical light-and-sound fountain nearby"',
    lumenCount: 120
  },
  {
    id: 'scene-2',
    name: 'Marine Drive & Art Deco Arcade, Mumbai',
    buildingName: 'Sona Mahal & Queen’s Promenade (Est. 1935)',
    historyText: 'UNESCO World Heritage Art Deco ensemble along Arabian Sea coastline; wide stone promenades with 24/7 continuous Mumbai Police surveillance.',
    safetyScore: 98,
    sentimentText: 'Electric Breeze (97%) · "Safe late night walks, families enjoying ice cream and sea wind"',
    lumenCount: 130
  }
];

export const ArUrbanExplorer: React.FC = () => {
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [showFootprints, setShowFootprints] = useState(true);
  const [showHistoryCard, setShowHistoryCard] = useState(true);
  const [showSentimentBadge, setShowSentimentBadge] = useState(true);

  const scene = PERSPECTIVES[activeSceneIdx];

  return (
    <section id="ar-explorer" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Narrative Copy */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs tracking-wider text-slate-400 uppercase font-mono">
            <span className="text-[#00E5FF]">Spatial AR HUD</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Computer Vision Overlay</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display leading-tight">
            See the Unseen: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-white to-[#FFD700]">
              AR Urban Explorer
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Raise your smartphone camera to transform ordinary city streets into an augmented canvas of verified safety metrics, forgotten history, and real-time social vibe intelligence.
          </p>

          <p className="text-slate-400 text-sm leading-relaxed">
            Holographic pathfinding footprints guide you securely around dark alleys, while floating frosted-glass cards reveal the safety index and centuries-old lore of the architecture around you.
          </p>

          {/* Perspective Switcher */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono text-slate-400 uppercase">Interactive AR Viewports</div>
            <div className="flex gap-2">
              {PERSPECTIVES.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveSceneIdx(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    activeSceneIdx === idx
                      ? 'bg-[#00E5FF] text-[#0B0F19] font-bold glow-cyan-sm'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Layers */}
          <div className="flex flex-wrap gap-2 text-xs font-mono pt-1">
            <button
              onClick={() => setShowFootprints(!showFootprints)}
              className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
                showFootprints ? 'border-[#00E5FF]/60 bg-[#00E5FF]/10 text-[#00E5FF]' : 'border-white/10 text-slate-400'
              }`}
            >
              <Footprints className="w-3.5 h-3.5" />
              <span>Holographic Path</span>
            </button>
            <button
              onClick={() => setShowHistoryCard(!showHistoryCard)}
              className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
                showHistoryCard ? 'border-[#FFD700]/60 bg-[#FFD700]/10 text-[#FFD700]' : 'border-white/10 text-slate-400'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Architectural Lore</span>
            </button>
            <button
              onClick={() => setShowSentimentBadge(!showSentimentBadge)}
              className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
                showSentimentBadge ? 'border-white/40 bg-white/10 text-white' : 'border-white/10 text-slate-400'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Sentiment Vibe</span>
            </button>
          </div>

        </div>

        {/* Right Column: Smartphone Mockup Frame */}
        <div className="lg:col-span-7 flex justify-center">
          
          {/* Smartphone Frame Outer Bezel */}
          <div className="w-[340px] sm:w-[380px] h-[660px] rounded-[48px] p-3.5 bg-gradient-to-b from-slate-700 via-slate-900 to-black border-4 border-slate-700/60 shadow-[0_25px_60px_-15px_rgba(0,229,255,0.25)] relative overflow-hidden">
            
            {/* Screen Inner Display */}
            <div className="w-full h-full rounded-[38px] bg-[#0A0F1D] overflow-hidden relative flex flex-col justify-between p-5 border border-white/10">
              
              {/* Camera Street Scene Vector Backdrop */}
              <div className="absolute inset-0 pointer-events-none">
                
                {/* Simulated Street Sky & Brick Building */}
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0B132B" />
                      <stop offset="60%" stopColor="#1C2541" />
                      <stop offset="100%" stopColor="#0B0F19" />
                    </linearGradient>
                    <pattern id="brickPattern" width="24" height="12" patternUnits="userSpaceOnUse">
                      <rect width="24" height="12" fill="#2A1B28" />
                      <rect x="0" y="0" width="22" height="5" fill="#3D2635" />
                      <rect x="12" y="6" width="22" height="5" fill="#4A2F40" />
                    </pattern>
                  </defs>

                  {/* Sky background */}
                  <rect width="100%" height="100%" fill="url(#skyGrad)" />

                  {/* Historic Brick Building Facade on Left */}
                  <rect x="0" y="80" width="180" height="420" fill="url(#brickPattern)" opacity="0.85" />
                  
                  {/* Arched Classical Windows */}
                  <path d="M 25 150 Q 55 120 85 150 L 85 220 L 25 220 Z" fill="#FFD700" opacity="0.25" stroke="#FFD700" strokeWidth="1" />
                  <path d="M 105 150 Q 135 120 165 150 L 165 220 L 105 220 Z" fill="#00E5FF" opacity="0.25" stroke="#00E5FF" strokeWidth="1" />
                  <path d="M 25 260 Q 55 230 85 260 L 85 330 L 25 330 Z" fill="#FFD700" opacity="0.2" />
                  <path d="M 105 260 Q 135 230 165 260 L 165 330 L 105 330 Z" fill="#FFD700" opacity="0.2" />

                  {/* Cobblestone Pavement / Sidewalk Perspective */}
                  <polygon points="0,480 340,480 340,660 0,660" fill="#111827" />
                  <line x1="0" y1="480" x2="340" y2="480" stroke="#334155" strokeWidth="2" />
                  
                  {/* Perspective road lines */}
                  <line x1="160" y1="480" x2="80" y2="660" stroke="#1E293B" strokeWidth="2" />
                  <line x1="220" y1="480" x2="280" y2="660" stroke="#1E293B" strokeWidth="2" />
                </svg>

                {/* Tactical Camera HUD Crosshairs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/20 rounded-full flex items-center justify-center pointer-events-none">
                  <div className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full" />
                </div>

              </div>

              {/* Holographic Glowing Footprints on Sidewalk */}
              {showFootprints && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-56 pointer-events-none flex flex-col items-center justify-end gap-5">
                  <div className="w-6 h-10 rounded-full border-2 border-[#00E5FF] bg-[#00E5FF]/20 glow-cyan-sm animate-pulse rotate-6 ml-6" />
                  <div className="w-7 h-11 rounded-full border-2 border-[#00E5FF] bg-[#00E5FF]/25 glow-cyan-sm -rotate-6 mr-6" />
                  <div className="w-8 h-12 rounded-full border-2 border-[#00E5FF] bg-[#00E5FF]/30 glow-cyan rotate-6 ml-8" />
                  <div className="text-[10px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-2.5 py-0.5 rounded-full border border-[#00E5FF]/30">
                    Safe Path · 112 Lux Illuminated
                  </div>
                </div>
              )}

              {/* Floating Augmented Glass Inspection Card Anchored to Building */}
              {showHistoryCard && (
                <div className="relative z-20 tactical-glass-elevated p-4 rounded-2xl border border-white/20 shadow-2xl mt-12 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-mono">
                    <span className="text-[#00E5FF] flex items-center gap-1 font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      AR Landmark
                    </span>
                    <span className="text-white font-bold">{scene.safetyScore}/100 Safety</span>
                  </div>

                  <h4 className="text-sm font-bold text-white font-display mt-2">
                    {scene.buildingName}
                  </h4>

                  <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                    {scene.historyText}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10 text-[10px] font-mono text-slate-400">
                    <span>Illumination: {scene.lumenCount} Lux</span>
                    <span className="text-[#00E5FF]">CCTV Active</span>
                  </div>
                </div>
              )}

              {/* Floating Social Sentiment Vibe Badge */}
              {showSentimentBadge && (
                <div className="relative z-20 tactical-glass p-3 rounded-xl border border-[#FFD700]/30 shadow-xl self-end max-w-[240px] animate-in fade-in duration-300">
                  <div className="text-[10px] font-mono text-[#FFD700] uppercase mb-0.5 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    <span>Real-Time Vibe NLP</span>
                  </div>
                  <div className="text-[11px] text-white font-medium leading-tight">
                    {scene.sentimentText}
                  </div>
                </div>
              )}

              {/* Camera Viewfinder Bottom Controls & Sensor Readings */}
              <div className="relative z-20 flex items-center justify-between pt-3 border-t border-white/10 text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>37.7891° N, 122.4014° W</span>
                </div>
                <div className="text-white font-bold">FOV: 68° · 60 FPS</div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

import React, { useState } from 'react';
import { Route, AlertTriangle, ShieldCheck, ArrowRight, Zap, RefreshCw, CheckCircle2, ChevronRight, Gauge } from 'lucide-react';

export const PredictiveRouting: React.FC = () => {
  const [incidentActive, setIncidentActive] = useState(true);
  const [routingAlgorithm, setRoutingAlgorithm] = useState<'civis_safe' | 'standard_dijkstra'>('civis_safe');

  return (
    <section id="predictive-routing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Core Value Narrative */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs tracking-wider text-slate-400 uppercase font-mono">
            <span className="text-[#FF3366]">Accident Prevention</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Multi-Variable Routing</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display leading-tight">
            The Constellation <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-white">
              Safe-Routing Engine
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Standard navigation apps blindly shave 40 seconds by pushing pedestrians and drivers through dangerous, accident-prone intersections. CIVIS AI prioritizes human well-being.
          </p>

          <p className="text-slate-400 text-sm leading-relaxed">
            By overlaying municipal accident registries and real-time CCTV computer vision feeds, we classify active <strong className="text-white">Caution Corridors</strong>. When a choke point develops, CIVIS dynamically calculates a constellation detour across high-lumen, patrolled streets before you ever arrive.
          </p>

          {/* Interactive Simulation Controls */}
          <div className="pt-2 space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase">Interactive Simulation Controls</div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIncidentActive(!incidentActive)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  incidentActive
                    ? 'bg-[#FF3366]/20 border border-[#FF3366] text-[#FF3366] glow-red'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                <span>{incidentActive ? 'Incident Triggered on 8th St' : 'Simulate Choke Spike'}</span>
              </button>

              <button
                onClick={() => setRoutingAlgorithm(routingAlgorithm === 'civis_safe' ? 'standard_dijkstra' : 'civis_safe')}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Switch to {routingAlgorithm === 'civis_safe' ? 'Dijkstra Mode' : 'CIVIS Safe Mode'}</span>
              </button>
            </div>
          </div>

          {/* Comparison Card */}
          <div className="tactical-glass p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase flex items-center justify-between">
              <span>Routing Architecture Audit</span>
              <span className="text-[#00E5FF]">Live Telemetry</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className={`p-3 rounded-xl border ${
                routingAlgorithm === 'standard_dijkstra' 
                  ? 'bg-red-950/20 border-[#FF3366]/40 text-red-200' 
                  : 'bg-white/5 border-white/5 text-slate-400'
              }`}>
                <div className="font-bold text-slate-300 mb-1">Standard Dijkstra</div>
                <div>ETA: <strong>11 min</strong></div>
                <div className="text-[#FF3366] mt-1 font-bold">3 High-Crash Chokes</div>
                <div>Illumination: 42 Lux</div>
              </div>

              <div className={`p-3 rounded-xl border ${
                routingAlgorithm === 'civis_safe' 
                  ? 'bg-cyan-950/20 border-[#00E5FF]/40 text-cyan-200' 
                  : 'bg-white/5 border-white/5 text-slate-400'
              }`}>
                <div className="font-bold text-white mb-1 flex items-center gap-1">
                  <span>CIVIS Co-Pilot</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
                </div>
                <div>ETA: <strong>11.7 min (+42s)</strong></div>
                <div className="text-[#00E5FF] mt-1 font-bold">0 Caution Corridors</div>
                <div>Illumination: 118 Lux</div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Visual Constellation Node Graph Canvas */}
        <div className="lg:col-span-7">
          <div className="tactical-glass-elevated rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            
            {/* Header Telemetry bar */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
                <span className="text-white font-bold">Constellation Visualizer</span>
              </div>
              <span className="text-slate-400">Target: Heritage Museum & Night Market</span>
            </div>

            {/* Visual Node Graph Stage */}
            <div className="relative h-[380px] sm:h-[420px] w-full flex items-center justify-center my-4">
              
              {/* SVG Vector Connections */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="redGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Background Grid Roads */}
                <path d="M 60 210 L 580 210" stroke="#1E293B" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 60 210 Q 320 80 580 210" stroke="#1E293B" strokeWidth="2" strokeDasharray="4 4" />
                
                {/* Hazardous Direct Path (Red or Dim) */}
                <path 
                  d="M 80 210 L 320 210 L 540 210" 
                  stroke={incidentActive && routingAlgorithm === 'standard_dijkstra' ? '#FF3366' : '#334155'} 
                  strokeWidth={routingAlgorithm === 'standard_dijkstra' ? '4' : '2'}
                  filter={incidentActive && routingAlgorithm === 'standard_dijkstra' ? 'url(#redGlow)' : undefined}
                  strokeDasharray={incidentActive && routingAlgorithm === 'civis_safe' ? '4 4' : undefined}
                />

                {/* CIVIS Safe Constellation Arch (Cyan Vector) */}
                <path 
                  d="M 80 210 C 180 90, 420 90, 540 210" 
                  stroke={routingAlgorithm === 'civis_safe' ? '#00E5FF' : '#475569'} 
                  strokeWidth={routingAlgorithm === 'civis_safe' ? '4' : '2'}
                  fill="transparent"
                  filter={routingAlgorithm === 'civis_safe' ? 'url(#cyanGlow)' : undefined}
                  className="transition-all duration-500"
                />

                {/* Detour Guidance Arrows */}
                {routingAlgorithm === 'civis_safe' && incidentActive && (
                  <circle cx="310" cy="118" r="4" fill="#00E5FF" className="animate-ping" />
                )}
              </svg>

              {/* Node 1: User Location */}
              <div className="absolute left-[8%] top-[50%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#00E5FF]/20 border-2 border-[#00E5FF] flex items-center justify-center glow-cyan">
                  <div className="w-4 h-4 rounded-full bg-white shadow" />
                </div>
                <div className="mt-3 text-xs font-bold text-white font-mono whitespace-nowrap">
                  User Origin
                </div>
                <div className="text-[10px] text-slate-400 font-mono">FC Road, Pune</div>
              </div>

              {/* Hazard Choke Point Center (Silk Board / Dadar / Hinjewadi) */}
              <div className="absolute left-[50%] top-[50%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  incidentActive 
                    ? 'bg-[#FF3366]/20 border-2 border-[#FF3366] glow-red animate-pulse' 
                    : 'bg-white/10 border border-white/20'
                }`}>
                  <AlertTriangle className={`w-7 h-7 ${incidentActive ? 'text-[#FF3366]' : 'text-slate-400'}`} />
                </div>
                <div className={`mt-3 text-xs font-bold font-mono whitespace-nowrap ${
                  incidentActive ? 'text-[#FF3366]' : 'text-slate-400'
                }`}>
                  {incidentActive ? 'Caution Corridor Active' : 'Choke Point Cleared'}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {incidentActive ? 'Silk Board / Hinjewadi Choke' : 'Nominal Flow'}
                </div>
              </div>

              {/* Top Node: Safe Heritage Waypoint (The CIVIS Arc) */}
              <div className="absolute left-[50%] top-[24%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-11 h-11 rounded-full bg-[#00E5FF]/20 border-2 border-[#00E5FF] flex items-center justify-center glow-cyan-sm">
                  <ShieldCheck className="w-6 h-6 text-[#00E5FF]" />
                </div>
                <div className="mt-2 text-xs font-bold text-white font-mono whitespace-nowrap">
                  Senapati Bapat Marg
                </div>
                <div className="text-[10px] text-[#00E5FF] font-mono">122 Lux · 100% Smart Patrol</div>
              </div>

              {/* Node 3: Target Destination (Street Food & Heritage) */}
              <div className="absolute right-[8%] top-[50%] -translate-y-1/2 translate-x-1/2 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#FFD700]/20 border-2 border-[#FFD700] flex items-center justify-center glow-gold">
                  <div className="w-4 h-4 rounded-full bg-[#FFD700] shadow" />
                </div>
                <div className="mt-3 text-xs font-bold text-white font-mono whitespace-nowrap">
                  Destination
                </div>
                <div className="text-[10px] text-[#FFD700] font-mono">Koregaon Park & Food Strip</div>
              </div>

            </div>

            {/* Bottom Status Ticker */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#00E5FF]" />
                <span>Active Safety Algorithm: <strong>{routingAlgorithm === 'civis_safe' ? 'Constellation Multi-Variable Dynamic Avoidance' : 'Standard Dijkstra Shortest-Path'}</strong></span>
              </div>
              <div className="text-[#00E5FF]">
                {routingAlgorithm === 'civis_safe' ? 'Dynamic detour active (-89% hazard risk)' : 'Warning: High hazard exposure'}
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};

import React, { useState } from 'react';
import { Zap, Sun, BatteryCharging, Footprints, Shield, Activity, RefreshCw, Sparkles, CheckCircle2, Sliders } from 'lucide-react';
import { URBAN_ENERGY_PROCESSORS } from '../data/urbanData.ts';
import { EnergyProcessor } from '../types/index.ts';

export const EnergyProcessorsGrid: React.FC = () => {
  const [processors, setProcessors] = useState<EnergyProcessor[]>(URBAN_ENERGY_PROCESSORS);
  const [gridMode, setGridMode] = useState<'balanced' | 'illumination' | 'eco'>('balanced');
  const [selectedProcessor, setSelectedProcessor] = useState<EnergyProcessor>(URBAN_ENERGY_PROCESSORS[0]);

  const handleModeChange = (mode: 'balanced' | 'illumination' | 'eco') => {
    setGridMode(mode);
    setProcessors(prev => prev.map(p => {
      let multiplier = 1;
      if (mode === 'illumination') multiplier = 1.25;
      if (mode === 'eco') multiplier = 0.82;
      return {
        ...p,
        currentOutputKw: Math.min(p.capacityKw, Math.round(p.currentOutputKw * multiplier * 10) / 10),
        status: mode === 'illumination' ? 'peak_load' : mode === 'eco' ? 'optimal' : 'generating'
      };
    }));
  };

  const totalOutput = processors.reduce((acc, p) => acc + p.currentOutputKw, 0);
  const totalLitBlocks = processors.reduce((acc, p) => acc + p.litCorridorsCount, 0);
  const totalCo2Offset = processors.reduce((acc, p) => acc + p.co2OffsetKg, 0);

  return (
    <section id="energy-processors" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs tracking-wider text-[#00E676] uppercase font-mono mb-3">
          <Zap className="w-4 h-4 text-[#00E676]" />
          <span>Micro-Grid Infrastructure</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Zero-Carbon Safe Streets</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
          Urban Energy Processors
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Safe streets require relentless illumination. CIVIS monitors and coordinates municipal micro-grid energy processors—channeling solar rooftops and kinetic footfall harvesters into 24/7 high-lumen corridors.
        </p>
      </div>

      {/* Grid Vitality Overview Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        
        <div className="tactical-glass p-6 rounded-3xl border border-[#00E676]/30 glow-emerald-sm">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Total Real-Time Output</span>
            <Activity className="w-4 h-4 text-[#00E676] animate-pulse" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#00E676] font-mono tabular-nums">
            {totalOutput.toFixed(1)} kW
          </div>
          <div className="text-xs text-slate-300 mt-2">
            Clean renewable power routing across metro nodes
          </div>
        </div>

        <div className="tactical-glass p-6 rounded-3xl border border-[#00E5FF]/30 glow-cyan-sm">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Self-Powered Street Corridors</span>
            <Sun className="w-4 h-4 text-[#00E5FF]" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#00E5FF] font-mono tabular-nums">
            {totalLitBlocks} Blocks
          </div>
          <div className="text-xs text-slate-300 mt-2">
            100% Autonomous off-grid LED streetlights (&gt;110 Lux)
          </div>
        </div>

        <div className="tactical-glass p-6 rounded-3xl border border-[#FFD700]/30 glow-gold">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Daily Carbon Offset</span>
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#FFD700] font-mono tabular-nums">
            {totalCo2Offset} kg/day
          </div>
          <div className="text-xs text-slate-300 mt-2">
            Equivalent to 1,240 urban commuter car miles saved
          </div>
        </div>

      </div>

      {/* Grid Operating Mode Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl tactical-glass-elevated mb-10 border border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <Sliders className="w-4 h-4 text-[#00E676]" />
          <span>Micro-Grid Routing Strategy:</span>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <button
            onClick={() => handleModeChange('illumination')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
              gridMode === 'illumination'
                ? 'bg-[#00E5FF] text-[#0B0F19] glow-cyan-sm shadow'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            Max Illumination Priority (&gt;125 Lux)
          </button>

          <button
            onClick={() => handleModeChange('balanced')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
              gridMode === 'balanced'
                ? 'bg-[#00E676] text-[#0B0F19] shadow'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            Balanced Dynamic Distribution
          </button>

          <button
            onClick={() => handleModeChange('eco')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
              gridMode === 'eco'
                ? 'bg-[#FFD700] text-[#0B0F19] glow-gold shadow'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            Eco-Conservation & Storage
          </button>
        </div>
      </div>

      {/* Processors List & Interactive Visualizer Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 4 Processor Cards */}
        <div className="lg:col-span-7 space-y-4">
          {processors.map((proc) => {
            const isSelected = selectedProcessor.id === proc.id;
            const isSolar = proc.type === 'solar_streetlight';
            const isKinetic = proc.type === 'kinetic_pavement';
            const isSubstation = proc.type === 'grid_substation';

            return (
              <div
                key={proc.id}
                onClick={() => setSelectedProcessor(proc)}
                className={`p-6 rounded-3xl tactical-glass border transition-all cursor-pointer hover:border-white/30 ${
                  isSelected
                    ? 'border-[#00E676] bg-[#00E676]/5 shadow-xl ring-1 ring-[#00E676]'
                    : 'border-white/10'
                }`}
              >
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${
                      isSolar ? 'bg-[#FFD700]/20 text-[#FFD700]' : isKinetic ? 'bg-[#00E5FF]/20 text-[#00E5FF]' : 'bg-[#00E676]/20 text-[#00E676]'
                    }`}>
                      {isSolar ? <Sun className="w-5 h-5" /> : isKinetic ? <Footprints className="w-5 h-5" /> : <BatteryCharging className="w-5 h-5" />}
                    </div>

                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white font-display">
                        {proc.name}
                      </h4>
                      <div className="text-xs text-slate-400 font-mono">
                        {proc.district}
                      </div>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    proc.status === 'optimal'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : proc.status === 'generating'
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}>
                    {proc.status.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 my-3 leading-relaxed">
                  {proc.description}
                </p>

                {/* Progress bar of current output */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>Power Flow Output</span>
                    <span className="text-white font-bold">{proc.currentOutputKw} kW / {proc.capacityKw} kW</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00E676] to-[#00E5FF] rounded-full transition-all duration-500"
                      style={{ width: `${(proc.currentOutputKw / proc.capacityKw) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-center font-mono text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Battery Reserve</span>
                    <strong className="text-[#00E676] text-sm tabular-nums">{proc.batteryReservePct}%</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Lit Corridors</span>
                    <strong className="text-[#00E5FF] text-sm tabular-nums">{proc.litCorridorsCount} Blocks</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">CO₂ Avoided</span>
                    <strong className="text-[#FFD700] text-sm tabular-nums">{proc.co2OffsetKg} kg</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Energy Processor Live Flow Stage */}
        <div className="lg:col-span-5">
          <div className="tactical-glass-elevated rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl relative overflow-hidden space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
              <span className="text-[#00E676] flex items-center gap-1 font-bold">
                <Activity className="w-4 h-4 text-[#00E676]" />
                Live Processor Telemetry
              </span>
              <span className="text-white font-bold">{selectedProcessor.district}</span>
            </div>

            {/* Simulated Energy Flow Diagram */}
            <div className="relative h-64 rounded-2xl bg-[#070D18] border border-white/10 p-4 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 tactical-grid opacity-50 pointer-events-none" />

              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="20%" y1="30%" x2="80%" y2="30%" stroke="#00E676" strokeWidth="2" strokeDasharray="4 2" />
                <line x1="20%" y1="30%" x2="50%" y2="75%" stroke="#00E5FF" strokeWidth="2" strokeDasharray="4 2" />
                <line x1="80%" y1="30%" x2="50%" y2="75%" stroke="#FFD700" strokeWidth="2" strokeDasharray="4 2" />
              </svg>

              <div className="flex justify-between relative z-10">
                <div className="p-3 rounded-2xl bg-[#00E676]/20 border border-[#00E676]/40 text-[#00E676] flex items-center gap-2 text-xs font-mono">
                  <Sun className="w-4 h-4" />
                  <span>Harvesting</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#00E5FF]/20 border border-[#00E5FF]/40 text-[#00E5FF] flex items-center gap-2 text-xs font-mono">
                  <BatteryCharging className="w-4 h-4" />
                  <span>Storage Node</span>
                </div>
              </div>

              <div className="relative z-10 self-center">
                <div className="px-4 py-2.5 rounded-2xl bg-[#FFD700]/20 border border-[#FFD700]/40 text-[#FFD700] text-xs font-mono flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>115 Lux Streetlights Active</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <h4 className="font-bold text-white text-sm font-display">
                {selectedProcessor.name}
              </h4>
              <p className="leading-relaxed">
                By integrating smart renewable energy storage directly with urban safety routing, CIVIS guarantees that our suggested corridors are guaranteed to remain fully illuminated even during citywide brownouts or severe weather spikes.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Grid Frequency: 60.02 Hz</span>
              <span className="text-[#00E676]">99.98% Reliability SLA</span>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};

import React, { useState } from 'react';
import { Clock, Sun, Moon, AlertTriangle, ShieldCheck, Flame, Compass, ChevronRight } from 'lucide-react';
import { TIME_SLICES } from '../data/urbanData.ts';

export const TemporalSlider: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(3); // Default 11:00 PM as in spec
  const currentSlice = TIME_SLICES[selectedIdx];

  const isNight = selectedIdx >= 3;
  const isDusk = selectedIdx === 2;

  return (
    <section id="temporal-slider" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Interactive City Viewport */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="tactical-glass-elevated rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden transition-all duration-700">
            
            {/* Top Bar with Time & Lighting status */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2">
                {isNight ? (
                  <Moon className="w-4 h-4 text-[#00E5FF]" />
                ) : (
                  <Sun className="w-4 h-4 text-[#FFD700]" />
                )}
                <span className="text-white font-bold">{currentSlice.timeLabel}</span>
              </div>
              <span className="text-slate-300">
                Ambient Lux: <strong>{Math.round(currentSlice.ambientLight * 120)} Lux</strong>
              </span>
            </div>

            {/* Simulated Isometric City Map */}
            <div className="relative h-[340px] sm:h-[380px] w-full my-6 rounded-2xl overflow-hidden border border-white/10 bg-[#080D1A] flex items-center justify-center">
              
              {/* Dynamic Lighting Backdrop */}
              <div 
                className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: isNight 
                    ? 'radial-gradient(circle at 50% 50%, rgba(11,15,25,0.4) 0%, rgba(5,8,15,0.95) 100%)'
                    : isDusk
                    ? 'radial-gradient(circle at 50% 50%, rgba(255,107,0,0.15) 0%, rgba(11,15,25,0.85) 100%)'
                    : 'radial-gradient(circle at 50% 50%, rgba(0,229,255,0.1) 0%, rgba(11,15,25,0.7) 100%)'
                }}
              />

              {/* Grid Roads */}
              <div className="absolute inset-0 tactical-grid opacity-60 pointer-events-none" />

              {/* Isometric Road Visuals */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Main Boulevard (Market / Grand Avenue) */}
                <line 
                  x1="15%" y1="75%" x2="85%" y2="25%" 
                  stroke={isNight ? '#FFD700' : '#38BDF8'} 
                  strokeWidth="8" 
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />

                {/* Secondary Cross Street */}
                <line 
                  x1="25%" y1="20%" x2="75%" y2="80%" 
                  stroke="#334155" 
                  strokeWidth="6" 
                  strokeLinecap="round"
                />

                {/* Narrow Alleyway A (The Temporal Hazard Alley) */}
                <line 
                  x1="35%" y1="58%" x2="65%" y2="68%" 
                  stroke={isNight ? '#FF3366' : '#64748B'} 
                  strokeWidth="4" 
                  strokeDasharray={isNight ? '6 4' : undefined}
                  className="transition-all duration-700"
                />

                {/* Narrow Alleyway B */}
                <line 
                  x1="60%" y1="35%" x2="78%" y2="45%" 
                  stroke={isNight ? '#FF3366' : '#64748B'} 
                  strokeWidth="4" 
                  strokeDasharray={isNight ? '6 4' : undefined}
                  className="transition-all duration-700"
                />
              </svg>

              {/* Dynamic Callout: Main Boulevard */}
              <div className="absolute left-[38%] top-[42%] tactical-glass-elevated px-3 py-1.5 rounded-lg border border-[#FFD700]/40 text-xs font-mono shadow-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
                <div>
                  <div className="font-bold text-white">Grand Boulevard</div>
                  <div className="text-[10px] text-[#FFD700]">
                    {isNight ? 'Bustling & Active (Safe Corridor)' : 'Normal Flow'}
                  </div>
                </div>
              </div>

              {/* Dynamic Callout: Hazard Alleyway */}
              <div className="absolute left-[54%] top-[68%] tactical-glass-elevated px-3 py-1.5 rounded-lg border border-[#FF3366]/40 text-xs font-mono shadow-xl flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isNight ? 'bg-[#FF3366] animate-ping' : 'bg-slate-400'}`} />
                <div>
                  <div className="font-bold text-white">Hinjewadi Service Road Alley</div>
                  <div className={`text-[10px] ${isNight ? 'text-[#FF3366] font-bold' : 'text-slate-400'}`}>
                    {isNight ? 'Predictive Hazard: Low Lumens & Choke' : 'Standard Daytime Access'}
                  </div>
                </div>
              </div>

              {/* User Position Beacon */}
              <div className="absolute left-[20%] top-[70%]">
                <div className="w-5 h-5 rounded-full bg-[#00E5FF] glow-cyan flex items-center justify-center animate-bounce">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              </div>

            </div>

            {/* Interactive Timeline Scrubber Control */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>08:00 AM</span>
                <span>02:00 PM</span>
                <span>07:00 PM</span>
                <span className="text-[#00E5FF] font-bold">11:00 PM</span>
                <span>03:00 AM</span>
              </div>

              {/* Slider Track */}
              <input
                type="range"
                min="0"
                max={TIME_SLICES.length - 1}
                step="1"
                value={selectedIdx}
                onChange={(e) => setSelectedIdx(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00E5FF]"
                aria-label="Time of Day Slider"
              />

              {/* Quick Time Preset Buttons */}
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                {TIME_SLICES.map((slice, i) => (
                  <button
                    key={slice.hour}
                    onClick={() => setSelectedIdx(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      selectedIdx === i
                        ? 'bg-[#00E5FF] text-[#0B0F19] font-bold glow-cyan-sm'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    {slice.hour}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Narrative & Temporal Analytics */}
        <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
          
          <div className="inline-flex items-center gap-2 text-xs tracking-wider text-slate-400 uppercase font-mono">
            <span className="text-[#00E5FF]">4D Predictive Analytics</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Chronological Intelligence</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display leading-tight">
            Time-Travel <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-white to-[#FFD700]">
              Your City Route
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            A route that is idyllic at 2:00 PM can turn into an unlit, high-stress blind spot at 11:00 PM. CIVIS models municipal safety across the fourth dimension: time.
          </p>

          <p className="text-slate-400 text-sm leading-relaxed">
            Slide the temporal timeline to see how neighborhood safety, illumination, and crowd density shift in real time. We warn you before shadows become hazardous, steering you to safe, active corridors.
          </p>

          {/* Temporal Predictive Card */}
          <div className="tactical-glass p-5 rounded-2xl border border-white/10 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono text-slate-400 uppercase">Active Time Horizon</span>
              <span className="text-xs font-mono text-[#00E5FF] font-bold">{currentSlice.timeLabel}</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2.5 text-slate-300">
                <Clock className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Recommended Departure</div>
                  <div className="text-xs text-slate-400">{currentSlice.recommendedDeparture}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                {isNight ? (
                  <AlertTriangle className="w-4 h-4 text-[#FF3366] shrink-0 mt-0.5" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold text-white">Zone Risk Classification</div>
                  <div className="text-xs text-slate-400">{currentSlice.hazardStatus}</div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-center font-mono">
              <div className="bg-white/5 p-2 rounded-xl">
                <div className="text-[11px] text-slate-400">Temporal Safety Index</div>
                <div className="text-base font-bold text-[#00E5FF] tabular-nums">{currentSlice.safetyIndex}/100</div>
              </div>
              <div className="bg-white/5 p-2 rounded-xl">
                <div className="text-[11px] text-slate-400">Crowd Atmosphere</div>
                <div className="text-base font-bold text-[#FFD700] tabular-nums">{currentSlice.crowdStatus.split(' ')[0]}</div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

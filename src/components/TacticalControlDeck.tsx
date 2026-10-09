import React, { useState } from 'react';
import { Sliders, Sun, ShieldAlert, Sparkles, Zap, Palette, Bell, Locate, Check, RotateCcw } from 'lucide-react';
import { CityControlSettings } from '../types/index.ts';

interface TacticalControlDeckProps {
  settings: CityControlSettings;
  onUpdateSettings: (newSettings: CityControlSettings) => void;
}

export const TacticalControlDeck: React.FC<TacticalControlDeckProps> = ({
  settings,
  onUpdateSettings
}) => {
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleSliderChange = (key: keyof CityControlSettings, value: any) => {
    onUpdateSettings({
      ...settings,
      [key]: value
    });
  };

  const handleResetDefaults = () => {
    onUpdateSettings({
      luxThreshold: 85,
      hazardRadiusMeters: 250,
      vibePreference: 'balanced',
      energyMode: 'balanced',
      themePalette: 'tactical_neon',
      enableLiveTracking: true,
      audioVoiceAlerts: false
    });
  };

  return (
    <section id="control-changes" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs tracking-wider text-[#00E5FF] uppercase font-mono mb-3">
          <Sliders className="w-4 h-4 text-[#00E5FF]" />
          <span>Interactive City OS</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Tactical Control Deck</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
          Control Center & Sensor Profiles
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Fine-tune the heuristics driving CIVIS AI. Customize minimum street lumen thresholds, hazard exclusion radii, energy distribution priorities, and visual aesthetic filters in real time.
        </p>
      </div>

      {/* Main Control Panel Surface */}
      <div className="tactical-glass-elevated rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl space-y-10">
        
        {/* Top Control Bar with Preset & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <h3 className="text-lg font-bold text-white font-display">
              Active Heuristic Profile
            </h3>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              Adjust parameters to alter route computation weights dynamically
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetDefaults}
              className="px-4 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>
          </div>
        </div>

        {/* 2x2 Grid of Tactical Control Sliders & Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Control 1: Street Illumination Sensitivity */}
          <div className="tactical-glass p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sun className="w-5 h-5 text-[#FFD700]" />
                <span className="text-sm font-bold text-white font-display">
                  Minimum Illumination Threshold
                </span>
              </div>
              <span className="text-sm font-mono font-bold text-[#FFD700] tabular-nums">
                {settings.luxThreshold} Lux
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Streets falling below this lumen value will be flagged with yellow or red caution shaders after 7:00 PM.
            </p>

            <input
              type="range"
              min="50"
              max="150"
              step="5"
              value={settings.luxThreshold}
              onChange={(e) => handleSliderChange('luxThreshold', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FFD700]"
              aria-label="Illumination Threshold"
            />

            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>50 Lux (Permissive)</span>
              <span>85 Lux (Standard Safeguard)</span>
              <span>150 Lux (Ultra High-Lumen)</span>
            </div>
          </div>

          {/* Control 2: Hazard Exclusion Buffer Radius */}
          <div className="tactical-glass p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 text-[#FF3366]" />
                <span className="text-sm font-bold text-white font-display">
                  Hazard Caution Exclusion Buffer
                </span>
              </div>
              <span className="text-sm font-mono font-bold text-[#FF3366] tabular-nums">
                {settings.hazardRadiusMeters} meters
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Defines the dynamic detour clearance around historical high-collision intersections and active accident choke points.
            </p>

            <input
              type="range"
              min="50"
              max="500"
              step="25"
              value={settings.hazardRadiusMeters}
              onChange={(e) => handleSliderChange('hazardRadiusMeters', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FF3366]"
              aria-label="Hazard Buffer Radius"
            />

            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>50m (Tight Detour)</span>
              <span>250m (Recommended)</span>
              <span>500m (Wide Safety Corridor)</span>
            </div>
          </div>

          {/* Control 3: Vibe Polarity Preference */}
          <div className="tactical-glass p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#00E5FF]" />
                <span className="text-sm font-bold text-white font-display">
                  NLP Social Vibe Weighting
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#00E5FF] uppercase">
                {settings.vibePreference}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Bias the exploration algorithm towards serene, low-decibel walking streets or electric social corridors.
            </p>

            <div className="grid grid-cols-3 gap-2">
              {(['chill', 'balanced', 'electric'] as const).map((pref) => (
                <button
                  key={pref}
                  onClick={() => handleSliderChange('vibePreference', pref)}
                  className={`py-2 px-3 rounded-xl text-xs font-mono capitalize transition-all cursor-pointer ${
                    settings.vibePreference === pref
                      ? 'bg-[#00E5FF] text-[#0B0F19] font-bold shadow'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>

          {/* Control 4: Visual Aesthetic Theme Palette */}
          <div className="tactical-glass p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Palette className="w-5 h-5 text-[#A855F7]" />
                <span className="text-sm font-bold text-white font-display">
                  Visual Aesthetic Theme Palette
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#A855F7]">
                {settings.themePalette.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Switch the visual aura and accent tones across the application interface.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                onClick={() => handleSliderChange('themePalette', 'tactical_neon')}
                className={`py-2 px-3 rounded-xl transition-all cursor-pointer border ${
                  settings.themePalette === 'tactical_neon'
                    ? 'border-[#00E5FF] bg-[#00E5FF]/20 text-[#00E5FF] font-bold'
                    : 'border-white/10 text-slate-300 hover:text-white bg-white/5'
                }`}
              >
                Tactical Cyber Neon
              </button>

              <button
                onClick={() => handleSliderChange('themePalette', 'ambient_google')}
                className={`py-2 px-3 rounded-xl transition-all cursor-pointer border ${
                  settings.themePalette === 'ambient_google'
                    ? 'border-[#38BDF8] bg-[#38BDF8]/20 text-[#38BDF8] font-bold'
                    : 'border-white/10 text-slate-300 hover:text-white bg-white/5'
                }`}
              >
                Ambient Google Now
              </button>

              <button
                onClick={() => handleSliderChange('themePalette', 'solar_emerald')}
                className={`py-2 px-3 rounded-xl transition-all cursor-pointer border ${
                  settings.themePalette === 'solar_emerald'
                    ? 'border-[#00E676] bg-[#00E676]/20 text-[#00E676] font-bold'
                    : 'border-white/10 text-slate-300 hover:text-white bg-white/5'
                }`}
              >
                Solar Emerald Grid
              </button>

              <button
                onClick={() => handleSliderChange('themePalette', 'cyber_violet')}
                className={`py-2 px-3 rounded-xl transition-all cursor-pointer border ${
                  settings.themePalette === 'cyber_violet'
                    ? 'border-[#C084FC] bg-[#C084FC]/20 text-[#C084FC] font-bold'
                    : 'border-white/10 text-slate-300 hover:text-white bg-white/5'
                }`}
              >
                Neo-Tokyo Violet
              </button>
            </div>
          </div>

        </div>

        {/* System Toggles */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-xs font-mono">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
              <input
                type="checkbox"
                checked={settings.enableLiveTracking}
                onChange={(e) => handleSliderChange('enableLiveTracking', e.target.checked)}
                className="w-4 h-4 rounded accent-[#00E5FF] cursor-pointer"
              />
              <span>Continuous GPS Coordinate Watching</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
              <input
                type="checkbox"
                checked={settings.audioVoiceAlerts}
                onChange={(e) => handleSliderChange('audioVoiceAlerts', e.target.checked)}
                className="w-4 h-4 rounded accent-[#00E5FF] cursor-pointer"
              />
              <span>Tactical Audio Chime for Caution Corridors</span>
            </label>
          </div>

          <div className="text-xs font-mono text-[#00E676] flex items-center gap-1.5">
            <Check className="w-4 h-4" />
            <span>Profile Synced with Local Machine Storage</span>
          </div>
        </div>

      </div>

    </section>
  );
};

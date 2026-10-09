import React from 'react';
import { Smartphone, Download, Shield, Sparkles, ArrowRight } from 'lucide-react';

interface CtaSectionProps {
  onOpenBetaWithPlatform: (platform: 'ios' | 'android') => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenBetaWithPlatform }) => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Frosted Glass CTA Card */}
      <div className="tactical-glass-elevated max-w-5xl mx-auto p-8 sm:p-14 rounded-3xl border border-[#00E5FF]/30 glow-cyan-sm relative overflow-hidden text-center shadow-2xl">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 text-xs tracking-wider text-[#00E5FF] uppercase font-mono">
            <Sparkles className="w-4 h-4" />
            <span>Join the Urban Exploration Movement</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Ready to Hack Your City?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Join the exclusive CIVIS AI beta and experience navigation that genuinely prioritizes your safety, time, and discovery.
          </p>

          {/* The Vision & Pitch Manifesto */}
          <div className="tactical-glass p-6 rounded-2xl border border-white/10 text-left text-xs sm:text-sm text-slate-300 leading-relaxed my-8 space-y-3">
            <p className="font-semibold text-white">
              "City life should be an adventure, but for many, navigating urban chaos feels like survival mode. Unpredictable traffic, sudden crowding, and hidden accident-prone roads turn exploring into a stressful chore. Current navigation apps operate in silos—either pointing to a restaurant or blindly routing you through a dangerous intersection just to save 40 seconds."
            </p>
            <p className="text-slate-400">
              "CIVIS AI is an intelligent co-pilot for urban life. By combining Computer Vision for predictive traffic timing, NLP for real-time social media sentiment on crowd density, and historical data for accident-zone avoidance routing, we evaluate locations not just by static ratings, but by current safety, accessibility, and 'hectic' levels—turning scattered city data into verified, actionable insights that make urban exploration smarter, safer, and infinitely more enjoyable."
            </p>
          </div>

          {/* Download Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenBetaWithPlatform('ios')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm text-[#0B0F19] bg-white hover:bg-slate-200 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg active:scale-95"
            >
              <Smartphone className="w-5 h-5 text-[#0B0F19]" />
              <span>Download iOS Beta (TestFlight)</span>
            </button>

            <button
              onClick={() => onOpenBetaWithPlatform('android')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm text-white bg-transparent border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-95"
            >
              <Download className="w-5 h-5 text-[#00E5FF]" />
              <span>Download Android Beta (Play Store)</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 font-mono pt-4">
            Available for Pune, Mumbai, Delhi, Hyderabad, Bengaluru, and expanding Indian smart city corridors.
          </div>

        </div>

      </div>

    </section>
  );
};

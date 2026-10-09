import React from 'react';
import { Shield, Lock, FileText, Scale, Cookie, AlertOctagon, Zap, Sliders, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenCookieSettings: () => void;
  onTrigger404: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onOpenCookieSettings,
  onTrigger404
}) => {
  return (
    <footer className="border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-300 text-xs sm:text-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        {/* Col 1: Brand Wordmark & Mission */}
        <div className="space-y-3 md:col-span-1">
          <div className="text-xl font-black tracking-tight text-white flex items-center gap-1.5 font-display">
            <span>CIVIS</span>
            <span className="text-[#00E5FF]">.AI</span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 ml-1">
              India v2.4
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Autonomous urban exploration and predictive pedestrian safety engine. Engineered for Indian metropolitan grids with solar-illuminated safe corridors.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
            <Lock className="w-3.5 h-3.5" />
            <span>HTTPS Encrypted · Zero Frontend Secrets</span>
          </div>
        </div>

        {/* Col 2: Navigation & Core Features */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-white uppercase font-mono tracking-wider text-slate-200">
            Navigation Engines
          </div>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <a href="#live-studio" className="hover:text-[#00E5FF] transition-colors">
                AI Map Studio (CARTO + Gemini)
              </a>
            </li>
            <li>
              <a href="#live-location" className="hover:text-[#00E5FF] transition-colors">
                Live Location Hub (Google Now)
              </a>
            </li>
            <li>
              <a href="#image-comparison" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1.5">
                <Sliders className="w-3 h-3 text-[#00E5FF]" />
                <span>Before/After Route Proof</span>
              </a>
            </li>
            <li>
              <a href="#speed-audit" className="hover:text-[#00E676] transition-colors flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-[#00E676]" />
                <span>Page Speed &amp; Web Vitals Check</span>
              </a>
            </li>
            <li>
              <a href="#dual-map" className="hover:text-[#00E5FF] transition-colors">
                Dual Reality Map (Safeguard vs Explore)
              </a>
            </li>
            <li>
              <a href="#predictive-routing" className="hover:text-[#00E5FF] transition-colors">
                Predictive Safe-Routing
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Indian Metropolitan Nodes */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-white uppercase font-mono tracking-wider text-slate-200">
            Active Indian Meshes
          </div>
          <ul className="space-y-2 text-xs text-slate-400 font-mono">
            <li>
              <a href="#live-studio" className="hover:text-white transition-colors">
                📍 Pune (FC Rd, KP, Hinjewadi)
              </a>
            </li>
            <li>
              <a href="#live-studio" className="hover:text-white transition-colors">
                📍 Mumbai (Marine Dr, Bandra, Dadar TT)
              </a>
            </li>
            <li>
              <a href="#live-studio" className="hover:text-white transition-colors">
                📍 Bengaluru (Indiranagar, Silk Board)
              </a>
            </li>
            <li>
              <a href="#live-studio" className="hover:text-white transition-colors">
                📍 Hyderabad (Hitec City, Cyber Towers)
              </a>
            </li>
            <li>
              <a href="#live-studio" className="hover:text-white transition-colors">
                📍 Delhi NCR (Connaught Place, India Gate)
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Legal, Compliance & Verification */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-white uppercase font-mono tracking-wider text-slate-200">
            Trust &amp; Governance
          </div>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="hover:text-[#00E5FF] transition-colors text-left cursor-pointer flex items-center gap-1.5"
              >
                <Shield className="w-3 h-3 text-[#00E5FF]" />
                <span>Privacy Policy (DPDP Act 2023)</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={onOpenTerms}
                className="hover:text-[#FFD700] transition-colors text-left cursor-pointer flex items-center gap-1.5"
              >
                <Scale className="w-3 h-3 text-[#FFD700]" />
                <span>Terms &amp; Conditions</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={onOpenCookieSettings}
                className="hover:text-emerald-400 transition-colors text-left cursor-pointer flex items-center gap-1.5"
              >
                <Cookie className="w-3 h-3 text-emerald-400" />
                <span>Cookie Consent Preferences</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={onTrigger404}
                className="hover:text-rose-400 transition-colors text-left cursor-pointer flex items-center gap-1.5 text-slate-400 hover:underline"
              >
                <AlertOctagon className="w-3 h-3 text-rose-400" />
                <span>Test Custom 404 Node</span>
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar: Copyright & Accessibility */}
      <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
        <div>
          © 2026 CIVIS AI Inc. Built for Indian Smart Metropolises.
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>WCAG AA High Contrast</span>
          <span>·</span>
          <span>OpenStreetMap &amp; CARTO Spatial MCP</span>
          <span>·</span>
          <span className="text-emerald-400 font-semibold">100% Uptime</span>
        </div>
      </div>
    </footer>
  );
};


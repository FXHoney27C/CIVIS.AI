import React from 'react';
import { AlertOctagon, Compass, Home, RefreshCw, Shield, MapPin, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onReturnHome: () => void;
  attemptedPath?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ 
  onReturnHome,
  attemptedPath = '/coordinates-unknown'
}) => {
  return (
    <div 
      className="min-h-screen bg-[#0B0F19] text-slate-100 flex items-center justify-center p-4 sm:p-6 selection:bg-[#00E5FF]/20 selection:text-[#00E5FF]"
      role="main"
      aria-label="404 Page Not Found"
    >
      <div className="max-w-xl w-full tactical-glass-elevated border border-rose-500/30 p-8 sm:p-10 rounded-3xl shadow-2xl bg-[#0B0F19]/95 text-center space-y-6">
        
        {/* Radar Lost Signal Beacon */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-rose-500/20 animate-ping"></div>
          <div className="absolute inset-2 rounded-full border border-rose-500/40"></div>
          <div className="w-16 h-16 rounded-full bg-rose-500/10 border-2 border-rose-500 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-500/20">
            <AlertOctagon className="w-8 h-8 text-rose-400" />
          </div>
        </div>

        {/* 404 Heading & Badges */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            <span>HTTP Status: 404</span>
            <span aria-hidden="true">·</span>
            <span>Geospatial Node Unreachable</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Coordinates Outside Grid
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
            The route or urban coordinate block you navigated to does not exist within the active Indian Metropolitan Mesh (Pune, Mumbai, Bengaluru, Hyderabad, Delhi NCR).
          </p>
        </div>

        {/* Diagnostic Telemetry Box */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-left font-mono text-xs text-slate-300 space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span>Query Path:</span>
            <span className="text-rose-400">{attemptedPath}</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>CARTO Mesh Status:</span>
            <span className="text-emerald-400">Online (ac_7l2l64mp)</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Recovery Recommendation:</span>
            <span className="text-cyan-400">Recalibrate to Primary Indian Urban Hub</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onReturnHome}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#0B0F19] bg-[#00E5FF] hover:bg-white transition-all glow-cyan-sm active:scale-95 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Recalibrate to Home Grid</span>
          </button>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:text-white border border-white/10 hover:border-white/30 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Previous Screen</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-slate-400">
          CIVIS AI Navigation OS · India Smart City Cluster
        </div>
      </div>
    </div>
  );
};

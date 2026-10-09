import React, { useState, useEffect } from 'react';
import { Search, Compass, Shield, Flame, Sparkles, Navigation, ArrowRight, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { PRESET_SEARCH_QUERIES } from '../data/urbanData.ts';

interface HeroProps {
  onSelectWaypointQuery?: (query: string) => void;
  onOpenBeta: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectWaypointQuery, onOpenBeta }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPlaceholderIdx, setCurrentPlaceholderIdx] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    query: string;
    routeType: string;
    safetyScore: number;
    vibeScore: number;
    recommendedTime: string;
    waypoints: string[];
    chokePointAvoided: string;
    illuminationScore: string;
  }>(null);

  // Typewriter effect for placeholder
  useEffect(() => {
    const fullText = PRESET_SEARCH_QUERIES[currentPlaceholderIdx];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedPlaceholder.length < fullText.length) {
        timer = setTimeout(() => {
          setDisplayedPlaceholder(fullText.slice(0, displayedPlaceholder.length + 1));
        }, 55);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2400);
      }
    } else {
      if (displayedPlaceholder.length > 0) {
        timer = setTimeout(() => {
          setDisplayedPlaceholder(fullText.slice(0, displayedPlaceholder.length - 1));
        }, 30);
      } else {
        setIsDeleting(false);
        setCurrentPlaceholderIdx((prev) => (prev + 1) % PRESET_SEARCH_QUERIES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedPlaceholder, isDeleting, currentPlaceholderIdx]);

  const handleRunSearch = (queryToUse?: string) => {
    const query = queryToUse || searchQuery || PRESET_SEARCH_QUERIES[currentPlaceholderIdx];
    setSearchQuery(query);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    if (onSelectWaypointQuery) {
      onSelectWaypointQuery(query);
    }

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        query,
        routeType: query.toLowerCase().includes('coffee') || query.toLowerCase().includes('food') 
          ? 'Curated Culinary & Heritage Corridor' 
          : 'High-Lumen Safeguard Pathway',
        safetyScore: 97,
        vibeScore: 92,
        recommendedTime: 'Depart within 12 minutes (avoids rush-hour choke)',
        waypoints: [
          'FC Road & Goodluck Heritage Hub (Pune)',
          'Marine Drive Promenade (Mumbai)',
          'Koregaon Park Solar Illuminated Strip (Pune)'
        ],
        chokePointAvoided: 'Silk Board / Hinjewadi Bridge Collision Corridor (-91% Risk)',
        illuminationScore: '120 Lux (Autonomous Solar LED Illumination)'
      });
    }, 700);
  };

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
      
      {/* Background Cyber-Tactical Map & Radar Pattern */}
      <div className="absolute inset-0 tactical-grid opacity-60 pointer-events-none" />
      
      {/* Radial Gradient Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[680px] h-[450px] bg-gradient-to-tr from-[#00E5FF]/10 via-[#FFD700]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Editorial Pill-Free Subtitle Kicker */}
        <div className="inline-flex items-center gap-3 text-xs tracking-wider text-slate-400 uppercase font-mono mb-6">
          <span className="text-[#00E5FF]">Real-Time Urban AI</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Computer Vision Telemetry</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Zero-Choke Routing</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 font-display max-w-4xl mx-auto leading-tight">
          Stop Surviving the City.{' '}
          <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-white to-[#FFD700]">
            Start Living It.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          CIVIS AI fuses predictive traffic computer vision, real-time social vibe scoring, and historical safety datasets to turn urban chaos into your ultimate playground.
        </p>

        {/* Dynamic NLP Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-6">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00E5FF]/40 via-[#FFD700]/30 to-[#00E5FF]/40 rounded-2xl blur-md opacity-30 transition duration-500 group-hover:opacity-60" />
          
          <div className="relative tactical-glass-elevated rounded-2xl p-2.5 flex flex-col sm:flex-row items-center gap-2 border border-[#00E5FF]/30 shadow-2xl">
            <div className="flex items-center w-full px-3 gap-3">
              <Search className="w-5 h-5 text-[#00E5FF] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRunSearch();
                }}
                placeholder={displayedPlaceholder || 'Ask CIVIS AI for a safe route or vibe...'}
                className="w-full bg-transparent border-none outline-none text-white text-base sm:text-lg placeholder-slate-400 font-medium py-2"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={() => handleRunSearch()}
                disabled={isAnalyzing}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-[#0B0F19] bg-[#00E5FF] hover:bg-white transition-all glow-cyan-sm flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer disabled:opacity-70"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0B0F19] border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#0B0F19]" />
                    <span>Ask AI</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Curated Prompt Query Buttons (Clean, clickable) */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto mb-12 text-xs">
          <span className="text-slate-400 mr-1 font-mono">Try queries:</span>
          {PRESET_SEARCH_QUERIES.map((query, idx) => (
            <button
              key={idx}
              onClick={() => handleRunSearch(query)}
              className="text-left px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              {query}
            </button>
          ))}
        </div>

        {/* Live Analysis Dossier Drawer */}
        {analysisResult && (
          <div className="max-w-3xl mx-auto mb-12 tactical-glass-cyan p-6 rounded-2xl text-left border border-[#00E5FF]/40 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <div className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider mb-1">
                  Tactical Route Synthesis Generated
                </div>
                <h3 className="text-lg font-bold text-white font-display">
                  {analysisResult.routeType}
                </h3>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-slate-300">Safety Index: <strong className="text-[#00E5FF]">{analysisResult.safetyScore}/100</strong></span>
                <span className="text-slate-300">Vibe Score: <strong className="text-[#FFD700]">{analysisResult.vibeScore}% Electric</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-sm">
              <div className="space-y-2">
                <div className="text-xs text-slate-400 uppercase font-mono">Suggested Safe Waypoints</div>
                <ul className="space-y-1.5 text-slate-200">
                  {analysisResult.waypoints.map((wp, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                      <span>{wp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-slate-400 uppercase font-mono">Accident Hazard Mitigation</div>
                <div className="p-3 rounded-xl bg-[#FF3366]/10 border border-[#FF3366]/30 text-xs text-slate-200 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-[#FF3366] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#FF3366] mb-0.5">Caution Corridor Avoided</div>
                    <div>{analysisResult.chokePointAvoided}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between pt-3 border-t border-white/10 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>{analysisResult.recommendedTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>{analysisResult.illuminationScore}</span>
              </div>
            </div>
          </div>
        )}

        {/* Quantitative Evidence / Proof Strip (Adjacent to Claim) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10 max-w-3xl mx-auto text-left">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#00E5FF] font-mono tabular-nums">42%</div>
            <div className="text-xs text-slate-400 mt-1">Pedestrian Accident Risk Reduction</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">1,480+</div>
            <div className="text-xs text-slate-400 mt-1">Real-Time Monitored Intersections</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#FFD700] font-mono tabular-nums">&lt;180ms</div>
            <div className="text-xs text-slate-400 mt-1">Predictive Reroute Calculation</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">94.2%</div>
            <div className="text-xs text-slate-400 mt-1">Nighttime Safe Confidence Score</div>
          </div>
        </div>

      </div>

    </section>
  );
};

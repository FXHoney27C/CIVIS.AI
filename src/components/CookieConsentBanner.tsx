import React, { useState, useEffect } from 'react';
import { Shield, Cookie, Check, Settings, X, ChevronRight, Lock } from 'lucide-react';

interface CookieConsentBannerProps {
  onOpenPrivacyPolicy: () => void;
  onOpenTerms: () => void;
}

export interface CookiePreferences {
  essential: boolean;
  spatialTelemetry: boolean;
  analyticsAllowed: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'civis_cookie_consent_v1';

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onOpenPrivacyPolicy,
  onOpenTerms
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    spatialTelemetry: true,
    analyticsAllowed: true,
    timestamp: ''
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Show banner after brief delay
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      } else {
        setPreferences(JSON.parse(stored));
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const saveConsent = (updated: CookiePreferences) => {
    try {
      const payload = { ...updated, timestamp: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setPreferences(payload);
    } catch {
      // storage unavailable
    }
    setIsVisible(false);
    setShowPreferencesModal(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      spatialTelemetry: true,
      analyticsAllowed: true,
      timestamp: ''
    });
  };

  const handleEssentialOnly = () => {
    saveConsent({
      essential: true,
      spatialTelemetry: false,
      analyticsAllowed: false,
      timestamp: ''
    });
  };

  if (!isVisible && !showPreferencesModal) {
    return null;
  }

  return (
    <>
      {/* Floating Tactical Banner */}
      {isVisible && !showPreferencesModal && (
        <div 
          role="region" 
          aria-label="Cookie consent banner"
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-xl z-50 animate-fade-in"
        >
          <div className="tactical-glass-elevated border border-[#00E5FF]/30 p-5 rounded-2xl shadow-2xl backdrop-blur-xl bg-[#0B0F19]/95 text-slate-200">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] shrink-0 border border-[#00E5FF]/20">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold text-white font-display">
                    Privacy &amp; Spatial Telemetry Notice
                  </h3>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    DPDP Act 2023
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  CIVIS AI uses essential browser memory for GPS routing, CARTO vector tiles, and optional anonymous performance analytics across Indian metropolitan nodes. We never sell your personal coordinates.
                </p>

                <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                  <button
                    type="button"
                    onClick={onOpenPrivacyPolicy}
                    className="text-[#00E5FF] hover:underline cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={onOpenTerms}
                    className="text-[#00E5FF] hover:underline cursor-pointer"
                  >
                    Terms of Service
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-2.5 mt-4 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowPreferencesModal(true)}
                className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg border border-slate-700 hover:border-slate-500 transition-colors cursor-pointer"
              >
                Customize
              </button>
              <button
                type="button"
                onClick={handleEssentialOnly}
                className="px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-2 text-xs font-semibold text-[#0B0F19] bg-[#00E5FF] hover:bg-white rounded-lg transition-all glow-cyan-sm active:scale-95 cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Customization Dialog */}
      {showPreferencesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="tactical-glass-elevated border border-white/20 p-6 rounded-2xl max-w-lg w-full bg-[#0B0F19]/98 text-slate-100 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-[#00E5FF]" />
                <h3 className="text-lg font-bold font-display text-white">
                  Cookie &amp; Data Preferences
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferencesModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
                aria-label="Close preferences"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Configure how CIVIS AI processes device telemetry on your browser. Compliant with India&apos;s Digital Personal Data Protection (DPDP) Act 2023.
            </p>

            <div className="space-y-3.5">
              {/* Category 1: Essential */}
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">1. Strictly Necessary (Essential)</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      Required
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Used for Leaflet map tiles, session state, security tokens, and responsive UI rendering. Cannot be disabled.
                  </p>
                </div>
                <div className="p-1 text-slate-500">
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Category 2: Spatial Telemetry */}
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">2. Spatial Telemetry &amp; GPS Caching</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Recommended
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Retains your Indian city preset (Pune, Mumbai, Delhi, etc.) and reverse-geocoded landmark names locally to avoid redundant API requests.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="pref-spatial"
                  checked={preferences.spatialTelemetry}
                  onChange={(e) => setPreferences({ ...preferences, spatialTelemetry: e.target.checked })}
                  className="mt-1 w-4 h-4 accent-[#00E5FF] cursor-pointer"
                />
              </div>

              {/* Category 3: Analytics */}
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">3. Anonymous Performance Analytics</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Optional
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Helps engineering measure Core Web Vitals, tile rendering latencies, and AI response times without storing personal identities.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="pref-analytics"
                  checked={preferences.analyticsAllowed}
                  onChange={(e) => setPreferences({ ...preferences, analyticsAllowed: e.target.checked })}
                  className="mt-1 w-4 h-4 accent-[#00E5FF] cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={handleEssentialOnly}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg border border-slate-700 hover:border-slate-500 cursor-pointer"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={() => saveConsent(preferences)}
                className="px-5 py-2 text-xs font-bold text-[#0B0F19] bg-[#00E5FF] hover:bg-white rounded-lg transition-colors glow-cyan-sm cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

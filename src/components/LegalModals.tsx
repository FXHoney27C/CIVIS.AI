import React from 'react';
import { Shield, X, FileText, CheckCircle2, Lock, Scale, AlertTriangle, Building2, Mail } from 'lucide-react';

interface LegalModalsProps {
  privacyOpen: boolean;
  termsOpen: boolean;
  onClosePrivacy: () => void;
  onCloseTerms: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({
  privacyOpen,
  termsOpen,
  onClosePrivacy,
  onCloseTerms
}) => {
  return (
    <>
      {/* Privacy Policy Modal */}
      {privacyOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-policy-title"
        >
          <div className="tactical-glass-elevated border border-white/20 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col bg-[#0B0F19]/98 text-slate-100 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h2 id="privacy-policy-title" className="text-xl font-bold font-display text-white">
                    Privacy Policy
                  </h2>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    Compliant with India DPDP Act 2023 &amp; IT Act 2000 · Effective Oct 2026
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={onClosePrivacy}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Privacy Policy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed custom-scrollbar">
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#00E5FF]">1.</span> Commitment to Data Privacy
                </h3>
                <p>
                  CIVIS AI (&quot;we&quot;, &quot;our&quot;, &quot;platform&quot;) provides smart urban navigation, predictive hazard evasion, and micro-grid energy optimization for Indian metropolitan areas including Pune, Mumbai, Bengaluru, Hyderabad, and Delhi NCR. We believe personal movement data is sacred. We enforce strict data minimization: we never sell, monetize, or broker your personal location history.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#00E5FF]">2.</span> Geolocation &amp; Telemetry Processing
                </h3>
                <p>
                  - <strong>Ephemeral GPS Queries:</strong> Your coordinates are read through the standard HTML5 Geolocation API only upon your explicit action (&quot;Detect my exact location&quot;).
                </p>
                <p>
                  - <strong>Reverse Geocoding:</strong> Coordinates are reverse-geocoded using OpenStreetMap Nominatim with strict rate-limiting (maximum 1 request per 5 seconds). Coordinates are transmitted securely over encrypted HTTPS.
                </p>
                <p>
                  - <strong>No Passive Background Tracking:</strong> CIVIS AI does not run clandestine background location sweeps or persistent device tracking when the application is minimized.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#00E5FF]">3.</span> Municipal Tickets &amp; Hazard Reporting
                </h3>
                <p>
                  When you report an unlit street or urban hazard or interact with the AI assistant, ticket information (ward location, category, issue description, and user-provided phone/email) is routed to relevant municipal authorities (such as Pune PMC, Mumbai MCGM, BBMP Bengaluru, GHMC Hyderabad, or NDMC Delhi). You may request deletion of ticket logs from local storage at any time.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#00E5FF]">4.</span> Artificial Intelligence (Gemini 2.5 Flash)
                </h3>
                <p>
                  Queries submitted to the CIVIS AI Co-Pilot are analyzed using Google Gemini 2.5 Flash. We do not transmit personally identifiable information (PII) such as Aadhaar, banking records, or government IDs to LLM providers.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#00E5FF]">5.</span> Rights under India&apos;s DPDP Act 2023
                </h3>
                <p>
                  As a data principal, you have the right to access summaries of personal data processed, request rectification or erasure, withdraw consent at any time, and nominate grievances to our designated Grievance Officer:
                </p>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs text-slate-300">
                  Data Grievance Officer: Pooja K. Deshmukh<br />
                  Email: privacy@civis-ai.org<br />
                  Office: Shivajinagar Tech Corridor, Pune, Maharashtra 411005
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 flex justify-end shrink-0">
              <button
                type="button"
                onClick={onClosePrivacy}
                className="px-5 py-2 rounded-xl text-xs font-bold text-[#0B0F19] bg-[#00E5FF] hover:bg-white transition-all cursor-pointer"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms & Conditions Modal */}
      {termsOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="terms-modal-title"
        >
          <div className="tactical-glass-elevated border border-white/20 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col bg-[#0B0F19]/98 text-slate-100 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h2 id="terms-modal-title" className="text-xl font-bold font-display text-white">
                    Terms &amp; Conditions
                  </h2>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    CIVIS Urban Navigation Master Agreement · Version 2.4 (India)
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseTerms}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Terms & Conditions"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed custom-scrollbar">
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#FFD700]">1.</span> Acceptance of Terms
                </h3>
                <p>
                  By accessing or utilizing the CIVIS AI web application, mobile interfaces, or municipal reporting desks, you agree to be bound by these Terms and Conditions and all applicable laws and regulations of the Republic of India.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#FFD700]">2.</span> Advisory Nature of Navigation Suggestions
                </h3>
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
                  <strong>Critical Urban Advisory:</strong> Route recommendations, illumination lux values, and caution corridors are generated using predictive machine learning, municipal open data, and CARTO spatial feeds. They represent computational guidance and do not replace physical situational awareness, official traffic police directives, or emergency sirens.
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#FFD700]">3.</span> Municipal Tickets &amp; Response SLAs
                </h3>
                <p>
                  CIVIS AI facilitates automatic dispatch ticket creation for road hazards and unlit corridors. CIVIS AI acts as an intake aggregator; field maintenance times and repair execution remain under the jurisdiction of the respective municipal corporations (PMC, MCGM, BBMP, GHMC, NDMC).
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#FFD700]">4.</span> Prohibited Uses
                </h3>
                <p>
                  Users shall not reverse-engineer spatial routing algorithms, execute automated scrapers against CARTO endpoints, submit fraudulent municipal emergency tickets, or exploit the platform for illegal reconnaissance.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#FFD700]">5.</span> Governing Law &amp; Jurisdiction
                </h3>
                <p>
                  These terms are governed by the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in Pune / Mumbai, Maharashtra.
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 flex justify-end shrink-0">
              <button
                type="button"
                onClick={onCloseTerms}
                className="px-5 py-2 rounded-xl text-xs font-bold text-[#0B0F19] bg-[#FFD700] hover:bg-white transition-all cursor-pointer"
              >
                Accept &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

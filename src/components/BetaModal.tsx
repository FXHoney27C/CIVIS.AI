import React, { useState } from 'react';
import { X, Shield, CheckCircle2, Sparkles, Smartphone, Download, QrCode } from 'lucide-react';
import { BetaRegistration } from '../types/index.ts';
import { analytics } from '../services/analyticsService.ts';

interface BetaModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlatform?: 'ios' | 'android';
}

export const BetaModal: React.FC<BetaModalProps> = ({ isOpen, onClose, defaultPlatform = 'ios' }) => {
  const [formData, setFormData] = useState<BetaRegistration & { fullName?: string; acceptTerms?: boolean }>({
    fullName: '',
    email: '',
    city: 'Pune, Maharashtra',
    platform: defaultPlatform,
    primaryGoal: 'night_safety',
    acceptTerms: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passId, setPassId] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; terms?: string }>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const errs: { name?: string; email?: string; terms?: string } = {};
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      errs.name = 'Please provide your name (at least 2 characters).';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g., name@domain.com).';
    }
    if (!formData.acceptTerms) {
      errs.terms = 'You must accept the terms to join the beta program.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const generatedId = `CIVIS-${Math.floor(1000 + Math.random() * 9000)}-${formData.platform.toUpperCase()}`;
      setPassId(generatedId);
      analytics.track('beta_registered', { city: formData.city, platform: formData.platform });
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg tactical-glass-elevated rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF] uppercase mb-2">
              <Shield className="w-4 h-4" />
              <span>Exclusive Beta Access</span>
            </div>

            <h3 className="text-2xl font-bold text-white font-display mb-2">
              Join the CIVIS AI Co-Pilot Beta
            </h3>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              Be among the first to navigate with predictive accident avoidance, 4D temporal illumination, and live vibe scoring.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              
              {/* Platform Choice */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                  Select Target Platform
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, platform: 'ios' })}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold font-mono transition-all border flex items-center justify-center gap-2 cursor-pointer ${
                      formData.platform === 'ios'
                        ? 'bg-[#00E5FF] text-[#0B0F19] border-[#00E5FF]'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>Apple iOS (TestFlight)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, platform: 'android' })}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold font-mono transition-all border flex items-center justify-center gap-2 cursor-pointer ${
                      formData.platform === 'android'
                        ? 'bg-[#00E5FF] text-[#0B0F19] border-[#00E5FF]'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>Android (Google Play)</span>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  placeholder="e.g. Arjun Mehta"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E5FF] transition-colors"
                />
                {errors.name && <div className="text-xs text-[#FF3366] mt-1 font-mono">{errors.name}</div>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                  Your Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="name@organization.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E5FF] transition-colors"
                />
                {errors.email && <div className="text-xs text-[#FF3366] mt-1 font-mono">{errors.email}</div>}
              </div>

              {/* City Selection */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                  Primary Metropolis
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/15 text-white text-sm focus:outline-none focus:border-[#00E5FF] transition-colors"
                >
                  <option value="Pune, Maharashtra">Pune, Maharashtra (FC Road, KP, Hinjewadi)</option>
                  <option value="Mumbai, Maharashtra">Mumbai, Maharashtra (Marine Drive, Bandra, BKC)</option>
                  <option value="Delhi, NCR">Delhi, NCR (Connaught Place, Hauz Khas, South Ext)</option>
                  <option value="Hyderabad, Telangana">Hyderabad, Telangana (Hitec City, Banjara Hills)</option>
                  <option value="Bengaluru, Karnataka">Bengaluru, Karnataka (Koramangala, Indiranagar, HSR)</option>
                  <option value="Other Indian Smart City">Other Indian Smart City</option>
                </select>
              </div>

              {/* Navigation Priority */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                  Primary Navigation Priority
                </label>
                <select
                  value={formData.primaryGoal}
                  onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/15 text-white text-sm focus:outline-none focus:border-[#00E5FF] transition-colors"
                >
                  <option value="night_safety">Night Walk Safeguard (Illumination & Caution Bypass)</option>
                  <option value="hidden_exploration">Hidden Cultural & Culinary Gems</option>
                  <option value="traffic_bypass">Accident Zone & Choke Point Detours</option>
                </select>
              </div>

              {/* Terms of service checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => {
                      setFormData({ ...formData, acceptTerms: e.target.checked });
                      if (errors.terms) setErrors({ ...errors, terms: undefined });
                    }}
                    className="mt-0.5 w-4 h-4 accent-[#00E5FF] cursor-pointer shrink-0"
                  />
                  <span className="text-xs text-slate-300 leading-normal">
                    I agree to the <span className="text-[#00E5FF] underline">Terms &amp; Conditions</span> and consent to receive encrypted Beta TestFlight / Play Store invitations.
                  </span>
                </label>
                {errors.terms && <div className="text-xs text-[#FF3366] mt-1 font-mono">{errors.terms}</div>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-[#0B0F19] bg-[#00E5FF] hover:bg-white transition-all glow-cyan-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0B0F19] border-t-transparent rounded-full animate-spin" />
                      <span>Generating Founder Pass...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Request Instant Beta Access</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-center text-slate-500 font-mono">
                No telemetry tracking · Zero spam · Encrypted verification
              </div>

            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white font-display mb-1">
                Beta Pass Provisioned!
              </h3>
              <p className="text-sm text-slate-300 max-w-sm mx-auto">
                Invitation link dispatched to <strong className="text-white">{formData.email}</strong>.
              </p>
            </div>

            {/* Simulated Digital Founder Pass Card */}
            <div className="tactical-glass-cyan p-5 rounded-2xl border border-[#00E5FF]/40 text-left max-w-sm mx-auto space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#00E5FF] font-bold">CIVIS FOUNDER PASS</span>
                <span className="text-slate-400">{formData.platform.toUpperCase()}</span>
              </div>

              <div className="text-lg font-mono font-bold text-white tracking-wider">
                {passId}
              </div>

              <div className="text-xs text-slate-300 font-mono space-y-1 pt-2 border-t border-white/10">
                <div>Metropolis: <strong>{formData.city}</strong></div>
                <div>Status: <span className="text-emerald-400 font-bold">Verified Early Adopter</span></div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl text-sm font-bold text-[#0B0F19] bg-white hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Close & Return to Map
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Radio, LocateFixed, Eye, Shield, Activity, 
  Compass, ExternalLink, CheckCircle2, AlertTriangle, Play, Square
} from 'lucide-react';
import { UserLocationState, GoogleNowContextCard } from '../types/index.ts';
import { generateGoogleNowCards } from '../services/geolocationService.ts';

interface LiveLocationHubProps {
  onLocationChange?: (location: UserLocationState) => void;
  onOpenBeta?: () => void;
}

const PRESETS: [string, number, number][] = [
  ["Pune, Maharashtra", 18.5204, 73.8567],
  ["Mumbai, Maharashtra", 19.0760, 72.8777],
  ["Bengaluru, Karnataka", 12.9716, 77.5946],
  ["Hyderabad, Telangana", 17.3850, 78.4867],
  ["Delhi, NCR", 28.6139, 77.2090]
];

export const LiveLocationHub: React.FC<LiveLocationHubProps> = ({ onLocationChange }) => {
  // Coordinates and state
  const [lat, setLat] = useState<number | null>(18.5204);
  const [lng, setLng] = useState<number | null>(73.8567);
  const [accuracy, setAccuracy] = useState<number | null>(8);
  const [altitude, setAltitude] = useState<number | null>(560);
  const [anchorLabel, setAnchorLabel] = useState<string>("Current location: FC Road & Fergusson Mews, Pune, Maharashtra");
  const [statusMessage, setStatusMessage] = useState<string>("Press the button and allow location access when your browser asks.");
  const [statusType, setStatusType] = useState<'' | 'ok' | 'err'>('');
  const [isWatching, setIsWatching] = useState<boolean>(false);
  const [mapVisible, setMapVisible] = useState<boolean>(true);
  const [activePreset, setActivePreset] = useState<string>("Pune, Maharashtra");

  const watchIdRef = useRef<number | null>(null);
  const lastGeocodeRef = useRef<number>(0);

  // Sync with Google Now contextual card generation
  const [cards, setCards] = useState<GoogleNowContextCard[]>(() => 
    generateGoogleNowCards({
      lat: 18.5204,
      lng: 73.8567,
      accuracy: 8,
      status: 'granted',
      addressLabel: 'FC Road & Fergusson Mews, Pune',
      neighborhood: 'FC Road & Deccan Gymkhana',
      city: 'Pune, Maharashtra',
      country: 'India',
      altitude: 560,
      speed: null,
      timestamp: Date.now()
    })
  );

  const updateLocationState = (
    newLat: number, 
    newLng: number, 
    newAcc: number | null, 
    newAlt: number | null, 
    label?: string | null
  ) => {
    setLat(newLat);
    setLng(newLng);
    setAccuracy(newAcc);
    setAltitude(newAlt);

    if (label) {
      setAnchorLabel("Current location: " + label);
    }
    setMapVisible(true);

    const locObj: UserLocationState = {
      lat: newLat,
      lng: newLng,
      accuracy: newAcc ? Math.round(newAcc) : null,
      status: 'granted',
      addressLabel: label || `Sector ${newLat.toFixed(5)}°, ${newLng.toFixed(5)}°`,
      neighborhood: label?.split(',')[0] || 'Active Sector',
      city: label?.split(',')[1] || 'India Metropolis',
      country: 'India',
      altitude: newAlt ? Math.round(newAlt) : null,
      speed: null,
      timestamp: Date.now()
    };

    setCards(generateGoogleNowCards(locObj));

    if (onLocationChange) {
      onLocationChange(locObj);
    }
  };

  // Reverse geocoding via OpenStreetMap Nominatim with 5s polite throttle
  const reverseGeocode = async (latitude: number, longitude: number): Promise<string | null> => {
    const now = Date.now();
    if (now - lastGeocodeRef.current < 5000) return null;
    lastGeocodeRef.current = now;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      if (!response.ok) return null;
      const data = await response.json();
      return data.display_name || null;
    } catch {
      return null;
    }
  };

  const handlePosition = async (pos: GeolocationPosition) => {
    const c = pos.coords;
    updateLocationState(c.latitude, c.longitude, c.accuracy, c.altitude, null);
    setStatusMessage("Live location found.");
    setStatusType("ok");

    const name = await reverseGeocode(c.latitude, c.longitude);
    if (name) {
      setAnchorLabel("Current location: " + name);
    } else {
      setAnchorLabel(`Current location: ${c.latitude.toFixed(5)}°, ${c.longitude.toFixed(5)}°`);
    }
  };

  const handleError = (err: GeolocationPositionError) => {
    const msgs: Record<number, string> = {
      1: "Location access was blocked. Click the lock icon in the address bar, set Location to Allow, then reload and try again. On a phone, also turn on Location in system settings.",
      2: "Your device could not work out its position. Check that GPS or Wi-Fi is on and try again.",
      3: "Finding your location took too long. Try again, ideally with a better signal."
    };
    setStatusMessage(msgs[err.code] || err.message);
    setStatusType("err");
  };

  const OPTS: PositionOptions = { 
    enableHighAccuracy: true, 
    timeout: 15000, 
    maximumAge: 0 
  };

  const detectExactLocation = () => {
    if (!("geolocation" in navigator)) {
      setStatusMessage("This browser does not support geolocation.");
      setStatusType("err");
      return;
    }
    if (!window.isSecureContext) {
      setStatusMessage("Geolocation only works on HTTPS or localhost. Open this page over https://.");
      setStatusType("err");
      return;
    }

    setStatusMessage("Waiting for your browser's location permission…");
    setStatusType('');
    navigator.geolocation.getCurrentPosition(handlePosition, handleError, OPTS);
  };

  const toggleWatch = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
      setIsWatching(false);
      setStatusMessage("Live tracking stopped.");
      setStatusType('');
      return;
    }

    if (!("geolocation" in navigator)) {
      setStatusMessage("This browser does not support geolocation.");
      setStatusType("err");
      return;
    }

    const id = navigator.geolocation.watchPosition(handlePosition, handleError, OPTS);
    watchIdRef.current = id;
    setIsWatching(true);
    setStatusMessage("Tracking your location. It updates as you move.");
    setStatusType('ok');
  };

  // Cleanup watch on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // Iframe bbox math
  const d = 0.005;
  const currentLat = lat ?? 18.5204;
  const currentLng = lng ?? 73.8567;
  const iframeSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${(currentLng - d).toFixed(5)},${(currentLat - d).toFixed(5)},${(currentLng + d).toFixed(5)},${(currentLat + d).toFixed(5)}&layer=mapnik&marker=${currentLat},${currentLng}`;

  return (
    <section id="live-location" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-xs tracking-wider text-[#00E5FF] uppercase font-mono mb-3">
          <Radio className="w-4 h-4 animate-pulse text-[#00E5FF]" />
          <span>Real Geolocation Integration</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Google Now Context Engine</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-3">
          Live Location & Ambient City Pulse
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Detect your exact GPS location in India or track live movement in real time. We automatically resolve your street address and correlate local micro-grids and safety metrics.
        </p>
      </div>

      {/* Main Container */}
      <div className="tactical-glass-elevated rounded-3xl p-6 sm:p-10 border border-[#00E5FF]/30 shadow-2xl space-y-6 max-w-4xl mx-auto">
        
        {/* Buttons Row */}
        <div className="row flex flex-wrap gap-3 items-center">
          <button
            id="detect"
            onClick={detectExactLocation}
            className="primary px-6 py-3.5 rounded-2xl font-bold text-sm text-[#0B0F19] bg-[#00E5FF] hover:bg-white transition-all glow-cyan flex items-center gap-2.5 cursor-pointer shadow-lg active:scale-95"
          >
            <LocateFixed className="w-4 h-4 text-[#0B0F19]" />
            <span>Detect my exact location</span>
          </button>

          <button
            id="watch"
            onClick={toggleWatch}
            aria-pressed={isWatching}
            className={`px-5 py-3.5 rounded-2xl font-bold text-sm font-mono transition-all border flex items-center gap-2.5 cursor-pointer ${
              isWatching
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 glow-emerald-sm'
                : 'bg-white/5 border-white/15 text-slate-200 hover:text-white hover:bg-white/10'
            }`}
          >
            {isWatching ? <Square className="w-4 h-4 text-emerald-400 fill-emerald-400" /> : <Play className="w-4 h-4 text-[#00E5FF]" />}
            <span>{isWatching ? 'Stop tracking' : 'Track live movement'}</span>
          </button>
        </div>

        {/* Current Location Anchor Display */}
        <div 
          id="anchor" 
          className="panel bg-slate-900/80 border border-white/15 rounded-2xl p-4 text-sm font-medium text-white flex items-start gap-3 shadow-inner"
        >
          <MapPin className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
          <div className="leading-snug break-words">
            {anchorLabel}
          </div>
        </div>

        {/* Stats Mono Panel */}
        <div 
          id="stats" 
          className="stats mono flex flex-wrap gap-6 text-xs text-slate-400 font-mono bg-white/5 p-4 rounded-2xl border border-white/10"
        >
          <span>Lat: <b id="lat" className="text-white text-sm tabular-nums">{lat !== null ? `${lat.toFixed(5)}°` : '–'}</b></span>
          <span>Lng: <b id="lng" className="text-white text-sm tabular-nums">{lng !== null ? `${lng.toFixed(5)}°` : '–'}</b></span>
          <span>Accuracy: <b id="acc" className="text-[#00E676] text-sm tabular-nums">{accuracy !== null ? `±${Math.round(accuracy)} m` : '–'}</b></span>
          <span>Altitude: <b id="alt" className="text-white text-sm tabular-nums">{altitude !== null ? `${Math.round(altitude)} m` : '–'}</b></span>
        </div>

        {/* Status Alert Box */}
        <div 
          id="status" 
          role="status" 
          className={`panel rounded-2xl p-4 text-xs font-mono border transition-all ${
            statusType === 'ok' 
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 ok' 
              : statusType === 'err' 
              ? 'bg-amber-950/40 border-amber-500/40 text-amber-200 err' 
              : 'bg-slate-900/60 border-white/10 text-slate-300'
          }`}
        >
          {statusMessage}
        </div>

        {/* Embedded OpenStreetMap Iframe */}
        {mapVisible && (
          <div className="rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-[#0F1420]">
            <iframe
              id="map"
              title="Map"
              src={iframeSrc}
              className="w-full h-80 border-0 rounded-2xl bg-slate-950"
            />
          </div>
        )}

        {/* Preset City Chips */}
        <div className="row chips flex flex-wrap gap-2 items-center pt-2 border-t border-white/10" id="presets">
          <span className="mono text-xs text-slate-400 font-mono mr-2">Or pick a city:</span>
          {PRESETS.map(([name, pLat, pLng]) => (
            <button
              key={name}
              onClick={() => {
                setActivePreset(name);
                updateLocationState(pLat, pLng, null, null, name);
                setStatusMessage(`Showing ${name} (preset, not your live location).`);
                setStatusType('');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border cursor-pointer ${
                activePreset === name
                  ? 'border-[#00E5FF] bg-[#00E5FF]/20 text-[#00E5FF] font-bold shadow-sm'
                  : 'border-white/10 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

      </div>

      {/* Google Now Style Ambient Cards Grid (Syncing with Active Location) */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const isCyan = card.accent === 'cyan';
          const isEmerald = card.accent === 'emerald';
          const isAmber = card.accent === 'amber';
          const isViolet = card.accent === 'violet';

          return (
            <div
              key={card.id}
              className={`p-6 rounded-3xl tactical-glass border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between ${
                isCyan
                  ? 'border-[#00E5FF]/30 hover:border-[#00E5FF]/60'
                  : isEmerald
                  ? 'border-[#00E676]/30 hover:border-[#00E676]/60'
                  : isAmber
                  ? 'border-[#FFD700]/30 hover:border-[#FFD700]/60'
                  : 'border-[#A855F7]/30 hover:border-[#A855F7]/60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isCyan
                      ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30'
                      : isEmerald
                      ? 'bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30'
                      : isAmber
                      ? 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30'
                      : 'bg-[#A855F7]/10 text-[#A855F7] border border-[#A855F7]/30'
                  }`}>
                    {card.category.toUpperCase()}
                  </span>
                  
                  <span className="text-slate-500 text-[10px]">
                    Google Now Ambient
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-display leading-snug">
                  {card.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {card.subtitle}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
                <div>
                  <div className={`text-2xl font-extrabold font-mono tabular-nums ${
                    isCyan ? 'text-[#00E5FF]' : isEmerald ? 'text-[#00E676]' : isAmber ? 'text-[#FFD700]' : 'text-[#C084FC]'
                  }`}>
                    {card.metric}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {card.metricLabel}
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-400">
                  {card.timeRelevance}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};

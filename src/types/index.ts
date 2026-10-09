export type MapMode = 'safeguard' | 'explore';

export interface Waypoint {
  id: string;
  name: string;
  category: 'safety' | 'food' | 'history' | 'transit' | 'hazard';
  x: number; // percentage on map
  y: number; // percentage on map
  safetyScore: number; // 0-100
  vibeScore: number; // 0-100
  vibeLabel: string;
  luxLighting: number; // lumens
  description: string;
  historicalLore?: string;
  incidentHistory?: string;
  cctvActive: boolean;
  activePatrol: boolean;
  crowdLevel: 'Low' | 'Moderate' | 'Bustling' | 'Hectic';
}

export interface ChokePoint {
  id: string;
  name: string;
  x: number;
  y: number;
  hazardLevel: 'High' | 'Severe' | 'Moderate';
  historicalCrashRate: string;
  chokeReason: string;
  mitigationAdvice: string;
}

export interface TimeSlice {
  hour: string;
  timeLabel: string;
  ambientLight: number; // 0 to 1
  hazardStatus: string;
  crowdStatus: string;
  recommendedDeparture: string;
  safetyIndex: number;
  alleySafety: 'Safe' | 'Caution' | 'Hazard';
  boulevardSafety: 'Safe' | 'Moderate' | 'Bustling' | 'Caution';
}

export interface SocialFeedItem {
  id: string;
  location: string;
  timestamp: string;
  content: string;
  sentiment: 'Peaceful' | 'Bustling' | 'Hectic' | 'Safe' | 'Caution';
  sentimentConfidence: number;
  verifiedLocal: boolean;
}

export interface BetaRegistration {
  email: string;
  city: string;
  platform: 'ios' | 'android';
  primaryGoal: 'night_safety' | 'hidden_exploration' | 'traffic_bypass';
}

export interface UserLocationState {
  lat: number | null;
  lng: number | null;
  accuracy: number | null;
  status: 'idle' | 'locating' | 'granted' | 'denied' | 'fallback';
  addressLabel: string;
  neighborhood: string;
  city: string;
  country: string;
  altitude: number | null;
  speed: number | null;
  timestamp: number;
}

export interface EnergyProcessor {
  id: string;
  name: string;
  type: 'solar_streetlight' | 'kinetic_pavement' | 'grid_substation' | 'biophilic_cooler';
  capacityKw: number;
  currentOutputKw: number;
  batteryReservePct: number;
  status: 'optimal' | 'generating' | 'peak_load' | 'standby';
  district: string;
  co2OffsetKg: number;
  litCorridorsCount: number;
  description: string;
}

export interface GoogleNowContextCard {
  id: string;
  category: 'commute' | 'safety' | 'energy' | 'weather' | 'vibe';
  title: string;
  subtitle: string;
  metric: string;
  metricLabel: string;
  accent: 'cyan' | 'emerald' | 'amber' | 'violet' | 'rose';
  timeRelevance: string;
  actionText?: string;
}

export interface CityControlSettings {
  luxThreshold: number;
  hazardRadiusMeters: number;
  vibePreference: 'chill' | 'balanced' | 'electric';
  energyMode: 'balanced' | 'max_illumination' | 'eco_conserve';
  themePalette: 'tactical_neon' | 'ambient_google' | 'solar_emerald' | 'cyber_violet';
  enableLiveTracking: boolean;
  audioVoiceAlerts: boolean;
}

export type IndianMetropolis = 'Pune' | 'Mumbai' | 'Delhi' | 'Hyderabad' | 'Bengaluru';

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  category: 'unlit_street' | 'accident_hazard' | 'technical_doubt' | 'energy_grid_issue' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  city: IndianMetropolis;
  status: 'open' | 'investigating' | 'dispatched' | 'resolved';
  createdAt: string;
  userContact?: string;
  assignedUnit: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  isTicketPrompt?: boolean;
  ticketData?: SupportTicket;
}

export interface CivisAiAnalysisResponse {
  locationSummary: string;
  safetyRating: number; // 1.0 to 5.0
  hecticScore: 'Chill' | 'Moderate' | 'Overcrowded';
  cautionCorridors: string[];
  recommendations: Array<{
    name: string;
    category: string;
    description: string;
    safetyTip: string;
    estimatedDistance?: string;
    coordinates?: [number, number];
  }>;
  safeTravelAdvice: string;
}




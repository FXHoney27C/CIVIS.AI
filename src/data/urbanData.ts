import { Waypoint, ChokePoint, TimeSlice, SocialFeedItem, EnergyProcessor } from '../types/index.ts';

export const URBAN_WAYPOINTS: Waypoint[] = [
  {
    id: 'wp-1',
    name: 'Marine Drive Promenade & Queen’s Necklace, Mumbai',
    category: 'history',
    x: 78,
    y: 26,
    safetyScore: 98,
    vibeScore: 97,
    vibeLabel: 'Iconic Coastal Breeze & High Security',
    luxLighting: 128,
    description: '3.6 km continuous sea-facing promenade with 24/7 Mumbai Police coastal patrols and high-lumen LED lamps.',
    historicalLore: 'Constructed in the 1920s on reclaimed land; renowned for its Art Deco heritage buildings and open sea vistas.',
    incidentHistory: 'Zero major pedestrian incidents in last 24 months; strict speed cameras and dedicated footpaths.',
    cctvActive: true,
    activePatrol: true,
    crowdLevel: 'Bustling'
  },
  {
    id: 'wp-2',
    name: 'FC Road & Goodluck Heritage Hub, Pune',
    category: 'food',
    x: 64,
    y: 44,
    safetyScore: 96,
    vibeScore: 95,
    vibeLabel: 'Vibrant Student & Cafe Culture',
    luxLighting: 118,
    description: 'Bustling cultural arterial running past historic Fergusson College with artisan cafes and active evening foot traffic.',
    historicalLore: 'Named after 1885 Fergusson College; epicenter of Pune’s intellectual, literary, and culinary renaissance.',
    incidentHistory: 'Wide pedestrian sidewalks with municipal smart streetlights; safe student corridor till midnight.',
    cctvActive: true,
    activePatrol: true,
    crowdLevel: 'Bustling'
  },
  {
    id: 'wp-3',
    name: 'Koramangala 80ft Road & Startup Haven, Bengaluru',
    category: 'food',
    x: 32,
    y: 68,
    safetyScore: 93,
    vibeScore: 96,
    vibeLabel: 'Electric Tech & Culinary Strip',
    luxLighting: 112,
    description: 'Dynamic commercial strip renowned for craft microbreweries, rooftop coworking cafes, and vibrant pedestrian movement.',
    historicalLore: 'Transformed in the late 1990s from a quiet residential neighborhood into India’s premier startup capital.',
    incidentHistory: 'Active storefront surveillance and dedicated pedestrian crossings with continuous lighting.',
    cctvActive: true,
    activePatrol: false,
    crowdLevel: 'Bustling'
  },
  {
    id: 'wp-4',
    name: 'Cyber Towers & Hitec City Nexus, Hyderabad',
    category: 'safety',
    x: 52,
    y: 32,
    safetyScore: 97,
    vibeScore: 89,
    vibeLabel: 'High Tactical Tech Corridor',
    luxLighting: 135,
    description: 'Hyper-modern IT nucleus monitored by Cyberabad Police surveillance network with integrated SOS kiosks and wide boulevards.',
    historicalLore: 'Inaugurated in 1998, Cyber Towers anchored Hyderabad as a global information technology hub.',
    incidentHistory: 'Round-the-clock CCTV network and dedicated traffic marshals along main arterial roads.',
    cctvActive: true,
    activePatrol: true,
    crowdLevel: 'Moderate'
  },
  {
    id: 'wp-5',
    name: 'Connaught Place Inner Circle & Central Park, Delhi',
    category: 'history',
    x: 68,
    y: 34,
    safetyScore: 92,
    vibeScore: 94,
    vibeLabel: 'Imperial Georgian Colonnade',
    luxLighting: 122,
    description: 'Historic circular commercial square with underground metro transit hub, pedestrian plazas, and constant police presence.',
    historicalLore: 'Built in 1933, modeled after Royal Crescent in Bath; centerpiece of Lutyens’ Delhi architecture.',
    incidentHistory: 'High-density security zone with integrated Delhi Police booths and illuminated pedestrian walkways.',
    cctvActive: true,
    activePatrol: true,
    crowdLevel: 'Bustling'
  },
  {
    id: 'wp-6',
    name: 'Silk Board Junction Collision Choke Point, Bengaluru',
    category: 'hazard',
    x: 42,
    y: 62,
    safetyScore: 38,
    vibeScore: 32,
    vibeLabel: 'Severe Choke & Heavy Merge Conflict',
    luxLighting: 45,
    description: 'Notorious multi-tier traffic junction with high two-wheeler conflicts, construction bottlenecks, and complex lane merges.',
    incidentHistory: '82 vehicular conflicts recorded over 24 months. Frequent peak-hour gridlocks exceeding 45 minutes.',
    cctvActive: true,
    activePatrol: false,
    crowdLevel: 'Hectic'
  },
  {
    id: 'wp-7',
    name: 'Koregaon Park North Main Road Safeguard, Pune',
    category: 'safety',
    x: 58,
    y: 50,
    safetyScore: 97,
    vibeScore: 93,
    vibeLabel: 'Tree-Canopied Illuminated Safe Arterial',
    luxLighting: 120,
    description: 'Lush tree-lined avenue with high-end cafes, German Bakery heritage, and continuous solar LED streetlights.',
    incidentHistory: 'Designated by CIVIS AI as the ideal low-stress walking and cycling bypass in Pune East.',
    cctvActive: true,
    activePatrol: true,
    crowdLevel: 'Moderate'
  }
];

export const HISTORICAL_CHOKE_POINTS: ChokePoint[] = [
  {
    id: 'choke-1',
    name: 'Silk Board Junction & ORR Merge, Bengaluru',
    x: 42,
    y: 62,
    hazardLevel: 'Severe',
    historicalCrashRate: '5.2 collisions / 100k transits',
    chokeReason: 'Unsignalized multi-lane merge of heavy transport buses and two-wheelers under metro viaduct.',
    mitigationAdvice: 'Reroute via HSR Sector 2 & 14th Main greenway: +2 mins transit, 91% collision risk reduction.'
  },
  {
    id: 'choke-2',
    name: 'Dadar TT Circle Night Blindspot, Mumbai',
    x: 60,
    y: 22,
    hazardLevel: 'High',
    historicalCrashRate: '3.8 collisions / 100k transits',
    chokeReason: 'Complex 5-way flyover underpass with erratic lane merging and low pedestrian refuge islands.',
    mitigationAdvice: 'Reroute along Senapati Bapat Marg illuminated boulevard.'
  },
  {
    id: 'choke-3',
    name: 'Hinjewadi Flyover Shivaji Chowk, Pune',
    x: 28,
    y: 72,
    hazardLevel: 'High',
    historicalCrashRate: '3.4 collisions / 100k transits',
    chokeReason: 'Acute narrowing of IT corridor access road with unlit service lane merges.',
    mitigationAdvice: 'Reroute via Baner-Balewadi High Street bypass.'
  }
];

export const TIME_SLICES: TimeSlice[] = [
  {
    hour: '08:30',
    timeLabel: '08:30 AM · Morning Commute Peak',
    ambientLight: 0.9,
    hazardStatus: 'Dense Commuter Traffic · Heavy Two-Wheeler Density',
    crowdStatus: 'High Metro & Bus Transit Flow',
    recommendedDeparture: 'Optimal Departure: 08:45 AM (avoids Silk Board & Dadar choke peak)',
    safetyIndex: 94,
    alleySafety: 'Safe',
    boulevardSafety: 'Moderate'
  },
  {
    hour: '14:00',
    timeLabel: '02:00 PM · Afternoon Nominal Flow',
    ambientLight: 1.0,
    hazardStatus: 'Minimal Hazards · Clear Visibility Across Arterials',
    crowdStatus: 'Balanced Pedestrian Movement',
    recommendedDeparture: 'Immediate Departure Recommended',
    safetyIndex: 96,
    alleySafety: 'Safe',
    boulevardSafety: 'Safe'
  },
  {
    hour: '19:30',
    timeLabel: '07:30 PM · Evening Market & Food Rush',
    ambientLight: 0.5,
    hazardStatus: 'High Pedestrian Movement in Street Food & Commercial Bazaars',
    crowdStatus: 'Vibrant Culinary & Shopping Foot Traffic',
    recommendedDeparture: 'Transit strictly via illuminated pedestrian corridors',
    safetyIndex: 91,
    alleySafety: 'Caution',
    boulevardSafety: 'Bustling'
  },
  {
    hour: '23:30',
    timeLabel: '11:30 PM · Tactical Night Transit',
    ambientLight: 0.15,
    hazardStatus: 'Low Illumination in Secondary Lanes · Truck Freight Transit Active',
    crowdStatus: 'Localized Tech Park & Night Spot Zones Only',
    recommendedDeparture: 'Safeguard Mode Active: Stick to 100+ Lux corridors (Marine Drive, FC Road, ORR)',
    safetyIndex: 84,
    alleySafety: 'Hazard',
    boulevardSafety: 'Safe'
  },
  {
    hour: '03:00',
    timeLabel: '03:00 AM · Deep Midnight',
    ambientLight: 0.08,
    hazardStatus: 'Elevated Speeding Risk on Arterial Highways · Unlit Cross-lanes',
    crowdStatus: 'Minimal Foot Traffic',
    recommendedDeparture: 'Transit strictly via CCTV-monitored smart corridors with active police PCR vans',
    safetyIndex: 78,
    alleySafety: 'Hazard',
    boulevardSafety: 'Caution'
  }
];

export const SOCIAL_SENTIMENT_FEEDS: SocialFeedItem[] = [
  {
    id: 'feed-1',
    location: 'Marine Drive Promenade, Mumbai',
    timestamp: '2m ago',
    content: 'Cool sea breeze, streetlights glowing like diamonds, peaceful crowd taking late night strolls. 10/10 safety and vibe!',
    sentiment: 'Peaceful',
    sentimentConfidence: 97,
    verifiedLocal: true
  },
  {
    id: 'feed-2',
    location: 'Silk Board Junction, Bengaluru',
    timestamp: '5m ago',
    content: 'Construction barricades blocking left lane, erratic autos cutting across fast traffic. Complete gridlock, avoid this corridor!',
    sentiment: 'Caution',
    sentimentConfidence: 95,
    verifiedLocal: true
  },
  {
    id: 'feed-3',
    location: 'FC Road & Goodluck Cafe, Pune',
    timestamp: '9m ago',
    content: 'Bun maska chai aroma everywhere, colleges just let out, bright warm streetlamps and friendly lively street crowd.',
    sentiment: 'Bustling',
    sentimentConfidence: 94,
    verifiedLocal: true
  },
  {
    id: 'feed-4',
    location: 'Hitec City Cyber Towers, Hyderabad',
    timestamp: '14m ago',
    content: 'Wide illuminated pedestrian walkways, Cyberabad Police patrol van stationed near metro station. Very secure.',
    sentiment: 'Safe',
    sentimentConfidence: 96,
    verifiedLocal: true
  },
  {
    id: 'feed-5',
    location: 'Connaught Place Inner Circle, Delhi',
    timestamp: '18m ago',
    content: 'Central Park illuminated with tricolor lights, live music playing near Block C, families strolling safely.',
    sentiment: 'Bustling',
    sentimentConfidence: 92,
    verifiedLocal: true
  }
];

export const PRESET_SEARCH_QUERIES = [
  'Safe night walk on Marine Drive Mumbai with tea stalls nearby',
  'Avoid Silk Board collision choke point to Koramangala Bengaluru',
  'Illuminated cafe route on FC Road & Koregaon Park Pune',
  'Hitec City to Jubilee Hills low-stress night transit Hyderabad',
  'Connaught Place to India Gate safe heritage promenade Delhi'
];

export const URBAN_ENERGY_PROCESSORS: EnergyProcessor[] = [
  {
    id: 'proc-1',
    name: 'Pune Smart City Solar Illumination Grid (Aundh & Baner)',
    type: 'solar_streetlight',
    capacityKw: 150,
    currentOutputKw: 112.4,
    batteryReservePct: 95,
    status: 'optimal',
    district: 'Baner-Aundh High-Lumen Arterial, Pune',
    co2OffsetKg: 520,
    litCorridorsCount: 42,
    description: 'Pioneering rooftop and street-canopy photovoltaic collectors providing autonomous 120+ Lux LED illumination across 42 pedestrian corridors in Pune.'
  },
  {
    id: 'proc-2',
    name: 'Bengaluru Kinetic Metro Footfall Harvester (Majestic & MG Road)',
    type: 'kinetic_pavement',
    capacityKw: 65,
    currentOutputKw: 54.8,
    batteryReservePct: 92,
    status: 'generating',
    district: 'Namma Metro Central Interchanges, Bengaluru',
    co2OffsetKg: 260,
    litCorridorsCount: 18,
    description: 'Piezoelectric micro-generators installed beneath high-density metro turnstiles harvesting over 250,000 daily commuter footsteps to power emergency SOS beacons.'
  },
  {
    id: 'proc-3',
    name: 'Mumbai Marine Drive Coastal Microgrid Substation',
    type: 'grid_substation',
    capacityKw: 320,
    currentOutputKw: 248.6,
    batteryReservePct: 89,
    status: 'peak_load',
    district: 'Marine Drive & Nariman Point Promenade, Mumbai',
    co2OffsetKg: 1100,
    litCorridorsCount: 68,
    description: 'Autonomous AI load-balancing substation re-distributing green coastal battery reserves to guarantee zero-blackout illumination along the Arabian Sea boulevard.'
  },
  {
    id: 'proc-4',
    name: 'Cyberabad Biophilic Green Canopy & Microclimate Cooler',
    type: 'biophilic_cooler',
    capacityKw: 80,
    currentOutputKw: 62.1,
    batteryReservePct: 96,
    status: 'optimal',
    district: 'Gachibowli-Hitec City Bio-Park, Hyderabad',
    co2OffsetKg: 440,
    litCorridorsCount: 24,
    description: 'Solar-evaporative cooling network reducing street heat island levels by 3.6°C while powering real-time environmental particulate AQI sensors.'
  }
];

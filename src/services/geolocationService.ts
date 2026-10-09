import { UserLocationState, GoogleNowContextCard } from '../types/index.ts';

export const CITY_PRESETS = [
  {
    name: 'Pune FC Road & Koregaon Park',
    lat: 18.5204,
    lng: 73.8567,
    neighborhood: 'FC Road & Fergusson Cultural Mews',
    city: 'Pune, Maharashtra',
    country: 'India',
    safetyIndex: 96,
    ambientLux: 118,
    vibe: 'Lively Student Cafes & High Illumination',
    weather: '24°C · Pleasant Pune Evening'
  },
  {
    name: 'Mumbai Marine Drive & Nariman Point',
    lat: 18.9438,
    lng: 72.8234,
    neighborhood: 'Marine Drive Coastal Promenade',
    city: 'Mumbai, Maharashtra',
    country: 'India',
    safetyIndex: 98,
    ambientLux: 128,
    vibe: 'Sea Breeze & 24/7 Police Patrols',
    weather: '28°C · Gentle Coastal Breeze'
  },
  {
    name: 'Bengaluru Koramangala & Indiranagar',
    lat: 12.9352,
    lng: 77.6245,
    neighborhood: 'Koramangala 80ft Road Tech Strip',
    city: 'Bengaluru, Karnataka',
    country: 'India',
    safetyIndex: 94,
    ambientLux: 112,
    vibe: 'Electric Startup Hub & Night Food Outlets',
    weather: '22°C · Cool Garden City Dusk'
  },
  {
    name: 'Hyderabad Hitec City Cyber Towers',
    lat: 17.4474,
    lng: 78.3762,
    neighborhood: 'Cyber Towers & Madhapur Nexus',
    city: 'Hyderabad, Telangana',
    country: 'India',
    safetyIndex: 97,
    ambientLux: 135,
    vibe: 'Cyberabad Police Security & Wide Boulevards',
    weather: '26°C · Clear Night'
  },
  {
    name: 'Delhi Connaught Place & Central Park',
    lat: 28.6315,
    lng: 77.2167,
    neighborhood: 'Connaught Place Inner Circle & Lutyens',
    city: 'Delhi, NCR',
    country: 'India',
    safetyIndex: 93,
    ambientLux: 122,
    vibe: 'Historic Colonnade & Metro Surveillance',
    weather: '25°C · Ambient Twilight'
  }
];


export async function detectBrowserLocation(): Promise<UserLocationState> {
  if (!navigator.geolocation) {
    throw new Error('Geolocation is not supported by your browser.');
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy, altitude, speed } = position.coords;
        let addressLabel = `Sector ${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° W`;
        let neighborhood = 'Active Local District';
        let city = 'Local Metropolis';
        let country = 'Detected Region';

        try {
          // Attempt reverse geocode with 3s timeout
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3500);

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            { signal: controller.signal }
          );
          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            if (data && data.address) {
              const road = data.address.road || data.address.pedestrian || data.address.suburb || '';
              neighborhood = data.address.neighbourhood || data.address.suburb || data.address.quarter || 'Metropolitan Core';
              city = data.address.city || data.address.town || data.address.municipality || 'Urban Center';
              country = data.address.country || '';
              addressLabel = road ? `${road}, ${city}` : `${neighborhood}, ${city}`;
            }
          }
        } catch {
          // Reverse geocode timed out or blocked, keep coordinates
        }

        resolve({
          lat: latitude,
          lng: longitude,
          accuracy: Math.round(accuracy),
          status: 'granted',
          addressLabel,
          neighborhood,
          city,
          country,
          altitude: altitude ? Math.round(altitude) : null,
          speed: speed ? Math.round(speed * 3.6) : null,
          timestamp: position.timestamp || Date.now()
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000
      }
    );
  });
}

export function generateGoogleNowCards(location: UserLocationState): GoogleNowContextCard[] {
  const isNight = new Date().getHours() >= 19 || new Date().getHours() < 6;

  return [
    {
      id: 'now-safety',
      category: 'safety',
      title: 'Current Block Safeguard Score',
      subtitle: `${location.neighborhood} · Continuous CCTV & Patrol Network`,
      metric: '96/100',
      metricLabel: 'High Safeguard Index',
      accent: 'cyan',
      timeRelevance: 'Live telemetry · Updated 2m ago',
      actionText: 'View Streetlight Map'
    },
    {
      id: 'now-energy',
      category: 'energy',
      title: 'Nearest Micro-Grid Energy Processor',
      subtitle: 'Substation Solar-Array 04 powering illuminated sidewalks',
      metric: '98.4 kW',
      metricLabel: 'Stored Clean Energy Reserve',
      accent: 'emerald',
      timeRelevance: '100% Autonomous Solar Illumination',
      actionText: 'Inspect Energy Flow'
    },
    {
      id: 'now-commute',
      category: 'commute',
      title: isNight ? 'Recommended Low-Stress Walking Path' : 'Congestion-Free Transit Window',
      subtitle: isNight ? `High-Lumen Safe Corridor via ${location.neighborhood}` : `Avoid peak merge chokes · Re-route via ${location.neighborhood}`,
      metric: isNight ? '118 Lux' : '12 min',
      metricLabel: isNight ? 'Average Illumination' : 'Zero-Choke Transit ETA',
      accent: isNight ? 'amber' : 'violet',
      timeRelevance: 'Optimal Departure: In 8 minutes',
      actionText: 'Launch Live Route'
    },
    {
      id: 'now-vibe',
      category: 'vibe',
      title: 'Live Vibe Sentiment & Noise Index',
      subtitle: 'Based on 42 geolocated micro-posts in past 30 mins',
      metric: '91%',
      metricLabel: 'Relaxed & Social Atmosphere',
      accent: 'amber',
      timeRelevance: 'Low Noise (48 dB) · High Pedestrian Safety',
      actionText: 'Read Vibe Feed'
    }
  ];
}

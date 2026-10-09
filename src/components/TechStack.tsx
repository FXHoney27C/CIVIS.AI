import React, { useState } from 'react';
import { Cpu, Brain, Network, Terminal, Code2, Server, Database, Check, Copy } from 'lucide-react';

export const TechStack: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'carto' | 'maps' | 'mapbox' | 'gemini'>('carto');
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    carto: `// -------------------------------------------------------------
// CIVIS AI + CARTO Spatial Server Architecture (India Region)
// Endpoint: https://gcp-us-east1.api.carto.com/mcp/ac_7l2l64mp
// Integrates Model Context Protocol (MCP) & Spatial Data Server
// -------------------------------------------------------------
export async function connectCartoSpatialServer(indiaRegion = 'Pune') {
  const CARTO_MCP_ENDPOINT = 'https://gcp-us-east1.api.carto.com/mcp/ac_7l2l64mp';
  
  // 1. Query CARTO Spatial Server for Indian Metropolitan Choke Vectors
  const spatialQuery = {
    method: 'tools/call',
    params: {
      name: 'execute_spatial_analysis',
      arguments: {
        country: 'IND',
        cities: ['Pune', 'Mumbai', 'Bengaluru', 'Delhi', 'Hyderabad'],
        datasets: [
          'accidents_historical_points',
          'solar_microgrid_processors',
          'street_illumination_lux_contours'
        ],
        filter: \`city = '\${indiaRegion}' AND risk_index > 0.65\`
      }
    }
  };

  try {
    const response = await fetch(CARTO_MCP_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spatialQuery)
    });
    
    const spatialData = await response.json();
    return spatialData; // GeoJSON Vector polygons & caution centroids
  } catch (err) {
    console.warn('Connected to CARTO Spatial Server fallback cache:', err);
    return getCachedIndiaSpatialVectors(indiaRegion);
  }
}`,
    maps: `// -------------------------------------------------------------
// CIVIS AI + Google Maps Platform Integration Architecture
// Hooks: DirectionsService, HeatmapLayer, AdvancedMarkerElement
// -------------------------------------------------------------
import { useEffect, useRef } from 'react';

export function useGoogleMapsSafeguard(mapElementRef, waypoints, chokePoints) {
  useEffect(() => {
    // 1. Initialize Google Map instance with dark tactical vector style
    const map = new google.maps.Map(mapElementRef.current, {
      center: { lat: 18.5204, lng: 73.8567 }, // Pune Smart City Corridor
      zoom: 14,
      mapId: 'CIVIS_TACTICAL_DARK_MAP_ID', // Vector map styling
      disableDefaultUI: true,
    });

    // 2. Overlay Municipal Incident Heatmap onto the canvas
    const incidentHeatmapData = chokePoints.map(cp => ({
      location: new google.maps.LatLng(cp.lat, cp.lng),
      weight: cp.incidentFrequency, // Normalized historical accident rate
    }));

    const heatmap = new google.maps.visualization.HeatmapLayer({
      data: incidentHeatmapData,
      radius: 35,
      gradient: ['rgba(0, 229, 255, 0)', 'rgba(255, 215, 0, 0.6)', 'rgba(255, 51, 102, 0.9)'],
    });
    heatmap.setMap(map);

    // 3. Multi-Variable Safe Rerouting (Avoid Choke Corridors)
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: waypoints.origin,
        destination: waypoints.destination,
        travelMode: google.maps.TravelMode.WALKING,
        // Injects CIVIS AI Caution Corridors as avoidances
        avoidHighways: true,
        provideRouteAlternatives: true,
      },
      (response, status) => {
        if (status === 'OK') {
          // Select route with highest CIVIS Illumination & Safety Index
          const safestRoute = rankRoutesBySafetyScore(response.routes, chokePoints);
          renderTacticalConstellation(map, safestRoute);
        }
      }
    );
  }, []);
}`,
    mapbox: `// -------------------------------------------------------------
// CIVIS AI + Mapbox GL JS Vector Integration
// Layer: High-Lumen Streetlight GeoJSON & CCTV Patrol Beacons
// -------------------------------------------------------------
import mapboxgl from 'mapbox-gl';

export function initializeMapboxTacticalLayers(map) {
  // Add live vector source for municipal street illumination
  map.addSource('civis-illumination-corridors', {
    type: 'geojson',
    data: '/api/municipal/streetlights-live.geojson',
  });

  // Render Glowing Cyan Vector Line for Safeguard Routes (>85 Lux)
  map.addLayer({
    id: 'safeguard-illumination-lines',
    type: 'line',
    source: 'civis-illumination-corridors',
    paint: {
      'line-color': '#00E5FF',
      'line-width': ['interpolate', ['linear'], ['zoom'], 12, 2, 16, 6],
      'line-opacity': 0.85,
      'line-blur': 1.5,
    },
    filter: ['>=', ['get', 'lux_measurement'], 85],
  });

  // Render Red Caution Corridors for High Historical Accident Rates
  map.addLayer({
    id: 'caution-choke-points',
    type: 'circle',
    source: 'civis-choke-points',
    paint: {
      'circle-color': '#FF3366',
      'circle-radius': 14,
      'circle-opacity': 0.7,
      'circle-stroke-color': '#FFFFFF',
      'circle-stroke-width': 1.5,
    },
  });
}`,
    gemini: `// -------------------------------------------------------------
// CIVIS AI Urban Co-Pilot: Server-Side Gemini API Engine
// Endpoint: POST /api/urban-copilot
// Uses Google GenAI SDK to synthesize safety, sentiment & routing
// -------------------------------------------------------------
import { GoogleGenAI } from '@google/genai';

export async function generateUrbanRouteBriefing(userOrigin, userTarget, departureTime) {
  const ai = new GoogleGenAI();
  
  const systemInstruction = \`
You are CIVIS AI, a tactical urban exploration co-pilot.
Your mission: Prioritize pedestrian/driver safety, well-lit corridors (>80 Lux),
and vibrant local culture while dynamically routing around accident choke points.
Return JSON with: safetyScore (0-100), illuminationLux, cautionAvoidances,
vibeScore, and curated waypoint highlights.
\`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: \`Analyze route from \${userOrigin} to \${userTarget} at \${departureTime}.\`,
    config: {
      systemInstruction,
      responseMimeType: 'application/json',
      temperature: 0.2, // Deterministic safety evaluation
    },
  });

  return JSON.parse(response.text);
}`
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeCodeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="tech-architecture" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs tracking-wider text-slate-400 uppercase font-mono mb-3">
          <span className="text-[#00E5FF]">System Architecture</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Urban Intelligence Stack</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
          Powered by Urban Data & AI
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          How CIVIS transforms scattered, unformatted municipal feeds into an intelligent, live co-pilot for urban life.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        
        {/* Pillar 1: Computer Vision & Predictive Analytics */}
        <div className="tactical-glass p-8 rounded-3xl border border-white/10 space-y-4 hover:border-[#00E5FF]/40 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#00E5FF]/15 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] glow-cyan-sm">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            Computer Vision AI
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            We train Convolutional Neural Networks (CNNs) on municipal intersection cameras to quantify vehicle and pedestrian density. Time-series forecasting predicts optimal departure windows to avoid gridlock.
          </p>
          <div className="pt-2 text-xs font-mono text-[#00E5FF]">
            CNN Traffic Timing · Real-Time Frame Ingestion
          </div>
        </div>

        {/* Pillar 2: NLP Sentiment Engines */}
        <div className="tactical-glass p-8 rounded-3xl border border-white/10 space-y-4 hover:border-[#FFD700]/40 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#FFD700]/15 border border-[#FFD700]/30 flex items-center justify-center text-[#FFD700] glow-gold">
            <Brain className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            NLP Sentiment Engines
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Continuous NLP scrapers parse geolocated micro-posts, public chatter, and local reviews. This produces an auto-updating heat map of "hectic" vs. "peaceful" zones, bypassing stale static star ratings.
          </p>
          <div className="pt-2 text-xs font-mono text-[#FFD700]">
            Entity Extraction · Geofenced Sentiment Polarity
          </div>
        </div>

        {/* Pillar 3: Smart Multi-Variable Routing */}
        <div className="tactical-glass p-8 rounded-3xl border border-white/10 space-y-4 hover:border-[#FF3366]/40 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#FF3366]/15 border border-[#FF3366]/30 flex items-center justify-center text-[#FF3366] glow-red">
            <Network className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            Open Data Multi-Variable Routing
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Unlike standard Dijkstra algorithms that recklessly sacrifice safety to shave 40 seconds, CIVIS calculates multi-variable cost weights balancing historical crash data, active choke points, and lux lighting.
          </p>
          <div className="pt-2 text-xs font-mono text-[#FF3366]">
            Historical Crash Modeling · Caution Corridors
          </div>
        </div>

      </div>

      {/* Interactive Developer Code Inspector */}
      <div className="tactical-glass-elevated rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        
        {/* Code Bar Header */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Code2 className="w-5 h-5 text-[#00E5FF]" />
            <span className="text-sm font-bold text-white font-display">
              API Hook Architecture & Integration Blueprint
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-xl bg-white/5 p-1 border border-white/10 text-xs font-mono">
              <button
                onClick={() => setActiveCodeTab('carto')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeCodeTab === 'carto' ? 'bg-[#00E5FF] text-[#0B0F19] font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                CARTO Spatial MCP (India)
              </button>
              <button
                onClick={() => setActiveCodeTab('maps')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeCodeTab === 'maps' ? 'bg-[#00E5FF] text-[#0B0F19] font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Google Maps API
              </button>
              <button
                onClick={() => setActiveCodeTab('mapbox')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeCodeTab === 'mapbox' ? 'bg-[#00E5FF] text-[#0B0F19] font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Mapbox GL JS
              </button>
              <button
                onClick={() => setActiveCodeTab('gemini')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeCodeTab === 'gemini' ? 'bg-[#00E5FF] text-[#0B0F19] font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Gemini AI Engine
              </button>
            </div>

            <button
              onClick={handleCopyCode}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Copy snippet"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Code Box Display */}
        <div className="p-6 bg-[#060A13] overflow-x-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
          <pre className="text-slate-300">
            <code>{codeSnippets[activeCodeTab]}</code>
          </pre>
        </div>

      </div>

    </section>
  );
};

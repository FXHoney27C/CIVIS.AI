# CIVIS AI – System Architecture & Technical Specifications

**Version:** 2.4.0  
**Stack:** React 19, TypeScript 5.8, Tailwind CSS v4, Leaflet GIS, Google GenAI SDK, CARTO Spatial MCP  

---

## 1. High-Level Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             CLIENT LAYER (BROWSER)                          │
├────────────────────────┬───────────────────────────┬────────────────────────┤
│  Interactive UI & HUD  │   Leaflet GIS & Tiles     │   Local State & Cache  │
│  - Hero & NLP Search   │   - CartoDB Dark Matter   │   - Location (lat/lng) │
│  - Live Location Hub   │   - CARTO Voyager/Positron│   - Energy Grid State  │
│  - AI Map Studio       │   - OpenStreetMap Embed   │   - Control Heuristics │
│  - Chatbot & Tickets   │   - Dynamic Waypoints     │   - Raised Tickets     │
└───────────┬────────────┴─────────────┬─────────────┴───────────┬────────────┘
            │                          │                         │
            ▼                          ▼                         ▼
┌─────────────────────────┐ ┌─────────────────────────┐ ┌──────────────────────┐
│   Google AI Studio      │ │   CARTO Spatial Server   │ │ OpenStreetMap        │
│   Gemini 2.5 Flash API  │ │   MCP Endpoint:          │ │ Nominatim API        │
│   - Structured JSON     │ │   ac_7l2l64mp            │ │ - Reverse Geocode    │
│   - Safety Evaluation   │ │   - Spatial Choke Nodes  │ │ - Polite 5s throttle │
│   - Place Tips          │ │   - India Grid Contours  │ │                      │
└─────────────────────────┘ └─────────────────────────┘ └──────────────────────┘
```

---

## 2. Component Hierarchy & Module Breakdown

- **`App.tsx`**: Root coordinator managing modal overlays, active city themes, location broadcast, and toast notifications.
  - **`Navbar.tsx`**: Compliant 3-zone header contract (Wordmark, single-line text links, single CTA).
  - **`Hero.tsx`**: Dynamic NLP search engine with typewriter prompts, quick queries, and instant route synthesis.
  - **`LiveLocationHub.tsx`**: Real geolocation engine (`#detect`, `#watch`, `#anchor`, `#stats`, `#status`, `#map`, `#presets`) integrated with Google Now ambient cards.
  - **`CivisLiveGpsStudio.tsx`**: Split-screen command center coupling Gemini 2.5 Flash with the Leaflet map and CARTO spatial server.
  - **`ImageComparison.tsx`**: Optical split slider verifying conventional unlit routes vs CIVIS high-lux safe corridors.
  - **`EnergyProcessorsGrid.tsx`**: Renewable micro-grid manager tracking kW flow, battery reserves, and lit blocks.
  - **`TacticalControlDeck.tsx`**: Tactical City OS settings panel for illumination lux, hazard exclusion buffers, and theme palettes.
  - **`DualRealityMap.tsx`**: Spatial toggle and split-screen comparing Safeguard Mode vs Explore Mode.
  - **`PredictiveRouting.tsx`**: Constellation Node Graph visualizer detailing multi-variable avoidance around choke points.
  - **`TemporalSlider.tsx`**: 4D chronological timeline modeling street hazard shifts from 8:30 AM to 3:00 AM.
  - **`ArUrbanExplorer.tsx`**: Smartphone AR camera mockup with holographic sidewalk footprints and heritage inspection cards.
  - **`VibeEngine.tsx`**: Real-time NLP sentiment stream scraper categorizing "Hectic vs. Peaceful" street vibes.
  - **`PageSpeedAudit.tsx`**: Built-in Core Web Vitals diagnostic benchmark tracking TTFB, FCP, LCP, and CLS.
  - **`TechStack.tsx`**: Architectural code viewer featuring production blueprints for CARTO MCP, Google Maps, Mapbox, and Gemini.
  - **`CtaSection.tsx`**: Manifesto card with download invitations for iOS and Android.
  - **`Footer.tsx`**: Quiet footer containing legal links, copyright, and regional acknowledgments.
  - **`CivisChatbot.tsx`**: Conversational assistant with automatic municipal ticket escalation and status tracking.
  - **`LegalModals.tsx`**: Comprehensive Privacy Policy (DPDP Act 2023) and Terms of Service dialogs.
  - **`CookieConsentBanner.tsx`**: Non-intrusive cookie consent banner with localStorage persistence.
  - **`NotFoundPage.tsx`**: Tactical 404 node recovery interface with one-click home grid recalibration.
  - **`analyticsService.ts`**: Zero-cookie privacy-preserving client analytics event logger.

---

## 3. Data Flow & Geospatial Pipelines

### 3.1 Geolocation Resolution
1. User clicks **"Detect my exact location"** (`#detect`).
2. Browser invokes `navigator.geolocation.getCurrentPosition` with high accuracy.
3. Coordinates (`latitude`, `longitude`, `accuracy`, `altitude`) populate the `#stats` panel.
4. If eligible (>5s since last call), Nominatim reverse-geocodes the location into a human-readable street name.
5. The embedded OpenStreetMap iframe and Leaflet map center onto the new coordinates.
6. The Google Now context cards dynamically re-calculate local illumination and energy processor metrics.

### 3.2 Gemini 2.5 Flash Query Pipeline
1. User provides a query (e.g., *"Safe historical spots with coffee nearby"*).
2. The query is packaged with the user's active coordinates and local time.
3. If an API key is present, the app calls `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`.
4. Response enforces `responseMimeType: "application/json"`.
5. If offline or without an API key, the deterministic Indian urban knowledge engine (`civisAiService.ts`) synthesizes a compliant response for Pune, Mumbai, Bengaluru, Hyderabad, or Delhi.
6. Recommended venues receive calculated geographical offsets and drop interactive markers on the Leaflet map.

### 3.3 CARTO Spatial MCP Server Connection
- **Endpoint:** `https://gcp-us-east1.api.carto.com/mcp/ac_7l2l64mp`
- **Protocol:** Model Context Protocol (MCP) spatial integration.
- **Tiles:** CartoDB Dark Matter, Voyager, and Positron raster layers.
- **Spatial Layers:** Renders high-collision choke centroids (e.g. Silk Board, Dadar TT, Hinjewadi) with caution radii and avoidance directives.

---

## 4. Security & Privacy Safeguards

- **Zero Secret Ingestion:** No private API keys or access tokens are baked into client-side bundles.
- **HTTPS Only:** Geolocation and external GIS APIs strictly mandate secure transport contexts.
- **Local Ephemeral State:** Coordinates are held in memory during the session; no passive background location telemetry is dispatched to remote tracking servers.

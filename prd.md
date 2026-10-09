# CIVIS AI – Product Requirements Document (PRD)

**Project Name:** CIVIS AI  
**Version:** 2.4.0 (India Smart City Edition)  
**Target Markets:** Pune, Mumbai, Bengaluru, Hyderabad, Delhi NCR  
**Status:** Production Ready  

---

## 1. Executive Summary & Vision

City navigation applications typically optimize solely for speed. In doing so, standard routing engines frequently direct pedestrians, cyclists, and motorists through poorly lit alleyways, high-collision intersections, and high-stress choke points just to save 40 seconds.

**CIVIS AI** re-architects urban navigation from the ground up to prioritize human safety, well-being, and genuine urban exploration. Tailored for Indian metropolitan centers, CIVIS fuses:
1. **Predictive Computer Vision & Incident Data:** Identifies historical Caution Corridors to detour around dangerous choke points (e.g., Silk Board in Bengaluru, Dadar TT Circle in Mumbai, Hinjewadi in Pune).
2. **Real-Time Vibe NLP Sentiment:** Scrapes geolocated micro-posts and reviews into live "Hectic vs. Peaceful" scores.
3. **Micro-Grid Energy Telemetry:** Tracks autonomous solar-powered streetlights and kinetic footfall harvesters to guarantee high-lumen (>100 Lux) night corridors.
4. **Google AI Studio Gemini 2.5 Flash:** Delivers structured, safety-conscious travel dossiers and contextual advice.
5. **CARTO Spatial Server Integration:** Connects to CARTO Model Context Protocol (MCP) geospatial clusters for Indian metropolitan grids.
6. **Integrated Chatbot & Municipal Ticket Escalation:** 24/7 assistant with automatic dispatch ticketing for unlit roads and hazards.

---

## 2. Target Personas

### Persona A: Solo Night Commuter (Pooja, 26, Pune)
- **Need:** Safe, well-lit pedestrian walking route from FC Road to Deccan Gymkhana after 10:30 PM.
- **Pain Point:** Navigation apps recommend dark, deserted alleyways to shave 2 minutes.
- **CIVIS Solution:** Automatically routes via verified 118+ Lux smart streetlights and active police foot-patrol corridors.

### Persona B: Tech Park Commuter (Arjun, 31, Bengaluru)
- **Need:** Avoid gridlocks and collision-heavy merges between Koramangala and HSR Layout.
- **Pain Point:** Silk Board junction consistently causes 45-minute choke delays with high two-wheeler conflict rates.
- **CIVIS Solution:** Proactive multi-variable detour with dynamic greenway alternatives.

### Persona C: Heritage & Culinary Explorer (Karan, 29, Mumbai)
- **Need:** Discover architectural gems and night food along Marine Drive and Fort safely.
- **CIVIS Solution:** Dual-Reality Map switching seamlessly between Safeguard Mode and Explore Mode, accompanied by AR viewfinders.

---

## 3. Functional Requirements

### 3.1 Live Location & Geolocation Engine
- Browser Geolocation API (`navigator.geolocation`) with high-accuracy GPS coordinates (`enableHighAccuracy: true`, `timeout: 15000ms`).
- Reverse geocoding via OpenStreetMap Nominatim with polite rate limiting (1 request per 5 seconds).
- Embedded interactive OpenStreetMap (`iframe` and Leaflet map) with bounding box math and coordinate markers.
- Fast preset switching between Indian hubs: Pune, Mumbai, Bengaluru, Hyderabad, and Delhi.

### 3.2 Gemini 2.5 Flash AI Engine
- Server-side and client-safe querying of Gemini 2.5 Flash.
- Strict JSON schema enforcement:
  - `locationSummary`: string
  - `safetyRating`: number (1.0 to 5.0)
  - `hecticScore`: "Chill" | "Moderate" | "Overcrowded"
  - `cautionCorridors`: string[]
  - `recommendations`: array of `{ name, category, description, safetyTip, estimatedDistance }`
  - `safeTravelAdvice`: string
- Fallback local deterministic knowledge engine ensuring 100% uptime if offline or during quota limits.

### 3.3 CARTO Spatial Server Integration
- Connected to CARTO Spatial Cloud MCP Endpoint: `https://gcp-us-east1.api.carto.com/mcp/ac_7l2l64mp`.
- Provides dynamic tile rendering: CARTO Dark Matter, CARTO Voyager, and CARTO Positron.
- Overlays Indian Caution Centroids directly on the Leaflet map with interactive popups.

### 3.4 Urban Energy Processors & Micro-Grid Vitality
- Live monitoring of renewable solar arrays and piezoelectric kinetic pavements across Indian smart city nodes.
- Energy mode toggle: *Max Illumination Priority (>125 Lux)*, *Balanced Dynamic Distribution*, and *Eco-Conservation*.
- Metric tracking: Real-time kW output, battery reserve percentage, lit blocks, and avoided CO2.

### 3.5 AI Chatbot with Municipal Ticket Escalation
- Floating 24/7 conversational assistant for doubts regarding routes, illumination, and features.
- Automated defect and hazard detection: flags unlit streets, broken lights, or potholes and automatically launches the ticket creation workflow.
- Generation of trackable municipal tickets (e.g. `CIVIS-TKT-PUN-8102`) with assigned city rapid response teams.
- "Raised Tickets" dashboard tab for real-time status tracking.
- Client-side form validation requiring verified Indian phone/email and minimum character thresholds.

### 3.6 Interactive Route Proof & Image Comparison
- Optical Before/After split comparison showcasing standard Dijkstra routing (unlit, high crash risk) vs CIVIS Safe Constellation routing (120+ Lux solar lighting, police booths).
- Interactive touch/drag slider with percentage telemetry and city-specific presets (Pune, Mumbai, Bengaluru, Hyderabad, Delhi).
- Accessible SVG schematics with rich descriptive `alt` text and ARIA labels.

### 3.7 Live Page Load Speed & Core Web Vitals Diagnostic Check
- Real-time performance measurement harnessing `performance.getEntriesByType('navigation')`.
- Telemetry breakdown: TTFB, First Contentful Paint (FCP), Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP).
- Interactive re-testing diagnostic engine bench-marking edge caching, HTTPS handshakes, and asset compression.

### 3.8 Legal Governance, DPDP Act & Cookie Consent
- Explicit consent collection via a non-intrusive floating Cookie Consent Banner with granular customization (Essential, Spatial Telemetry, Performance Analytics).
- Full legal disclosures via accessible modals:
  - **Privacy Policy:** Conforms to India's Digital Personal Data Protection (DPDP) Act 2023 and IT Act 2000, detailing ephemeral GPS handling and designated Data Grievance Officer contacts.
  - **Terms & Conditions:** Highlights the advisory nature of navigation AI and municipal dispatch SLAs.

### 3.9 Single Clear Call-to-Action (CTA) Architecture
- Cohesive, prominent Primary CTA ("Join Beta" / "Launch CIVIS India Co-Pilot") consistently anchored in Navbar, Hero, and Bottom Action decks.
- Strict anti-fragmentation: avoids conflicting primary actions to maximize conversion.

### 3.10 Custom 404 Geospatial Recovery Node
- Tactical error handling view triggered on non-existent routes or out-of-bounds geospatial nodes.
- Equipped with radar beacon graphic, diagnostics, and a one-click "Recalibrate to Home Grid" recovery control.

---

## 4. Non-Functional Requirements & Compliance

- **Performance:** First Contentful Paint (FCP) < 0.6s, zero layout shifts (CLS < 0.05).
- **Accessibility:** WCAG AA compliance (4.5:1 text contrast, accessible focus rings, ARIA roles on tabs, modals, and status regions).
- **Security:** Zero frontend secrets. API keys managed via environment variables or optional user inputs. HTTPS enforced across all endpoints.
- **Privacy:** Adheres to India's Digital Personal Data Protection (DPDP) Act 2023. No unauthorized location logging; cookie consent with explicit user choice.
- **Responsiveness:** Full responsive support from 320px mobile screens to 1440px+ desktop viewports.
- **Search Engine Optimization (SEO):** Full OpenGraph, Twitter card, Schema.org JSON-LD web application schema, `robots.txt`, and XML sitemap.

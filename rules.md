# CIVIS AI – Engineering, Design & Operational Rules

---

## 1. Zero-Secret & Security Constitution

1. **No Embedded Secrets:** NEVER commit or hardcode private API keys, service account credentials, or master secrets into frontend source files or public repositories.
2. **Environment Variable Hygiene:** Client-exposed configuration must use the `VITE_` prefix and contain only public routing keys or proxies. Secrets must remain exclusively in server environments (`.env`, Cloud Secret Manager).
3. **HTTPS Enforcement:** The application strictly enforces secure transport (`https://`) across all external API endpoints (CARTO, OpenStreetMap Nominatim, Google Gemini, and CDN assets).
4. **Input Sanitization:** All text inputs (search bar, chatbot prompt, municipal ticket reports) are trimmed and validated against script injection.

---

## 2. Design System & Anti-Slop Disciplines

1. **Zero-Pill Metadata Rule:** Static text metadata (timestamps, categories, scores, lux counts) must be rendered as clean, unboxed text with typographic separators (`·`, `/`, `-`). Never wrap non-interactive labels in pill badges or rounded chips.
2. **Interactive Controls Only as Buttons:** Segmented filters, city pickers, and mode switches are functional `<button>` elements with distinct active/pressed states.
3. **Natural Editorial Prose:** No code-comment headers (`// 01 ARCHITECTURE`), fake compiler tags (`SYNTHEX v4.2`), or mechanical snake-case titles. Use clean title-case headings.
4. **Contrast & Typographic Math:**
   - Text contrast must exceed WCAG AA standards (4.5:1 for body copy, 3:1 for large display titles).
   - Display face: `Outfit` / `Plus Jakarta Sans`.
   - Telemetry figures: `Space Mono` or `tabular-nums` for consistent tabular vertical alignment.
5. **No Decorative Pulsing Dots on Static Content:** Pulsing indicators are strictly reserved for live network activity (e.g. active GPS acquisition, live CARTO server connection).
6. **Single-Line Controls:** Button labels, tab titles, and chips must remain on a single line (`whitespace-nowrap shrink-0`).

---

## 3. Privacy, DPDP Act & Cookie Compliance

1. **Explicit Location Permission:** Location access is requested exclusively upon user interaction with the "Detect my exact location" or "Track live movement" controls.
2. **Polite API Throttling:** Reverse geocoding calls to OpenStreetMap Nominatim enforce a minimum interval of 5,000ms between calls to avoid server abuse.
3. **Cookie Governance:** A visible Cookie Consent Banner is displayed to users on first visit. Cookies are categorized into *Essential (Functional)* and *Spatial Analytics*. Preferences are saved locally via `localStorage`.
4. **Right to Data Erasure:** Municipal tickets and local session storage can be cleared by the user at any time.

---

## 4. Performance & Viewport Budgets

1. **Mobile Sticky Constraint:** Combined sticky surfaces (top bar + bottom action prompts) must never exceed 15% of the mobile viewport height.
2. **Interaction Latency:** UI state changes, map marker updates, and modal transitions must settle in under 200ms.
3. **Zero Broken Assets:** All external assets (maps, tiles, icons) must have graceful fallbacks (e.g. offline deterministic engine for Gemini, fallback vector grid for Leaflet).

---

## 5. Conversion, Form Validation & Link Integrity

1. **Single Clear CTA Principle:** Keep primary conversion paths unambiguous. The primary call-to-action ("Join Beta" / "Launch CIVIS India Co-Pilot") takes visual precedence with consistent styling across the top bar, hero section, and bottom action deck.
2. **Zero Broken Anchor Links:** Every internal navigation anchor (`href="#..."`) must resolve to a valid element in the DOM with an identical `id`. External links must open safely with `rel="noopener noreferrer"`.
3. **Strict Form Validation:** All interactive forms (Beta pass signup, municipal ticket escalation) must provide real-time inline validation feedback:
   - Full name required (>= 2 characters)
   - Valid RFC-compliant email address structure
   - Valid 10-digit Indian mobile format or email for SMS/ticket dispatch
   - Clear terms acceptance checkbox before submission.
4. **Accessible Media Alt Text:** Every image, SVG diagram, and visual illustration must possess descriptive `alt` text or ARIA roles describing the visual comparison or diagram content.

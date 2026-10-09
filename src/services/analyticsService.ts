/**
 * CIVIS AI - Privacy-Preserving Client Analytics Service
 * Adheres to India DPDP Act 2023 & Global Privacy Controls.
 * Strictly respects user cookie preferences stored in localStorage.
 */

export type AnalyticsEventType =
  | 'page_view'
  | 'geolocation_detected'
  | 'city_preset_selected'
  | 'ai_route_searched'
  | 'energy_mode_changed'
  | 'map_mode_switched'
  | 'ticket_raised'
  | 'beta_registered'
  | 'image_comparison_used'
  | 'carto_layer_toggled'
  | 'speed_test_run';

export interface AnalyticsEvent {
  event: AnalyticsEventType;
  timestamp: string;
  payload?: Record<string, any>;
}

const STORAGE_KEY_CONSENT = 'civis_cookie_consent_v1';
const STORAGE_KEY_EVENTS = 'civis_ephemeral_analytics_log';

class AnalyticsService {
  private isAllowed(): boolean {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CONSENT);
      if (!stored) return false;
      const consent = JSON.parse(stored);
      return Boolean(consent.analyticsAllowed);
    } catch {
      return false;
    }
  }

  public track(event: AnalyticsEventType, payload?: Record<string, any>) {
    if (!this.isAllowed()) {
      return; // Privacy respected, drop event
    }

    const item: AnalyticsEvent = {
      event,
      timestamp: new Date().toISOString(),
      payload
    };

    try {
      const existingRaw = sessionStorage.getItem(STORAGE_KEY_EVENTS);
      const list: AnalyticsEvent[] = existingRaw ? JSON.parse(existingRaw) : [];
      list.push(item);
      // Keep only last 50 events in session memory
      if (list.length > 50) list.shift();
      sessionStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(list));
    } catch {
      // Storage unavailable or disabled
    }
  }

  public getSessionEvents(): AnalyticsEvent[] {
    try {
      const existingRaw = sessionStorage.getItem(STORAGE_KEY_EVENTS);
      return existingRaw ? JSON.parse(existingRaw) : [];
    } catch {
      return [];
    }
  }

  public clearAllEvents() {
    try {
      sessionStorage.removeItem(STORAGE_KEY_EVENTS);
    } catch {
      // No-op
    }
  }
}

export const analytics = new AnalyticsService();

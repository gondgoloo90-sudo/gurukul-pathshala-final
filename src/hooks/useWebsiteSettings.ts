import { useEffect, useState } from 'react';
import { getWebsiteSettings, subscribeToWebsiteSettings, type WebsiteSettings } from '../services/websiteSettingsService';

/**
 * Gives any component the live Website Control Panel settings.
 * Automatically re-renders the component when the Admin saves or
 * resets settings (same tab via a custom event, other tabs via the
 * native `storage` event) — no page reload required.
 */
export function useWebsiteSettings(): WebsiteSettings {
  const [settings, setSettings] = useState<WebsiteSettings>(() => getWebsiteSettings());

  useEffect(() => subscribeToWebsiteSettings(() => setSettings(getWebsiteSettings())), []);

  return settings;
}

/**
 * Website Settings Service
 * ------------------------------------------------------------
 * Single source of truth for everything the "Website Control Panel"
 * (Admin-only) lets a non-technical admin edit: branding, homepage
 * copy, gallery/banner images, contact info and SEO tags.
 *
 * Today this persists to localStorage so the demo works with zero
 * backend. Every function is written so a real backend can be
 * plugged in later WITHOUT changing any component that calls it —
 * see the "BACKEND TODO" comments.
 *
 * Production note: image fields currently store base64 data URLs
 * (demo-only). In production these should upload to Cloudinary/S3/
 * server storage and store the returned URL instead.
 */
import { schoolConfig } from '../config/schoolData';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export interface WebsiteSettings {
  branding: {
    schoolName: string;
    logoUrl: string;
    faviconUrl: string;
    primaryColor: string;
    secondaryColor: string;
    heroBackgroundImage: string;
  };
  homepage: {
    heroTitle: string;
    heroSubtitle: string;
    ctaText: string;
    ctaLink: string;
    aboutText: string;
    featuresText: string;
  };
  gallery: {
    images: GalleryImage[];
    banners: GalleryImage[];
  };
  contact: {
    address: string;
    phone: string;
    whatsapp: string;
    email: string;
    googleMapLink: string;
    social: {
      facebook: string;
      instagram: string;
      twitter: string;
      youtube: string;
    };
  };
  seo: {
    title: string;
    metaDescription: string;
    keywords: string;
    ogImage: string;
  };
}

// Defaults are derived from the existing schoolConfig + current landing
// page copy, so turning this feature on changes NOTHING visually until
// an admin actually edits and saves something.
export const defaultWebsiteSettings: WebsiteSettings = {
  branding: {
    schoolName: schoolConfig.schoolName,
    logoUrl: schoolConfig.logo.src,
    faviconUrl: '/logo.svg.png',
    primaryColor: '#DC2626',
    secondaryColor: '#030712',
    heroBackgroundImage: '',
  },
  homepage: {
    heroTitle: 'School Website + Smart School ERP',
    heroSubtitle:
      'Gurukul Pathshala ki official school website — admission inquiry, WhatsApp lead, notice board, gallery aur Admin/Teacher/Student School ERP — sab ek hi professional platform par.',
    ctaText: 'Admission Inquiry',
    ctaLink: '#admission',
    aboutText: schoolConfig.shortDescription,
    featuresText: 'Gurukul Pathshala School ERP se admission, attendance, fees aur results — sab digitally manage hote hain.',
  },
  gallery: {
    images: schoolConfig.gallery.map((img, index) => ({ id: `gal-${index + 1}`, src: img.src, alt: img.alt })),
    banners: [],
  },
  contact: {
    address: schoolConfig.contact.address,
    phone: schoolConfig.contact.phone,
    whatsapp: schoolConfig.contact.whatsapp,
    email: schoolConfig.contact.email,
    googleMapLink: schoolConfig.contact.googleMapLink,
    social: { ...schoolConfig.socialMedia },
  },
  seo: {
    title: 'Gurukul Pathshala - Where Tradition Meets Modern Education',
    metaDescription:
      'Gurukul Pathshala - Where Tradition Meets Modern Education. Quality education from Nursery to Class 8 in Varanasi, Uttar Pradesh.',
    keywords: 'school, education, Gurukul Pathshala, Varanasi, admission, nursery, primary school',
    ogImage: schoolConfig.logo.src,
  },
};

const STORAGE_KEY = 'gurukul-website-settings-v1';
const CHANGE_EVENT = 'gurukul-website-settings-changed';

function readStoredSettings(): Partial<WebsiteSettings> | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<WebsiteSettings>) : null;
  } catch {
    return null;
  }
}

/** Merges saved data over defaults so new fields added later always have a safe fallback. */
function mergeWithDefaults(partial: Partial<WebsiteSettings> | null): WebsiteSettings {
  if (!partial) return defaultWebsiteSettings;
  return {
    branding: { ...defaultWebsiteSettings.branding, ...partial.branding },
    homepage: { ...defaultWebsiteSettings.homepage, ...partial.homepage },
    gallery: {
      images: partial.gallery?.images ?? defaultWebsiteSettings.gallery.images,
      banners: partial.gallery?.banners ?? defaultWebsiteSettings.gallery.banners,
    },
    contact: {
      ...defaultWebsiteSettings.contact,
      ...partial.contact,
      social: { ...defaultWebsiteSettings.contact.social, ...partial.contact?.social },
    },
    seo: { ...defaultWebsiteSettings.seo, ...partial.seo },
  };
}

/**
 * Reads current website settings (saved settings merged over safe defaults).
 * BACKEND TODO: replace with `const res = await fetch('/api/website-settings'); return res.json();`
 */
export function getWebsiteSettings(): WebsiteSettings {
  return mergeWithDefaults(readStoredSettings());
}

/**
 * Persists website settings.
 * BACKEND TODO: replace with `await fetch('/api/website-settings', { method: 'PUT', body: JSON.stringify(settings) });`
 */
export function saveWebsiteSettings(settings: WebsiteSettings): WebsiteSettings {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  return settings;
}

/** Restores every field back to the built-in defaults. */
export function resetWebsiteSettings(): WebsiteSettings {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  return defaultWebsiteSettings;
}

/**
 * Subscribes to changes so any mounted component (Admin panel, landing
 * page) re-reads settings instantly after a save/reset — including
 * across browser tabs via the native `storage` event.
 */
export function subscribeToWebsiteSettings(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

/** Reads an uploaded File as a base64 data URL for demo-only image preview/storage. */
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

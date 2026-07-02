/**
 * Day 4 API Service Layer
 * ------------------------------------------------------------
 * This file keeps the ERP frontend backend-ready. Today the app
 * uses localStorage demo data, but tomorrow these functions can
 * call Firebase, Supabase, Express, or any REST backend without
 * changing page components.
 */

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'local-demo';

const delay = (ms = 250) => new Promise((resolve) => window.setTimeout(resolve, ms));

export const apiClient = {
  baseUrl: API_BASE_URL,

  async get<T>(storageKey: string, fallback: T): Promise<ApiResponse<T>> {
    await delay();
    if (API_BASE_URL === 'local-demo') {
      const raw = window.localStorage.getItem(storageKey);
      return { success: true, data: raw ? JSON.parse(raw) as T : fallback, message: 'Loaded from local demo store' };
    }

    const response = await fetch(`${API_BASE_URL}/${storageKey}`);
    if (!response.ok) throw new Error(`GET ${storageKey} failed`);
    return { success: true, data: await response.json() as T };
  },

  async save<T>(storageKey: string, data: T): Promise<ApiResponse<T>> {
    await delay();
    if (API_BASE_URL === 'local-demo') {
      window.localStorage.setItem(storageKey, JSON.stringify(data));
      return { success: true, data, message: 'Saved in local demo store' };
    }

    const response = await fetch(`${API_BASE_URL}/${storageKey}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`SAVE ${storageKey} failed`);
    return { success: true, data: await response.json() as T };
  },
};

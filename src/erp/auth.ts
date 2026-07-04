/**
 * ERP Auth Module
 * ------------------------------------------------------------
 * Centralised, backend-ready authentication logic for the login flow.
 * Today it validates against a local mock account list, but every
 * function here is written so it can be swapped for a real API call
 * (Firebase/Supabase/Express/etc.) later WITHOUT changing any UI code.
 *
 * Swap points are marked with "BACKEND TODO".
 */
import type { UserRole } from './types';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface MockAccount extends AuthUser {
  password: string;
}

// BACKEND TODO: remove this list once a real /auth/login API is available.
const MOCK_ACCOUNTS: MockAccount[] = [
  { id: 'admin-01', email: 'admin@gurukul.com', password: '123456', name: 'School Admin', role: 'admin' },
  { id: 'teacher-01', email: 'teacher@gurukul.com', password: '123456', name: 'Anita Sharma', role: 'teacher' },
  { id: 'student-01', email: 'student@gurukul.com', password: '123456', name: 'Rohan Verma', role: 'student' },
];

const SESSION_KEY = 'gurukul-auth-session';
const LEGACY_ROLE_KEY = 'gurukul-active-role';

export type LoginResult = { success: true; user: AuthUser } | { success: false; error: string };

export type OtpResult = { success: boolean; message: string };

const delay = (ms = 500) => new Promise((resolve) => window.setTimeout(resolve, ms));

/**
 * Validates email + password + selected role.
 *
 * BACKEND TODO: replace the body with something like:
 *   const res = await fetch(`${API_BASE_URL}/auth/login`, {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ email, password, role }),
 *   });
 *   const json = await res.json();
 *   return res.ok ? { success: true, user: json.user } : { success: false, error: json.message };
 */
export async function loginRequest(email: string, password: string, role: UserRole): Promise<LoginResult> {
  await delay();

  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !password) {
    return { success: false, error: 'Please enter both email and password.' };
  }

  const account = MOCK_ACCOUNTS.find((acc) => acc.email.toLowerCase() === normalizedEmail);

  if (!account || account.password !== password) {
    return { success: false, error: 'Invalid email or password. Please try again.' };
  }

  if (account.role !== role) {
    return { success: false, error: 'This account is not allowed for selected role.' };
  }

  const { password: _password, ...user } = account;
  return { success: true, user };
}

/**
 * Demo OTP request. Kept async + result-shaped so a real SMS/email
 * OTP API can be dropped in later without touching the UI.
 * BACKEND TODO: call `${API_BASE_URL}/auth/send-otp` here.
 */
export async function requestOtp(contact: string): Promise<OtpResult> {
  await delay(400);
  if (!contact.trim()) {
    return { success: false, message: 'Please enter a registered email or mobile number.' };
  }
  return { success: true, message: `OTP sent to ${contact}.` };
}

/**
 * Demo OTP verification.
 * BACKEND TODO: call `${API_BASE_URL}/auth/verify-otp` here.
 */
export async function verifyOtp(otp: string): Promise<OtpResult> {
  await delay(400);
  if (otp.trim().length !== 6 || !/^\d{6}$/.test(otp.trim())) {
    return { success: false, message: 'Enter the 6-digit OTP sent to you.' };
  }
  return { success: true, message: 'OTP verified successfully.' };
}

// ---------------------------------------------------------------
// Session management (localStorage by default, sessionStorage for
// "don't remember me" style short sessions). Structure kept simple
// so it can be swapped for httpOnly cookies / JWT later.
// ---------------------------------------------------------------

export function saveSession(user: AuthUser, remember: boolean = true): void {
  const activeStorage = remember ? window.localStorage : window.sessionStorage;
  const inactiveStorage = remember ? window.sessionStorage : window.localStorage;
  activeStorage.setItem(SESSION_KEY, JSON.stringify(user));
  inactiveStorage.removeItem(SESSION_KEY);
}

export function getSession(): AuthUser | null {
  const raw = window.localStorage.getItem(SESSION_KEY) ?? window.sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as AuthUser;
    if (parsed && (parsed.role === 'admin' || parsed.role === 'teacher' || parsed.role === 'student')) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
  window.localStorage.removeItem(LEGACY_ROLE_KEY); // cleanup from older versions
}

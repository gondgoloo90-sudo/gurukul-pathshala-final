/**
 * Google Sign-In (Google Identity Services) helper.
 * ------------------------------------------------------------
 * Uses Google's official "Sign in with Google" JS library (loaded at
 * runtime, no npm dependency needed). Works for both "Sign in" and
 * "Sign up" — Google itself doesn't distinguish the two; a brand new
 * Google account simply becomes a brand new user on first click.
 *
 * SETUP REQUIRED (does nothing until this is done):
 * 1. Go to https://console.cloud.google.com/apis/credentials
 * 2. Create an "OAuth 2.0 Client ID" -> Application type: "Web application"
 * 3. Under "Authorized JavaScript origins" add:
 *      - https://gurukul-pathshala-offi.netlify.app  (your live site)
 *      - http://localhost:5173                        (local dev)
 * 4. Copy the generated Client ID.
 * 5. In Netlify: Site settings -> Environment variables -> add
 *      VITE_GOOGLE_CLIENT_ID = <your client id>
 *    (For local dev, put the same in a .env file at the project root.)
 * 6. Redeploy. The "Continue with Google" button will start working.
 *
 * BACKEND TODO: right now the decoded token is trusted on the client,
 * which is fine for a demo but NOT secure for production. Once a real
 * backend exists, send `credential` (the raw JWT) to your server and
 * verify it there (Google's tokeninfo endpoint or a server-side
 * google-auth-library), then issue your own session — don't trust the
 * decoded payload in the browser for anything sensitive.
 */

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? '';

export interface GoogleProfile {
  sub: string;
  email: string;
  name: string;
  picture?: string;
  email_verified?: boolean;
}

let scriptPromise: Promise<void> | null = null;

function loadGoogleScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (document.getElementById('google-identity-script')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.id = 'google-identity-script';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Sign-In script.'));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

// Decodes the JWT payload without verifying the signature.
// Safe for demo display purposes only (see BACKEND TODO above).
function decodeJwtPayload(token: string): GoogleProfile {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const json = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  );
  return JSON.parse(json) as GoogleProfile;
}

/**
 * Renders Google's official button into the given container element and
 * resolves with the decoded profile once the user completes sign-in.
 * Rejects if VITE_GOOGLE_CLIENT_ID isn't configured or the script fails.
 */
export function renderGoogleButton(
  container: HTMLElement,
  onSuccess: (profile: GoogleProfile) => void,
  onError: (message: string) => void
): void {
  if (!GOOGLE_CLIENT_ID) {
    onError('not-configured');
    return;
  }

  loadGoogleScript()
    .then(() => {
      const google = (window as unknown as { google?: any }).google;
      if (!google?.accounts?.id) {
        onError('Google Sign-In failed to load. Please check your internet connection.');
        return;
      }

      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: { credential: string }) => {
          try {
            const profile = decodeJwtPayload(response.credential);
            onSuccess(profile);
          } catch {
            onError('Could not read your Google account details. Please try again.');
          }
        },
      });

      container.innerHTML = '';
      google.accounts.id.renderButton(container, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        shape: 'pill',
        width: 320,
        text: 'continue_with',
      });
    })
    .catch(() => onError('Google Sign-In failed to load. Please check your internet connection.'));
}

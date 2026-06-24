import { apiClient } from '@/src/lib/api-client';
import type { AuthResponse, LoginPayload, RegisterPayload } from '../types/auth.types';

const TOKEN_EXPIRY_KEY = 'token_expiry';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Clears the JS-accessible session indicator cookie on logout.
 * The HttpOnly auth cookie is cleared server-side via /api/auth/logout.
 */
function clearSessionCookie(): void {
  document.cookie = 'session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict';
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/login', payload);
    const expiresAt = Date.now() + response.expiresIn * 1000;
    localStorage.setItem(TOKEN_EXPIRY_KEY, String(expiresAt));
    return response;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/register', payload);
    const expiresAt = Date.now() + response.expiresIn * 1000;
    localStorage.setItem(TOKEN_EXPIRY_KEY, String(expiresAt));
    return response;
  },

  // Token lives in an HttpOnly cookie — not readable from JS.
  // Components that need to make authenticated API calls should use
  // apiClient directly; the cookie is sent automatically with each request.
  getToken: (): string | null => null,

  /**
   * logout
   *
   * 1. Fires a server-side token revocation request (fire-and-forget).
   *    A network failure NEVER blocks the client-side logout.
   * 2. Clears the JS-accessible session indicator cookie.
   *    The HttpOnly auth cookie is expired by the server response.
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/api/auth/logout', {});
    } catch {
      // Intentionally swallowed — client logout must always complete.
    } finally {
      clearSessionCookie();
    }
  },

  // Session validity is enforced by middleware.ts checking the HttpOnly 'session' cookie.
  // This client-side check reads the non-HttpOnly session indicator cookie if present.
  isAuthenticated: (): boolean => {
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiry) return false;
    return Date.now() < Number(expiry);
  },
};
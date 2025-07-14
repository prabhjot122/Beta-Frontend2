// Authentication utilities for JWT token management and admin authentication

import { STORAGE_KEYS, BACKEND_CONFIG } from './constants';
import type { AdminCredentials, AdminTokenResponse } from './types';

export interface TokenData {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number; // Calculated expiration timestamp
}

export class AuthManager {
  private static instance: AuthManager;
  private tokenData: TokenData | null = null;
  private initialized = false;

  private constructor() {
    // Don't load token during construction to avoid SSR issues
  }

  public static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  /**
   * Initialize the auth manager (only in browser)
   */
  private initialize(): void {
    if (!this.initialized && this.isBrowser()) {
      this.loadTokenFromStorage();
      this.initialized = true;
    }
  }

  /**
   * Check if we're in a browser environment
   */
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  /**
   * Load token from localStorage
   */
  private loadTokenFromStorage(): void {
    if (!this.isBrowser()) {
      return; // Skip during SSR
    }

    try {
      const storedToken = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
      if (storedToken) {
        const tokenData = JSON.parse(storedToken) as TokenData;

        // Check if token is still valid
        if (this.isTokenValid(tokenData)) {
          this.tokenData = tokenData;
        } else {
          // Remove expired token
          this.clearToken();
        }
      }
    } catch (error) {
      console.error('Error loading token from storage:', error);
      this.clearToken();
    }
  }

  /**
   * Save token to localStorage
   */
  private saveTokenToStorage(tokenData: TokenData): void {
    if (!this.isBrowser()) {
      return; // Skip during SSR
    }

    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, JSON.stringify(tokenData));
    } catch (error) {
      console.error('Error saving token to storage:', error);
    }
  }

  /**
   * Check if token is valid (not expired)
   */
  private isTokenValid(tokenData: TokenData): boolean {
    return Date.now() < tokenData.expires_at;
  }

  /**
   * Set authentication token
   */
  public setToken(response: AdminTokenResponse): void {
    this.initialize(); // Ensure we're initialized

    const expiresAt = Date.now() + (response.expires_in * 1000);

    this.tokenData = {
      access_token: response.access_token,
      token_type: response.token_type,
      expires_in: response.expires_in,
      expires_at: expiresAt
    };

    this.saveTokenToStorage(this.tokenData);
  }

  /**
   * Get current authentication token
   */
  public getToken(): string | null {
    this.initialize(); // Ensure we're initialized

    if (this.tokenData && this.isTokenValid(this.tokenData)) {
      return this.tokenData.access_token;
    }

    // Token is expired or doesn't exist
    this.clearToken();
    return null;
  }

  /**
   * Get authorization header value
   */
  public getAuthHeader(): string | null {
    const token = this.getToken();
    return token ? `Bearer ${token}` : null;
  }

  /**
   * Check if user is authenticated
   */
  public isAuthenticated(): boolean {
    this.initialize(); // Ensure we're initialized
    return this.getToken() !== null;
  }

  /**
   * Clear authentication token
   */
  public clearToken(): void {
    this.tokenData = null;
    if (this.isBrowser()) {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
    }
  }

  /**
   * Get token expiration time
   */
  public getTokenExpiration(): Date | null {
    this.initialize(); // Ensure we're initialized
    if (this.tokenData) {
      return new Date(this.tokenData.expires_at);
    }
    return null;
  }

  /**
   * Get time until token expires (in seconds)
   */
  public getTimeUntilExpiration(): number {
    this.initialize(); // Ensure we're initialized
    if (this.tokenData) {
      return Math.max(0, Math.floor((this.tokenData.expires_at - Date.now()) / 1000));
    }
    return 0;
  }

  /**
   * Check if token will expire soon (within 5 minutes)
   */
  public isTokenExpiringSoon(): boolean {
    const timeUntilExpiration = this.getTimeUntilExpiration();
    return timeUntilExpiration > 0 && timeUntilExpiration < 300; // 5 minutes
  }
}

/**
 * Validate admin credentials format
 */
export function validateCredentials(credentials: AdminCredentials): string[] {
  const errors: string[] = [];

  if (!credentials.username.trim()) {
    errors.push('Username is required');
  }

  if (!credentials.password.trim()) {
    errors.push('Password is required');
  }

  if (credentials.username.length > 50) {
    errors.push('Username must be less than 50 characters');
  }

  if (credentials.password.length > 100) {
    errors.push('Password must be less than 100 characters');
  }

  return errors;
}

/**
 * Get singleton auth manager instance (lazy-loaded for browser compatibility)
 */
let authManagerInstance: AuthManager | null = null;

export const getAuthManager = (): AuthManager => {
  if (!authManagerInstance) {
    authManagerInstance = AuthManager.getInstance();
  }
  return authManagerInstance;
};

/**
 * Safe auth helper that only works in browser
 */
const safeAuth = {
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    return getAuthManager().isAuthenticated();
  },

  getAuthHeader: (): string | null => {
    if (typeof window === 'undefined') return null;
    return getAuthManager().getAuthHeader();
  },

  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return getAuthManager().getToken();
  },

  setToken: (response: AdminTokenResponse): void => {
    if (typeof window === 'undefined') return;
    getAuthManager().setToken(response);
  },

  logout: (): void => {
    if (typeof window === 'undefined') return;
    getAuthManager().clearToken();
  },

  getTokenInfo: () => {
    if (typeof window === 'undefined') {
      return {
        expiresAt: null,
        timeUntilExpiration: 0,
        isExpiringSoon: false
      };
    }
    const manager = getAuthManager();
    return {
      expiresAt: manager.getTokenExpiration(),
      timeUntilExpiration: manager.getTimeUntilExpiration(),
      isExpiringSoon: manager.isTokenExpiringSoon()
    };
  }
};

/**
 * Authentication helper functions (SSR-safe)
 */
export const auth = safeAuth;

/**
 * Default admin credentials (matching backend config)
 */
export const DEFAULT_ADMIN_CREDENTIALS = {
  username: BACKEND_CONFIG.ADMIN_USERNAME,
  password: 'admin123' // This should match config.py admin_password
};

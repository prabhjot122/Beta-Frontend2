var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, useNavigate } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import React, { useState, useEffect, useCallback } from "react";
import "clsx";
import axios from "axios";
import Analytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Merriweather"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const ASSETS = {
  LOGO: "/logo.png",
  VIDEO: "/VIDEO.mp4"
};
const Z_INDEX = {
  BACKGROUND: -1
};
const API_BASE_URL = `https://lawvriksh.com`;
const API_ENDPOINTS = {
  // Authentication
  ADMIN_LOGIN: "/api/auth/adminlogin",
  ADMIN_VERIFY: "/api/auth/verify",
  // User Management
  REGISTER_USER: "/api/users/userdata",
  REGISTER_CREATOR: "/api/users/creatordata",
  GET_USERS: "/api/users/registereduserdata",
  GET_CREATORS: "/api/users/registeredcreatordata",
  USER_ANALYTICS: "/api/users/analytics",
  // Not Interested
  SUBMIT_NOT_INTERESTED: "/api/users/notinteresteddata",
  // Feedback
  SUBMIT_FEEDBACK: "/api/feedback/submit",
  GET_FEEDBACK: "/api/feedback/all",
  FEEDBACK_ANALYTICS: "/api/feedback/analytics",
  FEEDBACK_SUMMARY: "/api/feedback/summary",
  // Data Export & Analytics
  DOWNLOAD_DATA: "/api/data/downloaddata",
  EXPORT_JSON: "/api/data/export/json",
  GET_STATS: "/api/data/stats",
  EXPORT_NOT_INTERESTED: "/api/data/export/notintdata",
  // Health Check
  HEALTH_CHECK: "/health"
};
const STORAGE_KEYS = {
  ADMIN_TOKEN: "lawvriksh_admin_token",
  USER_PREFERENCES: "lawvriksh_user_preferences",
  FORM_DRAFTS: "lawvriksh_form_drafts"
};
const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  VALIDATION_ERROR: "Please check your input and try again.",
  UNAUTHORIZED: "You are not authorized to access this resource.",
  SERVER_ERROR: "Server error. Please try again later.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again."
};
const SUCCESS_MESSAGES = {
  REGISTRATION_SUCCESS: "Thank you for joining our waiting list! We'll be in touch soon.",
  FEEDBACK_SUCCESS: "Thank you for your valuable feedback! Your input helps us improve our platform.",
  NOT_INTERESTED_SUCCESS: "Thank you for your time and feedback."
};
function Header({ onViewMoreClick }) {
  return /* @__PURE__ */ jsxs("header", { className: "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 bg-transparent backdrop-blur-sm", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: ASSETS.LOGO,
        alt: "LawVriksh Logo",
        className: "h-12 sm:h-14 md:h-16 w-auto object-contain"
      }
    ) }),
    /* @__PURE__ */ jsx("nav", { className: "flex items-center", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onViewMoreClick,
        className: "px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-transparent text-[#D4AF37] font-montserrat font-medium text-sm sm:text-base md:text-lg rounded-[4px] border-[3px] border-[#D4AF37] cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-105 relative before:absolute before:inset-[-3px]  before:z-[-1] before:brightness-75 before:contrast-125",
        children: "Give Suggestions"
      }
    ) })
  ] });
}
const POPUP_STYLES = {
  overlay: "fixed inset-0 bg-gradient-to-br from-law-dark/60 via-black/50 to-blue-900/40 flex items-center justify-center z-50 backdrop-blur-xl p-4",
  container: " backdrop-blur-2xl rounded-3xl p-6 sm:p-8 md:p-10 max-w-lg w-full max-h-[90vh] sm:max-h-[80vh] overflow-y-auto popup-scroll relative shadow-2xl border border-white/20",
  containerBorder: "before:absolute before:inset-[-1px]  before:rounded-3xl before:z-[-1] before:blur-sm",
  close: "absolute top-4 right-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full w-8 h-8 flex items-center justify-center text-lg cursor-pointer text-white/80 hover:text-white hover:bg-white/20 transition-all font-montserrat hover:scale-110",
  title: "bg-gradient-to-r from-law-gold via-yellow-300 to-law-gold bg-clip-text text-transparent font-merriweather font-bold text-2xl sm:text-3xl mb-6 sm:mb-8 text-center drop-shadow-lg",
  form: "flex flex-col gap-5 sm:gap-6",
  formGroup: "flex flex-col gap-2.5",
  label: "font-montserrat font-semibold text-sm sm:text-base text-white/90 tracking-wide drop-shadow-sm",
  input: "p-3 sm:p-4 border border-white/20 rounded-xl text-sm sm:text-base bg-white/10 backdrop-blur-md text-white placeholder-white/60 transition-all focus:outline-none focus:border-law-gold/60 focus:ring-2 focus:ring-law-gold/30 focus:bg-white/15 font-source-sans-pro shadow-inner",
  textarea: "p-3 sm:p-4 border border-white/20 rounded-xl text-sm sm:text-base bg-white/10 backdrop-blur-md text-white placeholder-white/60 transition-all focus:outline-none focus:border-law-gold/60 focus:ring-2 focus:ring-law-gold/30 focus:bg-white/15 resize-vertical min-h-[100px] font-source-sans-pro shadow-inner",
  select: "p-3 sm:p-4 border border-white/20 rounded-xl text-sm sm:text-base bg-gray-800 text-white transition-all focus:outline-none focus:border-law-gold/60 focus:ring-2 focus:ring-law-gold/30 focus:bg-gray-900 font-source-sans-pro shadow-inner appearance-none",
  button: "p-4 sm:p-5 border-none rounded-xl bg-gradient-to-r from-law-gold/90 via-yellow-400/90 to-law-gold/90 backdrop-blur-sm text-black font-montserrat font-semibold text-base sm:text-lg cursor-pointer transition-all hover:scale-105 hover:shadow-2xl hover:from-law-gold hover:to-yellow-400 mt-4 shadow-xl border border-white/30"
};
const FEATURES = [
  {
    title: "Profit-Oriented Credit System",
    description: "Empower legal bloggers with a structured, revenue-generating credit and reward system."
  },
  {
    title: "AI-Assisted Blog Reader Tools",
    description: "Smart Listener converts blog posts into audio for hands-free reading. AI Summarizer provides concise summaries of long legal blogs. Content Highlighter automatically highlights key legal points, references, and arguments."
  },
  {
    title: "AI-Powered Blog Writing Assistance",
    description: "SEO Optimizer enhances blog visibility with AI-driven SEO recommendations. Humanizer refines AI-generated content to sound more natural and personal. Outline Generator creates structured blog outlines based on legal topics."
  },
  {
    title: "Research Mode for Legal Blog Writing",
    description: "Integrated AI tools to conduct topic-specific legal research and cite authoritative sources while writing."
  },
  {
    title: "Digital Presence Enhancement",
    description: "Multiple Themes – Choose from customizable themes tailored for legal professionals. Profile Management – Manage, update, and showcase your legal blogging profile. AI-Powered Profile Writer – Automatically drafts compelling bios and profile descriptions."
  },
  {
    title: "Build & Grow Your Legal Blogging Community",
    description: "Writer Interaction – Connect, follow, and engage with your favorite legal authors. Get Noticed – Boost visibility within the community through quality content and engagement."
  }
];
const GENDER_OPTIONS = [
  { value: "", label: "Select Gender" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
  { value: "Prefer not to say", label: "Prefer not to say" }
];
const PROFESSION_OPTIONS = [
  { value: "", label: "Select Profession" },
  { value: "Student", label: "Student" },
  { value: "Lawyer", label: "Lawyer" },
  { value: "Other", label: "Other" }
];
const NOT_INTERESTED_REASON_OPTIONS = [
  { value: "", label: "Select Reason" },
  { value: "Too complex", label: "Too complex" },
  { value: "Not relevant", label: "Not relevant" },
  { value: "Other", label: "Other" }
];
const YES_NO_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" }
];
const AI_TOOLS_FREQUENCY_OPTIONS = [
  { value: "never", label: "Never" },
  { value: "rarely", label: "Rarely" },
  { value: "sometimes", label: "Sometimes" },
  { value: "often", label: "Often" },
  { value: "always", label: "Always" }
];
const RATING_SCALE = [1, 2, 3, 4, 5];
const RATING_LABELS = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent"
};
const _AuthManager = class _AuthManager {
  constructor() {
    __publicField(this, "tokenData", null);
    __publicField(this, "initialized", false);
  }
  static getInstance() {
    if (!_AuthManager.instance) {
      _AuthManager.instance = new _AuthManager();
    }
    return _AuthManager.instance;
  }
  /**
   * Initialize the auth manager (only in browser)
   */
  initialize() {
    if (!this.initialized && this.isBrowser()) {
      this.loadTokenFromStorage();
      this.initialized = true;
    }
  }
  /**
   * Check if we're in a browser environment
   */
  isBrowser() {
    return typeof window !== "undefined" && typeof localStorage !== "undefined";
  }
  /**
   * Load token from localStorage
   */
  loadTokenFromStorage() {
    if (!this.isBrowser()) {
      return;
    }
    try {
      const storedToken = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
      if (storedToken) {
        const tokenData = JSON.parse(storedToken);
        if (this.isTokenValid(tokenData)) {
          this.tokenData = tokenData;
        } else {
          this.clearToken();
        }
      }
    } catch (error) {
      console.error("Error loading token from storage:", error);
      this.clearToken();
    }
  }
  /**
   * Save token to localStorage
   */
  saveTokenToStorage(tokenData) {
    if (!this.isBrowser()) {
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, JSON.stringify(tokenData));
    } catch (error) {
      console.error("Error saving token to storage:", error);
    }
  }
  /**
   * Check if token is valid (not expired)
   */
  isTokenValid(tokenData) {
    return Date.now() < tokenData.expires_at;
  }
  /**
   * Set authentication token
   */
  setToken(response) {
    this.initialize();
    const expiresAt = Date.now() + response.expires_in * 1e3;
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
  getToken() {
    this.initialize();
    if (this.tokenData && this.isTokenValid(this.tokenData)) {
      return this.tokenData.access_token;
    }
    this.clearToken();
    return null;
  }
  /**
   * Get authorization header value
   */
  getAuthHeader() {
    const token = this.getToken();
    return token ? `Bearer ${token}` : null;
  }
  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    this.initialize();
    return this.getToken() !== null;
  }
  /**
   * Clear authentication token
   */
  clearToken() {
    this.tokenData = null;
    if (this.isBrowser()) {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
    }
  }
  /**
   * Get token expiration time
   */
  getTokenExpiration() {
    this.initialize();
    if (this.tokenData) {
      return new Date(this.tokenData.expires_at);
    }
    return null;
  }
  /**
   * Get time until token expires (in seconds)
   */
  getTimeUntilExpiration() {
    this.initialize();
    if (this.tokenData) {
      return Math.max(0, Math.floor((this.tokenData.expires_at - Date.now()) / 1e3));
    }
    return 0;
  }
  /**
   * Check if token will expire soon (within 5 minutes)
   */
  isTokenExpiringSoon() {
    const timeUntilExpiration = this.getTimeUntilExpiration();
    return timeUntilExpiration > 0 && timeUntilExpiration < 300;
  }
};
__publicField(_AuthManager, "instance");
let AuthManager = _AuthManager;
let authManagerInstance = null;
const getAuthManager = () => {
  if (!authManagerInstance) {
    authManagerInstance = AuthManager.getInstance();
  }
  return authManagerInstance;
};
const safeAuth = {
  isAuthenticated: () => {
    if (typeof window === "undefined") return false;
    return getAuthManager().isAuthenticated();
  },
  getAuthHeader: () => {
    if (typeof window === "undefined") return null;
    return getAuthManager().getAuthHeader();
  },
  getToken: () => {
    if (typeof window === "undefined") return null;
    return getAuthManager().getToken();
  },
  setToken: (response) => {
    if (typeof window === "undefined") return;
    getAuthManager().setToken(response);
  },
  logout: () => {
    if (typeof window === "undefined") return;
    getAuthManager().clearToken();
  },
  getTokenInfo: () => {
    if (typeof window === "undefined") {
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
const auth = safeAuth;
class ApiClient {
  constructor() {
    __publicField(this, "client");
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 3e4,
      // 30 seconds
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.client.interceptors.request.use(
      (config) => {
        const authHeader = auth.getAuthHeader();
        if (authHeader) {
          config.headers.Authorization = authHeader;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const apiError = this.handleError(error);
        return Promise.reject(apiError);
      }
    );
  }
  /**
   * Handle API errors and convert to standardized format
   */
  handleError(error) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      switch (status) {
        case 401:
          auth.logout();
          return {
            message: ERROR_MESSAGES.UNAUTHORIZED,
            status,
            code: "UNAUTHORIZED"
          };
        case 422:
          return {
            message: (data == null ? void 0 : data.detail) || ERROR_MESSAGES.VALIDATION_ERROR,
            status,
            code: "VALIDATION_ERROR"
          };
        case 500:
          return {
            message: ERROR_MESSAGES.SERVER_ERROR,
            status,
            code: "SERVER_ERROR"
          };
        default:
          return {
            message: (data == null ? void 0 : data.message) || ERROR_MESSAGES.UNKNOWN_ERROR,
            status,
            code: "API_ERROR"
          };
      }
    } else if (error.request) {
      return {
        message: ERROR_MESSAGES.NETWORK_ERROR,
        code: "NETWORK_ERROR"
      };
    } else {
      return {
        message: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
        code: "UNKNOWN_ERROR"
      };
    }
  }
  /**
   * Health check endpoint
   */
  async healthCheck() {
    const response = await this.client.get(API_ENDPOINTS.HEALTH_CHECK);
    return response.data;
  }
  // Authentication endpoints
  /**
   * Admin login
   */
  async adminLogin(credentials) {
    const response = await this.client.post(API_ENDPOINTS.ADMIN_LOGIN, credentials);
    return response.data;
  }
  /**
   * Verify admin token
   */
  async verifyAdminToken() {
    const response = await this.client.get(API_ENDPOINTS.ADMIN_VERIFY);
    return response.data;
  }
  // User management endpoints
  /**
   * Register user
   */
  async registerUser(userData) {
    const response = await this.client.post(API_ENDPOINTS.REGISTER_USER, userData);
    return response.data;
  }
  /**
   * Register creator
   */
  async registerCreator(userData) {
    const response = await this.client.post(API_ENDPOINTS.REGISTER_CREATOR, userData);
    return response.data;
  }
  /**
   * Submit not interested feedback
   */
  async submitNotInterested(data) {
    const response = await this.client.post(API_ENDPOINTS.SUBMIT_NOT_INTERESTED, data);
    return response.data;
  }
  /**
   * Submit feedback
   */
  async submitFeedback(data) {
    const response = await this.client.post(API_ENDPOINTS.SUBMIT_FEEDBACK, data);
    return response.data;
  }
  // Admin-only endpoints
  /**
   * Get all registered users (Admin only)
   */
  async getUsers() {
    const response = await this.client.get(API_ENDPOINTS.GET_USERS);
    return response.data;
  }
  /**
   * Get all registered creators (Admin only)
   */
  async getCreators() {
    const response = await this.client.get(API_ENDPOINTS.GET_CREATORS);
    return response.data;
  }
  /**
   * Get all feedback (Admin only)
   */
  async getFeedback() {
    const response = await this.client.get(API_ENDPOINTS.GET_FEEDBACK);
    return response.data;
  }
  /**
   * Get user analytics (Admin only)
   */
  async getUserAnalytics() {
    const response = await this.client.get(API_ENDPOINTS.USER_ANALYTICS);
    return response.data;
  }
  /**
   * Get feedback analytics (Admin only)
   */
  async getFeedbackAnalytics() {
    const response = await this.client.get(API_ENDPOINTS.FEEDBACK_ANALYTICS);
    return response.data;
  }
  /**
   * Get feedback summary (Admin only)
   */
  async getFeedbackSummary() {
    const response = await this.client.get(API_ENDPOINTS.FEEDBACK_SUMMARY);
    return response.data;
  }
  /**
   * Download all data (Admin only)
   */
  async downloadData() {
    const response = await this.client.post(API_ENDPOINTS.DOWNLOAD_DATA, {});
    return response.data;
  }
  /**
   * Export data as JSON (Admin only)
   */
  async exportDataJson() {
    const response = await this.client.get(API_ENDPOINTS.EXPORT_JSON);
    return response.data;
  }
  /**
   * Get comprehensive statistics (Admin only)
   */
  async getStats() {
    const response = await this.client.get(API_ENDPOINTS.GET_STATS);
    return response.data;
  }
  /**
   * Get all not interested responses (Admin only)
   */
  async getNotInterestedResponses() {
    const response = await this.client.get("/api/users/notintdata");
    return response.data;
  }
  /**
   * Export not interested data (Admin only)
   */
  async exportNotInterestedData() {
    const response = await this.client.get(API_ENDPOINTS.EXPORT_NOT_INTERESTED);
    return response.data;
  }
}
const apiClient = new ApiClient();
const api = {
  // Health check
  healthCheck: () => apiClient.healthCheck(),
  // Authentication
  login: (credentials) => apiClient.adminLogin(credentials),
  verifyToken: () => apiClient.verifyAdminToken(),
  // Public endpoints
  registerUser: (data) => apiClient.registerUser(data),
  registerCreator: (data) => apiClient.registerCreator(data),
  submitNotInterested: (data) => apiClient.submitNotInterested(data),
  submitFeedback: (data) => apiClient.submitFeedback(data),
  // Admin endpoints
  getUsers: () => apiClient.getUsers(),
  getCreators: () => apiClient.getCreators(),
  getFeedback: () => apiClient.getFeedback(),
  getUserAnalytics: () => apiClient.getUserAnalytics(),
  getFeedbackAnalytics: () => apiClient.getFeedbackAnalytics(),
  getFeedbackSummary: () => apiClient.getFeedbackSummary(),
  downloadData: () => apiClient.downloadData(),
  exportDataJson: () => apiClient.exportDataJson(),
  getStats: () => apiClient.getStats(),
  getNotInterestedResponses: () => apiClient.getNotInterestedResponses(),
  exportNotInterestedData: () => apiClient.exportNotInterestedData()
};
function useApiState(initialData = null) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const reset = useCallback(() => {
    setData(initialData);
    setLoading(false);
    setError(null);
    setSuccess(false);
  }, [initialData]);
  return {
    data,
    loading,
    error,
    success,
    setData,
    setLoading,
    setError,
    setSuccess,
    reset
  };
}
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(auth.isAuthenticated());
    }
  }, []);
  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.login(credentials);
      if (response.success && response.data) {
        auth.setToken(response.data);
        setIsAuthenticated(true);
        return true;
      } else {
        setError(response.message || "Login failed");
        return false;
      }
    } catch (err) {
      const apiError = err;
      setError(apiError.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const logout = useCallback(() => {
    auth.logout();
    setIsAuthenticated(false);
    setError(null);
  }, []);
  const verifyToken = useCallback(async () => {
    if (!auth.isAuthenticated()) {
      setIsAuthenticated(false);
      return false;
    }
    try {
      const response = await api.verifyToken();
      const isValid = response.success;
      setIsAuthenticated(isValid);
      return isValid;
    } catch (err) {
      setIsAuthenticated(false);
      return false;
    }
  }, []);
  return {
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    verifyToken,
    tokenInfo: auth.getTokenInfo()
  };
}
function useUserRegistration() {
  const [state, setState] = useState({
    isSubmitting: false,
    error: null,
    success: false,
    successMessage: null
  });
  const registerUser = useCallback(async (userData) => {
    setState((prev) => ({ ...prev, isSubmitting: true, error: null, success: false }));
    try {
      const response = await api.registerUser(userData);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          success: true,
          successMessage: SUCCESS_MESSAGES.REGISTRATION_SUCCESS
        }));
        return true;
      } else {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          error: response.message || "Registration failed"
        }));
        return false;
      }
    } catch (err) {
      const apiError = err;
      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: apiError.message
      }));
      return false;
    }
  }, []);
  const registerCreator = useCallback(async (userData) => {
    setState((prev) => ({ ...prev, isSubmitting: true, error: null, success: false }));
    try {
      const response = await api.registerCreator(userData);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          success: true,
          successMessage: SUCCESS_MESSAGES.REGISTRATION_SUCCESS
        }));
        return true;
      } else {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          error: response.message || "Registration failed"
        }));
        return false;
      }
    } catch (err) {
      const apiError = err;
      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: apiError.message
      }));
      return false;
    }
  }, []);
  const reset = useCallback(() => {
    setState({
      isSubmitting: false,
      error: null,
      success: false,
      successMessage: null
    });
  }, []);
  return {
    ...state,
    registerUser,
    registerCreator,
    reset
  };
}
function useNotInterestedSubmission() {
  const [state, setState] = useState({
    isSubmitting: false,
    error: null,
    success: false,
    successMessage: null
  });
  const submit = useCallback(async (data) => {
    setState((prev) => ({ ...prev, isSubmitting: true, error: null, success: false }));
    try {
      const response = await api.submitNotInterested(data);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          success: true,
          successMessage: SUCCESS_MESSAGES.NOT_INTERESTED_SUCCESS
        }));
        return true;
      } else {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          error: response.message || "Submission failed"
        }));
        return false;
      }
    } catch (err) {
      const apiError = err;
      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: apiError.message
      }));
      return false;
    }
  }, []);
  const reset = useCallback(() => {
    setState({
      isSubmitting: false,
      error: null,
      success: false,
      successMessage: null
    });
  }, []);
  return {
    ...state,
    submit,
    reset
  };
}
function useFeedbackSubmission() {
  const [state, setState] = useState({
    isSubmitting: false,
    error: null,
    success: false,
    successMessage: null
  });
  const submit = useCallback(async (data) => {
    setState((prev) => ({ ...prev, isSubmitting: true, error: null, success: false }));
    try {
      const response = await api.submitFeedback(data);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          success: true,
          successMessage: SUCCESS_MESSAGES.FEEDBACK_SUCCESS
        }));
        return true;
      } else {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          error: response.message || "Submission failed"
        }));
        return false;
      }
    } catch (err) {
      const apiError = err;
      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: apiError.message
      }));
      return false;
    }
  }, []);
  const reset = useCallback(() => {
    setState({
      isSubmitting: false,
      error: null,
      success: false,
      successMessage: null
    });
  }, []);
  return {
    ...state,
    submit,
    reset
  };
}
function useAdminData() {
  const usersState = useApiState();
  const creatorsState = useApiState();
  const feedbackState = useApiState();
  const notInterestedState = useApiState();
  const userAnalyticsState = useApiState();
  const feedbackAnalyticsState = useApiState();
  const statsState = useApiState();
  const fetchUsers = useCallback(async () => {
    usersState.setLoading(true);
    usersState.setError(null);
    try {
      const response = await api.getUsers();
      if (response.success) {
        usersState.setData(response.data);
        usersState.setSuccess(true);
      } else {
        usersState.setError(response.message || "Failed to fetch users");
      }
    } catch (err) {
      const apiError = err;
      usersState.setError(apiError.message);
    } finally {
      usersState.setLoading(false);
    }
  }, []);
  const fetchCreators = useCallback(async () => {
    creatorsState.setLoading(true);
    creatorsState.setError(null);
    try {
      const response = await api.getCreators();
      if (response.success) {
        creatorsState.setData(response.data);
        creatorsState.setSuccess(true);
      } else {
        creatorsState.setError(response.message || "Failed to fetch creators");
      }
    } catch (err) {
      const apiError = err;
      creatorsState.setError(apiError.message);
    } finally {
      creatorsState.setLoading(false);
    }
  }, []);
  const fetchFeedback = useCallback(async () => {
    feedbackState.setLoading(true);
    feedbackState.setError(null);
    try {
      const response = await api.getFeedback();
      if (response.success) {
        feedbackState.setData(response.data);
        feedbackState.setSuccess(true);
      } else {
        feedbackState.setError(response.message || "Failed to fetch feedback");
      }
    } catch (err) {
      const apiError = err;
      feedbackState.setError(apiError.message);
    } finally {
      feedbackState.setLoading(false);
    }
  }, []);
  const fetchNotInterested = useCallback(async () => {
    notInterestedState.setLoading(true);
    notInterestedState.setError(null);
    try {
      const response = await api.getNotInterestedResponses();
      if (response.success) {
        notInterestedState.setData(response.data);
        notInterestedState.setSuccess(true);
      } else {
        notInterestedState.setError(response.message || "Failed to fetch not interested responses");
      }
    } catch (err) {
      const apiError = err;
      notInterestedState.setError(apiError.message);
    } finally {
      notInterestedState.setLoading(false);
    }
  }, []);
  const fetchUserAnalytics = useCallback(async () => {
    userAnalyticsState.setLoading(true);
    userAnalyticsState.setError(null);
    try {
      const response = await api.getUserAnalytics();
      if (response.success) {
        userAnalyticsState.setData(response.data);
        userAnalyticsState.setSuccess(true);
      } else {
        userAnalyticsState.setError(response.message || "Failed to fetch user analytics");
      }
    } catch (err) {
      const apiError = err;
      userAnalyticsState.setError(apiError.message);
    } finally {
      userAnalyticsState.setLoading(false);
    }
  }, []);
  const fetchFeedbackAnalytics = useCallback(async () => {
    feedbackAnalyticsState.setLoading(true);
    feedbackAnalyticsState.setError(null);
    try {
      const response = await api.getFeedbackAnalytics();
      if (response.success) {
        feedbackAnalyticsState.setData(response.data);
        feedbackAnalyticsState.setSuccess(true);
      } else {
        feedbackAnalyticsState.setError(response.message || "Failed to fetch feedback analytics");
      }
    } catch (err) {
      const apiError = err;
      feedbackAnalyticsState.setError(apiError.message);
    } finally {
      feedbackAnalyticsState.setLoading(false);
    }
  }, []);
  const fetchStats = useCallback(async () => {
    statsState.setLoading(true);
    statsState.setError(null);
    try {
      const response = await api.getStats();
      if (response.success) {
        statsState.setData(response.data);
        statsState.setSuccess(true);
      } else {
        statsState.setError(response.message || "Failed to fetch stats");
      }
    } catch (err) {
      const apiError = err;
      statsState.setError(apiError.message);
    } finally {
      statsState.setLoading(false);
    }
  }, []);
  const fetchAllData = useCallback(async () => {
    await Promise.all([
      fetchUsers(),
      fetchCreators(),
      fetchFeedback(),
      fetchNotInterested(),
      fetchUserAnalytics(),
      fetchFeedbackAnalytics(),
      fetchStats()
    ]);
  }, [fetchUsers, fetchCreators, fetchFeedback, fetchNotInterested, fetchUserAnalytics, fetchFeedbackAnalytics, fetchStats]);
  return {
    users: usersState,
    creators: creatorsState,
    feedback: feedbackState,
    notInterested: notInterestedState,
    userAnalytics: userAnalyticsState,
    feedbackAnalytics: feedbackAnalyticsState,
    stats: statsState,
    fetchUsers,
    fetchCreators,
    fetchFeedback,
    fetchNotInterested,
    fetchUserAnalytics,
    fetchFeedbackAnalytics,
    fetchStats,
    fetchAllData
  };
}
function useHealthCheck() {
  const [isHealthy, setIsHealthy] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);
  const checkHealth = useCallback(async () => {
    setIsChecking(true);
    try {
      const response = await api.healthCheck();
      setIsHealthy(response.status === "healthy");
      setLastChecked(/* @__PURE__ */ new Date());
    } catch (err) {
      setIsHealthy(false);
      setLastChecked(/* @__PURE__ */ new Date());
    } finally {
      setIsChecking(false);
    }
  }, []);
  useEffect(() => {
    checkHealth();
  }, [checkHealth]);
  return {
    isHealthy,
    isChecking,
    lastChecked,
    checkHealth
  };
}
let analytics = null;
if (typeof window !== "undefined") {
  analytics = Analytics({
    app: "BetaLawvriksh-Frontend",
    plugins: [
      googleAnalytics({
        measurementIds: ["G-TQJEZES4ET"]
      })
    ]
  });
}
function useAnalytics() {
  const trackPage = useCallback((pageName) => {
    if (!analytics) return;
    if (pageName) {
      analytics.page({ name: pageName });
    } else {
      analytics.page();
    }
  }, []);
  const trackEvent = useCallback((eventName, properties) => {
    if (!analytics) return;
    analytics.track(eventName, properties);
  }, []);
  const identifyUser = useCallback((userId, traits) => {
    if (!analytics) return;
    analytics.identify(userId, traits);
  }, []);
  return {
    trackPage,
    trackEvent,
    identifyUser,
    analytics
  };
}
function RegistrationForm({ userType, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    gender: void 0,
    profession: void 0,
    interest_reason: "",
    user_type: userType
  });
  const [errors, setErrors] = useState({});
  const { registerUser, registerCreator, isSubmitting, error, success, successMessage, reset } = useUserRegistration();
  const { trackEvent } = useAnalytics();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? void 0 : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      trackEvent("form_validation_error", {
        form_type: "registration",
        user_type: userType,
        errors: Object.keys(errors)
      });
      return;
    }
    trackEvent("form_submission_started", {
      form_type: "registration",
      user_type: userType
    });
    let success2 = false;
    if (userType === "user") {
      success2 = await registerUser(formData);
    } else {
      success2 = await registerCreator(formData);
    }
    if (success2) {
      trackEvent("form_submission_success", {
        form_type: "registration",
        user_type: userType,
        has_gender: !!formData.gender,
        has_profession: !!formData.profession,
        has_interest_reason: !!formData.interest_reason
      });
      onSuccess == null ? void 0 : onSuccess();
    } else {
      trackEvent("form_submission_error", {
        form_type: "registration",
        user_type: userType,
        error: error || "Unknown error"
      });
    }
  };
  const handleClose = () => {
    reset();
    onClose();
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("h2", { className: POPUP_STYLES.title, children: [
      "Join as ",
      userType
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: POPUP_STYLES.form, children: [
      /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "name", className: POPUP_STYLES.label, children: "Name *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "name",
            name: "name",
            value: formData.name,
            onChange: handleInputChange,
            className: `${POPUP_STYLES.input} ${errors.name ? "border-red-500" : ""}`,
            placeholder: "Enter your name",
            required: true
          }
        ),
        errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", className: POPUP_STYLES.label, children: "Email *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            id: "email",
            name: "email",
            value: formData.email,
            onChange: handleInputChange,
            className: `${POPUP_STYLES.input} ${errors.email ? "border-red-500" : ""}`,
            placeholder: "Enter your email",
            required: true
          }
        ),
        errors.email && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.email })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "phone_number", className: POPUP_STYLES.label, children: "Phone Number *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "tel",
            id: "phone_number",
            name: "phone_number",
            value: formData.phone_number,
            onChange: handleInputChange,
            className: `${POPUP_STYLES.input} ${errors.phone_number ? "border-red-500" : ""}`,
            placeholder: "Enter your phone number",
            required: true
          }
        ),
        errors.phone_number && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.phone_number })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "gender", className: POPUP_STYLES.label, children: "Gender (Optional)" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            id: "gender",
            name: "gender",
            value: formData.gender || "",
            onChange: handleInputChange,
            className: POPUP_STYLES.select,
            children: GENDER_OPTIONS.map((option) => /* @__PURE__ */ jsx("option", { value: option.value, children: option.label }, option.value))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "profession", className: POPUP_STYLES.label, children: "Profession (Optional)" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            id: "profession",
            name: "profession",
            value: formData.profession || "",
            onChange: handleInputChange,
            className: POPUP_STYLES.select,
            children: PROFESSION_OPTIONS.map((option) => /* @__PURE__ */ jsx("option", { value: option.value, children: option.label }, option.value))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "interest_reason", className: POPUP_STYLES.label, children: "Why are you interested? (Optional)" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "interest_reason",
            name: "interest_reason",
            value: formData.interest_reason || "",
            onChange: handleInputChange,
            rows: 3,
            className: POPUP_STYLES.textarea,
            placeholder: "Tell us what interests you about LawVriksh..."
          }
        )
      ] }),
      success && successMessage && /* @__PURE__ */ jsxs("div", { className: "bg-green-50 text-green-800 p-4 rounded-lg border border-green-200 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: successMessage }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleClose,
            className: "mt-2 text-sm text-green-600 hover:text-green-800 underline",
            children: "Close"
          }
        )
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "bg-red-50 text-red-800 p-4 rounded-lg border border-red-200 text-center", children: /* @__PURE__ */ jsx("p", { children: error }) }),
      !success && /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: `${POPUP_STYLES.button} ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`,
          disabled: isSubmitting,
          children: isSubmitting ? "Submitting..." : "Join Waiting List"
        }
      )
    ] })
  ] });
}
function NotInterestedForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    gender: void 0,
    profession: void 0,
    not_interested_reason: void 0,
    improvement_suggestions: "",
    interest_reason: ""
  });
  const [errors, setErrors] = useState({});
  const { submit, isSubmitting, error, success, successMessage, reset } = useNotInterestedSubmission();
  const { trackEvent } = useAnalytics();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? void 0 : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      trackEvent("form_validation_error", {
        form_type: "not_interested",
        errors: Object.keys(errors)
      });
      return;
    }
    trackEvent("form_submission_started", {
      form_type: "not_interested"
    });
    const success2 = await submit(formData);
    if (success2) {
      trackEvent("form_submission_success", {
        form_type: "not_interested",
        has_gender: !!formData.gender,
        has_profession: !!formData.profession,
        has_not_interested_reason: !!formData.not_interested_reason,
        has_improvement_suggestions: !!formData.improvement_suggestions,
        has_interest_reason: !!formData.interest_reason
      });
      onSuccess == null ? void 0 : onSuccess();
    } else {
      trackEvent("form_submission_error", {
        form_type: "not_interested",
        error: error || "Unknown error"
      });
    }
  };
  const handleClose = () => {
    reset();
    onClose();
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx("h2", { className: POPUP_STYLES.title, children: "We'd Love to Know More" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: POPUP_STYLES.form, children: [
      /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "name", className: POPUP_STYLES.label, children: "Name *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "name",
            name: "name",
            value: formData.name,
            onChange: handleInputChange,
            className: `${POPUP_STYLES.input} ${errors.name ? "border-red-500" : ""}`,
            placeholder: "Enter your name",
            required: true
          }
        ),
        errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", className: POPUP_STYLES.label, children: "Email *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            id: "email",
            name: "email",
            value: formData.email,
            onChange: handleInputChange,
            className: `${POPUP_STYLES.input} ${errors.email ? "border-red-500" : ""}`,
            placeholder: "Enter your email",
            required: true
          }
        ),
        errors.email && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.email })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "phone_number", className: POPUP_STYLES.label, children: "Phone Number *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "tel",
            id: "phone_number",
            name: "phone_number",
            value: formData.phone_number,
            onChange: handleInputChange,
            className: `${POPUP_STYLES.input} ${errors.phone_number ? "border-red-500" : ""}`,
            placeholder: "Enter your phone number",
            required: true
          }
        ),
        errors.phone_number && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.phone_number })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "gender", className: POPUP_STYLES.label, children: "Gender (Optional)" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            id: "gender",
            name: "gender",
            value: formData.gender || "",
            onChange: handleInputChange,
            className: POPUP_STYLES.select,
            children: GENDER_OPTIONS.map((option) => /* @__PURE__ */ jsx("option", { value: option.value, children: option.label }, option.value))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "profession", className: POPUP_STYLES.label, children: "Profession (Optional)" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            id: "profession",
            name: "profession",
            value: formData.profession || "",
            onChange: handleInputChange,
            className: POPUP_STYLES.select,
            children: PROFESSION_OPTIONS.map((option) => /* @__PURE__ */ jsx("option", { value: option.value, children: option.label }, option.value))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "not_interested_reason", className: POPUP_STYLES.label, children: "Why are you not interested? (Optional)" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            id: "not_interested_reason",
            name: "not_interested_reason",
            value: formData.not_interested_reason || "",
            onChange: handleInputChange,
            className: POPUP_STYLES.select,
            children: NOT_INTERESTED_REASON_OPTIONS.map((option) => /* @__PURE__ */ jsx("option", { value: option.value, children: option.label }, option.value))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "improvement_suggestions", className: POPUP_STYLES.label, children: "What improvements would you suggest? (Optional)" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "improvement_suggestions",
            name: "improvement_suggestions",
            value: formData.improvement_suggestions || "",
            onChange: handleInputChange,
            rows: 3,
            className: POPUP_STYLES.textarea,
            placeholder: "Help us understand what we could improve..."
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "interest_reason", className: POPUP_STYLES.label, children: "Any additional thoughts? (Optional)" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "interest_reason",
            name: "interest_reason",
            value: formData.interest_reason || "",
            onChange: handleInputChange,
            rows: 3,
            className: POPUP_STYLES.textarea,
            placeholder: "Share any additional thoughts or feedback..."
          }
        )
      ] }),
      success && successMessage && /* @__PURE__ */ jsxs("div", { className: "bg-green-50 text-green-800 p-4 rounded-lg border border-green-200 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: successMessage }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleClose,
            className: "mt-2 text-sm text-green-600 hover:text-green-800 underline",
            children: "Close"
          }
        )
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "bg-red-50 text-red-800 p-4 rounded-lg border border-red-200 text-center", children: /* @__PURE__ */ jsx("p", { children: error }) }),
      !success && /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: `${POPUP_STYLES.button} ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`,
          disabled: isSubmitting,
          children: isSubmitting ? "Submitting..." : "Submit Response"
        }
      )
    ] })
  ] });
}
function FeedbackForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    user_email: "",
    digital_work_showcase_effectiveness: void 0,
    legal_persons_online_recognition: "",
    digital_work_sharing_difficulty: void 0,
    regular_blogging: "",
    ai_tools_blogging_frequency: "",
    blogging_tools_familiarity: void 0,
    core_platform_features: "",
    ai_research_opinion: "",
    ideal_reading_features: "",
    portfolio_presentation_preference: ""
  });
  const [errors, setErrors] = useState({});
  const { submit, isSubmitting, error, success, successMessage, reset } = useFeedbackSubmission();
  const { trackEvent } = useAnalytics();
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    let processedValue = value;
    if (type === "radio" && name.includes("_rating")) {
      processedValue = parseInt(value);
    }
    if (value === "" && !name.includes("_rating")) {
      processedValue = void 0;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: processedValue
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  const validateForm = () => {
    var _a;
    const newErrors = {};
    if (!((_a = formData.user_email) == null ? void 0 : _a.trim())) {
      newErrors.user_email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      newErrors.user_email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      trackEvent("form_validation_error", {
        form_type: "feedback",
        errors: Object.keys(errors)
      });
      return;
    }
    trackEvent("form_submission_started", {
      form_type: "feedback"
    });
    const success2 = await submit(formData);
    if (success2) {
      trackEvent("form_submission_success", {
        form_type: "feedback",
        has_digital_work_showcase_effectiveness: !!formData.digital_work_showcase_effectiveness,
        has_legal_persons_online_recognition: !!formData.legal_persons_online_recognition,
        has_digital_work_sharing_difficulty: !!formData.digital_work_sharing_difficulty,
        has_regular_blogging: !!formData.regular_blogging,
        has_ai_tools_blogging_frequency: !!formData.ai_tools_blogging_frequency,
        has_blogging_tools_familiarity: !!formData.blogging_tools_familiarity,
        has_core_platform_features: !!formData.core_platform_features,
        has_ai_research_opinion: !!formData.ai_research_opinion,
        has_ideal_reading_features: !!formData.ideal_reading_features,
        has_portfolio_presentation_preference: !!formData.portfolio_presentation_preference
      });
      onSuccess == null ? void 0 : onSuccess();
    } else {
      trackEvent("form_submission_error", {
        form_type: "feedback",
        error: error || "Unknown error"
      });
    }
  };
  const handleClose = () => {
    reset();
    onClose();
  };
  const renderRatingQuestion = (name, label, questionNumber, commentsName) => /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
    /* @__PURE__ */ jsxs("label", { className: "block font-medium text-sm text-white/90 mb-3 font-montserrat drop-shadow-sm", children: [
      questionNumber,
      ". ",
      label
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-4 flex-wrap mb-3", children: RATING_SCALE.map((num) => /* @__PURE__ */ jsxs(
      "label",
      {
        className: `flex items-center gap-1 cursor-pointer text-sm transition-all backdrop-blur-sm rounded-lg px-2 py-1 border ${formData[name] === num ? "bg-law-gold/20 border-law-gold/50 text-yellow-300 font-semibold shadow-lg" : "text-white/80 hover:text-white bg-white/5 border-white/10 hover:bg-white/10"}`,
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              name,
              value: num.toString(),
              checked: formData[name] === num,
              onChange: handleInputChange,
              className: "w-4 h-4"
            }
          ),
          /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
            num,
            " - ",
            RATING_LABELS[num]
          ] })
        ]
      },
      num
    )) }),
    commentsName
  ] });
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx("h2", { className: POPUP_STYLES.title, children: "We value your insights and would love to stay connected" }),
    /* @__PURE__ */ jsx("p", { className: "text-center text-gray-600 text-sm mb-3 font-source-sans-pro", children: /* @__PURE__ */ jsx("em", { children: "Estimated time: 3-5 minutes" }) }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-8 text-center leading-relaxed font-source-sans-pro", children: "Your insights help us build a platform that truly serves the legal community. Please share your thoughts on digital presence, blogging, and platform expectations." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "user_email", className: POPUP_STYLES.label, children: "Email Address *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            id: "user_email",
            name: "user_email",
            value: formData.user_email || "",
            onChange: handleInputChange,
            className: `${POPUP_STYLES.input} ${errors.user_email ? "border-red-500" : ""}`,
            placeholder: "Enter your email address",
            required: true
          }
        ),
        errors.user_email && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.user_email })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-b border-white/20 pb-6 mb-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "bg-gradient-to-r from-law-gold via-yellow-300 to-law-gold bg-clip-text text-transparent font-merriweather font-bold text-xl mb-3 drop-shadow-lg", children: "Digital Presence" }),
        renderRatingQuestion("digital_work_showcase_effectiveness", "How effectively are you able to showcase your digital work online?", 1),
        /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium text-sm text-white/90 mb-3 font-montserrat drop-shadow-sm", children: "2. Do you think legal persons are getting enough recognition online?" }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-4 flex-wrap mb-3", children: YES_NO_OPTIONS.map((option) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1 cursor-pointer text-sm text-white/80 hover:text-white transition-colors bg-white/5 backdrop-blur-sm rounded-lg px-2 py-1 border border-white/10 hover:bg-white/10", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "radio",
                name: "legal_persons_online_recognition",
                value: option.value,
                checked: formData.legal_persons_online_recognition === option.value,
                onChange: handleInputChange,
                className: "w-4 h-4"
              }
            ),
            /* @__PURE__ */ jsx("span", { children: option.label })
          ] }, option.value)) })
        ] }),
        renderRatingQuestion("digital_work_sharing_difficulty", "What level of difficulty do you face while sharing your digital work online? (1: Least, 5: Most)", 3)
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-b border-white/20 pb-6 mb-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "bg-gradient-to-r from-law-gold via-yellow-300 to-law-gold bg-clip-text text-transparent font-merriweather font-bold text-xl mb-3 drop-shadow-lg", children: "Blogging and Sharing Insights" }),
        /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium text-sm text-white/90 mb-3 font-montserrat drop-shadow-sm", children: "4. Do you write blogs regularly?" }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-4 flex-wrap mb-3", children: YES_NO_OPTIONS.map((option) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1 cursor-pointer text-sm text-white/80 hover:text-white transition-colors bg-white/5 backdrop-blur-sm rounded-lg px-2 py-1 border border-white/10 hover:bg-white/10", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "radio",
                name: "regular_blogging",
                value: option.value,
                checked: formData.regular_blogging === option.value,
                onChange: handleInputChange,
                className: "w-4 h-4"
              }
            ),
            /* @__PURE__ */ jsx("span", { children: option.label })
          ] }, option.value)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium text-sm text-white/90 mb-3 font-montserrat drop-shadow-sm", children: "5. How often do you use AI tools to assist in writing blogs?" }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-4 flex-wrap mb-3", children: AI_TOOLS_FREQUENCY_OPTIONS.map((option) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1 cursor-pointer text-sm text-white/80 hover:text-white transition-colors bg-white/5 backdrop-blur-sm rounded-lg px-2 py-1 border border-white/10 hover:bg-white/10", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "radio",
                name: "ai_tools_blogging_frequency",
                value: option.value,
                checked: formData.ai_tools_blogging_frequency === option.value,
                onChange: handleInputChange,
                className: "w-4 h-4"
              }
            ),
            /* @__PURE__ */ jsx("span", { children: option.label })
          ] }, option.value)) })
        ] }),
        renderRatingQuestion("blogging_tools_familiarity", "How familiar are you with different blogging tools available in the market?", 6)
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "bg-gradient-to-r from-law-gold via-yellow-300 to-law-gold bg-clip-text text-transparent font-merriweather font-bold text-xl mb-3 drop-shadow-lg", children: "Expectations from a Blogging Platform" }),
        /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "core_platform_features", className: "block font-medium text-sm text-white/90 mb-3 font-montserrat drop-shadow-sm", children: "7. What core features do you expect from a blogging platform, either as a creator or as a reader?" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "core_platform_features",
              name: "core_platform_features",
              value: formData.core_platform_features || "",
              onChange: handleInputChange,
              rows: 3,
              className: POPUP_STYLES.textarea,
              placeholder: "Describe the essential features you expect..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "ai_research_opinion", className: "block font-medium text-sm text-white/90 mb-3 font-montserrat drop-shadow-sm", children: "8. What is your opinion on using AI for research during blog creation?" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "ai_research_opinion",
              name: "ai_research_opinion",
              value: formData.ai_research_opinion || "",
              onChange: handleInputChange,
              rows: 3,
              className: POPUP_STYLES.textarea,
              placeholder: "Share your thoughts on AI-assisted research..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "ideal_reading_features", className: "block font-medium text-sm text-white/90 mb-3 font-montserrat drop-shadow-sm", children: "9. What features would your ideal blog reading platform include (e.g., listening mode, etc.)?" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "ideal_reading_features",
              name: "ideal_reading_features",
              value: formData.ideal_reading_features || "",
              onChange: handleInputChange,
              rows: 3,
              className: POPUP_STYLES.textarea,
              placeholder: "Describe your ideal reading experience..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: POPUP_STYLES.formGroup, children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "portfolio_presentation_preference", className: "block font-medium text-sm text-white/90 mb-3 font-montserrat drop-shadow-sm", children: "10. How would you prefer to present your portfolio, and what type of content do you want to include to attract recruiters or relevant audiences?" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "portfolio_presentation_preference",
              name: "portfolio_presentation_preference",
              value: formData.portfolio_presentation_preference || "",
              onChange: handleInputChange,
              rows: 3,
              className: POPUP_STYLES.textarea,
              placeholder: "Describe your portfolio presentation preferences..."
            }
          )
        ] })
      ] }),
      success && successMessage && /* @__PURE__ */ jsxs("div", { className: "bg-green-50 text-green-800 p-4 rounded-lg border border-green-200 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: successMessage }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleClose,
            className: "mt-2 text-sm text-green-600 hover:text-green-800 underline",
            children: "Close"
          }
        )
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "bg-red-50 text-red-800 p-4 rounded-lg border border-red-200 text-center", children: /* @__PURE__ */ jsx("p", { children: error }) }),
      !success && /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: `${POPUP_STYLES.button} ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`,
          disabled: isSubmitting,
          children: isSubmitting ? "Submitting..." : "Submit Feedback"
        }
      )
    ] })
  ] });
}
function FeaturesContent({ onClose }) {
  return /* @__PURE__ */ jsxs("div", { className: "w-full text-left", children: [
    /* @__PURE__ */ jsx("h2", { className: POPUP_STYLES.title, children: "Our Features" }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-6 my-8", children: FEATURES.map((feature, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-white/15 hover:border-law-gold/40 hover:-translate-y-2 hover:shadow-2xl shadow-xl",
        children: [
          /* @__PURE__ */ jsx("h3", { className: "bg-gradient-to-r from-law-gold via-yellow-300 to-law-gold bg-clip-text text-transparent font-merriweather font-bold text-xl leading-tight mb-4 drop-shadow-lg", children: feature.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-white/90 leading-relaxed m-0 font-source-sans-pro drop-shadow-sm", children: feature.description })
        ]
      },
      index
    )) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: POPUP_STYLES.button,
        onClick: onClose,
        children: "Close"
      }
    )
  ] });
}
function ViewMoreContent({
  onClose,
  onFeaturesClick,
  onFeedbackClick,
  onAdminClick
}) {
  return /* @__PURE__ */ jsxs("div", { className: "w-full text-center relative min-h-[200px]", children: [
    /* @__PURE__ */ jsx("h2", { className: POPUP_STYLES.title, children: "Explore More" }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-6 mt-8", children: /* @__PURE__ */ jsx(
      "button",
      {
        className: POPUP_STYLES.button,
        onClick: onFeedbackClick,
        children: "Give Suggestions"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-5 right-5", children: /* @__PURE__ */ jsx(
      "button",
      {
        className: "bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white/60 text-xs cursor-pointer px-3 py-2 transition-all hover:text-white hover:bg-white/20 font-montserrat",
        onClick: onAdminClick,
        children: "admin"
      }
    ) })
  ] });
}
function ThankYouContent({
  onClose,
  isNotInterested = false,
  feedbackSubmitted = false,
  userType = "user"
}) {
  const getMessage = () => {
    if (isNotInterested) {
      return "No problem if you are not interested. Thank you for giving your time!";
    }
    if (feedbackSubmitted) {
      return "Thank you for your valuable feedback! Your input helps us improve our platform to better serve your legal needs.";
    }
    return `Thank you for joining our waiting list as a ${userType}! We'll be in touch soon.`;
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full text-center", children: [
    /* @__PURE__ */ jsx("h2", { className: POPUP_STYLES.title, children: "Thank You!" }),
    /* @__PURE__ */ jsx("p", { className: "text-base text-white/90 my-6 mx-0 leading-relaxed font-source-sans-pro drop-shadow-sm", children: getMessage() }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: POPUP_STYLES.button,
        onClick: onClose,
        children: "Close"
      }
    )
  ] });
}
function Popup({
  isOpen,
  onClose,
  type,
  userType = "user",
  isNotInterested = false,
  feedbackSubmitted = false,
  onFeaturesClick,
  onFeedbackClick,
  onAdminClick
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const getPopupContent = () => {
    switch (type) {
      case "form":
        return /* @__PURE__ */ jsx(
          RegistrationForm,
          {
            userType,
            onClose
          }
        );
      case "notinterested":
        return /* @__PURE__ */ jsx(
          NotInterestedForm,
          {
            onClose
          }
        );
      case "feedback":
        return /* @__PURE__ */ jsx(
          FeedbackForm,
          {
            onClose
          }
        );
      case "features":
        return /* @__PURE__ */ jsx(
          FeaturesContent,
          {
            onClose
          }
        );
      case "viewmore":
        return /* @__PURE__ */ jsx(
          ViewMoreContent,
          {
            onClose,
            onFeaturesClick,
            onFeedbackClick,
            onAdminClick
          }
        );
      case "thankyou":
        return /* @__PURE__ */ jsx(
          ThankYouContent,
          {
            onClose,
            isNotInterested,
            feedbackSubmitted,
            userType
          }
        );
      default:
        return null;
    }
  };
  const isLargePopup = type === "feedback";
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: POPUP_STYLES.overlay,
      onClick: handleOverlayClick,
      role: "presentation",
      tabIndex: -1,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: `${POPUP_STYLES.container} ${POPUP_STYLES.containerBorder} ${isLargePopup ? "max-w-4xl max-h-[95vh] sm:max-h-[90vh]" : ""}`,
          onClick: (e) => e.stopPropagation(),
          role: "presentation",
          tabIndex: -1,
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: POPUP_STYLES.close,
                onClick: onClose,
                "aria-label": "Close popup",
                children: "×"
              }
            ),
            getPopupContent()
          ]
        }
      )
    }
  );
}
function HomePage() {
  const navigate = useNavigate();
  const { trackEvent } = useAnalytics();
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("form");
  const [userType, setUserType] = useState("user");
  const [isNotInterested, setIsNotInterested] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [currentText, setCurrentText] = useState("us");
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentText((prev) => prev === "us" ? "AI" : "us");
      }, 250);
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 3e3);
    return () => clearInterval(interval);
  }, []);
  const handleUserTypeClick = useCallback((type) => {
    trackEvent("user_type_selected", {
      user_type: type
    });
    setUserType(type);
    setPopupType("form");
    setShowPopup(true);
  }, [trackEvent]);
  const handleNotInterestedClick = useCallback(() => {
    trackEvent("not_interested_clicked");
    setIsNotInterested(true);
    setPopupType("notinterested");
    setShowPopup(true);
  }, [trackEvent]);
  const handleFeaturesClick = useCallback(() => {
    trackEvent("features_button_clicked");
    setPopupType("features");
    setShowPopup(true);
  }, [trackEvent]);
  const handleFeedbackClick = useCallback(() => {
    trackEvent("feedback_button_clicked");
    setPopupType("feedback");
    setShowPopup(true);
  }, [trackEvent]);
  const handleViewMoreClick = useCallback(() => {
    trackEvent("view_more_clicked");
    setPopupType("feedback");
    setShowPopup(true);
  }, [trackEvent]);
  const handleAdminClick = useCallback(() => {
    trackEvent("admin_button_clicked");
    navigate("/admin");
  }, [navigate, trackEvent]);
  const closePopup = useCallback(() => {
    trackEvent("popup_closed", {
      popup_type: popupType
    });
    setShowPopup(false);
    setIsNotInterested(false);
    setFeedbackSubmitted(false);
  }, [trackEvent, popupType]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "relative w-full min-h-screen overflow-hidden font-sans", children: [
      /* @__PURE__ */ jsx(
        "video",
        {
          autoPlay: true,
          muted: true,
          loop: true,
          className: `fixed top-0 left-0 w-full h-full object-cover z-[${Z_INDEX.BACKGROUND}]`,
          src: ASSETS.VIDEO
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "fixed top-0 left-0 w-full h-full bg-law-dark/30 z-0 pointer-events-none" }),
      /* @__PURE__ */ jsx(Header, { onViewMoreClick: handleViewMoreClick }),
      /* @__PURE__ */ jsx("main", { className: "flex w-full justify-center min-h-screen relative items-center z-10 pt-24 lg:pt-32", children: /* @__PURE__ */ jsxs("section", { className: "w-full max-w-fit px-4 sm:px-8 md:px-12 lg:px-16 py-0 flex flex-col justify-center items-center z-20 relative", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-8 text-center", children: /* @__PURE__ */ jsx("h1", { className: "text-white font-merriweather text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight m-0 w-full max-w-[600px] lg:max-w-[650px] text-center px-4", children: /* @__PURE__ */ jsx("span", { children: "Join the LawVriksh Beta" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "mb-6 text-center w-full", children: /* @__PURE__ */ jsxs("p", { className: "text-white font-normal italic text-base align-middle sm:text-xl leading-relaxed m-0 text-center w-full px-4", children: [
          "build your legal digital presence with",
          " ",
          /* @__PURE__ */ jsxs("span", { className: "relative inline align-baseline", style: { verticalAlign: "baseline" }, children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `text-[#D4AF37] font-medium transition-all duration-500 ease-in-out ${isAnimating ? "opacity-0 transform -translate-y-3 scale-90 blur-sm" : "opacity-100 transform translate-y-0 scale-100 blur-none"}`,
                style: {
                  display: "inline",
                  transformOrigin: "center baseline",
                  filter: isAnimating ? "blur(2px)" : "blur(0px)",
                  verticalAlign: "baseline",
                  lineHeight: "inherit"
                },
                children: currentText
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `absolute inset-0 transition-all duration-300 ease-out ${isAnimating ? "opacity-20 transform translate-y-1" : "opacity-0 transform translate-y-0"}`,
                style: {
                  background: "linear-gradient(45deg, rgba(212, 175, 55, 0.3), rgba(255, 255, 255, 0.1))",
                  filter: "blur(1px)"
                }
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsx("p", { className: "text-white font-source-sans-pro font-light text-sm sm:text-sm leading-relaxed m-0 text-center w-full max-w-[620px] px-4", children: "Lawvriksh isn't just a platform—it's your breakthrough. Dive into the law with passion and purpose, transform curiosity into confidence, and let your voice amplify justice. Share your work with pride, build a digital presence that demands attention, and join a movement where every insight sparks change. This is where learners rise, leaders shine, and your impact begins." }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-6 max-w-fit w-full", children: [
          /* @__PURE__ */ jsx("h2", { className: "bg-gold-texture bg-cover bg-center bg-clip-text text-transparent font-montserrat font-normal text-xl sm:text-2xl md:text-3xl leading-tight m-0 text-center w-full px-4", children: "Join Our Waiting List :" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-5 w-full", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center w-full", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "flex w-40 sm:w-48 md:w-56 lg:w-64 h-10 sm:h-11 md:h-12 px-4 sm:px-6 items-center justify-center rounded-[4px]  bg-[#D4AF37] text-[#1B1B1B] font-montserrat font-medium text-sm sm:text-base md:text-lg cursor-pointer transition-all duration-200 hover:opacity-100 hover:scale-105 relative before:absolute before:inset-[-3px] before:rounded-full before:z-[-1] before:brightness-100 before:contrast-125",
                  onClick: () => handleUserTypeClick("user"),
                  children: "Join as User"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "flex w-40 sm:w-48 md:w-56 lg:w-64 h-10 sm:h-11 md:h-12 px-4 sm:px-6 items-center justify-center rounded-[4px]  bg-[#D4AF37] text-[#1B1B1B] font-montserrat font-medium text-sm sm:text-base md:text-lg cursor-pointer transition-all duration-200 hover:opacity-100 hover:scale-105 relative before:absolute before:inset-[-3px] before:rounded-full before:z-[-1] before:brightness-100 before:contrast-125",
                  onClick: () => handleUserTypeClick("creator"),
                  children: "Creator"
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "flex w-40 sm:w-48 md:w-56 lg:w-64 h-10 sm:h-11 md:h-12 px-4 sm:px-6 items-center justify-center rounded-[4px] bg-[#1B1B1B]  text-[#D4AF37] font-montserrat font-medium text-sm sm:text-base md:text-lg cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-105",
                onClick: handleNotInterestedClick,
                children: "Not found Interest"
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleFeaturesClick,
          className: "fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-law-gold to-law-gold/90 text-black rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group",
          "aria-label": "View Features",
          children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "w-6 h-6 transition-transform group-hover:rotate-12",
              fill: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" })
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        Popup,
        {
          isOpen: showPopup,
          onClose: closePopup,
          type: popupType,
          userType,
          isNotInterested,
          feedbackSubmitted,
          onUserTypeClick: handleUserTypeClick,
          onNotInterestedClick: handleNotInterestedClick,
          onFeaturesClick: handleFeaturesClick,
          onFeedbackClick: handleFeedbackClick,
          onAdminClick: handleAdminClick
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "/admin",
        className: "fixed bottom-4 right-4 text-xs text-gray-500 hover:text-blue-600 underline z-50",
        style: { pointerEvents: "auto" },
        children: "Admin"
      }
    )
  ] });
}
const meta$1 = () => {
  return [
    { title: "LawVriksh Beta - Join the Legal Revolution" },
    { name: "description", content: "Join the LawVriksh Beta: Be the First to Experience the future of legal knowledge sharing. Know your rights. Show your insights." },
    { name: "keywords", content: "law, legal, beta, lawvriksh, legal platform, legal knowledge" },
    { name: "viewport", content: "width=device-width, initial-scale=1" }
  ];
};
function Index() {
  const { trackPage } = useAnalytics();
  useEffect(() => {
    trackPage("Home");
  }, [trackPage]);
  return /* @__PURE__ */ jsx(HomePage, {});
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const { login, isLoading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);
  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.username.trim() || !credentials.password.trim()) {
      return;
    }
    const success = await login(credentials);
    if (success) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-law-dark to-gray-900 px-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-law-cream rounded-3xl p-10 max-w-md w-full shadow-2xl relative border-4 border-transparent bg-clip-padding before:absolute before:inset-[-4px] before:bg-gold-texture before:rounded-3xl before:z-[-1] before:brightness-75 before:contrast-125", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => navigate("/"),
        className: "absolute top-4 left-4 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-xs font-medium z-10",
        children: "← Back"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "bg-gold-texture bg-clip-text text-transparent font-merriweather font-semibold text-3xl mb-2 bg-cover bg-center", children: "Admin Access" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 font-source-sans-pro text-lg", children: "LawVriksh Dashboard" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "username", className: "font-montserrat font-medium text-base text-gray-800", children: "Username" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "username",
            name: "username",
            value: credentials.username,
            onChange: handleInputChange,
            className: "p-3 border-2 border-gray-300 rounded-xl text-base bg-white transition-colors focus:outline-none focus:border-law-gold",
            placeholder: "Enter username",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "font-montserrat font-medium text-base text-gray-800", children: "Password" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            id: "password",
            name: "password",
            value: credentials.password,
            onChange: handleInputChange,
            className: "p-3 border-2 border-gray-300 rounded-xl text-base bg-white transition-colors focus:outline-none focus:border-law-gold",
            placeholder: "Enter password",
            required: true
          }
        )
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "bg-red-50 text-red-800 p-3 rounded-lg border border-red-200 text-sm text-center", children: error }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: `p-4 border-none rounded-full bg-gold-texture text-black font-montserrat font-semibold text-lg cursor-pointer transition-all hover:scale-105 hover:opacity-90 ${isLoading ? "opacity-60 cursor-not-allowed transform-none" : ""}`,
          disabled: isLoading,
          children: isLoading ? "Signing in..." : "Sign In"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-center mt-6", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 leading-relaxed mb-3", children: "Enter your admin credentials to access the dashboard" }) })
  ] }) });
}
function DataTable({ data, type, isLoading = false }) {
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const renderUserTable = (users) => /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
    /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Name" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Email" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Phone" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Gender" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Profession" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Registered" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-3" })
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: users.map((user) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
      /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: user.name }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: user.email }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: user.phone_number }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: user.gender || "Not specified" }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: user.profession || "Not specified" }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: formatDate(user.created_at) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: /* @__PURE__ */ jsx("button", { className: "text-blue-600 hover:text-blue-900", onClick: () => setExpandedRow(expandedRow === user.id ? null : user.id), children: expandedRow === user.id ? "Hide" : "View Details" }) })
      ] }),
      expandedRow === user.id && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsxs("td", { colSpan: 7, className: "bg-gray-50 px-6 py-4 text-sm text-gray-700", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("b", { children: "Interest Reason:" }),
          " ",
          user.interest_reason || "N/A"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("b", { children: "User Type:" }),
          " ",
          user.user_type || "N/A"
        ] })
      ] }) })
    ] }, user.id)) })
  ] }) });
  const renderNotInterestedTable = (responses) => /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
    /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Name" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Email" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Reason" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Suggestions" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Date" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-3" })
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: responses.map((response) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
      /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: response.name }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: response.email }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: response.not_interested_reason || "Not specified" }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-500 max-w-xs truncate", children: response.improvement_suggestions || "None provided" }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: formatDate(response.created_at) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: /* @__PURE__ */ jsx("button", { className: "text-blue-600 hover:text-blue-900", onClick: () => setExpandedRow(expandedRow === response.id ? null : response.id), children: expandedRow === response.id ? "Hide" : "View Details" }) })
      ] }),
      expandedRow === response.id && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsxs("td", { colSpan: 6, className: "bg-gray-50 px-6 py-4 text-sm text-gray-700", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("b", { children: "Phone:" }),
          " ",
          response.phone_number || "N/A"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("b", { children: "Gender:" }),
          " ",
          response.gender || "N/A"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("b", { children: "Interest Reason:" }),
          " ",
          response.interest_reason || "N/A"
        ] })
      ] }) })
    ] }, response.id)) })
  ] }) });
  const renderFeedbackTable = (feedback) => /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
    /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "ID" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "User Email" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Submitted" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: feedback.map((item) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
      /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: [
          "#",
          item.id
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: item.user_email || "Anonymous" }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: formatDate(item.created_at) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: /* @__PURE__ */ jsx("button", { className: "text-blue-600 hover:text-blue-900", onClick: () => setExpandedRow(expandedRow === item.id ? null : item.id), children: expandedRow === item.id ? "Hide" : "View Details" }) })
      ] }),
      expandedRow === item.id && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsxs("td", { colSpan: 4, className: "bg-gray-50 px-6 py-4 text-sm text-gray-700", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("b", { children: "Digital Work Showcase Effectiveness:" }),
          " ",
          item.digital_work_showcase_effectiveness ?? "N/A"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("b", { children: "Legal Persons Online Recognition:" }),
          " ",
          item.legal_persons_online_recognition ?? "N/A"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("b", { children: "Digital Work Sharing Difficulty:" }),
          " ",
          item.digital_work_sharing_difficulty ?? "N/A"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("b", { children: "Regular Blogging:" }),
          " ",
          item.regular_blogging ?? "N/A"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("b", { children: "AI Tools Blogging Frequency:" }),
          " ",
          item.ai_tools_blogging_frequency ?? "N/A"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("b", { children: "Blogging Tools Familiarity:" }),
          " ",
          item.blogging_tools_familiarity ?? "N/A"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("b", { children: "Core Platform Features:" }),
          " ",
          item.core_platform_features ?? "N/A"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("b", { children: "AI Research Opinion:" }),
          " ",
          item.ai_research_opinion ?? "N/A"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("b", { children: "Ideal Reading Features:" }),
          " ",
          item.ideal_reading_features ?? "N/A"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("b", { children: "Portfolio Presentation Preference:" }),
          " ",
          item.portfolio_presentation_preference ?? "N/A"
        ] })
      ] }) })
    ] }, item.id)) })
  ] }) });
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 justify-between sm:hidden", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentPage(Math.max(1, currentPage - 1)),
            disabled: currentPage === 1,
            className: "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50",
            children: "Previous"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentPage(Math.min(totalPages, currentPage + 1)),
            disabled: currentPage === totalPages,
            className: "relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50",
            children: "Next"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700", children: [
          "Showing ",
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: startIndex + 1 }),
          " to",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: Math.min(endIndex, data.length) }),
          " of",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: data.length }),
          " results"
        ] }) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("nav", { className: "isolate inline-flex -space-x-px rounded-md shadow-sm", "aria-label": "Pagination", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setCurrentPage(Math.max(1, currentPage - 1)),
              disabled: currentPage === 1,
              className: "relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50",
              children: "Previous"
            }
          ),
          Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setCurrentPage(page),
              className: `relative inline-flex items-center px-4 py-2 text-sm font-semibold ${page === currentPage ? "z-10 bg-law-gold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-law-gold" : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"}`,
              children: page
            },
            page
          )),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setCurrentPage(Math.min(totalPages, currentPage + 1)),
              disabled: currentPage === totalPages,
              className: "relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50",
              children: "Next"
            }
          )
        ] }) })
      ] })
    ] });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("div", { className: "text-gray-500", children: /* @__PURE__ */ jsx("p", { className: "text-lg font-medium", children: "Loading..." }) }) });
  }
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsxs("div", { className: "text-gray-500", children: [
      /* @__PURE__ */ jsx("p", { className: "text-lg font-medium", children: "No data available" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm mt-2", children: [
        type === "users" && "No user registrations yet.",
        type === "creators" && "No creator registrations yet.",
        type === "not-interested" && 'No "not interested" responses yet.',
        type === "feedback" && "No feedback submissions yet."
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white shadow overflow-hidden sm:rounded-md", children: [
    type === "users" && renderUserTable(currentData),
    type === "creators" && renderUserTable(currentData),
    type === "not-interested" && renderNotInterestedTable(currentData),
    type === "feedback" && renderFeedbackTable(currentData),
    renderPagination()
  ] });
}
function AdminDashboard({ onLogout }) {
  var _a, _b, _c, _d;
  const [activeTab, setActiveTab] = useState("user-responses");
  const [activeUserSubTab, setActiveUserSubTab] = useState("user");
  const {
    users,
    creators,
    feedback,
    notInterested,
    fetchAllData
  } = useAdminData();
  const { checkHealth } = useHealthCheck();
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);
  const stats = {
    totalUsers: ((_a = users.data) == null ? void 0 : _a.length) || 0,
    totalCreators: ((_b = creators.data) == null ? void 0 : _b.length) || 0,
    totalNotInterested: ((_c = notInterested.data) == null ? void 0 : _c.length) || 0,
    totalFeedback: ((_d = feedback.data) == null ? void 0 : _d.length) || 0
  };
  const userData = users.data || [];
  const creatorData = creators.data || [];
  const notInterestedData = notInterested.data || [];
  const feedbackData = feedback.data || [];
  const isLoading = users.loading || creators.loading || feedback.loading;
  const handleLogout = () => {
    console.log("Admin logout");
    onLogout();
  };
  const handleRefresh = async () => {
    await fetchAllData();
    await checkHealth();
  };
  const handleDataExport = async (format) => {
    try {
      const response = await api.exportDataJson();
      if (response.success && response.data) {
        const blob = new Blob([JSON.stringify(response.data, null, 2)], {
          type: "application/json"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `lawvriksh-data-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Export failed:", error);
    }
  };
  const handleDownloadData = async () => {
    try {
      const response = await api.downloadData();
      if (response.success && response.data) {
        const blob = new Blob([JSON.stringify(response.data, null, 2)], {
          type: "application/json"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `lawvriksh-complete-data-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx("header", { className: "bg-white shadow-sm border-b border-gray-200", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center h-14 sm:h-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("img", { src: "/logo.png", alt: "LawVriksh", className: "h-6 sm:h-8 w-auto" }),
        /* @__PURE__ */ jsx("h1", { className: "ml-2 sm:ml-4 text-lg sm:text-xl font-semibold text-gray-900 hidden sm:block", children: "Admin Dashboard" }),
        /* @__PURE__ */ jsx("h1", { className: "ml-2 text-base font-semibold text-gray-900 sm:hidden", children: "Admin" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleRefresh,
            className: "px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-law-gold",
            disabled: isLoading,
            children: isLoading ? "Refreshing..." : "Refresh"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleLogout,
            className: "px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500",
            children: "Logout"
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-white text-sm font-medium", children: "U" }) }) }),
          /* @__PURE__ */ jsx("div", { className: "ml-5 w-0 flex-1", children: /* @__PURE__ */ jsxs("dl", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500 truncate", children: "Total Users" }),
            /* @__PURE__ */ jsx("dd", { className: "text-lg font-medium text-gray-900", children: stats.totalUsers })
          ] }) })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-green-500 rounded-md flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-white text-sm font-medium", children: "C" }) }) }),
          /* @__PURE__ */ jsx("div", { className: "ml-5 w-0 flex-1", children: /* @__PURE__ */ jsxs("dl", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500 truncate", children: "Total Creators" }),
            /* @__PURE__ */ jsx("dd", { className: "text-lg font-medium text-gray-900", children: stats.totalCreators })
          ] }) })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-white text-sm font-medium", children: "N" }) }) }),
          /* @__PURE__ */ jsx("div", { className: "ml-5 w-0 flex-1", children: /* @__PURE__ */ jsxs("dl", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500 truncate", children: "Not Interested" }),
            /* @__PURE__ */ jsx("dd", { className: "text-lg font-medium text-gray-900", children: stats.totalNotInterested })
          ] }) })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-white text-sm font-medium", children: "F" }) }) }),
          /* @__PURE__ */ jsx("div", { className: "ml-5 w-0 flex-1", children: /* @__PURE__ */ jsxs("dl", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500 truncate", children: "Feedback" }),
            /* @__PURE__ */ jsx("dd", { className: "text-lg font-medium text-gray-900", children: stats.totalFeedback })
          ] }) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white shadow rounded-lg", children: [
        /* @__PURE__ */ jsx("div", { className: "border-b border-gray-200", children: /* @__PURE__ */ jsxs("nav", { className: "-mb-px flex overflow-x-auto", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveTab("user-responses"),
              className: `py-2 px-3 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${activeTab === "user-responses" ? "border-law-gold text-law-gold" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`,
              children: "User Responses"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveTab("feedback-responses"),
              className: `py-2 px-3 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${activeTab === "feedback-responses" ? "border-law-gold text-law-gold" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`,
              children: "Feedback Responses"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveTab("analytics"),
              className: `py-2 px-3 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${activeTab === "analytics" ? "border-law-gold text-law-gold" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`,
              children: "Analytics"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveTab("data-export"),
              className: `py-2 px-3 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${activeTab === "data-export" ? "border-law-gold text-law-gold" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`,
              children: "Data Export"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          activeTab === "user-responses" && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxs("nav", { className: "flex space-x-4 sm:space-x-8 overflow-x-auto", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setActiveUserSubTab("user"),
                  className: `py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${activeUserSubTab === "user" ? "border-law-gold text-law-gold" : "border-transparent text-gray-500 hover:text-gray-700"}`,
                  children: [
                    "Users (",
                    stats.totalUsers,
                    ")"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setActiveUserSubTab("creator"),
                  className: `py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${activeUserSubTab === "creator" ? "border-law-gold text-law-gold" : "border-transparent text-gray-500 hover:text-gray-700"}`,
                  children: [
                    "Creators (",
                    stats.totalCreators,
                    ")"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setActiveUserSubTab("not-interested"),
                  className: `py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${activeUserSubTab === "not-interested" ? "border-law-gold text-law-gold" : "border-transparent text-gray-500 hover:text-gray-700"}`,
                  children: [
                    "Not Interested (",
                    stats.totalNotInterested,
                    ")"
                  ]
                }
              )
            ] }) }),
            activeUserSubTab === "user" && /* @__PURE__ */ jsx(
              DataTable,
              {
                data: userData,
                type: "users",
                isLoading
              }
            ),
            activeUserSubTab === "creator" && /* @__PURE__ */ jsx(
              DataTable,
              {
                data: creatorData,
                type: "creators",
                isLoading
              }
            ),
            activeUserSubTab === "not-interested" && /* @__PURE__ */ jsx(
              DataTable,
              {
                data: notInterestedData,
                type: "not-interested",
                isLoading
              }
            )
          ] }),
          activeTab === "feedback-responses" && /* @__PURE__ */ jsx(
            DataTable,
            {
              data: feedbackData,
              type: "feedback",
              isLoading
            }
          ),
          activeTab === "analytics" && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-6", children: "Analytics Dashboard" }),
            /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-md font-medium text-gray-800 mb-4", children: "User Analytics" }),
              /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "User analytics data would be displayed here, including:" }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-sm text-gray-600 mt-2 space-y-1", children: [
                  /* @__PURE__ */ jsx("li", { children: "Registration trends over time" }),
                  /* @__PURE__ */ jsx("li", { children: "User vs Creator distribution" }),
                  /* @__PURE__ */ jsx("li", { children: "Geographic distribution" }),
                  /* @__PURE__ */ jsx("li", { children: "Profession breakdown" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-md font-medium text-gray-800 mb-4", children: "Feedback Analytics" }),
              /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Feedback analytics data would be displayed here, including:" }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-sm text-gray-600 mt-2 space-y-1", children: [
                  /* @__PURE__ */ jsx("li", { children: "Average ratings for UI/UX components" }),
                  /* @__PURE__ */ jsx("li", { children: "Common feedback themes" }),
                  /* @__PURE__ */ jsx("li", { children: "Response rates and completion statistics" }),
                  /* @__PURE__ */ jsx("li", { children: "Follow-up consent rates" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-md font-medium text-gray-800 mb-4", children: "Comprehensive Statistics" }),
              /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-4 rounded-lg", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Comprehensive statistics would be displayed here from the /api/data/stats endpoint." }) })
            ] })
          ] }),
          activeTab === "data-export" && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-6", children: "Data Export & Download" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-6 rounded-lg", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-md font-medium text-gray-800 mb-4", children: "Export Data" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Export all data in various formats for analysis or backup purposes." }),
                /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDataExport(),
                    className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
                    children: "Export as JSON"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-6 rounded-lg", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-md font-medium text-gray-800 mb-4", children: "Download All Data" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Download a comprehensive dataset including all users, creators, feedback, and analytics." }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleDownloadData,
                    className: "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500",
                    children: "Download All Data"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-6 rounded-lg", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-md font-medium text-gray-800 mb-4", children: "Available API Endpoints" }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600 space-y-2", children: [
                  /* @__PURE__ */ jsxs("p", { children: [
                    /* @__PURE__ */ jsx("code", { className: "bg-gray-200 px-2 py-1 rounded", children: "POST /api/data/downloaddata" }),
                    " - Download all data"
                  ] }),
                  /* @__PURE__ */ jsxs("p", { children: [
                    /* @__PURE__ */ jsx("code", { className: "bg-gray-200 px-2 py-1 rounded", children: "GET /api/data/export/json" }),
                    " - Export as JSON file"
                  ] }),
                  /* @__PURE__ */ jsxs("p", { children: [
                    /* @__PURE__ */ jsx("code", { className: "bg-gray-200 px-2 py-1 rounded", children: "GET /api/data/stats" }),
                    " - Get comprehensive statistics"
                  ] }),
                  /* @__PURE__ */ jsxs("p", { children: [
                    /* @__PURE__ */ jsx("code", { className: "bg-gray-200 px-2 py-1 rounded", children: "GET /api/users/analytics" }),
                    " - User analytics"
                  ] }),
                  /* @__PURE__ */ jsxs("p", { children: [
                    /* @__PURE__ */ jsx("code", { className: "bg-gray-200 px-2 py-1 rounded", children: "GET /api/feedback/analytics" }),
                    " - Feedback analytics"
                  ] }),
                  /* @__PURE__ */ jsxs("p", { children: [
                    /* @__PURE__ */ jsx("code", { className: "bg-gray-200 px-2 py-1 rounded", children: "GET /api/feedback/summary" }),
                    " - Feedback summary"
                  ] })
                ] })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const meta = () => {
  return [
    { title: "LawVriksh Admin - Dashboard" },
    { name: "description", content: "LawVriksh Admin Dashboard - Manage user registrations and feedback" },
    { name: "robots", content: "noindex, nofollow" }
    // Prevent search engine indexing
  ];
};
function Admin() {
  useNavigate();
  const { isAuthenticated, logout, verifyToken } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      verifyToken();
    }
  }, [isAuthenticated, verifyToken]);
  const handleAdminLogout = () => {
    logout();
  };
  return /* @__PURE__ */ jsx(Fragment, { children: isAuthenticated ? /* @__PURE__ */ jsx(AdminDashboard, { onLogout: handleAdminLogout }) : /* @__PURE__ */ jsx(AdminLogin, {}) });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Admin,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BNGMPvA7.js", "imports": ["/assets/index-YvRzHH_e.js", "/assets/components-j0a9_KZH.js", "/assets/analytics-COkimW_x.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-CkfX76o3.js", "imports": ["/assets/index-YvRzHH_e.js", "/assets/components-j0a9_KZH.js", "/assets/analytics-COkimW_x.js"], "css": ["/assets/root-DPDgeJhj.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BmFwic9m.js", "imports": ["/assets/index-YvRzHH_e.js", "/assets/hooks-CdeIljhn.js", "/assets/analytics-COkimW_x.js"], "css": [] }, "routes/admin": { "id": "routes/admin", "parentId": "root", "path": "admin", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/admin-CX1QlZ_A.js", "imports": ["/assets/index-YvRzHH_e.js", "/assets/hooks-CdeIljhn.js"], "css": [] } }, "url": "/assets/manifest-18d95d0e.js", "version": "18d95d0e" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/admin": {
    id: "routes/admin",
    parentId: "root",
    path: "admin",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};

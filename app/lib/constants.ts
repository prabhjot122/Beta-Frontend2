// Application constants

// Asset URLs
export const ASSETS = {
  LOGO: '/logo.png',
  VIDEO: '/VIDEO.mp4',
  GOLD_TEXTURE: '/gold.jpg',
  GOLD2_TEXTURE: '/gold2.png',
  HERO_IMAGE: '/hero.png',
  BACKGROUND_IMAGE: '/LVbetaBg.png'
} as const;

// Application metadata
export const APP_META = {
  TITLE: 'LawVriksh Beta - Join the Legal Revolution',
  DESCRIPTION: 'Join the LawVriksh Beta: Be the First to Experience the future of legal knowledge sharing. Know your rights. Show your insights.',
  KEYWORDS: 'law, legal, beta, lawvriksh, legal platform, legal knowledge',
  TAGLINE: 'Know your rights. Show your insights'
} as const;

// Responsive breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
} as const;

// Animation durations
export const ANIMATIONS = {
  FAST: 150,
  NORMAL: 200,
  SLOW: 300
} as const;

// Z-index layers
export const Z_INDEX = {
  BACKGROUND: -1,
  OVERLAY: 0,
  CONTENT: 10,
  HEADER: 50,
  POPUP: 1000
} as const;

// Form validation rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 254,
  MAX_PHONE_LENGTH: 20,
  MAX_TEXTAREA_LENGTH: 1000
} as const;

// Backend configuration (mirroring config.py)
export const BACKEND_CONFIG = {
  // Server Configuration
  HOST: '0.0.0.0',
  PORT: 8000,
  DEBUG: true,

  // Database Configuration
  DB_HOST: 'localhost',
  DB_PORT: 3306,
  DB_NAME: 'lawviksh_db',
  DB_USER: 'root',

  // Security Configuration
  ALGORITHM: 'HS256',
  ACCESS_TOKEN_EXPIRE_MINUTES: 30,

  // Admin Credentials
  ADMIN_USERNAME: 'admin'
} as const;

// API Base URL (constructed from backend config)
export const API_BASE_URL = `https://beta.lawvriksh.com`;

// API endpoints matching FastAPI backend routes
export const API_ENDPOINTS = {
  // Authentication
  ADMIN_LOGIN: '/api/auth/adminlogin',
  ADMIN_VERIFY: '/api/auth/verify',

  // User Management
  REGISTER_USER: '/api/users/userdata',
  REGISTER_CREATOR: '/api/users/creatordata',
  GET_USERS: '/api/users/registereduserdata',
  GET_CREATORS: '/api/users/registeredcreatordata',
  USER_ANALYTICS: '/api/users/analytics',

  // Not Interested
  SUBMIT_NOT_INTERESTED: '/api/users/notinteresteddata',
  GET_NOT_INTERESTED: '/api/users/notintdata',

  // Feedback
  SUBMIT_FEEDBACK: '/api/feedback/submit',
  GET_FEEDBACK: '/api/feedback/all',
  GET_FEEDBACK_ALT: '/api/feedback/userfeedbackdata',
  FEEDBACK_ANALYTICS: '/api/feedback/analytics',
  FEEDBACK_SUMMARY: '/api/feedback/summary',

  // Data Export & Analytics
  DOWNLOAD_DATA: '/api/data/downloaddata',
  EXPORT_JSON: '/api/data/export/json',
  GET_STATS: '/api/data/stats',
  EXPORT_NOT_INTERESTED: '/api/data/export/notintdata',

  // Health Check
  HEALTH_CHECK: '/health'
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  ADMIN_TOKEN: 'beta_lawvriksh_admin_token',
  USER_PREFERENCES: 'beta_lawvriksh_user_preferences',
  FORM_DRAFTS: 'beta_lawvriksh_form_drafts'
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.'
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  REGISTRATION_SUCCESS: 'Thank you for joining our waiting list! We\'ll be in touch soon.',
  FEEDBACK_SUCCESS: 'Thank you for your valuable feedback! Your input helps us improve our platform.',
  NOT_INTERESTED_SUCCESS: 'Thank you for your time and feedback.'
} as const;

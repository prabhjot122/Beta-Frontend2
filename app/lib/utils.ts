import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Email validation utility
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Form validation utilities
export function validateRequired(value: string, fieldName: string): string | null {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email || email.trim() === '') {
    return 'Email is required';
  }
  if (!isValidEmail(email)) {
    return 'Please provide a valid email address';
  }
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone || phone.trim() === '') {
    return 'Phone number is required';
  }
  // Basic phone validation - can be enhanced based on requirements
  const phoneRegex = /^[+]?([1-9][\d]{0,15})$/;
  if (!phoneRegex.test(phone.replace(/[\s\-()]/g, ''))) {
    return 'Please provide a valid phone number';
  }
  return null;
}

// Rating validation for feedback form
export function validateRating(rating: string, fieldName: string): string | null {
  if (!rating || rating.trim() === '') {
    return `${fieldName} rating is required`;
  }
  const ratingNum = parseInt(rating);
  if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return `${fieldName} rating must be between 1 and 5`;
  }
  return null;
}

// Conditional field validation for low ratings
export function validateConditionalField(
  rating: string, 
  conditionalValue: string, 
  fieldName: string
): string | null {
  const ratingNum = parseInt(rating);
  if (ratingNum && ratingNum < 3 && (!conditionalValue || conditionalValue.trim() === '')) {
    return `Please explain what you didn't like for ${fieldName} ratings below 3`;
  }
  return null;
}

// Debounce utility for form inputs
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Format date utility
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Sanitize input utility
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

// Generate unique ID utility
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Local storage utilities
export const storage = {
  get: (key: string) => {
    if (typeof window === 'undefined') return null;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: (key: string, value: unknown) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Handle storage errors silently
    }
  },
  
  remove: (key: string) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Handle storage errors silently
    }
  }
};

// Constants for styling
export const POPUP_STYLES = {
  overlay: "fixed inset-0 bg-gradient-to-br from-law-dark/60 via-black/50 to-blue-900/40 flex items-center justify-center z-50 backdrop-blur-xl p-4",
  container: "backdrop-blur-2xl rounded-3xl p-6 sm:p-8 md:p-10 max-w-lg w-full max-h-[90vh] sm:max-h-[80vh] overflow-y-auto popup-scroll relative shadow-2xl border border-white/20 pt-14 sm:pt-0", // Added pt-14 for mobile top padding
  containerBorder: "before:absolute before:inset-[-1px]  before:rounded-3xl before:z-[-1] before:blur-sm",
  close: "absolute top-4 right-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full w-8 h-8 flex items-center justify-center text-lg cursor-pointer text-white/80 hover:text-white hover:bg-white/20 transition-all font-montserrat hover:scale-110",
  title: "bg-gradient-to-r from-law-gold via-yellow-300 to-law-gold bg-clip-text text-transparent font-merriweather font-bold text-2xl sm:text-3xl mb-6 sm:mb-8 text-center drop-shadow-lg mt-0 sm:mt-0", // Ensure no extra top margin
  form: "flex flex-col gap-5 sm:gap-6",
  formGroup: "flex flex-col gap-2.5",
  label: "font-montserrat font-semibold text-sm sm:text-base text-white/90 tracking-wide drop-shadow-sm",
  input: "p-3 sm:p-4 border border-white/20 rounded-xl text-sm sm:text-base bg-white/10 backdrop-blur-md text-white placeholder-white/60 transition-all focus:outline-none focus:border-law-gold/60 focus:ring-2 focus:ring-law-gold/30 focus:bg-white/15 font-source-sans-pro shadow-inner",
  textarea: "p-3 sm:p-4 border border-white/20 rounded-xl text-sm sm:text-base bg-white/10 backdrop-blur-md text-white placeholder-white/60 transition-all focus:outline-none focus:border-law-gold/60 focus:ring-2 focus:ring-law-gold/30 focus:bg-white/15 resize-vertical min-h-[100px] font-source-sans-pro shadow-inner",
  select: "p-3 sm:p-4 border border-white/20 rounded-xl text-sm sm:text-base bg-gray-800 text-white transition-all focus:outline-none focus:border-law-gold/60 focus:ring-2 focus:ring-law-gold/30 focus:bg-gray-900 font-source-sans-pro shadow-inner appearance-none",
  button: "p-4 sm:p-5 border-none rounded-xl bg-gradient-to-r from-law-gold/90 via-yellow-400/90 to-law-gold/90 backdrop-blur-sm text-black font-montserrat font-semibold text-base sm:text-lg cursor-pointer transition-all hover:scale-105 hover:shadow-2xl hover:from-law-gold hover:to-yellow-400 mt-4 shadow-xl border border-white/30",
  error: "bg-red-500/20 backdrop-blur-md text-red-200 p-4 rounded-xl border border-red-400/30 text-sm mb-5 text-center font-source-sans-pro shadow-inner"
};

export const BUTTON_STYLES = {
  primary: "flex w-64 h-12 px-6 items-center justify-center rounded-xl border border-white/30 bg-gradient-to-r from-law-gold/90 via-yellow-400/90 to-law-gold/90 backdrop-blur-sm text-black font-montserrat font-semibold text-lg cursor-pointer transition-all hover:scale-105 hover:shadow-2xl hover:from-law-gold hover:to-yellow-400 shadow-xl",
  secondary: "flex w-64 h-12 px-6 items-center justify-center rounded-xl border border-white/30 bg-white/10 backdrop-blur-md text-white font-montserrat font-semibold text-lg cursor-pointer transition-all hover:bg-white/20 hover:scale-105 shadow-lg",
  disabled: "opacity-60 cursor-not-allowed transform-none"
};



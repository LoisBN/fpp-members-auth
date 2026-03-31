/**
 * Pedagogic Logger
 *
 * Educational logging utility with emoji prefixes for easy identification.
 * Open your browser's console to see detailed logs of what's happening!
 */

const isDev = typeof window !== 'undefined'
  ? window.location.hostname === 'localhost'
  : process.env.NODE_ENV !== 'production';

export const log = {
  auth: (message: string, data?: unknown) => {
    if (isDev) {
      console.log(`🔐 [Auth] ${message}`, data ?? '');
    }
  },

  api: (message: string, data?: unknown) => {
    if (isDev) {
      console.log(`📡 [API] ${message}`, data ?? '');
    }
  },

  ui: (message: string, data?: unknown) => {
    if (isDev) {
      console.log(`🎨 [UI] ${message}`, data ?? '');
    }
  },

  error: (message: string, error?: unknown) => {
    console.error(`❌ [Error] ${message}`, error ?? '');
  },

  success: (message: string, data?: unknown) => {
    if (isDev) {
      console.log(`✅ [Success] ${message}`, data ?? '');
    }
  },

  info: (message: string, data?: unknown) => {
    if (isDev) {
      console.log(`ℹ️ [Info] ${message}`, data ?? '');
    }
  },

  warn: (message: string, data?: unknown) => {
    if (isDev) {
      console.warn(`⚠️ [Warning] ${message}`, data ?? '');
    }
  },
};

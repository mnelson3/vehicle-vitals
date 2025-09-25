// -----------------------------
// File: shared/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Try to read env vars from multiple environments
// - Vite (web): import.meta.env.VITE_*
// - Node/native: process.env.VITE_*
let env = {};
// Prefer Vite's import.meta.env when available; fall back to process.env.
try {
  // Accessing import.meta.env directly may throw in some runtimes; guard with try/catch.
  // In Vite this will populate env.
  // eslint-disable-next-line no-undef
  env = import.meta?.env || {};
} catch (e) {
  // ignore; will try process.env below
}
if (typeof process !== 'undefined' && process.env) env = { ...process.env, ...env };

export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || env.FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || env.FIREBASE_AUTH_DOMAIN || 'YOUR_AUTH_DOMAIN',
  projectId: env.VITE_FIREBASE_PROJECT_ID || env.FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || env.FIREBASE_STORAGE_BUCKET || 'YOUR_STORAGE_BUCKET',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || env.FIREBASE_MESSAGING_SENDER_ID || 'YOUR_MSG_SENDER_ID',
  appId: env.VITE_FIREBASE_APP_ID || env.FIREBASE_APP_ID || 'YOUR_APP_ID'
};

// For platform-specific usage, consumer can initialize the app and export auth/db as needed.
// Older code may have expected `auth` and `db` exports; prefer platform-specific initialization.

// Messaging is web-only in this repo; only import/use it where supported.
let messaging = null;
try {
  // dynamic import so native bundles don't try to resolve web-only module
  // (consumer code can import { messaging } from './firebaseConfig' and check for null)
  // eslint-disable-next-line import/no-extraneous-dependencies
  // Note: this will only work in environments that support dynamic import; keep try/catch to be safe.
  // We intentionally don't export getMessaging directly to avoid bundling issues in native.
  // If you need push notifications on native, set up the native SDKs and export a native-capable messaging instance.
  // The web app can still import firebase/messaging directly if needed.
  // Placeholder: messaging stays null for native.
} catch (err) {
  // noop
}

export { messaging };

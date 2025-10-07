import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const env = import.meta.env || {};

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'YOUR_AUTH_DOMAIN',
  projectId: env.VITE_FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'YOUR_STORAGE_BUCKET',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_MSG_SENDER_ID',
  appId: env.VITE_FIREBASE_APP_ID || 'YOUR_APP_ID',
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || undefined,
};

if (
  !env.VITE_FIREBASE_API_KEY ||
  firebaseConfig.apiKey === 'YOUR_API_KEY' ||
  firebaseConfig.authDomain === 'YOUR_AUTH_DOMAIN' ||
  firebaseConfig.projectId === 'YOUR_PROJECT_ID'
) {
  // eslint-disable-next-line no-console
  console.warn('[Firebase] Missing or placeholder Firebase config detected. Set VITE_FIREBASE_* env vars. See web/.env.example.');
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

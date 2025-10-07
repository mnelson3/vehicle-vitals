// Dev-only auth bootstrap: signs in anonymously so local writes work.
// Requires Anonymous Sign-in enabled in Firebase Auth for your project.
// This runs only in Vite dev builds.
import { auth } from './firebaseConfig';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

if (import.meta?.env?.DEV) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // Attempt anonymous sign-in; ignore errors in case provider is disabled
      signInAnonymously(auth).catch(() => {});
    }
  });
}

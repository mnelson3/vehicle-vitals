// Dev-only auth bootstrap: signs in anonymously so local writes work.
// Requires Anonymous Sign-in enabled in Firebase Auth for your project.
// This runs only in Vite dev builds.

if (import.meta?.env?.DEV) {
  // Dynamic imports to avoid bundling in production
  Promise.all([
    import('./firebaseConfig'),
    import('firebase/auth')
  ]).then(([{ auth }, { signInAnonymously, onAuthStateChanged }]) => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Attempt anonymous sign-in; ignore errors in case provider is disabled
        signInAnonymously(auth).catch(() => {});
      }
    });
  }).catch(() => {
    // Ignore errors if Firebase is not available
  });
}

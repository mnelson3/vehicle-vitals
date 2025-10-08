import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Temporary fix: Mock Firebase auth for build
const mockAuth = {
  currentUser: null,
  onAuthStateChanged: () => () => {},
  signInWithEmailAndPassword: () => Promise.reject('Mock auth'),
  createUserWithEmailAndPassword: () => Promise.reject('Mock auth'),
  signOut: () => Promise.resolve(),
  signInWithPopup: () => Promise.reject('Mock auth'),
};

// Dynamic imports for Firebase when available
let auth = mockAuth;
let firebaseAuth = {};

if (typeof window !== 'undefined') {
  Promise.all([
    import('./firebaseConfig').catch(() => ({ auth: mockAuth })),
    import('firebase/auth').catch(() => ({}))
  ]).then(([{ auth: firebaseAuthInstance }, authFunctions]) => {
    if (firebaseAuthInstance && authFunctions) {
      auth = firebaseAuthInstance;
      firebaseAuth = authFunctions;
    }
  });
}

const AuthContext = createContext({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  signInWithGoogle: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [googleProvider] = useState(() => new GoogleAuthProvider());

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    signIn: (email, password) => signInWithEmailAndPassword(auth, email, password),
    signUp: (email, password) => createUserWithEmailAndPassword(auth, email, password),
    signOut: () => fbSignOut(auth),
    signInWithGoogle: () => signInWithPopup(auth, googleProvider),
  }), [user, loading, googleProvider]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

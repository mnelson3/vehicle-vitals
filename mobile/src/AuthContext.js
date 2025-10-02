import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from 'shared/firestoreClient';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import Constants from 'expo-constants';

const AuthContext = createContext({ user: null, loading: true });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const extra = Constants?.expoConfig?.extra || {};
  const [, , promptAsync] = Google.useAuthRequest({
    iosClientId: extra.IOS_GOOGLE_CLIENT_ID,
    androidClientId: extra.ANDROID_GOOGLE_CLIENT_ID,
    expoClientId: extra.EXPO_GOOGLE_CLIENT_ID,
    // Request idToken for Firebase
    responseType: 'id_token',
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession();
  }, []);

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
    resetPassword: (email) => sendPasswordResetEmail(auth, email),
    signInWithGoogle: async () => {
      const res = await promptAsync();
      if (res?.type !== 'success') return;
      const idToken = res.authentication?.idToken || null;
      const accessToken = res.authentication?.accessToken || null;
      if (!idToken && !accessToken) return;
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      await signInWithCredential(auth, credential);
    },
  }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

import React, { useEffect, useState } from 'react';
import { auth } from '../shared/firebaseConfig';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';

export default function AuthAnonButton() {
  const [authed, setAuthed] = useState(!!auth.currentUser);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setAuthed(!!user));
    return () => unsub();
  }, []);

  if (authed) return null;

  const signIn = async () => {
    setBusy(true);
    setError('');
    try {
      await signInAnonymously(auth);
    } catch (e) {
      setError(e?.message || 'Failed to sign in');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{
      background: '#fff7e6',
      border: '1px solid #ffcc80',
      padding: 10,
      margin: '10px 20px',
      borderRadius: 6,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      justifyContent: 'space-between'
    }}>
      <span style={{ fontSize: 14 }}>You’re not signed in.</span>
      <div>
        <button onClick={signIn} disabled={busy} style={{ padding: '6px 10px' }}>
          {busy ? 'Signing in…' : 'Continue without account'}
        </button>
        {error && <span style={{ color: '#d00', marginLeft: 8, fontSize: 12 }}>{error}</span>}
      </div>
    </div>
  );
}

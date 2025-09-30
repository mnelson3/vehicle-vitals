import React, { useEffect, useState } from 'react';
import { auth } from '../shared/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { getVehicles } from '../shared/firestoreService';

const shouldShow = () => import.meta.env.DEV || import.meta.env.VITE_SHOW_STATUS === 'true';

export default function DevStatusPanel() {
  const [visible] = useState(shouldShow());
  const [uid, setUid] = useState(auth.currentUser?.uid || '');
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const unsub = onAuthStateChanged(auth, async (user) => {
      setUid(user?.uid || '');
      if (!user?.uid) {
        setCount(0);
        return;
      }
      try {
        const list = await getVehicles();
        setCount(list.length);
      } catch {
        setCount(0);
      }
    });
    return () => unsub();
  }, [visible]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: '#eef6ff',
      borderBottom: '1px solid #cfe3ff',
      padding: '6px 12px',
      fontSize: 12,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <span>UID: {uid || '(signed out)'}</span>
      <span>Vehicles: {count}</span>
    </div>
  );
}

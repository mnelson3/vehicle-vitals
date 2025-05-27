// -----------------------------
// File: web/src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { db, auth } from '../../../shared/firebaseConfig';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    const unsubscribe = onSnapshot(collection(db, `users/${userId}/vehicles`), (snapshot) => {
      const vehicleList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setVehicles(vehicleList);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (vin) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    await deleteDoc(doc(db, `users/${userId}/vehicles/${vin}`));
    alert('Vehicle deleted.');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Vehicles</h2>
      <ul>
        {vehicles.map((v) => (
          <li key={v.vin} style={{ marginBottom: 10 }}>
            <strong>{v.year} {v.make} {v.model}</strong> (VIN: {v.vin})
            <button onClick={() => navigate(`/vehicle/${v.vin}`)} style={{ marginLeft: 10 }}>View</button>
            <button onClick={() => handleDelete(v.vin)} style={{ marginLeft: 5 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Home;

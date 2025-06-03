// -----------------------------
// File: web/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db, auth } from '../../shared/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function Home() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;
      const ref = collection(db, `users/${userId}/vehicles`);
      const snap = await getDocs(ref);
      setVehicles(snap.docs.map((doc) => doc.data()));
    };
    fetchVehicles();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Vehicle Vitals</h1>
      <Link to="/add-vehicle">
        <button style={{ marginTop: 20 }}>Add Vehicle</button>
      </Link>
      <ul style={{ marginTop: 20 }}>
        {vehicles.map((vehicle) => (
          <li key={vehicle.vin}>
            <Link to={`/edit-vehicle/${vehicle.vin}`}>
              {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.vin})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

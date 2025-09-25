// -----------------------------
// File: web/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getVehicles } from '../shared/firestoreService';
import AdBanner from '../components/AdBanner';

export default function Home() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const list = await getVehicles();
      setVehicles(list);
    };
    fetchVehicles();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Vehicle Vitals</h1>
      <Link to="/add-vehicle">
        <button style={{ marginTop: 20 }}>Add Vehicle</button>
      </Link>
      <AdBanner />
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

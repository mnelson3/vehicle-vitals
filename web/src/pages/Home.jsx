// -----------------------------
// File: web/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getVehicles } from '../shared/firestoreService';
import { deleteVehicle } from '../shared/firestoreService';
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

  const handleDelete = async (vin) => {
    const ok = window.confirm('Delete this vehicle? This cannot be undone.');
    if (!ok) return;
    try {
      await deleteVehicle(vin);
      const list = await getVehicles();
      setVehicles(list);
    } catch (err) {
      alert('Error deleting vehicle: ' + err.message);
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Vehicle Vitals</h1>
        <Link to="/add-vehicle" className="button primary">Add Vehicle</Link>
      </div>
      <div className="spacing-md">
        <AdBanner />
      </div>
      {vehicles.length === 0 ? (
        <div className="card spacing-lg">
          <h3>No vehicles yet</h3>
          <p className="muted">Get started by adding your first vehicle. You can use VIN decode to speed things up.</p>
          <Link to="/add-vehicle" className="button primary spacing-sm">Add your first vehicle</Link>
        </div>
      ) : (
        <div className="grid-2 spacing-lg">
          {vehicles.map((v) => (
            <div key={v.vin} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 18 }}>{v.year} {v.make} {v.model}</div>
                <div className="muted" style={{ fontSize: 14 }}>VIN: {v.vin}{v.mileage ? ` • ${v.mileage} mi` : ''}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                <Link to={`/edit-vehicle/${v.vin}`} className="button">Open</Link>
                <button className="button danger" onClick={() => handleDelete(v.vin)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

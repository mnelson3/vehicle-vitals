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
      <div className="layout-with-sidebar">
        <main>
          <div className="d-flex align-items-end justify-content-between mb-3">
            <h1 className="m-0">Vehicle Vitals</h1>
            <Link to="/add-vehicle" className="btn btn-primary">Add Vehicle</Link>
          </div>
          <div className="my-3">
            <AdBanner />
          </div>
          {vehicles.length === 0 ? (
            <div className="card my-4 p-3">
              <h3>No vehicles yet</h3>
              <p className="muted mb-2">Get started by adding your first vehicle. You can use VIN decode to speed things up.</p>
              <Link to="/add-vehicle" className="btn btn-primary">Add your first vehicle</Link>
            </div>
          ) : (
            <div className="row g-3 my-4">
              {vehicles.map((v) => (
                <div key={v.vin} className="col-12 col-md-6">
                  <div className="card d-flex flex-column gap-2 p-3">
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 18 }}>{v.year} {v.make} {v.model}</div>
                      <div className="muted" style={{ fontSize: 14 }}>VIN: {v.vin}{v.mileage ? ` • ${v.mileage} mi` : ''}</div>
                    </div>
                    <div className="d-flex gap-2 mt-auto">
                      <Link to={`/edit-vehicle/${v.vin}`} className="btn btn-outline-secondary">Open</Link>
                      <button className="btn btn-danger" onClick={() => handleDelete(v.vin)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        <aside className="sidebar-ads">
          <div className="sticky">
            <AdBanner />
          </div>
        </aside>
      </div>
    </div>
  );
}

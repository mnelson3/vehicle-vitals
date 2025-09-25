// -----------------------------
// File: web/pages/EditVehicle.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getVehicle, updateVehicle } from '../shared/firestoreService';
import AdBanner from '../components/AdBanner';
import { getMaintenanceEntries, addMaintenanceEntry } from '../shared/firestoreService';

export default function EditVehicle() {
  const { vin } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      if (!vin) return;
      const v = await getVehicle(vin);
      setForm(v);
    };
    fetchVehicle();
  }, [vin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await updateVehicle(vin, form);
      alert('Vehicle updated successfully');
      navigate('/');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Vehicle</h2>
      {['make', 'model', 'year', 'vin', 'mileage'].map((field) => (
        <div key={field} style={{ marginBottom: 12 }}>
          <input
            type="text"
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            style={{ padding: 8, width: '100%' }}
          />
        </div>
      ))}
      <button onClick={handleUpdate}>Save Changes</button>
      <div style={{ marginTop: 18 }}>
        <AdBanner />
      </div>
      <div style={{ marginTop: 24 }}>
        <h3>Maintenance</h3>
        <MaintenanceList vin={vin} />
      </div>
    </div>
  );
}

function MaintenanceList({ vin }) {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ title: '', notes: '', cost: '' });

  useEffect(() => {
    const load = async () => {
      const list = await getMaintenanceEntries(vin);
      setEntries(list);
    };
    load();
  }, [vin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleAdd = async () => {
    try {
      const entry = { ...form, date: new Date().toISOString() };
      await addMaintenanceEntry(vin, entry);
      const list = await getMaintenanceEntries(vin);
      setEntries(list);
      setForm({ title: '', notes: '', cost: '' });
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div>
      <ul>
        {entries.map((e) => (
          <li key={e.id} style={{ marginBottom: 8 }}>
            <strong>{e.title}</strong> — {e.date?.split('T')[0]} — ${e.cost}
            <div style={{ fontSize: 12 }}>{e.notes}</div>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 12 }}>
        <h4>Add Entry</h4>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input name="cost" placeholder="Cost" value={form.cost} onChange={handleChange} style={{ marginLeft: 8 }} />
        <div>
          <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} style={{ width: '100%', height: 60 }} />
        </div>
        <button onClick={handleAdd} style={{ marginTop: 8 }}>Add Maintenance</button>
      </div>
    </div>
  );
}

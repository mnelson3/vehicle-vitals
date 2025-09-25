// -----------------------------
// File: web/pages/AddVehicle.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addOrUpdateVehicle } from '../shared/firestoreService';
import AdBanner from '../components/AdBanner';
import { defaultVehicle } from '../../../shared/types';

export default function AddVehicle() {
  const [form, setForm] = useState({ ...defaultVehicle });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await addOrUpdateVehicle(form);
      alert('Vehicle added successfully');
      navigate('/');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Vehicle</h2>
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
      <button onClick={handleSubmit}>Add Vehicle</button>
      <div style={{ marginTop: 18 }}>
        <AdBanner />
      </div>
    </div>
  );
}

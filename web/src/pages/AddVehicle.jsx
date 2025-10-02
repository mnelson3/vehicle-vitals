// -----------------------------
// File: web/pages/AddVehicle.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addOrUpdateVehicle } from '../shared/firestoreService';
import AdBanner from '../components/AdBanner';
import { defaultVehicle } from '../../../shared/types';
import useVehicleOptions from '../hooks/useVehicleOptions';
import { decodeVin } from '../utils/vehicleService';

export default function AddVehicle() {
  const [form, setForm] = useState({ ...defaultVehicle });
  const navigate = useNavigate();
  const { years, makes, models, loadingMakes, loadingModels } = useVehicleOptions({ year: form.year, make: form.make });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await addOrUpdateVehicle(form);
  alert('Vehicle added successfully');
  navigate('/app');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDecodeVin = async () => {
    const vin = (form.vin || '').trim();
    if (!vin) {
      alert('Enter a VIN first');
      return;
    }
    try {
      const { make, model, year } = await decodeVin(vin);
      setForm((prev) => ({
        ...prev,
        make: make || prev.make,
        model: model || prev.model,
        year: year || prev.year,
      }));
    } catch (e) {
      alert(e?.message || 'Failed to decode VIN');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <AdBanner />
      <h2>Add Vehicle</h2>
      {/* Year dropdown */}
      <div style={{ marginBottom: 12 }}>
        <select name="year" value={form.year} onChange={handleChange} style={{ padding: 8, width: '100%' }}>
          <option value="">Select Year</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Make dropdown with fallback */}
      <div style={{ marginBottom: 12 }}>
        <select name="make" value={form.make} onChange={handleChange} style={{ padding: 8, width: '100%' }} disabled={loadingMakes}>
          <option value="">{loadingMakes ? 'Loading makes…' : 'Select Make'}</option>
          {makes.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Model dropdown depends on year+make */}
      <div style={{ marginBottom: 12 }}>
        <select name="model" value={form.model} onChange={handleChange} style={{ padding: 8, width: '100%' }} disabled={!form.year || !form.make || loadingModels}>
          <option value="">{loadingModels ? 'Loading models…' : (!form.year || !form.make ? 'Select year & make first' : 'Select Model')}</option>
          {models.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* VIN and mileage remain free-form */}
      {['vin', 'mileage'].map((field) => (
        <div key={field} style={{ marginBottom: 12 }}>
          <input
            type="text"
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            style={{ padding: 8, width: '100%' }}
          />
          {field === 'vin' && (
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
              Decode VIN uses the NHTSA VPIC database to prefill Year, Make, and Model. No data is saved until you click Add Vehicle.
            </div>
          )}
        </div>
      ))}
      <div style={{ marginBottom: 12 }}>
        <button type="button" onClick={handleDecodeVin}>Decode VIN</button>
      </div>
      <div style={{ marginBottom: 12 }}>
        <input
          type="date"
          name="purchaseDate"
          value={form.purchaseDate || ''}
          onChange={handleChange}
          placeholder="Purchase Date"
          style={{ padding: 8, width: '100%' }}
        />
      </div>
      <button onClick={handleSubmit}>Add Vehicle</button>
      <div style={{ marginTop: 18 }}>
        <AdBanner />
      </div>
    </div>
  );
}

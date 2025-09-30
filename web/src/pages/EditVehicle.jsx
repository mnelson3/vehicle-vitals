// -----------------------------
// File: web/pages/EditVehicle.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getVehicle, updateVehicle, getMaintenanceEntries, addMaintenanceEntry, deleteVehicle } from '../shared/firestoreService';
import AdBanner from '../components/AdBanner';
import useVehicleOptions from '../hooks/useVehicleOptions';
import { decodeVin } from '../utils/vehicleService';

export default function EditVehicle() {
  const { vin } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const { years, makes, models, loadingMakes, loadingModels } = useVehicleOptions({ year: form?.year, make: form?.make });

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

  const handleDecodeVin = async () => {
    const v = (form.vin || '').trim();
    if (!v) {
      alert('Enter a VIN first');
      return;
    }
    try {
      const { make, model, year } = await decodeVin(v);
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

  const handleDelete = async () => {
    const ok = window.confirm('Delete this vehicle? This will remove all vehicle data.');
    if (!ok) return;
    try {
      // deleteVehicle imported from shared service
      await deleteVehicle(vin);
      alert('Vehicle deleted');
      navigate('/');
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Vehicle</h2>
      {/* Year dropdown */}
      <div style={{ marginBottom: 12 }}>
        <select name="year" value={form.year} onChange={handleChange} style={{ padding: 8, width: '100%' }}>
          <option value="">Select Year</option>
          {form.year && !years.includes(String(form.year)) && (
            <option value={form.year}>Current: {form.year}</option>
          )}
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Make dropdown */}
      <div style={{ marginBottom: 12 }}>
        <select name="make" value={form.make} onChange={handleChange} style={{ padding: 8, width: '100%' }} disabled={loadingMakes}>
          <option value="">{loadingMakes ? 'Loading makes…' : 'Select Make'}</option>
          {form.make && !makes.includes(form.make) && (
            <option value={form.make}>Current: {form.make}</option>
          )}
          {makes.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Model dropdown depends on year+make */}
      <div style={{ marginBottom: 12 }}>
        <select name="model" value={form.model} onChange={handleChange} style={{ padding: 8, width: '100%' }} disabled={!form.year || !form.make || loadingModels}>
          <option value="">{loadingModels ? 'Loading models…' : (!form.year || !form.make ? 'Select year & make first' : 'Select Model')}</option>
          {form.model && !models.includes(form.model) && (
            <option value={form.model}>Current: {form.model}</option>
          )}
          {models.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* VIN and mileage text inputs */}
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
              Decode VIN uses the NHTSA VPIC database to prefill Year, Make, and Model. Changes aren’t saved until you click Save Changes.
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
      <button onClick={handleUpdate}>Save Changes</button>
  <button onClick={handleDelete} style={{ marginLeft: 12, background: '#fcc' }}>Delete Vehicle</button>
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

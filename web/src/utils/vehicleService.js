// -----------------------------
// File: web/src/utils/vehicleService.js
import { db, auth } from '../shared/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export async function fetchVehicleByVINAndSave(vin) {
  try {
    const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`);
    const data = await response.json();
    const result = data.Results;
    const vehicle = {
      vin,
      make: result.find((r) => r.Variable === 'Make')?.Value || '',
      model: result.find((r) => r.Variable === 'Model')?.Value || '',
      year: result.find((r) => r.Variable === 'Model Year')?.Value || '',
      mileage: '',
      services: []
    };
    const userId = auth.currentUser?.uid;
    if (userId) {
      const vehicleRef = doc(db, `users/${userId}/vehicles/${vin}`);
      await setDoc(vehicleRef, vehicle);
      alert('Vehicle added successfully!');
    }
    return vehicle;
  } catch (err) {
    console.error('VIN lookup failed', err);
    alert('Error fetching vehicle info');
    return null;
  }
}

// Decode VIN without saving; returns { make, model, year } strings or '' when unknown
export async function decodeVin(vin) {
  const cleaned = String(vin || '').trim().toUpperCase();
  if (!cleaned) throw new Error('VIN is required');
  const url = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${encodeURIComponent(cleaned)}?format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('VIN decode request failed');
  const data = await res.json();
  const results = data?.Results || [];
  const sanitize = (v) => {
    const s = (v ?? '').toString().trim();
    if (!s) return '';
    const bad = new Set(['0', 'NOT APPLICABLE', 'NULL', 'N/A', 'NONE', 'UNKNOWN']);
    return bad.has(s.toUpperCase()) ? '' : s;
  };
  const getVal = (key) => sanitize(results.find((r) => r.Variable === key)?.Value);
  const make = getVal('Make');
  const model = getVal('Model');
  const year = getVal('Model Year');
  return { make, model, year };
}

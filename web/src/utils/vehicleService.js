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

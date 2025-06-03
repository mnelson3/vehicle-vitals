// -----------------------------
// File: web/pages/EditVehicle.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../shared/firebaseConfig';

export default function EditVehicle() {
  const { vin } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId || !vin) return;
      const ref = doc(db, `users/${userId}/vehicles/${vin}`);
      const snap = await getDoc(ref);
      if (snap.exists()) setForm(snap.data());
    };
    fetchVehicle();
  }, [vin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('Not authenticated');
      const ref = doc(db, `users/${userId}/vehicles/${vin}`);
      await updateDoc(ref, form);
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
    </div>
  );
}

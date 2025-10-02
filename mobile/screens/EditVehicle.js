// -----------------------------
// File: mobile/screens/EditVehicle.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { db, auth } from 'shared/firestoreClient';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function EditVehicle({ route, navigation }) {
  const { vin } = route.params;
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      const userId = auth.currentUser?.uid;
      const ref = doc(db, `users/${userId}/vehicles/${vin}`);
      const snap = await getDoc(ref);
      if (snap.exists()) setForm(snap.data());
    };
    fetchVehicle();
  }, [vin]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    try {
      const userId = auth.currentUser?.uid;
      const ref = doc(db, `users/${userId}/vehicles/${vin}`);
      await updateDoc(ref, form);
      Alert.alert('Success', 'Vehicle updated');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  if (!form) return null;

  return (
    <View style={{ padding: 20 }}>
      {['make', 'model', 'year', 'vin', 'mileage'].map((field) => (
        <TextInput
          key={field}
          placeholder={field.toUpperCase()}
          value={form[field]}
          onChangeText={(text) => handleChange(field, text)}
          style={{ marginBottom: 12, borderWidth: 1, padding: 8 }}
        />
      ))}
      <Button title="Save Changes" onPress={handleUpdate} />
      <View style={{ height: 12 }} />
      <Button title="View Maintenance" onPress={() => navigation.navigate('MaintenanceList', { vin })} />
    </View>
  );
}

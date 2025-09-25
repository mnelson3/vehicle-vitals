// -----------------------------
// File: mobile/screens/AddVehicle.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { db, auth } from '../../shared/firestoreClient';
import { doc, setDoc } from 'firebase/firestore';
import { defaultVehicle } from '../../shared/types';

export default function AddVehicle({ navigation, route }) {
  const [form, setForm] = useState({ ...defaultVehicle, vin: route?.params?.vin || '' });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('Not authenticated');
      const ref = doc(db, `users/${userId}/vehicles/${form.vin}`);
      await setDoc(ref, form);
      Alert.alert('Success', 'Vehicle added');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

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
      <Button title="Scan VIN Barcode" onPress={() => navigation.navigate('ScanVIN')} />
      <Button title="Add Vehicle" onPress={handleSubmit} />
    </View>
  );
}

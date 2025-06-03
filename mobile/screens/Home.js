// -----------------------------
// File: mobile/screens/Home.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { db, auth } from '../../shared/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function Home({ navigation }) {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;
      const ref = collection(db, `users/${userId}/vehicles`);
      const snap = await getDocs(ref);
      setVehicles(snap.docs.map((doc) => doc.data()));
    };
    fetchVehicles();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Vehicle Vitals</Text>
      <Button title="Add Vehicle" onPress={() => navigation.navigate('AddVehicle')} />
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.vin}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('EditVehicle', { vin: item.vin })}>
            <Text style={{ padding: 10 }}>{item.year} {item.make} {item.model}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

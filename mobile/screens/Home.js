// -----------------------------
// File: mobile/screens/Home.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { db, auth } from '../../shared/firestoreClient';
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
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
        <Button title="Instructions" onPress={() => navigation.navigate('Instructions')} />
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
        <Button title="Terms" onPress={() => navigation.navigate('Terms')} />
        <Button title="Privacy" onPress={() => navigation.navigate('Privacy')} />
        <Button title="Contact" onPress={() => navigation.navigate('Contact')} />
      </View>
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

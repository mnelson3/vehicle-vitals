// -----------------------------
// File: mobile/screens/Home.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { db, auth } from 'shared/firestoreClient';
import { useAuth } from '../src/AuthContext';
import { collection, getDocs } from 'firebase/firestore';

export default function Home({ navigation }) {
  const [vehicles, setVehicles] = useState([]);
  const { user, signOut } = useAuth();

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

  if (!user) {
    return (
      <View style={{ flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffaf3' }}>
          <Image source={require('../assets/icon.png')} style={{ width: 96, height: 96, marginBottom: 12 }} />
          <Text style={{ fontSize: 34, fontWeight: '800', color: '#2b2a27', marginBottom: 6 }}>Vehicle Vitals</Text>
          <Text style={{ color: '#7a6f66', textAlign: 'center', marginBottom: 20 }}>
            Track your vehicles, log maintenance, and stay on schedule.
          </Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button title="Log in" onPress={() => navigation.navigate('Login')} />
            <View style={{ width: 12 }} />
            <Button title="Sign up" color="#f59e0b" onPress={() => navigation.navigate('SignUp')} />
          </View>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontSize: 24, fontWeight: '700' }}>My Garage</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button title="Account" onPress={() => navigation.navigate('Account')} />
          <View style={{ width: 8 }} />
          <Button title="Sign out" onPress={signOut} />
        </View>
      </View>
      <Button title="Add Vehicle" onPress={() => navigation.navigate('AddVehicle')} />
      <FlatList
        style={{ marginTop: 12 }}
        data={vehicles}
        keyExtractor={(item) => item.vin}
        ListEmptyComponent={<Text style={{ color: '#7a6f66', marginTop: 12 }}>No vehicles yet. Add your first vehicle.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('EditVehicle', { vin: item.vin })}>
            <View style={{ padding: 12, borderWidth: 1, borderColor: '#e8decf', borderRadius: 10, marginBottom: 8, backgroundColor: '#fff6e6' }}>
              <Text style={{ fontWeight: '700' }}>{item.year} {item.make} {item.model}</Text>
              <Text style={{ color: '#7a6f66' }}>{item.vin}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

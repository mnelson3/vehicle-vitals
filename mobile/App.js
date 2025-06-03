// -----------------------------
// File: mobile/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import AddVehicle from './screens/AddVehicle';
import EditVehicle from './screens/EditVehicle';
import ScanVIN from './screens/ScanVIN';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddVehicle" component={AddVehicle} />
        <Stack.Screen name="EditVehicle" component={EditVehicle} />
        <Stack.Screen name="ScanVIN" component={ScanVIN} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

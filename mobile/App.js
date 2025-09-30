// -----------------------------
// File: mobile/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import AddVehicle from './screens/AddVehicle';
import EditVehicle from './screens/EditVehicle';
import ScanVIN from './screens/ScanVIN';
import MaintenanceList from './screens/MaintenanceList';
import MaintenanceDetail from './screens/MaintenanceDetail';
import Instructions from './screens/Instructions';
import Login from './screens/Login';
import Terms from './screens/Terms';
import Privacy from './screens/Privacy';
import Contact from './screens/Contact';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddVehicle" component={AddVehicle} />
        <Stack.Screen name="EditVehicle" component={EditVehicle} />
        <Stack.Screen name="ScanVIN" component={ScanVIN} />
        <Stack.Screen name="MaintenanceList" component={MaintenanceList} />
  <Stack.Screen name="MaintenanceDetail" component={MaintenanceDetail} />
        <Stack.Screen name="Instructions" component={Instructions} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="Contact" component={Contact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

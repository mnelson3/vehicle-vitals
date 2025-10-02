// -----------------------------
// File: mobile/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/AuthContext';
import Home from './screens/Home';
import AddVehicle from './screens/AddVehicle';
import EditVehicle from './screens/EditVehicle';
import ScanVIN from './screens/ScanVIN';
import MaintenanceList from './screens/MaintenanceList';
import MaintenanceDetail from './screens/MaintenanceDetail';
import Instructions from './screens/Instructions';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Terms from './screens/Terms';
import Privacy from './screens/Privacy';
import Contact from './screens/Contact';
import Account from './screens/Account';

const Stack = createNativeStackNavigator();

export default function App() {
  const Authed = () => {
    const { user } = useAuth();
    return (
      <Stack.Navigator>
        {/* Public screens */}
        {!user && (
          <>
            <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up' }} />
            <Stack.Screen name="Instructions" component={Instructions} />
            <Stack.Screen name="Terms" component={Terms} />
            <Stack.Screen name="Privacy" component={Privacy} />
            <Stack.Screen name="Contact" component={Contact} />
          </>
        )}
        {/* Private screens (require auth) */}
        {user && (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Account" component={Account} options={{ title: 'Account' }} />
            <Stack.Screen name="AddVehicle" component={AddVehicle} />
            <Stack.Screen name="EditVehicle" component={EditVehicle} />
            <Stack.Screen name="ScanVIN" component={ScanVIN} />
            <Stack.Screen name="MaintenanceList" component={MaintenanceList} />
            <Stack.Screen name="MaintenanceDetail" component={MaintenanceDetail} />
          </>
        )}
      </Stack.Navigator>
    );
  };

  return (
    <AuthProvider>
      <NavigationContainer>
        <Authed />
      </NavigationContainer>
    </AuthProvider>
  );
}

// -----------------------------
// File: mobile/screens/ScanVIN.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function ScanVIN({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission?.granted, requestPermission]);

  const isLikelyVIN = (val = '') => {
    // VINs are 17 chars, exclude I,O,Q
    const vin = String(val).trim().toUpperCase();
    return /^[A-HJ-NPR-Z0-9]{17}$/.test(vin);
  };

  const handleBarCodeScanned = ({ data, type }) => {
    const candidate = String(data).trim();
    if (!isLikelyVIN(candidate)) return; // ignore false positives
    setScanned(true);
    navigation.navigate('AddVehicle', { vin: candidate.toUpperCase() });
  };

  if (!permission) return <Text>Requesting camera permission...</Text>;
  if (!permission.granted) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <Text style={{ marginBottom: 12 }}>We need access to your camera to scan a VIN.</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          // Most VIN labels use Code 39; some use Code 128.
          barcodeTypes: ['code39', 'code128']
        }}
      >
        {/* Simple overlay */}
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }} pointerEvents="none">
          <View style={{ width: '80%', height: 100, borderWidth: 2, borderColor: '#f59e0b', borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.05)' }} />
          <Text style={{ color: '#fff', marginTop: 12, textShadowColor: '#000', textShadowRadius: 4 }}>Align VIN barcode within the box</Text>
        </View>
      </CameraView>
      {scanned && <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />}
    </View>
  );
}

import React from 'react';
import { ScrollView, View, Text, Linking } from 'react-native';

export default function Instructions() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: '600', marginBottom: 8 }}>Instructions</Text>
      <Text style={{ marginBottom: 8 }}>Follow these steps to get started with Vehicle Vitals:</Text>
      <View style={{ marginLeft: 16, marginBottom: 12 }}>
        <Text>1. Open the web app and sign in at https://vehicle-vitals.com/app</Text>
        <Text>2. Add your first vehicle by entering a VIN or selecting Year, Make, and Model.</Text>
        <Text>3. Log maintenance entries with date, title, notes, and cost.</Text>
        <Text>4. Return anytime to review history and plan upcoming service.</Text>
      </View>
      <Text style={{ fontSize: 20, fontWeight: '600', marginTop: 8 }}>Mobile Apps</Text>
      <Text style={{ marginTop: 4 }}>
        Our iOS and Android apps sync with your account so you can scan a VIN, update mileage, and add notes on the go.
        Store listings are coming soon.
      </Text>
      <Text style={{ marginTop: 12 }} onPress={() => Linking.openURL('https://vehicle-vitals.com/contact')}>Need help? Contact us</Text>
    </ScrollView>
  );
}

import React from 'react';
import { ScrollView, Text, View, Linking } from 'react-native';

export default function Privacy() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: '600', marginBottom: 8 }}>Privacy Policy</Text>
      <Text>Last updated: September 30, 2025</Text>
      <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 12 }}>Information We Collect</Text>
      <View style={{ marginLeft: 16 }}>
        <Text>• Account information (email, auth identifiers)</Text>
        <Text>• Vehicle data (VIN, make, model, year, mileage)</Text>
        <Text>• Maintenance entries (dates, notes, costs)</Text>
        <Text>• Usage data to improve the service</Text>
      </View>
      <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 12 }}>How We Use Information</Text>
      <View style={{ marginLeft: 16 }}>
        <Text>• Provide and improve the service</Text>
        <Text>• Sync your data across web and mobile apps</Text>
        <Text>• Communicate about updates and support</Text>
      </View>
      <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 12 }}>Data Sharing</Text>
      <Text>We do not sell your personal data. Limited sharing with service providers may occur.</Text>
      <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 12 }}>Data Security</Text>
      <Text>We use industry-standard measures. No method is 100% secure.</Text>
      <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 12 }}>Your Choices</Text>
      <View style={{ marginLeft: 16 }}>
        <Text>• Access, update, or delete data via the app</Text>
        <Text>• Contact us to make a privacy request</Text>
      </View>
      <Text style={{ marginTop: 12 }} onPress={() => Linking.openURL('https://vehicle-vitals.com/privacy')}>
        Read the full policy on the web
      </Text>
    </ScrollView>
  );
}

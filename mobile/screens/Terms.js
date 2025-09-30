import React from 'react';
import { ScrollView, Text, View, Linking } from 'react-native';

export default function Terms() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: '600', marginBottom: 8 }}>Terms of Use</Text>
      <Text>Last updated: September 30, 2025</Text>
      <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 12 }}>1. Acceptance of Terms</Text>
      <Text>By using Vehicle Vitals, you agree to these Terms of Use.</Text>
      <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 12 }}>2. Description of Service</Text>
      <Text>Vehicle Vitals helps track vehicle info and maintenance. Features may change over time.</Text>
      <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 12 }}>3. Responsibilities</Text>
      <View style={{ marginLeft: 16 }}>
        <Text>• Provide accurate information</Text>
        <Text>• Keep your account secure</Text>
        <Text>• Comply with applicable laws</Text>
      </View>
      <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 12 }}>4. Data and Privacy</Text>
      <Text>
        We handle data as described in our Privacy Policy. See the web policy at
        <Text onPress={() => Linking.openURL('https://vehicle-vitals.com/privacy')}> vehicle-vitals.com/privacy</Text>.
      </Text>
      <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 12 }}>5. Disclaimers</Text>
      <Text>The service is provided “as is.” You are responsible for your vehicle’s upkeep.</Text>
      <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 12 }}>6. Liability</Text>
      <Text>We are not liable for indirect or consequential damages to the extent permitted by law.</Text>
      <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 12 }}>7. Changes</Text>
      <Text>We may update these Terms. Continued use means acceptance.</Text>
      <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 12 }}>8. Contact</Text>
      <Text onPress={() => Linking.openURL('https://vehicle-vitals.com/contact')}>Questions? Contact us</Text>
    </ScrollView>
  );
}

import React from 'react';
import { ScrollView, Text, Linking } from 'react-native';

export default function Contact() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: '600', marginBottom: 8 }}>Contact Us</Text>
      <Text>We’d love to hear from you. For support, feedback, or questions, send us an email:</Text>
      <Text style={{ color: '#2563eb', marginTop: 8 }} onPress={() => Linking.openURL('mailto:support@vehicle-vitals.com')}>
        support@vehicle-vitals.com
      </Text>
      <Text style={{ marginTop: 8, color: '#666' }}>
        Include your app version and a brief description of the issue to help us assist you faster.
      </Text>
    </ScrollView>
  );
}

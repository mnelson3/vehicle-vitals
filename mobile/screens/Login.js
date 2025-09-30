import React from 'react';
import { ScrollView, Text } from 'react-native';

export default function Login() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: '600', marginBottom: 8 }}>Login</Text>
      <Text>
        Sign in using the app’s authentication controls. Anonymous sign-in may be available for quick trials. Once signed in, you can add and edit your vehicles.
      </Text>
    </ScrollView>
  );
}

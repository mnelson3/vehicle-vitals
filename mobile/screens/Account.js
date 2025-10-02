import React, { useState } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import { useAuth } from '../src/AuthContext';

export default function Account() {
  const { user, signOut, resetPassword } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [busy, setBusy] = useState(false);

  const onReset = async () => {
    if (!email) return Alert.alert('Enter email', 'Provide the email to send a reset link.');
    setBusy(true);
    try {
      await resetPassword(email);
      Alert.alert('Email sent', 'Check your inbox for a reset link.');
    } catch (e) {
      Alert.alert('Failed to send', String(e?.message || e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Account</Text>
      <Text style={{ color: '#666' }}>Signed in as</Text>
      <Text style={{ fontWeight: '600' }}>{user?.email || 'Unknown'}</Text>
      <View style={{ marginTop: 16 }}>
        <Text style={{ marginBottom: 6 }}>Reset password</Text>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 }}
        />
        <View style={{ height: 8 }} />
        <Button title={busy ? 'Sending…' : 'Send reset email'} onPress={onReset} disabled={busy} />
      </View>
      <View style={{ marginTop: 24 }}>
        <Button title="Sign out" color="#b02a37" onPress={signOut} />
      </View>
    </View>
  );
}

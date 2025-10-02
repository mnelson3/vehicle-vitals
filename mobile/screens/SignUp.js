import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Button, Alert, View } from 'react-native';
import { useAuth } from '../src/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
  const { signUp, signInWithGoogle } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async () => {
    if (!email || !password) return Alert.alert('Missing info', 'Please enter email and password.');
    setBusy(true);
    try {
      await signUp(email, password);
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (err) {
      const code = err?.code ? `\n(${err.code})` : '';
      Alert.alert('Sign up failed', `${err?.message || err}${code}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: '700', marginBottom: 8 }}>Create your account</Text>
      <Text style={{ marginBottom: 16, color: '#666' }}>Track maintenance, mileage, and more.</Text>
      <View style={{ gap: 10 }}>
        <TextInput placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 }} />
        <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 }} />
        <Button title={busy ? 'Creating…' : 'Create Account'} onPress={onSubmit} disabled={busy} />
        <Button title="Continue with Google" color="#db4437" onPress={signInWithGoogle} />
      </View>
    </ScrollView>
  );
}

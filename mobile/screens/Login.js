import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Button, Alert, View, TouchableOpacity } from 'react-native';
import { useAuth } from '../src/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const { signIn, signInWithGoogle } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async () => {
    if (!email || !password) return Alert.alert('Missing info', 'Please enter email and password.');
    setBusy(true);
    try {
      await signIn(email, password);
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (err) {
      const code = err?.code ? `\n(${err.code})` : '';
      Alert.alert('Login failed', `${err?.message || err}${code}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: '700', marginBottom: 8 }}>Welcome to Vehicle Vitals</Text>
      <Text style={{ marginBottom: 16, color: '#666' }}>Sign in to access your garage.</Text>
      <View style={{ gap: 10 }}>
        <TextInput placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 }} />
        <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 }} />
        <Button title={busy ? 'Signing in…' : 'Sign In'} onPress={onSubmit} disabled={busy} />
        <Button title="Continue with Google" color="#db4437" onPress={signInWithGoogle} />
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={{ textAlign: 'center', marginTop: 10 }}>Don’t have an account? <Text style={{ fontWeight: '600' }}>Sign up</Text></Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

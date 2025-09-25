import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { firestoreService } from '../../shared/firestoreClient';

const { getMaintenanceEntry, updateMaintenanceEntry, deleteMaintenanceEntry } = firestoreService;

export default function MaintenanceDetail({ route, navigation }) {
  const { vin, entryId } = route.params;
  const onSave = route.params?.onSave;
  const onDelete = route.params?.onDelete;
  const [entry, setEntry] = useState(null);
  const [form, setForm] = useState({ title: '', notes: '', cost: '' });

  useEffect(() => {
    const load = async () => {
      try {
        const e = await getMaintenanceEntry(vin, entryId);
        if (e) {
          setEntry(e);
          setForm({ title: e.title || '', notes: e.notes || '', cost: String(e.cost || '') });
        }
      } catch (err) {
        Alert.alert('Error', err.message);
      }
    };
    load();
  }, [vin, entryId]);

  const handleChange = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const handleSave = async () => {
    // basic validation
    if (!form.title || form.title.trim() === '') return Alert.alert('Validation', 'Title is required');
    const costNum = parseFloat(form.cost || '0');
    if (form.cost && Number.isNaN(costNum)) return Alert.alert('Validation', 'Cost must be a number');

    try {
      const updates = { ...form, cost: costNum };
      await updateMaintenanceEntry(vin, entryId, updates);
      const updated = { id: entryId, ...entry, ...updates };
      if (onSave) onSave(updated);
      Alert.alert('Saved');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete entry',
      'Are you sure you want to delete this maintenance entry? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMaintenanceEntry(vin, entryId);
              if (onDelete) onDelete(entryId);
              Alert.alert('Deleted');
              navigation.popToTop();
            } catch (err) {
              Alert.alert('Error', err.message);
            }
          },
        },
      ],
    );
  };

  if (!entry) return <View style={{ padding: 20 }}><Text>Loading...</Text></View>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Edit Maintenance</Text>
      <TextInput placeholder="Title" value={form.title} onChangeText={(t) => handleChange('title', t)} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
  <TextInput placeholder="Cost" value={form.cost} onChangeText={(t) => handleChange('cost', t)} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} keyboardType="decimal-pad" />
      <TextInput placeholder="Notes" value={form.notes} onChangeText={(t) => handleChange('notes', t)} style={{ borderWidth: 1, padding: 8, height: 100 }} multiline />
      <View style={{ height: 12 }} />
      <Button title="Save" onPress={handleSave} />
      <View style={{ height: 8 }} />
      <Button title="Delete" onPress={handleDelete} color="red" />
    </View>
  );
}

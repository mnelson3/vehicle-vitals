import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, Alert } from 'react-native';
import { firestoreService } from '../../shared/firestoreClient';

const { getMaintenanceEntries, addMaintenanceEntry } = firestoreService;

export default function MaintenanceList({ route, navigation }) {
  const { vin } = route.params;
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ title: '', notes: '', cost: '' });

  useEffect(() => {
    const load = async () => {
      try {
        const list = await getMaintenanceEntries(vin);
        setEntries(list);
      } catch (err) {
        Alert.alert('Error', err.message);
      }
    };
    load();
  }, [vin]);

  const handleChange = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const handleAdd = async () => {
    // basic client-side validation
    if (!form.title || form.title.trim() === '') return Alert.alert('Validation', 'Title is required');
    const costNum = parseFloat(form.cost || '0');
    if (form.cost && Number.isNaN(costNum)) return Alert.alert('Validation', 'Cost must be a number');

    try {
      const entry = { ...form, date: new Date().toISOString(), cost: costNum };
      const created = await addMaintenanceEntry(vin, entry);
      // optimistic UI: prepend returned item
      setEntries((p) => [created, ...p]);
      setForm({ title: '', notes: '', cost: '' });
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Maintenance for {vin}</Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 8 }}>
            <Text
              style={{ fontWeight: 'bold' }}
              onPress={() =>
                navigation.navigate('MaintenanceDetail', {
                  vin,
                  entryId: item.id,
                  onSave: (updated) => setEntries((prev) => prev.map((it) => (it.id === updated.id ? updated : it))),
                  onDelete: (id) => setEntries((prev) => prev.filter((it) => it.id !== id)),
                })
              }
            >
              {item.title}
            </Text>
            <Text>{item.date?.split('T')[0]} — ${item.cost}</Text>
            <Text style={{ fontSize: 12 }}>{item.notes}</Text>
          </View>
        )}
      />

      <View style={{ marginTop: 16 }}>
        <TextInput placeholder="Title" value={form.title} onChangeText={(t) => handleChange('title', t)} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
        <TextInput placeholder="Cost" value={form.cost} onChangeText={(t) => handleChange('cost', t)} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
        <TextInput placeholder="Notes" value={form.notes} onChangeText={(t) => handleChange('notes', t)} style={{ borderWidth: 1, padding: 8, height: 80 }} multiline />
        <Button title="Add Maintenance" onPress={handleAdd} />
      </View>
    </View>
  );
}

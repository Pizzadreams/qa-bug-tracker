// app/bug/new.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { Bug } from '../../types/bug';

export default function BugFormScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<Bug['severity']>('Low');
  const router = useRouter();

  const handleSubmit = () => {
    if (!title.trim()) return;
    // TODO: Save bug in global state or backend
    router.back();
  };

    const handleGoBack = () => {
    Alert.alert(
      'Discard changes?',
      'Are you sure you want to go back? Unsaved changes will be lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Go Back', style: 'destructive', onPress: () => router.back() },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={[styles.input, { height: 80 }]}
      />
      <Picker
        selectedValue={severity}
        onValueChange={(value) => setSeverity(value as Bug['severity'])}
        style={styles.input}
      >
        <Picker.Item label="Low" value="Low" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="High" value="High" />
      </Picker>
      <Button title="Submit Bug" onPress={handleSubmit} />

      <View style={{ marginTop: 12 }}>
        <Button title="Go Back" color="red" onPress={router.back} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
});

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function NewProjectScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Project name is required');
      return;
    }
    // TODO: Save project (context, AsyncStorage, backend, etc.)
    Alert.alert('Project created', `Name: ${name}`);
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Project Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Project Description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={[styles.input, { height: 80 }]}
      />
      <Button title="Create Project" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: {
    borderColor: '#999',
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
});

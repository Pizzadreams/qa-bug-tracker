import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { Bug } from '../../types/bug';

export default function BugFormScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<Bug['severity']>('Low');
  const router = useRouter();

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a bug title.');
      return;
    }
    // TODO: save bug to DB or global state
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
        placeholderTextColor="#ccc"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        placeholderTextColor="#ccc"
        value={description}
        onChangeText={setDescription}
        multiline
        style={[styles.input, styles.textArea]}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={severity}
          onValueChange={(value) => setSeverity(value as Bug['severity'])}
          style={styles.picker}
          dropdownIconColor="#131212ff"
        >
          <Picker.Item label="Select severity..." value={null} color="#333" />
          <Picker.Item label="Low" value="Low" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="High" value="High" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Bug</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.backButton]} onPress={router.back}>
        <Text style={[styles.buttonText, styles.backButtonText]}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const colors = {
  darkBg: '#121728',
  inputBg: '#1E213A',
  primary: '#4F6D7A',
  secondary: '#75808A',
  buttonText: '#E0E6F0',
  danger: '#D94E4E',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBg,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '65%',
    backgroundColor: colors.inputBg,
    borderRadius: 10,
    color: colors.buttonText,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 14,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    width: '20%',
    backgroundColor: colors.inputBg,
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    color: "#333",
    width: '100%',
    paddingVertical: 14,
  },
  button: {
    width: '20%',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: colors.danger,
  },
  backButtonText: {
    fontWeight: '700',
  },
});

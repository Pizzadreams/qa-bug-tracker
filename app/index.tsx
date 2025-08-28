import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bug Tracker App</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/bug/new')}>
        <Text style={styles.buttonText}>Report New Bug</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/bug')}>
        <Text style={styles.buttonText}>View Bugs List</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/project')}>
        <Text style={styles.buttonText}>View Project Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center', // center all content horizontally
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#222',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 36,
    marginVertical: 10,
    borderRadius: 8,
    minWidth: 220,
    alignItems: 'center', // centers button text
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android shadow
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

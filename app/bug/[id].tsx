// app/bug/[id].tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Bug } from '../../types/bug';

// For MVP, static data here; later move to shared state or backend
const bugs: Bug[] = [
  {
    id: '1',
    title: 'Crash on launch',
    description: 'App crashes immediately after starting.',
    severity: 'High',
    status: 'Open',
  },
  {
    id: '2',
    title: 'Login page UI glitch',
    description: 'Misaligned buttons on login screen.',
    severity: 'Low',
    status: 'In Progress',
  },
];

export default function BugDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const bug = bugs.find((b) => b.id === id);

  if (!bug) return <Text style={styles.notFound}>Bug not found.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{bug.title}</Text>
      <Text>Status: {bug.status}</Text>
      <Text>Severity: {bug.severity}</Text>
      <Text>Description: {bug.description}</Text>
      <View style={styles.backButtonContainer}>
        <Button title="Back" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontWeight: 'bold', fontSize: 22, marginBottom: 12 },
  notFound: { flex: 1, textAlign: 'center', marginTop: 32, fontSize: 18 },
  backButtonContainer: { marginTop: 20 },
});

// app/bug/index.tsx
import React, { useState } from 'react';
import { View, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import BugCard from '../../components/BugCard';
import { Bug } from '../../types/bug';
const [bugs, setBugs] = useState<Bug[]>([]);

export default function BugListScreen() {
  // For MVP, using local state. Later move to context or global store.
  const [bugs, setBugs] = useState<Bug[]>([
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
  ]);

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button title="Report a Bug" onPress={() => router.push('/bug/new')} />
      <FlatList
        data={bugs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/bug/${item.id}`)}>
            <BugCard bug={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

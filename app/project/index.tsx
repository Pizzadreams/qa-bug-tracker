import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

type Project = {
  id: string;
  name: string;
  description: string;
};

export default function ProjectListScreen() {
  const router = useRouter();

  // Dummy projects state; replace with persistent storage or context later
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'Website Redesign', description: 'Improve UI and UX' },
    { id: '2', name: 'Mobile App Launch', description: 'Release Android and iOS apps' },
  ]);

  return (
    <View style={styles.container}>
      <Button title="Add New Project" onPress={() => router.push('/project/new')} />
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.projectCard}
            onPress={() => router.push({ pathname: '/project/[id]', params: { id: item.id } })}
          >
            <Text style={styles.projectName}>{item.name}</Text>
            <Text style={styles.projectDesc}>{item.description}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No projects yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  projectCard: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  projectName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  projectDesc: {
    color: '#555',
    marginTop: 4,
  },
});

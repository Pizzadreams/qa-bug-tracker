import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useDatabase, Project } from '../../hooks/useDatabase'; 

export default function ProjectListScreen() {
  const router = useRouter();
  const { isReady, getProjects } = useDatabase();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isReady) {
      getProjects()
        .then(setProjects)
        .finally(() => setLoading(false))
        .catch(console.error);
    }
  }, [isReady]);

  if (!isReady || loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      <Button title="Add New Project" onPress={() => router.push('/project/new')} />
      <FlatList
        data={projects}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.projectCard}
            onPress={() => router.push({ pathname: '/project/[id]', params: { id: item.id.toString() } })}
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

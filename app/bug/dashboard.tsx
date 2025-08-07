import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

// Basic Project type
type Project = {
  id: string;
  name: string;
  description: string;
};

export default function DashboardScreen() {
  const router = useRouter();

  // Example state for your projects list (replace with context or persistence later)
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'Website Redesign', description: 'Track UI/UX bugs' },
    { id: '2', name: 'Mobile App', description: 'Android and iOS release' },
  ]);

  // Example: Add new project (show as prompt or modal in real app)
  const handleAddProject = () => {
    // For demo, use a static project—replace with modal/form input later
    const newProject: Project = {
      id: Date.now().toString(),
      name: 'New Project',
      description: 'Project description here',
    };
    setProjects([...projects, newProject]);
  };

  // Example: Remove a project
  const handleDeleteProject = (id: string) => {
    Alert.alert(
      'Delete Project',
      'Are you sure you want to delete this project?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => setProjects(projects.filter(p => p.id !== id)) }
      ]
    );
  };

  // Example: View/manage a project
  const handleViewProject = (id: string) => {
    // Navigate to a dedicated project detail screen in your app (future)
    router.push(`/project/${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📊 Project Dashboard</Text>

      <Button title="Add Project" onPress={handleAddProject} />

      <FlatList
        data={projects}
        keyExtractor={item => item.id}
        style={{ marginVertical: 24 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.projectCard}
            onPress={() => handleViewProject(item.id)}
          >
            <Text style={styles.projectName}>{item.name}</Text>
            <Text style={styles.projectDescription}>{item.description}</Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <Button
                title="Delete"
                color="red"
                onPress={() => handleDeleteProject(item.id)}
              />
              {/* Add edit button when needed */}
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#666' }}>No projects yet.</Text>}
      />

      {/* You can still keep links to bugs feature, etc */}
      <Button title="View Bug List" onPress={() => router.push('/bug')} />
      <Button title="Report New Bug" onPress={() => router.push('/bug/new')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  projectCard: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#eef',
    borderRadius: 8,
  },
  projectName: { fontSize: 18, fontWeight: 'bold' },
  projectDescription: { fontSize: 14, color: '#555' }
});

import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { getDBConnection, createTables, getProjects, insertProject, deleteProject, Project } from '../../db/useDatabase';

export default function ProjectListScreen() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const router = useRouter();

  const loadData = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTables(db);
      const items = await getProjects(db);
      setProjects(items);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);
    
  useEffect(() => { loadData(); }, [loadData]);

  const addProject = async () => {
    if (!newName.trim()) return;
    const db = await getDBConnection();
    await insertProject(db, { name: newName, description: newDesc });
    setNewName('');
    setNewDesc('');
    loadData();
  };

  const removeProject = async (id: number) => {
    const db = await getDBConnection();
    await deleteProject(db, id);
    loadData();
  };

  if (loading) {
    return <ActivityIndicator style={{flex:1}} />;
  }


  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.projectCard}
            onPress={() => router.push(`/project/${item.id}`)}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.projectName}>{item.name}</Text>
              <Text style={styles.projectDesc}>{item.description}</Text>
            </View>
            <Button title="Delete" onPress={() => removeProject(item.id)} />
          </TouchableOpacity>
        )}
      />

      <TextInput style={styles.input} value={newName} onChangeText={setNewName} placeholder="Project name" />
      <TextInput style={styles.input} value={newDesc} onChangeText={setNewDesc} placeholder="Project description" />
      <Button title="Add Project" onPress={addProject} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 8,
    padding: 8,
    borderColor: '#ccc',
  },
  projectCard: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  projectName: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  projectDesc: {
    color: '#555',
    marginTop: 4,
  },
});

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getDBConnection, getBugsByProject, insertBug, deleteBug, Bug } from '../../db/useDatabase';

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const projectId = parseInt(id!, 10);

  const [bugs, setBugs] = useState<Bug[]>([]);
  const [newTitle, setNewTitle] = useState('');

  const loadBugs = useCallback(async () => {
    const db = await getDBConnection();
    const items = await getBugsByProject(db, projectId);
    setBugs(items);
  }, [projectId]);

  useEffect(() => { loadBugs(); }, [loadBugs]);

  const addBug = async () => {
    if (!newTitle.trim()) return;
    const db = await getDBConnection();
    await insertBug(db, { projectId, title: newTitle, description: '', severity: 'Low', status: 'Open' });
    setNewTitle('');
    loadBugs();
  };

  const removeBug = async (bugId: number) => {
    const db = await getDBConnection();
    await deleteBug(db, bugId);
    loadBugs();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bugs for Project {projectId}</Text>
      <FlatList
        data={bugs}
        keyExtractor={b => b.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title} ({item.status})</Text>
            <Button title="Delete" onPress={() => removeBug(item.id)} />
          </View>
        )}
      />
      <TextInput style={styles.input} value={newTitle} onChangeText={setNewTitle} placeholder="New bug title" />
      <Button title="Add Bug" onPress={addBug} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontWeight: 'bold', fontSize: 20, marginBottom: 8 },
  input: { borderWidth: 1, borderRadius: 4, marginVertical: 8, padding: 8, borderColor: '#ccc' },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
});

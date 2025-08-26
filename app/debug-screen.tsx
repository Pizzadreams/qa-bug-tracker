import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import { getDBConnection, createTables, getProjects, getBugsByProject, Project, Bug } from "../db/useDatabase";

export default function DebugScreen() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [bugs, setBugs] = useState<Bug[]>([]);

  const loadData = async () => {
    const db = await getDBConnection();
    await createTables(db);

    const projs = await getProjects(db);
    setProjects(projs);

    if (projs.length > 0) {
      const firstProjectId = projs[0].id;
      const projectBugs = await getBugsByProject(db, firstProjectId);
      setBugs(projectBugs);
    } else {
      setBugs([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Projects</Text>
      {projects.map((p) => (
        <View key={p.id} style={styles.card}>
          <Text style={styles.title}>{p.name}</Text>
          <Text>{p.description}</Text>
        </View>
      ))}

      <Text style={styles.heading}>Bugs (for first Project)</Text>
      {bugs.map((b) => (
        <View key={b.id} style={styles.card}>
          <Text style={styles.title}>{b.title}</Text>
          <Text>{b.description}</Text>
          <Text>Status: {b.status}</Text>
        </View>
      ))}

      <Button title="Reload Data" onPress={loadData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 12 },
  heading: { fontWeight: "bold", fontSize: 18, marginVertical: 8 },
  card: { padding: 12, marginBottom: 10, backgroundColor: "#eef", borderRadius: 5 },
  title: { fontWeight: "bold", fontSize: 16 },
});

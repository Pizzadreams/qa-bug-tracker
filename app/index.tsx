// app/home.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bug Tracker App</Text>
      


      <Button title="Report New Bug" onPress={() => router.push('/bug/new')} />

      <Button title="View Bugs List" onPress={() => router.push('/bug')} />

      <Button title="View Project Dashboard" onPress={() => router.push('/project')} />

      {/* Add more buttons or dashboard info here as needed */}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});

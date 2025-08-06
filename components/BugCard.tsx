// components/BugCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Bug } from '../types/bug';

type Props = {
  bug: Bug;
};

export default function BugCard({ bug }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{bug.title}</Text>
      <Text>Status: {bug.status}</Text>
      <Text>Severity: {bug.severity}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eee',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

import React from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import BugCard from '../../components/BugCard';
import { Bug } from '../../types/bug';

const colors = {
  darkBg: '#121728',
  inputBg: '#1E213A',
  primary: '#4F6D7A',
  secondary: '#75808A',
  buttonText: '#E0E6F0',
  danger: '#D94E4E',
};

const CARD_BUTTON_WIDTH = 550;

export default function BugListScreen() {
  // For MVP, using local state.
  const [bugs, setBugs] = React.useState<Bug[]>([
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
      <TouchableOpacity style={styles.button} onPress={() => router.push('/bug/new')}>
        <Text style={styles.buttonText}>Report a Bug</Text>
      </TouchableOpacity>

      <FlatList
        data={bugs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/bug/${item.id}`)} style={styles.cardContainer}>
            <BugCard bug={item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No bugs reported yet.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBg,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 24,
  },
  button: {
    width: CARD_BUTTON_WIDTH,
    minWidth: 150,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    marginVertical: 12,
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 2.2,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  listContainer: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  cardContainer: {
    width: CARD_BUTTON_WIDTH,
    minWidth: 150,
    alignSelf: 'center',
    marginVertical: 8,
  },
  emptyText: {
    color: colors.secondary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});

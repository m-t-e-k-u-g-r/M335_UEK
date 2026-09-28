/**
 * Screen: "Meine Vokabeln" (Route: "/")
 *
 * Übersicht aller gespeicherten Vokabeln. Zeigt mehrere Block-2-Themen:
 *   - useVoci()             liest den globalen State (CRUD: Read)
 *   - "+" im Header         -> Screen "/add"          (CRUD: Create)
 *   - Tippen auf eine Zeile -> Screen "/add" (Edit)   (CRUD: Update)
 *   - Papierkorb-Icon       -> Vokabel löschen        (CRUD: Delete)
 *   - FAB (Play-Button)     -> Screen "/learn"        (Stack-Navigation)
 */
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { VociRow } from '@/components/voci-row';
import { Colors } from '@/constants/theme';
import { useVoci } from '@/context/voci-context';

export default function VocabularyListScreen() {
  // useVoci() liefert die gemeinsame Vokabelliste und die CRUD-Funktionen.
  const { vociList, removeVoci } = useVoci();
  // useRouter() ermöglicht die Navigation zu anderen Screens.
  const router = useRouter();

  // Fragt vor dem Löschen kurz nach (verhindert versehentliches Löschen).
  const confirmDelete = (index: number) => {
    Alert.alert('Vokabel löschen?', `"${vociList[index].term}" wirklich löschen?`, [
      { text: 'Abbrechen', style: 'cancel' },
      { text: 'Löschen', style: 'destructive', onPress: () => removeVoci(index) },
    ]);
  };

  return (
    <View style={styles.screen}>
      {/* Header-Button "+" zum Hinzufügen einer neuen Vokabel. */}
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={() => router.push('/add')} hitSlop={12}>
              <Ionicons name="add" size={28} color={Colors.white} />
            </Pressable>
          ),
        }}
      />

      {vociList.length === 0 ? (
        // Leerer Zustand: es gibt noch keine Vokabeln.
        <View style={styles.empty}>
          <Ionicons name="book-outline" size={48} color={Colors.muted} />
          <Text style={styles.emptyText}>Noch keine Vokabeln.</Text>
          <Text style={styles.emptyHint}>Tippe oben rechts auf +, um eine hinzuzufügen.</Text>
        </View>
      ) : (
        // FlatList rendert für jede Vokabel eine VociRow.
        <FlatList
          data={vociList}
          keyExtractor={(_, index) => String(index)}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => (
            <VociRow
              voci={item}
              onPress={() => router.push({ pathname: '/add', params: { index: String(index) } })}
              onDelete={() => confirmDelete(index)}
            />
          )}
        />
      )}

      {/* Floating Action Button (FAB): startet die Lern-Session. */}
      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        onPress={() => router.push('/learn')}>
        <Ionicons name="play" size={26} color={Colors.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  list: { padding: 16, paddingBottom: 96, gap: 12 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 8 },
  emptyText: { fontSize: 18, fontWeight: '600', color: Colors.text },
  emptyHint: { fontSize: 14, color: Colors.muted, textAlign: 'center' },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30, // halbe Breite/Höhe -> perfekter Kreis
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Schatten auf iOS
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6, // Schatten auf Android
  },
  fabPressed: { opacity: 0.85, transform: [{ scale: 0.96 }] }, // Press-Feedback
});

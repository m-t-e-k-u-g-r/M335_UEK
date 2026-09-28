/**
 * Komponente: VociRow
 *
 * Eine reine Anzeige-Komponente: Sie bekommt ALLE Daten über Props und besitzt
 * selbst KEINEN State. Das zeigt den Unterschied zwischen
 *   - Props  : werden von aussen hereingegeben (hier: voci, onPress, onDelete)
 *   - State  : wird von einer Komponente selbst verwaltet (hier: keiner)
 */
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';
import type { Voci } from '@/context/voci-context';

// Diese Props erwartet die Komponente von aussen.
interface VociRowProps {
  voci: Voci; // die anzuzeigende Vokabel
  onPress: () => void; // beim Antippen der Zeile (Bearbeiten)
  onDelete: () => void; // beim Antippen des Papierkorbs (Löschen)
}

export function VociRow({ voci, onPress, onDelete }: VociRowProps) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.texts}>
        <Text style={styles.term}>{voci.term}</Text>
        <Text style={styles.translation}>{voci.translation}</Text>
      </View>

      <Pressable onPress={onDelete} hitSlop={12}>
        <Ionicons name="trash-outline" size={22} color={Colors.danger} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  texts: { flex: 1 },
  term: { fontSize: 17, fontWeight: '600', color: Colors.text },
  translation: { fontSize: 15, color: Colors.muted, marginTop: 2 },
});

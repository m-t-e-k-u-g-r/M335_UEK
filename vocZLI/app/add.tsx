/**
 * Screen: "Vokabel hinzufügen / bearbeiten" (Route: "/add")
 *
 * Ein Formular mit zwei Textfeldern. Zeigt zwei Block-2-Themen:
 *   - useState für die beiden Eingabefelder (term, translation)
 *   - CRUD: Create (neue Vokabel) ODER Update (bestehende Vokabel ändern)
 *
 * Ob erstellt oder bearbeitet wird, entscheidet der optionale Parameter "index":
 *   - kein index  -> neue Vokabel anlegen       (addVoci)
 *   - mit index   -> vorhandene Vokabel ändern  (updateVoci)
 */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useVoci } from '@/context/voci-context';

export default function AddVociScreen() {
  const { vociList, addVoci, updateVoci } = useVoci();
  const router = useRouter();

  // Optionaler Parameter aus der Navigation (kommt immer als Text an).
  const params = useLocalSearchParams<{ index?: string }>();
  const isEditing = params.index !== undefined;
  const editIndex = isEditing ? Number(params.index) : -1;
  // Beim Bearbeiten die bestehende Vokabel holen (zum Vorbefüllen der Felder).
  const existing = isEditing ? vociList[editIndex] : undefined;

  // State der beiden Eingabefelder – im Bearbeiten-Modus vorbefüllt.
  const [term, setTerm] = useState(existing?.term ?? '');
  const [translation, setTranslation] = useState(existing?.translation ?? '');

  // Speichern ist nur möglich, wenn beide Felder ausgefüllt sind.
  const canSave = term.trim() !== '' && translation.trim() !== '';

  const save = () => {
    if (!canSave) return;

    const voci = { term: term.trim(), translation: translation.trim() };

    if (isEditing && existing) {
      updateVoci(editIndex, voci); // CRUD: Update
    } else {
      addVoci(voci); // CRUD: Create
    }

    router.back(); // zurück zur Liste
  };

  return (
    <View style={styles.screen}>
      {/* Header-Titel je nach Modus (hinzufügen / bearbeiten). */}
      <Stack.Screen
        options={{ title: isEditing ? 'Vokabel bearbeiten' : 'Vokabel hinzufügen' }}
      />

      <Text style={styles.label}>Begriff (Fremdsprache)</Text>
      <TextInput
        style={styles.input}
        value={term}
        onChangeText={setTerm}
        placeholder="z.B. apple"
        autoFocus
      />

      <Text style={styles.label}>Übersetzung</Text>
      <TextInput
        style={styles.input}
        value={translation}
        onChangeText={setTranslation}
        placeholder="z.B. Apfel"
      />

      <Pressable
        style={[styles.button, !canSave && styles.buttonDisabled]}
        onPress={save}
        disabled={!canSave}>
        <Text style={styles.buttonText}>{isEditing ? 'Speichern' : 'Hinzufügen'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, gap: 8 },
  label: { fontSize: 14, fontWeight: '600', color: Colors.text, marginTop: 12 },
  input: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: Colors.text,
  },
  button: {
    marginTop: 28,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.4 }, // ausgegraut, solange ein Feld leer ist
  buttonText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
});

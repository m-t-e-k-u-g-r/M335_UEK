/**
 * Screen: "Vokabeln lernen" (Route: "/learn")
 *
 * Lernen mit Karteikarten – das Block-2-Thema "React State" (useState):
 *   - currentIndex     : welche Vokabel wird gerade gezeigt?
 *   - showTranslation  : ist die Übersetzung sichtbar?
 *
 * Beides ist State: Ändert man ihn mit der Setter-Funktion, rendert React den
 * Screen automatisch neu. Die Übersetzung erscheint per Conditional Rendering.
 */
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useVoci } from '@/context/voci-context';

export default function LearnScreen() {
  const { vociList } = useVoci();

  // --- State dieser Komponente ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  // Sonderfall: Es gibt noch keine Vokabeln zum Lernen.
  if (vociList.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Noch keine Vokabeln zum Lernen.</Text>
      </View>
    );
  }

  const currentVoci = vociList[currentIndex];

  // Zur nächsten Vokabel wechseln (am Ende wieder von vorne beginnen).
  const goToNext = () => {
    setShowTranslation(false); // Übersetzung für die nächste Karte verstecken
    setCurrentIndex((currentIndex + 1) % vociList.length);
  };

  return (
    <View style={styles.screen}>
      {/* Fortschritt, z.B. "1 / 3" */}
      <Text style={styles.progress}>
        {currentIndex + 1} / {vociList.length}
      </Text>

      {/* Karteikarte: zeigt den Begriff, auf Tippen die Übersetzung. */}
      <Pressable style={styles.card} onPress={() => setShowTranslation(!showTranslation)}>
        <Text style={styles.term}>{currentVoci.term}</Text>

        {/* Conditional Rendering: nur wenn showTranslation true ist,
            wird die Übersetzung angezeigt. */}
        {showTranslation && <Text style={styles.translation}>{currentVoci.translation}</Text>}
        {!showTranslation && <Text style={styles.hint}>Tippen zum Aufdecken</Text>}
      </Pressable>

      {/* Button zum Umschalten der Übersetzung (wie im Folien-Beispiel). */}
      <Pressable style={styles.toggleButton} onPress={() => setShowTranslation(!showTranslation)}>
        <Text style={styles.toggleText}>
          {showTranslation ? 'Antwort ausblenden' : 'Antwort anzeigen'}
        </Text>
      </Pressable>

      {/* Nächste Vokabel anzeigen. */}
      <Pressable style={styles.nextButton} onPress={goToNext}>
        <Text style={styles.nextText}>Nächste Vokabel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, alignItems: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  empty: { fontSize: 16, color: Colors.muted },
  progress: { fontSize: 15, color: Colors.muted, marginBottom: 16 },
  card: {
    width: '100%',
    minHeight: 220,
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  term: { fontSize: 34, fontWeight: '700', color: Colors.text },
  translation: { fontSize: 24, color: Colors.accent, fontWeight: '600' },
  hint: { fontSize: 14, color: Colors.muted },
  toggleButton: {
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    width: '100%',
    alignItems: 'center',
  },
  toggleText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
  nextButton: { marginTop: 12, paddingVertical: 14, width: '100%', alignItems: 'center' },
  nextText: { color: Colors.primary, fontSize: 16, fontWeight: '600' },
});

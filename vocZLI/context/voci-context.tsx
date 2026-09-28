/**
 * VociContext – der gemeinsame Speicher für alle Vokabeln (Block 2: React Context).
 *
 * Idee: Mehrere Screens (Liste, Lernen, Hinzufügen) brauchen dieselben Daten.
 * Statt die Daten umständlich über Props weiterzureichen, legen wir sie EINMAL
 * im Context ab. Jeder Screen liest/ändert sie bequem über den Hook useVoci().
 *
 * Aufbau (wie in den Folien):
 *   1) Voci-Typ + Context erstellen
 *   2) VociProvider stellt Daten + Funktionen bereit (hat einen eigenen useState)
 *   3) useVoci() liest den Context bequem aus (Custom Hook)
 */
import { createContext, useContext, useState, type ReactNode } from 'react';

// Eine einzelne Vokabel. (imageUri ist optional und wird erst später genutzt.)
export interface Voci {
  term: string;
  translation: string;
  imageUri?: string;
}

// Was der Context bereitstellt: die Daten UND die CRUD-Funktionen.
interface VociContextType {
  vociList: Voci[]; // Read   – die ganze Liste
  addVoci: (newVoci: Voci) => void; // Create
  updateVoci: (index: number, updated: Voci) => void; // Update
  removeVoci: (index: number) => void; // Delete
}

// 1) Context erstellen. Startwert undefined = "es gibt noch keinen Provider darüber".

const VociContext = createContext<VociContextType | undefined>(undefined);

// 2) Provider: hält den State und gibt ihn an alle Kind-Komponenten weiter.
export function VociProvider({ children }: { children: ReactNode }) {
  // Ein paar Beispiel-Vokabeln zum Start. Gerne anpassen!
  const [vociList, setVociList] = useState<Voci[]>([
    { term: 'apple', translation: 'Apfel' },
    { term: 'house', translation: 'Haus' },
    { term: 'dog', translation: 'Hund' },
  ]);

  // Create: neue Vokabel ans Ende der Liste anhängen.
  const addVoci = (newVoci: Voci) => {
    setVociList((prev) => [...prev, newVoci]);
  };

  // Update: die Vokabel an der Position index durch eine neue ersetzen.
  const updateVoci = (index: number, updated: Voci) => {
    setVociList((prev) => prev.map((voci, i) => (i === index ? updated : voci)));
  };

  // Delete: die Vokabel an der Position index aus der Liste entfernen.
  const removeVoci = (index: number) => {
    setVociList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <VociContext.Provider value={{ vociList, addVoci, updateVoci, removeVoci }}>
      {children}
    </VociContext.Provider>
  );
}

// 3) Custom Hook: kapselt useContext und prüft, ob ein Provider vorhanden ist.
export function useVoci() {
  const context = useContext(VociContext);
  if (!context) {
    throw new Error('useVoci() muss innerhalb von <VociProvider> verwendet werden.');
  }
  return context;
}

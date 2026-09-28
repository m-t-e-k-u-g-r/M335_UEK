# Block 2 – State, Navigation & Context (VocZLI)

Diese Datei erklärt **was umgesetzt wurde** und **wo** man die Themen aus Block 2
im Code findet. VocZLI ist eine kleine Vokabel-App: Vokabeln anschauen, hinzufügen,
bearbeiten, löschen und mit Karteikarten lernen.

## App in 30 Sekunden

```
┌─────────────────┐  Play-FAB   ┌──────────────────┐
│  Meine Vokabeln │ ──────────▶ │  Vokabeln lernen │
│   (index.tsx)   │             │   (learn.tsx)    │
│                 │             └──────────────────┘
│  +  /  Zeile    │  "+" = neu / Zeile tippen = bearbeiten
│      ▼          │
│  ┌───────────┐  │
│  │ add.tsx   │  │  Formular: hinzufügen ODER bearbeiten
│  └───────────┘  │
└─────────────────┘
```

Alle Screens teilen sich **eine** Vokabelliste – über den `VociContext`.

## Dateien & ihre Aufgabe

| Datei                        | Aufgabe                                                             |
| ---------------------------- | ------------------------------------------------------------------ |
| `app/_layout.tsx`            | Stack-Navigation **und** `VociProvider` (umschliesst alle Screens) |
| `app/index.tsx`              | Liste aller Vokabeln, FAB, Löschen, Einstieg ins Hinzufügen        |
| `app/learn.tsx`              | Karteikarten-Lernen mit `useState`                                 |
| `app/add.tsx`                | Formular zum Hinzufügen **und** Bearbeiten                         |
| `components/voci-row.tsx`    | Eine Listen-Zeile – reine Props-Komponente (kein State)            |
| `context/voci-context.tsx`   | `Voci`-Typ, Context, Provider, `useVoci()`, CRUD-Funktionen        |
| `constants/theme.ts`         | Zentrale Farben (ZLI-Branding)                                     |

## Lernziele Block 2 → wo im Code?

| Lernziel                                            | Umgesetzt in                                                     |
| --------------------------------------------------- | ---------------------------------------------------------------- |
| Unterschied **Props vs. State**                     | `components/voci-row.tsx` (nur Props) vs. `app/learn.tsx` (State) |
| **useState** für interaktive Komponenten            | `learn.tsx` (`showTranslation`, `currentIndex`), `add.tsx`       |
| **Stack-Navigation** mit Expo Router                | `app/_layout.tsx` (`<Stack>` + `<Stack.Screen>`)                 |
| **React Context** + Provider erstellen              | `context/voci-context.tsx`                                       |
| **useContext** für globalen State (als Custom Hook) | `useVoci()` in `voci-context.tsx`                                |
| **CRUD** (Create, Read, Update, Delete)             | siehe Tabelle unten                                              |
| Floating Action Button (FAB)                        | `app/index.tsx` (Play-Button unten rechts)                       |
| Conditional Rendering                               | `app/learn.tsx` (`{showTranslation && <Text>…</Text>}`)          |

### CRUD im Detail

| Operation  | Funktion (im Context) | Auslöser in der UI                       |
| ---------- | --------------------- | ---------------------------------------- |
| **Create** | `addVoci`             | "+" im Header → Formular `add.tsx`       |
| **Read**   | `vociList`            | Liste in `index.tsx`, Karten in `learn.tsx` |
| **Update** | `updateVoci`          | Zeile antippen → Formular `add.tsx`      |
| **Delete** | `removeVoci`          | Papierkorb-Icon in der Zeile             |

## Was wurde gegenüber dem Expo-Starter angepasst?

Das Projekt startete als Standard-Expo-Vorlage (Tabs, Demo-Screens). Für Block 2
wurde daraus eine fokussierte Vokabel-App:

**Neu erstellt**

- `context/voci-context.tsx` – der gemeinsame Vokabel-Speicher (Herzstück von Block 2)
- `app/index.tsx`, `app/learn.tsx`, `app/add.tsx` – die drei Screens
- `components/voci-row.tsx` – Props-Beispiel
- `BLOCK2.md` – diese Übersicht

**Geändert**

- `app/_layout.tsx` – von Tab-Layout zu **Stack** umgebaut und mit `VociProvider` umschlossen
- `constants/theme.ts` – auf eine einfache, zentrale Farbpalette reduziert

**Entfernt** (Demo-/Starter-Dateien, für Block 2 nicht nötig)

- `app/(tabs)/`, `app/modal.tsx`
- Demo-Komponenten (`themed-text`, `themed-view`, `parallax-scroll-view`,
  `hello-wave`, `external-link`, `haptic-tab`, `components/ui/…`)
- Theme-Hooks (`hooks/…`)

## Kleiner Hinweis (über Block 2 hinaus)

Das Bearbeiten nutzt einen Navigations-Parameter (`useLocalSearchParams`), damit
`add.tsx` für **Hinzufügen und Bearbeiten** dient (keine doppelte Datei). Das ist
eine kleine Erweiterung, um das CRUD-Ziel **Update** vollständig zu zeigen.

Die Vokabeln liegen nur im Arbeitsspeicher (State) – nach einem Neustart sind die
Beispiel-Vokabeln wieder da.

## Starten

```bash
npm install
npx expo start
```

Dann im Terminal `i` (iOS), `a` (Android) oder `w` (Web) drücken.

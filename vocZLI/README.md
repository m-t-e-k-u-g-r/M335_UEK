# VocZLI 📚

Eine kleine Vokabel-App (Expo / React Native), entwickelt im **Modul 335 – Block 2**.

Vokabeln **anschauen, hinzufügen, bearbeiten, löschen** und mit **Karteikarten lernen**.

## Themen aus Block 2

- **State & Navigation**: `useState`, Stack-Navigation mit Expo Router, Floating Action Button
- **Context & CRUD**: gemeinsamer State über React Context, Create/Read/Update/Delete

> 📄 Eine ausführliche Erklärung – **was wo umgesetzt ist** und **was gegenüber der
> Expo-Vorlage angepasst wurde** – steht in **[BLOCK2.md](./BLOCK2.md)**.

## Projektstruktur

```
app/
  _layout.tsx        Stack-Navigation + VociProvider
  index.tsx          "Meine Vokabeln" – Liste, FAB, Löschen
  learn.tsx          "Vokabeln lernen" – Karteikarten (useState)
  add.tsx            "Vokabel hinzufügen/bearbeiten" – Formular
components/
  voci-row.tsx       Listen-Zeile (reine Props-Komponente)
context/
  voci-context.tsx   Voci-Typ, Context, Provider, useVoci(), CRUD
constants/
  theme.ts           Zentrale Farben
```

## Starten

```bash
npm install
npx expo start
```

Danach im Terminal `i` (iOS), `a` (Android) oder `w` (Web) drücken.

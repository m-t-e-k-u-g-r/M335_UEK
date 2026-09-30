/**
 * Root-Layout der App (Expo Router).
 *
 * Zwei zentrale Aufgaben:
 *   1) Stack-Navigation: legt fest, welche Screens es gibt und wie der Header aussieht.
 *   2) VociProvider:     stellt die gemeinsame Vokabelliste ALLEN Screens zur Verfügung.
 */
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { Colors } from '@/constants/theme';
import { VociProvider } from '@/context/voci-context';
import {NotificationProvider} from "@/context/notification-context";

export default function RootLayout() {
  return (
    <NotificationProvider>
        <VociProvider>
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: Colors.primary },
                    headerTintColor: Colors.white,
                    headerTitleStyle: { fontWeight: 'bold' },
                    contentStyle: { backgroundColor: Colors.background },
                }}>
                {/* Jeder <Stack.Screen> registriert einen Screen + dessen Titel. */}
                <Stack.Screen name="index" options={{ title: 'Meine Vokabeln' }} />
                <Stack.Screen name="learn" options={{ title: 'Vokabeln lernen' }} />
                <Stack.Screen name="add" options={{ title: 'Vokabel hinzufügen' }} />
            </Stack>
            <StatusBar style="light" />
        </VociProvider>
    </NotificationProvider>
  );
}

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen name="sensordebug" options={{ title: 'Accelerometer' }}/>
      </Stack>
  );
}

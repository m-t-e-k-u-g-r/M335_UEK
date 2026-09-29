import { Stack } from "expo-router";
import { AccelerometerProvider } from '@/context/accelerometer_context';

export default function RootLayout() {
  return (
      <AccelerometerProvider>
          <Stack>
              <Stack.Screen
                  name="sensordebug"
                  options={{ title: 'Accelerometer' }}
              />
          </Stack>
      </AccelerometerProvider>
  );
}

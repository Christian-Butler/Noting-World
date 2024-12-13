import { Stack } from 'expo-router/stack';
import { SessionProvider } from '@/contexts/AuthContext';

export default function Layout() {
  return (
    <SessionProvider>
      <Stack
      screenOptions={{
        // Hide the header for all other routes.
        headerShown: false,
      }}
      
      >
        <Stack.Screen name="(tab)" options={{ headerShown: false }} />
      </Stack>
    </SessionProvider>
  );
}
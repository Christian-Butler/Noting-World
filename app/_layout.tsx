import { Stack } from 'expo-router/stack';
import { SessionProvider } from '@/contexts/AuthContext';

export default function Layout() {
  return (
    <SessionProvider>
      <Stack
      screenOptions={{
        // Hide the header for all other routes.
        headerShown: true,
      }}
      
      >
        <Stack.Screen name="(tab)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
       
      </Stack>
    </SessionProvider>
  );
}
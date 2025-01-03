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
        <Stack.Screen name="(auth)" options={{ headerShown: true }} />
        <Stack.Screen name="authors/[id]" options={{ headerShown: true, headerTitle: "Authors" }} />
        <Stack.Screen name="tags/[id]" options={{ headerShown: true, headerTitle: "Tags" }} />
        <Stack.Screen name="notes/[id]" options={{ headerShown: true,  headerTitle: "Notes" }} />
      </Stack>
    </SessionProvider>
  );
}
import { View, Text, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import LoginForm from '@/components/LoginForm';
import { useSession } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { session, isLoading } = useSession();

  // Redirect to notes if already authenticated
  if (session) {
    return <Redirect href="/(tab)/notes" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Welcome to Notes App</Text>
        <Text style={styles.subtitle}>Please login to continue</Text>
      </View>
      
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  headerContainer: {
    marginBottom: 40,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  subtitle: {
    fontSize: 16,
    color: '#666'
  }
});
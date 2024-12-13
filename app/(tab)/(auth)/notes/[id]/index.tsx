import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useLocalSearchParams } from 'expo-router';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { NotesType } from '@/types';


export default function Tab() {
  const [notes, setNotes] = useState<NotesType | null>(null);
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    
    axios.get(`https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/notes/${id}`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNidXRsZXJAaWNsb3VkLmNvbSIsImZ1bGxfbmFtZSI6ImNocmlzdGlhbiBidXRsZXIiLCJfaWQiOiI2NzJhMWZkZmQ1Yjc5MTA4MzVlNjkzOTQiLCJpYXQiOjE3MzQwMzkwNDh9.3ErVmxFqos_EwHZn21FPg0EEb3IR4mUUPasInEthF2w'
            }
        })
         .then(response => {
            console.log(response.data);
            setNotes(response.data);
         })
         .catch(e => {
            console.log(e);
         });

  }, [id]);

  if(!notes) return <Text>Notes not found</Text>
  
  return (
    <View style={styles.container}>
        <Text>{notes.title}</Text>
        <Text>{notes.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

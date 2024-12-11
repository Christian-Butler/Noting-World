import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import NotesItem from '@/components/Notesitem';

import { useLocalSearchParams } from 'expo-router';

import { NotesType } from '@/types';

import { Link } from 'expo-router';


export default function Tab() {
  const [notes, setNotes] = useState<NotesType | null>(null);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    
    axios.get(`https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/notes/${id}`)
         .then(response => {
          console.log(response.data);
          setNotes(response.data);
         })
         .catch(e => {
          console.log(e);
         });

  }, []);

  if(!notes) return <Text>No Notes found</Text>
  
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

import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import NotesItem from '@/components/Notesitem';
import { NotesTypeID } from '@/types';
import { Link } from 'expo-router';

export default function Notes() {
  const [note, setNotes] = useState([]);

  useEffect(() => {
    
    axios.get('https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/notes')
         .then(response => {
          console.log(response.data);
          setNotes(response.data);
         })
         .catch(e => {
          console.log(e);
         });

  }, []);

  if(note.length === 0) return <Text>No notes found</Text>
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Link href="/notes/create">Create Note</Link>
        <FlatList
          data={note}
          renderItem={({item}) => <NotesItem notes={item} />}
          keyExtractor={(notes: NotesTypeID) => notes._id}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

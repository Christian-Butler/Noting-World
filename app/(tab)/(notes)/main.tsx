import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import NotesItem from '@/components/Notesitem';
import { NotesType } from '@/types';


export default function Tab() {
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
        <FlatList
          data={note}
          renderItem={({item}) => <NotesItem notes={item} />}
          keyExtractor={(notes: NotesType) => notes._id}
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

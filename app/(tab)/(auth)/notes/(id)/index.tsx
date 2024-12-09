import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useLocalSearchParams } from 'expo-router';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { NotesType } from '@/types';


export default function Tab() {
  const [notes, setNotes] = useState<NotesType | null>(null);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchNote = async () => {
        try {
            const response = await axios.get(`https://notes-api.vercel.app/api/notes/${id}`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vQG1vLm1vIiwiZnVsbF9uYW1lIjoiTW8iLCJfaWQiOiI2NzI4ZjAzMWQ2YzdkYzAwMDhmNmY5ZjAiLCJpYXQiOjE3MzI2MTcwMTZ9.nUztWFux-E-PuU29Czr3WTEqA2PvlU0HYXPSngJ5920'
            }
            });
            console.log(response.data);
            setNotes(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    fetchNote();
  }, [id]);

  if(!notes) return <Text>Note not found</Text>
  
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

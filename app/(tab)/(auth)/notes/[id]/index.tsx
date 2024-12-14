import { View, Text, StyleSheet, FlatList,Button } from 'react-native';
import { useEffect, useState } from 'react';
import { useSession } from '@/contexts/AuthContext';
import { useLocalSearchParams, Link, router } from 'expo-router';
import useAPI from '@/hooks/useAPI';
import { NotesType } from '@/types';
export default function Tab() {
  const [notes, setNotes] = useState<NotesType | null>(null);
  const { session } = useSession();
  const { id } = useLocalSearchParams<{ id: string }>();
    const { getRequest, deleteRequest} = useAPI();

  useEffect(() => {
    
   getRequest(`https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/notes/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {  
            setNotes(data as NotesType);
        })

  }, [id]);

  const handleDelete = () => {
   
    deleteRequest(`https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${session}`
      }
    }, (data) => {
      router.push(`/notes`);
      console.log(data);
    });
  }


  if(!notes) return <Text>Notes not found</Text>
  
  return (
    <View style={styles.container}>
        <Text>{notes.title}</Text>
        <Text>{notes.description}</Text>
        <Link href={`/notes/${id}/edit`}>Edit</Link>
        <Button title="Delete" onPress={handleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#eaeaea',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16
  },
});

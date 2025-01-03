import { View,StyleSheet, FlatList, } from 'react-native';
import { useEffect, useState } from 'react';
import { useSession } from '@/contexts/AuthContext';
import { Card, Button, Modal, Portal, PaperProvider,Text } from 'react-native-paper';
import { useLocalSearchParams, Link, router } from 'expo-router';
import useAPI from '@/hooks/useAPI';
import { NotesType } from '@/types';
export default function Tab() {
  const [notes, setNotes] = useState<NotesType | null>(null);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
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

  const confirmDelete = () => {
    handleDelete();
    hideModal();
  };


  if(!notes) return <Text>Notes not found</Text>
  
  return (
    <PaperProvider>
    <View style={styles.container}>
      <Card>
        <Card.Title title={notes.title} />
        <Card.Content>
          <Text>{notes.description}</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={showModal}>Delete</Button>
        <Button><Link href={`/notes/${id}/edit`}>
        Edit
        </Link>
        </Button>
        </Card.Actions>
      </Card> 

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalText}>
            Are you sure you want to delete this tag?
          </Text>
          <View style={styles.modalButtons}>
            <Button
              mode="contained"
              onPress={confirmDelete}
              style={styles.deleteButton}>
              Delete
            </Button>
            <Button mode="outlined" onPress={hideModal}>
              Cancel
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
    </PaperProvider>
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
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  deleteButton: {
    backgroundColor: "#ff4444",
    marginRight: 10,
  },
});

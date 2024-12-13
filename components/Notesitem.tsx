import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { NotesType } from '@/types';

interface MyProps {
    notes: NotesType;
}

export default function NotesItem({notes}: MyProps){
    return (
        <View style={styles.item}>
            <Link href={{
                pathname: '/notes/[id]',
                params: { id: notes._id }
            }as const}><Text>{notes.title}</Text></Link>
            <Text>{notes.description}</Text>
            <Link href={{ 
                pathname: '/notes/[id]/create',
                params: { id: notes._id }
            }}><Text>Create</Text></Link>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#eaeaea',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16
      }
});
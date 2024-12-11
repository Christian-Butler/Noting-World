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
                pathname: '/(tab)/(notes)/main',
                params: { id: notes._id }
            }}><Text>{notes.title}</Text></Link>
            <Text>{notes.description}</Text>
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
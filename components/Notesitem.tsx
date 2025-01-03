import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { NotesType } from '@/types';
import { Card, Button  } from 'react-native-paper';

interface MyProps {
    notes: NotesType;
}

export default function NotesItem({notes}: MyProps){
    return (
        <View style={styles.item}>
            <Card>
                <Card.Title title={notes.title} subtitle={notes.description} />
                <Card.Actions>
                    <Button><Link href={{
                        pathname: '/notes/[id]',
                        params: { id: notes._id }
                    }as const}>View Note</Link></Button>
                    <Button><Link href="/notes/create">Create Note</Link></Button>
                </Card.Actions>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16
      }
});
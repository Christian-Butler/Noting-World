import { View, Text, StyleSheet } from 'react-native';
import { Card,Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { AuthorType } from '@/types';

interface MyProps {
    author: AuthorType;
}

export default function Authorsitem({author}: MyProps){
    return (
        <View style={styles.item}>
            <Card>
                <Card.Title title={author.first_name} subtitle={author.last_name} />
                <Card.Actions>
                    <Button><Link href={{
                        pathname: '/authors/[id]',
                        params: { id: author._id }
                    } as const}>View Author</Link></Button>
                    <Button><Link href="/authors/create">Create Author</Link></Button>
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
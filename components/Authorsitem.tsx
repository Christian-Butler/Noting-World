import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { AuthorType } from '@/types';

interface MyProps {
    author: AuthorType;
}

export default function Authorsitem({author}: MyProps){
    return (
        <View style={styles.item}>
            <Link href={{
                pathname: '/authors/[id]',
                params: { id: author._id }
            }as const}><Text>{author.first_name}</Text></Link>
            <Text>{author.last_name}</Text>
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
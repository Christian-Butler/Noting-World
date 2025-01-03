import {View, Text, StyleSheet} from 'react-native';    
import { Card,Button } from 'react-native-paper';
import {Link} from 'expo-router';
import {TagsType} from '@/types';

interface MyProps {
    tags: TagsType;
}

export default function TagsItem({tags}: MyProps){
    return (
        <View style={styles.item}>
            <Card>
                <Card.Title title={tags.tag_name} />
                <Card.Actions>
                    <Button><Link href={{
                        pathname: '/tags/[id]',
                        params: { id: tags._id }
                    }as const}>View Tags</Link></Button>
                    <Button><Link href="/tags/create">Create Tags</Link></Button>
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
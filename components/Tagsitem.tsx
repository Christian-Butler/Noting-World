import {View, Text, StyleSheet} from 'react-native';    
import {Link} from 'expo-router';
import {TagsType} from '@/types';

interface MyProps {
    tags: TagsType;
}

export default function TagsItem({tags}: MyProps){
    return (
        <View style={styles.item}>
            <Link href={{
                pathname: '/tags/[id]',
                params: { id: tags._id }
            }as const}><Text>{tags.tag_name}</Text></Link>
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
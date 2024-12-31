import { View, Text, StyleSheet, FlatList,Button } from 'react-native';
import { useEffect, useState } from 'react';
import { useSession } from '@/contexts/AuthContext';
import { useLocalSearchParams, Link, router } from 'expo-router';
import useAPI from '@/hooks/useAPI';
import { TagsType } from '@/types';
export default function Tab(){
    const [tags, setTags] = useState<TagsType | null>(null);
    const { session } = useSession();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { getRequest, deleteRequest} = useAPI();

    useEffect(() => {
        getRequest(`https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/tags/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            setTags(data as TagsType);
        })
    }, [id]);

    const handleDelete = () => {
        deleteRequest(`https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/tags/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            router.push(`/tags`);
            console.log(data);
        });
    }

    if(!tags) return <Text>Tags not found</Text>

    return (
        <View style={styles.container}>
            <Text>{tags.tag_name}</Text>
            <Link href={`/tags/${id}/edit`}>Edit</Link>
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
    }
});
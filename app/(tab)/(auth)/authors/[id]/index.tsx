import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { useSession } from '@/contexts/AuthContext';
import { useLocalSearchParams, Link, router } from 'expo-router';
import useAPI from '@/hooks/useAPI';
import { AuthorType } from '@/types';

export default function Tab() {
    const [authors, setAuthors] = useState<AuthorType | null>(null);
    const { session } = useSession();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { getRequest, deleteRequest} = useAPI();

    useEffect(() => {
        getRequest(`https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/authors/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {  
            setAuthors(data as AuthorType);
        })
    }, [id]);

    const handleDelete = () => {
        deleteRequest(`https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/authors/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            router.push(`/authors`);
            console.log(data);
        });
    }

    if(!authors) return <Text>Author not found</Text>
    
    return (
        <View style={styles.container}>
            <Text>{authors.first_name}</Text>
            <Text>{authors.last_name}</Text>
            <Link href={`/authors/${id}/edit`}>Edit</Link>
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

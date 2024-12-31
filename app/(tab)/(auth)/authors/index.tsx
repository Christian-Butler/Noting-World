import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Link} from 'expo-router';
import Authorsitem from '@/components/Authorsitem'; 
import {AuthorTypeID} from '@/types';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function authors() {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios.get('https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/author')
            .then(response => {
                console.log(response.data);
                setAuthors(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    }, []);

    if (authors.length === 0) return <Text>No authors found</Text>

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Link href="/authors/create">Create Author</Link>
                <FlatList
                    data={authors}
                    renderItem={({ item }) => <Authorsitem author={item} />}
                    keyExtractor={(authors: AuthorTypeID) => authors._id}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
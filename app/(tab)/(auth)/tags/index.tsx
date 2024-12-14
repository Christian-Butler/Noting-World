import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import TagsItem from '@/components/Tagsitem';
import { TagsTypeID } from '@/types';
import { Link } from 'expo-router';

export default function tags() {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        axios.get('https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/tags')
            .then(response => {
                console.log(response.data);
                setTags(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    }, []);

    if (tags.length === 0) return <Text>No tags found</Text>

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
            
                <FlatList
                    data={tags}
                    renderItem={({ item }) => <TagsItem tags={item} />}
                    keyExtractor={(tags: TagsTypeID) => tags._id}
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

import { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, Button } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TagsType } from '@/types';
import useAPI from '@/hooks/useAPI';

export default function Page() {
    const router = useRouter();
    const [tag, setTag] = useState<TagsType | null>(null);
    const { session } = useSession();
    const { id } = useLocalSearchParams();

    const [form, setForm] = useState<TagsType>({
        _id: "",
        tag_name: "",
  
    });
    const { getRequest, putRequest, data, loading, error } = useAPI();

    useEffect(() => {
        getRequest(`https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/tags/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            setTag(data as TagsType);
            setForm(data as TagsType);
        })
    }, [id]);

    const handleChange = (e: any) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const handleSubmit = () => {
        console.log(form);
        putRequest(`https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/tags/${id}`, form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            router.push(`/tags/${data._id}`);
        });
    }

    if(loading === true) return <Text>Loading API...</Text>
    
    return (
        <>
            <Text>Name</Text>
            <TextInput
                style={styles.input}
                placeholder='Name'
                value={form.tag_name}
                onChange={handleChange}
                id='name'
            />
            <Text>{error}</Text>
            <Button 
                onPress={handleSubmit}
                title="Submit"
                color="#841584"
            />
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10
    }
});
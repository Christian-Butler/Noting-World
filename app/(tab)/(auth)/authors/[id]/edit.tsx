import { useState, useEffect } from 'react';
import { Text,  StyleSheet} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useSession } from '@/contexts/AuthContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AuthorType } from '@/types';   // You'll need to update this type
import useAPI from '@/hooks/useAPI';

export default function Page() {
    const router = useRouter();
    const [author, setAuthors] = useState<AuthorType | null>(null);
    const { session } = useSession();
    const { id } = useLocalSearchParams();

    const [form, setForm] = useState<AuthorType>({
        _id: "",
        first_name: "",
        last_name: "",
        length: 0
    });
    const { getRequest, putRequest, data, loading, error } = useAPI();

    useEffect(() => {
        getRequest(`https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/author/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            setAuthors(data as AuthorType);
            setForm(data as AuthorType);
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
        putRequest(`https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/author/${id}`, form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            router.push(`/authors/${data._id}`);
        });
    }

    if(loading === true) return <Text>Loading API...</Text>
    
    return (
        <>
            <Text>Title</Text>
            <TextInput
                style={styles.input}
                placeholder='Title'
                value={form.first_name}
                onChange={handleChange}
                id='first_name'
            />

            <Text>Description</Text>
            <TextInput
                style={styles.input}
                placeholder='Description'
                value={form.last_name}
                onChange={handleChange}
                id='last_name'
            />

            <Text>{error}</Text>
            <Button 
                onPress={handleSubmit}
                mode='contained'
            >Submit</Button>
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

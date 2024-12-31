import { Text, TextInput, StyleSheet, Button } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI';

export default function CreateTagPage() {
    const { session } = useSession();
    const router = useRouter();
    const [form, setForm] = useState({
        tag_name: "",
    });
    const { postRequest, data, loading, error } = useAPI();

    const handleChange = (e: any) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        console.log(form);

        postRequest('https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/tags', form, {
                headers: {
                        Authorization: `Bearer ${session}`
                }
        }, (data) => {
                router.push(`/tags/${data._id}`);
        });
    };

    if (loading) {
        return <Text>Loading API</Text>;
    }

    return (
        <>
            <Text>Tag Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Tag Name"
                value={form.tag_name}
                onChange={handleChange}
                id="tag_name"
            />
            <Text>{error}</Text>
            <Button onPress={handleSubmit} title="Submit" color="#841584" />
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10,
    },
});
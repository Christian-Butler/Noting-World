import { Text, TextInput, StyleSheet, Button } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI';

export default function CreateAuthor() {
    const { session } = useSession();
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        bio: "",
    });
    const { postRequest, data, loading, error } = useAPI();

    const handleChange = (e: any) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        postRequest('https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/author', form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            router.push(`/authors/${data._id}`);
        });
    };

    if (loading) {
        return <Text>Loading API</Text>;
    }

    return (
        <>
            <Text>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                id="name"
            />

            <Text>Bio</Text>
            <TextInput
                style={styles.input}
                placeholder="Bio"
                value={form.bio}
                onChange={handleChange}
                id="bio"
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
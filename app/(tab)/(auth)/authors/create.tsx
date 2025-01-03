import { Text,  StyleSheet} from 'react-native';
import { TextInput , Button  } from 'react-native-paper';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI';

export default function CreateAuthor() {
    const { session } = useSession();
    const router = useRouter();
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
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
            router.push('/authors');
        });
    };

    if (loading) {
        return <Text>Loading API</Text>;
    }

    return (
        <>
            <Text>Authors First Name </Text>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={form.first_name}
                onChange={handleChange}
                id="first_name"
            />

            <Text>Authors Last Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={form.last_name}
                onChange={handleChange}
                id="last_name"
            />
            <Text>{error}</Text>
            <Button mode='contained' onPress={handleSubmit} >
                Submit
            </Button>
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
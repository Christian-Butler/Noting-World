import { Text, TextInput, StyleSheet, Button } from 'react-native';
import { useState } from 'react';
import {router} from 'expo-router';
import { NotesType } from '@/types';
import { useSession } from '@/contexts/AuthContext';
import  usePost  from '@/hooks/usePost';
export default function Page() {
 const session = useSession();
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const { postRequest, data, loading, error } = usePost();

  const handleChange = (e: any) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handlePress = () => {
    console.log("Clicked");
     postRequest(`https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/notes`, form, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNidXRsZXJAaWNsb3VkLmNvbSIsImZ1bGxfbmFtZSI6ImNocmlzdGlhbiBidXRsZXIiLCJfaWQiOiI2NzJhMWZkZmQ1Yjc5MTA4MzVlNjkzOTQiLCJpYXQiOjE3MzQwMzkwNDh9.3ErVmxFqos_EwHZn21FPg0EEb3IR4mUUPasInEthF2w',
      }
    }, (data:NotesType) => {
        router.push(`/notes/${data._id}` as any);
    });
  };
  //     console.log(data);
  //     if (data && !loading) {
  //       console.log(data);
  //       router.push(`/festivals/${data._id}`);
  //     }
  //   };

  if (loading) {
    return <Text>Loading API</Text>;
  }

  return (
    <>
      <Text>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        id="title"
      />

      <Text>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        id="description"
      />
      <Text>{error}</Text>
      <Button onPress={handlePress} title="Submit" color="#841584" />
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

import { Text, TextInput, StyleSheet, Button } from 'react-native';
import { useState } from 'react';
import {router} from 'expo-router';
import { NotesType } from '@/types';
import { useSession } from '@/contexts/AuthContext';
import  usePost  from '@/hooks/usePost';
import useAPI from '@/hooks/useAPI';

export default function Page() {
 const { session } = useSession();
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const { postRequest, data, loading, error } = useAPI();

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
        Authorization: `Bearer ${session}`
      }
    }, (data) => {
        router.push(`/notes/${data._id}`);
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

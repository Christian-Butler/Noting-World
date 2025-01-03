import { Button, View,  FlatList } from "react-native";
import { useRouter, Link } from "expo-router";
import { Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { useSession } from "@/contexts/AuthContext";
import { NotesType, NotesTypeID } from "@/types";
import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NotesItem from "@/components/Notesitem";
import useAPI from "@/hooks/useAPI";
export default function Notes() {
  const router = useRouter();
  const [notes, setNotes] = useState([]);
  const { session } = useSession();
  const { getRequest } = useAPI();


  useEffect(() => {
    axios
      .get(
        "https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/notes"
      )
      .then((response) => {
        console.log(response.data);
        setNotes(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);


  if (notes.length === 0) {
    return <Text>Loading...</Text>;
  }
  return (
    <SafeAreaProvider
    style={[styles.container, styles.item]}
    >
      <Text variant="headlineMedium">Notes</Text>
      <FlatList
        data={notes}
        renderItem={({ item }) => <NotesItem notes={item} />}
        keyExtractor={(notes: NotesTypeID) => notes._id}
      />
    </SafeAreaProvider>
  );
}

const styles = {
  container: {
    flex: 1,
    textAlign: "center",
    backgroundColor: '#FFFFFF'
  },

  item: {
    justifyContent: "center" as "center",
    alignItems: "center" as "center",
  }
};

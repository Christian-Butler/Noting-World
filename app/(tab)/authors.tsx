import { Button, View, Text, FlatList } from "react-native";
import { useRouter, Link } from "expo-router";
import Authorsitem from "@/components/Authorsitem";
import { AuthorTypeID } from "@/types";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Authors() {
  const router = useRouter();
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/author"
      )
      .then((response) => {
        console.log(response.data);
        setAuthors(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (authors.length === 0) {
    return <Text>Loading...</Text>;
  }
  return (
    <SafeAreaProvider
    style={[styles.container, styles.item]}
    >
      <Text style={styles.item}>Authors</Text>
      <Link href="/authors/create">Create Note</Link>

      <FlatList
        data={authors}
        renderItem={({ item }) => <Authorsitem author={item} />}
        keyExtractor={(authors: AuthorTypeID) => authors._id}
      />
    </SafeAreaProvider>
  );
}

const styles = {
  container: {
    flex: 1,
    textAlign: "center",
  },

  item: {
    justifyContent: "center" as "center",
    alignItems: "center" as "center",
  }
};

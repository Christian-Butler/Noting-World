import { Button, View, Text, FlatList } from "react-native";
import { useRouter,Link } from "expo-router";
import Tagsitem from "@/components/Tagsitem";
import { TagsTypeID } from "@/types";
import { SafeAreaProvider } from "react-native-safe-area-context";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Tags() {
  const router = useRouter();
  const [tags, setTags] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://ajs-ca-notebooks-git-main-chris-butlers-projects-ef669578.vercel.app/api/tags"
      )
      .then((response) => {
        setTags(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <SafeAreaProvider
    style={[styles.container, styles.item]}
    >
      <Text>Tags</Text>
      <Link href="/tags/create">Create Note</Link>
      <FlatList
        data={tags}
        renderItem={({ item }) => <Tagsitem tags={item} />}
        keyExtractor={(tags: TagsTypeID) => tags._id}
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
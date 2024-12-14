import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"  // Changed from "Home" to "index"
        options={{
          headerTitle: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"  // Changed from "notes/index"
        options={{
          headerTitle: "Notes",
          title: "Notes",
          href: "/notes",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="edit" color={color} />
          ),
          tabBarLabel: "Notes",
        }}
      />
      <Tabs.Screen
        name="authors"  // Changed from "authors/index"
        options={{
          headerTitle: "Authors",
          title: "Authors",
          href: "/authors",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
          tabBarLabel: "Authors",
        }}
      />
      <Tabs.Screen
        name="tags"  // Changed from "tags/index"
        options={{
          headerTitle: "Tags",
          title: "Tags",
          href: "/tags",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="tags" color={color} />
          ),
          tabBarLabel: "Tags",
        }}
      />
      {/* Hidden routes */}
      <Tabs.Screen 
        name="notes/[id]"
        options={{
          href: null
        }}
      />
      <Tabs.Screen 
        name="authors/[id]"
        options={{
          href: null
        }}
      />
      <Tabs.Screen 
        name="tags/[id]"
        options={{
          href: null
        }}
      />
    </Tabs>
  );
}

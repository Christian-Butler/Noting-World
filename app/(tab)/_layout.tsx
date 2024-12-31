import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";


export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="(auth)"
        options={{
          title: "Authentication",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="lock" color={color} />
          ),
          tabBarLabel: "Auth",
        }}
      /> */}
      <Tabs.Screen
        name="notes"  // Changed from "notes/index"
        options={{
          headerTitle: "Notes",
          title: "Notes",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="heart" color={color} />
          ),
          tabBarLabel: "Notes",
        }}
      />
      <Tabs.Screen
        name="authors"
        options={{
          headerTitle: "Authors",
          title: "Authors",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
          tabBarLabel: "Authors",
        }}
        />
      <Tabs.Screen
        name="tags"
        options={{
          headerTitle: "Tags",
          title: "Tags",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="tags" color={color} />
          ),
          tabBarLabel: "Tags",
        }}
      />

      

     
  
        
     
    
    </Tabs>
  );
}

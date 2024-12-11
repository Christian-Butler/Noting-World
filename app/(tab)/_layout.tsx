import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="main"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="notes/index"
        options={{
          title: 'Notes',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="pencil" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />


      <Tabs.Screen
        name="test"
        options={{
          title: 'test',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="anchor" color={color} />,
        }}
      />
      <Tabs.Screen 
        name='notes/[id]/index'
        options={{
          href: null
        }}
      />
    </Tabs>
  );
}

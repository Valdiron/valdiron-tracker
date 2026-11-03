import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: '#0D1526', borderTopColor: '#1E2B43', height: 66, paddingTop: 8, paddingBottom: 8 },
      tabBarActiveTintColor: colors.blue,
      tabBarInactiveTintColor: '#71809A',
      tabBarLabelStyle: { fontSize: 10, fontWeight: '600' }
    }}>
      <Tabs.Screen name="index" options={{ title: 'Painel', tabBarIcon: ({color,size}) => <Ionicons name="grid-outline" color={color} size={size}/> }} />
      <Tabs.Screen name="search" options={{ title: 'Buscar', tabBarIcon: ({color,size}) => <Ionicons name="search-outline" color={color} size={size}/> }} />
      <Tabs.Screen name="monitor" options={{ title: 'Monitorar', tabBarIcon: ({color,size}) => <Ionicons name="pulse-outline" color={color} size={size}/> }} />
      <Tabs.Screen name="reports" options={{ title: 'Relatórios', tabBarIcon: ({color,size}) => <Ionicons name="document-text-outline" color={color} size={size}/> }} />
      <Tabs.Screen name="settings" options={{ title: 'Ajustes', tabBarIcon: ({color,size}) => <Ionicons name="settings-outline" color={color} size={size}/> }} />
    </Tabs>
  );
}

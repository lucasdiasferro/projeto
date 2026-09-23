import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from './src/screens/Home';
import { Dashboard } from './src/screens/Dashboard';
import { NewTransaction } from './src/screens/NewTransaction';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="NewTransaction" component={NewTransaction} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
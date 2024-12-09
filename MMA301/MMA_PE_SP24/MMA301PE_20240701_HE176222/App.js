// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
import HomeTabsComponents from './components/HomeTab';
import DetailScreen from './screens/Detail';
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeTabs' screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeTabs" component={HomeTabsComponents} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{headerShown: true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


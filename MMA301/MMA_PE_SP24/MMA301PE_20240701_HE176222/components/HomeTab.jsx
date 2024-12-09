import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your screens (we'll create these next)
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import CaptainScreen from '../screens/CaptainScreen';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Favorites" component={FavoriteScreen} />
        <Tab.Screen name="Captains" component={CaptainScreen} />
      </Tab.Navigator>
  );
}
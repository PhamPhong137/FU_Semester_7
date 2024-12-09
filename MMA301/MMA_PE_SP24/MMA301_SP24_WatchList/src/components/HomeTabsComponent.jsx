import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import AutomaticScreen from "../screens/AutomaticScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function HomeTabsComponent() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Favorite") {
                        iconName = focused ? "heart" : "heart-outline";
                    } else if (route.name === "Automatic") {
                        iconName = focused ? "time" : "time-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#007bff",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Favorite" component={FavoriteScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Automatic" component={AutomaticScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

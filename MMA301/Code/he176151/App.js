import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screens/Home";
import PlotDetail from "./src/screens/PlotDetail";
import AddEditPlot from "./src/screens/AddEditPlot";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: true, title: 'List of Plots' }}
        />
        <Stack.Screen
          name="PlotDetail"
          component={PlotDetail}
          options={{title: 'Plot Detail'}}
        />
        <Stack.Screen
          name="AddEditPlot"
          component={AddEditPlot}
          options={{title: 'Add/Edit Plot'}}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
}


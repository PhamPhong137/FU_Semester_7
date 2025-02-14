import React from "react";
import { SafeAreaProvider} from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigator/root";
export default function App() {
  return (
    <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
    </SafeAreaProvider>
  );
}

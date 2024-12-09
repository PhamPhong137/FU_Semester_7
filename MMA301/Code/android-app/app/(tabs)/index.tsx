import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import Calculator from "@/My-calculator";
import Lemon from "@/Lemon";

export default function HomeScreen() {
  return (
    <>
      {/* Calculator */}
      {/* <Calculator></Calculator> */}
      <Lemon />
    </>
  );
}




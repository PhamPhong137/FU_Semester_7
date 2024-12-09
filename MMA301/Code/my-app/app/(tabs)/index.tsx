import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Slot1_class from "@/slot1/Slot1_class";
import Slot1_function from "@/slot1/Slot1_function";
import Ex_slot1 from "@/slot1/Ex_slot1";
import SL21 from "@/slot1/SL21";
import PropsParent from "@/slot2/PropsParent";
export default function HomeScreen() {
  return (
    <>
      {/* <Slot1_class></Slot1_class>
      <Slot1_function></Slot1_function> */}
      {/* <Ex_slot1></Ex_slot1> */}
      {/* <SL21></SL21> */}

      <PropsParent></PropsParent>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

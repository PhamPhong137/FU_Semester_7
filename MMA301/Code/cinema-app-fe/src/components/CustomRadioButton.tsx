// App.js

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

interface CustomRadioButtonProps {
  img?: any; // Specify the type as any for an image source
  label: string;
  selected: boolean;
  onSelect: () => void;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  img,
  label,
  selected,
  onSelect,
}) => (
  <TouchableOpacity style={[styles.radioButton]} onPress={onSelect}>
    {/* Circular indicator */}
    <View
      style={[
        styles.circle,
        {
          backgroundColor: selected ? "#007BFF" : "#FFF",
          borderColor: selected ? "#007BFF" : "#CCC",
        },
      ]}
    />
    {/* Image if provided */}
    {img && <Image source={img} style={styles.image} resizeMode="contain" />}

    {/* Label text */}
    <Text
      style={[
        styles.radioButtonText,
        { color: selected ? "#ffffff" : "#ffffff" },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  radioButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#007BFF",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  radioButtonText: {
    fontSize: 20,
    marginLeft: 8, // Spacing between circle and text
    color: "white",
  },
  circle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginRight: 8,
  },
  image: {
    width: 150, // Customize width as needed
    height: 40, // Customize height as needed
    marginRight: 8, // Spacing between image and circle
    marginLeft: 8, // Spacing between circle and text
  },
});

export default CustomRadioButton;

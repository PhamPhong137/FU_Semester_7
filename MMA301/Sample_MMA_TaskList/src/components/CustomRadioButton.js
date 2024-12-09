import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

const CustomRadioButton = ({ options, selectedValue, onSelect }) => {
  return (
    <View>
      {options.map((option) => (
        <View key={option} style={styles.radioButtonContainer}>
          <RadioButton
            value={option}
            status={selectedValue === option ? 'checked' : 'unchecked'}
            onPress={() => onSelect(option)}
          />
          <Text onPress={() => onSelect(option)}>{option}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default CustomRadioButton;

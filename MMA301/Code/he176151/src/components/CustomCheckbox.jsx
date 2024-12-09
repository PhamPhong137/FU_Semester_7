import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';

const CustomCheckbox = ({ options, selectedValues, onSelect }) => {
  return (
    <View>
      {options.map((option) => (
        <View key={option} style={styles.checkboxContainer}>
          <Checkbox
            status={selectedValues.includes(option) ? 'checked' : 'unchecked'}
            onPress={() => onSelect(option)}
          />
          <Text onPress={() => onSelect(option)}>{option}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default CustomCheckbox;

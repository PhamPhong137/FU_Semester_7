import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomSearchBar = ({ value, onChangeText, placeholder }) => {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder={placeholder || "Search..."}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});

export default CustomSearchBar;

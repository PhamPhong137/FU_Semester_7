import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

function DetailProduct() {
  const route = useRoute();
  const { plot } = route.params; // Accessing plot data passed via navigation

  return (
    <View style={styles.container}>
      
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Plot Name:</Text>
        <Text style={styles.value}>{plot.plotName}</Text>
      </View>
      
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>{plot.price}</Text>
      </View>
      
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{plot.address}</Text>
      </View>
      
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Coordinates:</Text>
        <Text style={styles.value}>{plot.coordinates}</Text>
      </View>
      
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Details:</Text>
        <Text style={styles.value}>{plot.details}</Text>
      </View>
    </View>
  );
}

export default DetailProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9', // Light background color
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#333',
  },
  detailContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Adds shadow for Android
    width: '100%',
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    color: '#555',
    width: 120, // Gives more space for labels
  },
  value: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
});


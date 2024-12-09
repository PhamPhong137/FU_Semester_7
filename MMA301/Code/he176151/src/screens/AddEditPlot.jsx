import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddEditPlotScreen({ route, navigation }) {
  const [plotName, setPlotName] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [details, setDetails] = useState('');
  const [plotId, setPlotId] = useState(null);

  useEffect(() => {
    if (route.params?.plot) {
      const { id, plotName, price, address, coordinates, details } = route.params.plot;
      setPlotId(id);
      setPlotName(plotName);
      setPrice(price);
      setAddress(address);
      setCoordinates(coordinates);
      setDetails(details);
    }
  }, [route.params]);

  const isValidPrice = (value) => {
    return /^\d+(\.\d{1,2})?$/.test(value); // Validates that price is a number with up to 2 decimal places
  };

  const savePlot = async () => {
    if (!plotName || !price || !address || !coordinates || !details) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isValidPrice(price)) {
      Alert.alert('Error', 'Please enter a valid numeric value for price');
      return;
    }

    const newPlot = {
      id: plotId || Date.now().toString(),
      plotName,
      price,
      address,
      coordinates,
      details,
    };

    try {
      const existingPlots = await AsyncStorage.getItem('plots');
      let plots = existingPlots ? JSON.parse(existingPlots) : [];

      if (plotId) {
        plots = plots.map((plot) => (plot.id === plotId ? newPlot : plot));
      } else {
        plots.push(newPlot);
      }

      await AsyncStorage.setItem('plots', JSON.stringify(plots));

      Alert.alert('Success', plotId ? 'Plot updated successfully' : 'Plot added successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save plot');
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{plotId ? 'Edit Plot' : 'Add Plot'}</Text>

      <Text>Plot Name</Text>
      <TextInput
        value={plotName}
        onChangeText={setPlotName}
        placeholder="Enter plot name"
        style={styles.input}
      />

      <Text>Price</Text>
      <TextInput
        value={price}
        onChangeText={(text) => {
          if (/^\d*\.?\d{0,2}$/.test(text)) {
            setPrice(text);
          }
        }}
        placeholder="Enter price"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Address</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Enter address"
        style={styles.input}
      />

      <Text>Coordinates</Text>
      <TextInput
        value={coordinates}
        onChangeText={(text) => {
          if (/^\d*\.?\d{0,2}$/.test(text)) {
            setCoordinates(text);
          }
        }}
        placeholder="Enter coordinates"
        style={styles.input}
      />

      <Text>Other Details</Text>
      <TextInput
        value={details}
        onChangeText={setDetails}
        placeholder="Enter other details"
        style={styles.input}
      />

      <Button title={plotId ? 'Update Plot' : 'Save Plot'} onPress={savePlot} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 15,
  },
});

export default AddEditPlotScreen;

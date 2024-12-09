import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddEditPlotScreen({ route, navigation }) {
  const [plotName, setPlotName] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [details, setDetails] = useState('');

  const savePlot = async () => {
    if (!plotName || !price || !address || !coordinates || !details) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // Retrieve existing plots from AsyncStorage
      const existingPlots = await AsyncStorage.getItem('plots');
      const plots = existingPlots ? JSON.parse(existingPlots) : [];
      
      // Find the highest ID and increment it
      const latestId = plots.length > 0 ? Math.max(...plots.map(plot => parseInt(plot.id, 10))) : 0;
      const newPlot = {
        id: (latestId + 1).toString(), // Incremented ID
        plotName,
        price,
        address,
        coordinates,
        details,
      };

      // Add new plot to the list
      plots.push(newPlot);

      // Save updated plots list back to AsyncStorage
      await AsyncStorage.setItem('plots', JSON.stringify(plots));

      Alert.alert('Success', 'Plot saved successfully');
      navigation.goBack(); // Go back to the previous screen
    } catch (error) {
      Alert.alert('Error', 'Failed to save plot');
      console.error(error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Add/Edit Plot</Text>
      
      <Text>Plot Name</Text>
      <TextInput
        value={plotName}
        onChangeText={setPlotName}
        placeholder="Enter plot name"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 15 }}
      />
      
      <Text>Price</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="Enter price"
        keyboardType="numeric"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 15 }}
      />
      
      <Text>Address</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Enter address"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 15 }}
      />
      
      <Text>Coordinates</Text>
      <TextInput
        value={coordinates}
        onChangeText={setCoordinates}
        placeholder="Enter coordinates"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 15 }}
      />
      
      <Text>Other Details</Text>
      <TextInput
        value={details}
        onChangeText={setDetails}
        placeholder="Enter other details"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 15 }}
      />
      
      <Button title="Save Plot" onPress={savePlot} />
    </ScrollView>
  );
}

export default AddEditPlotScreen;

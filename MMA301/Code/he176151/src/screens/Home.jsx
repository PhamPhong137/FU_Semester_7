import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

function Home() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlots, setFilteredPlots] = useState([]);
  const [plots, setPlots] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const loadPlots = async () => {
    try {
      const plotsData = await AsyncStorage.getItem('plots');
      const plotsArray = plotsData ? JSON.parse(plotsData) : [];
      setPlots(plotsArray);
      setFilteredPlots(plotsArray);
    } catch (error) {
      console.error('Failed to load plots from AsyncStorage', error);
    }
  };

  const deletePlot = async (id) => {
    try {
      const updatedPlots = plots.filter((plot) => plot.id !== id);
      setPlots(updatedPlots);
      setFilteredPlots(updatedPlots);
      await AsyncStorage.setItem('plots', JSON.stringify(updatedPlots));
      setConfirmDeleteId(null);
    } catch (error) {
      console.error('Failed to delete plot from AsyncStorage', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadPlots();
    }, [])
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = plots.filter(
        (plot) =>
          plot.plotName.toLowerCase().includes(query.toLowerCase()) ||
          plot.address.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPlots(filtered);
    } else {
      setFilteredPlots(plots);
    }
  };

  const navigateToDetail = (plot) => {
    navigation.navigate('PlotDetail', { plot });
  };

  const navigateToEdit = (plot) => {
    navigation.navigate('AddEditPlot', { plot }); // Passing plot data to edit screen
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => navigateToDetail(item)}>
        <Text style={styles.itemTitle}>PlotName: {item.plotName}</Text>
        <Text style={styles.itemAddress}>PlotAddress: {item.address}</Text>
      </TouchableOpacity>
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={() => navigateToEdit(item)} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setConfirmDeleteId(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>

      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by name or address"
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />
      <Button
        title="Add Plot"
        onPress={() => navigation.navigate('AddEditPlot')}
      />

      {filteredPlots.length > 0 ? (
        <FlatList
          data={filteredPlots}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noDataText}>No plots available</Text>
      )}

      {confirmDeleteId !== null && (
        <View style={styles.confirmModal}>
          <Text>Are you sure you want to delete this plot?</Text>
          <View style={styles.modalButtons}>
            <Button title="Cancel" onPress={() => setConfirmDeleteId(null)} />
            <Button title="Delete" onPress={() => deletePlot(confirmDeleteId)} />
          </View>
        </View>
      )}
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemTitle: {
    fontSize: 18,
  },
  itemAddress: {
    color: '#888',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  confirmModal: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    padding: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    width: '100%',
  },
});

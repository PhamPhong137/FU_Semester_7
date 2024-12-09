import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FavoriteScreen = () => {
  const [favoriteWatches, setFavoriteWatches] = useState([]);
  const navigation = useNavigation();

  const loadFavorites = async () => {
    try {
      const favoritesJSON = await AsyncStorage.getItem('favoritesList');
      const favoritesList = favoritesJSON ? JSON.parse(favoritesJSON) : [];
      setFavoriteWatches(favoritesList);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const removeFavorite = async (watchId) => {
    Alert.alert(
      "Remove Favorite",
      "Are you sure you want to remove this watch from favorites?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Remove",
          onPress: async () => {
            const updatedFavorites = favoriteWatches.filter(watch => watch.id !== watchId);
            setFavoriteWatches(updatedFavorites);
            try {
              await AsyncStorage.setItem('favoritesList', JSON.stringify(updatedFavorites));
            } catch (error) {
              console.error('Error updating favorites:', error);
            }
          }
        }
      ]
    );
  };

  const removeAllFavorites = () => {
    Alert.alert(
      "Remove All Favorites",
      "Are you sure you want to remove all favorites?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Remove All",
          onPress: async () => {
            setFavoriteWatches([]);
            try {
              await AsyncStorage.removeItem('favoritesList');
            } catch (error) {
              console.error('Error removing all favorites:', error);
            }
          }
        }
      ]
    );
  };

  const renderWatchItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('Detail', { watch: item })}>
        <Image source={{ uri: 'https://s.alicdn.com/@sc04/kf/H9c4a235cf8de42459feae94929315f95Y.png_300x300.jpg' }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.details}>
        <TouchableOpacity onPress={() => navigation.navigate('Detail', { watch: item })}>
          <Text style={styles.name}>{item.watchName}</Text>
          <Text style={styles.company}>{item.company}</Text>
        </TouchableOpacity>
        <Text style={styles.price}>Price: {item.price}</Text>
        <TouchableOpacity onPress={() => removeFavorite(item.id)} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favoriteWatches}
        keyExtractor={(item) => item.id}
        renderItem={renderWatchItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No favorite watches found.</Text>}
      />
      {favoriteWatches.length > 0 && (
        <TouchableOpacity onPress={removeAllFavorites} style={styles.clearAllButton}>
          <Text style={styles.clearAllButtonText}>Remove All Favorites</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 20
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333'
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15
  },
  details: {
    flex: 1
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4
  },
  company: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6
  },
  price: {
    fontSize: 16,
    color: '#4b6584',
    marginBottom: 10
  },
  removeButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  clearAllButton: {
    backgroundColor: '#d9534f',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  clearAllButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontSize: 16
  },
});

export default FavoriteScreen;

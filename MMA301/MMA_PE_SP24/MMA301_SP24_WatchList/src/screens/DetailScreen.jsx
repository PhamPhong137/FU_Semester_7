import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailScreen = ({ route, navigation }) => {
  const { watch } = route.params;
  const [isFavorite, setIsFavorite] = useState(watch.favorite);

  useEffect(() => {
    navigation.setOptions({ title: watch.watchName });
  }, [navigation, watch.watchName]);

  const toggleFavorite = async () => {
    const updatedFavoriteStatus = !isFavorite;
    setIsFavorite(updatedFavoriteStatus);

    try {
      const favorites = await AsyncStorage.getItem('favoritesList');
      let favoritesList = favorites ? JSON.parse(favorites) : [];

      if (updatedFavoriteStatus) {
        if (!favoritesList.some(fav => fav.id === watch.id)) {
          favoritesList.push({ ...watch, favorite: true });
        }
      } else {
        favoritesList = favoritesList.filter(fav => fav.id !== watch.id);
      }

      await AsyncStorage.setItem('favoritesList', JSON.stringify(favoritesList));
      console.log(favoritesList);
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: watch.image }} style={styles.image} />
        <Text style={styles.header}>{watch.watchName}</Text>
        <Text style={styles.brand}>Brand: {watch.company}</Text>
        <Text style={styles.price}>Price: {watch.price}</Text>

        <View style={styles.ribbonContainer}>
          <Text style={styles.ribbonText}>
            Automatic: {watch.automatic ? 'Yes' : 'No'}
          </Text>
        </View>

        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
          <Text style={styles.favoriteText}>
            {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  brand: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 22,
    color: '#ff6347',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  ribbonContainer: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  ribbonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  favoriteButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 3,
  },
  favoriteText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default DetailScreen;

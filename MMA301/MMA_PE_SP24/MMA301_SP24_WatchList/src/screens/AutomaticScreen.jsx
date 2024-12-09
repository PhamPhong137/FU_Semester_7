import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const watches = [
  { id: '1', watchName: 'Rolex Submariner', company: 'Rolex', price: '$8000', automatic: true },
  { id: '2', watchName: 'Omega Seamaster', company: 'Omega', price: '$5000', automatic: true },
  { id: '3', watchName: 'Casio F91W', company: 'Casio', price: '$20', automatic: false },
  { id: '4', watchName: 'TAG Heuer Carrera', company: 'TAG Heuer', price: '$3000', automatic: true },
  { id: '5', watchName: 'Seiko 5', company: 'Seiko', price: '$100', automatic: true },
  { id: '6', watchName: 'Timex Weekender', company: 'Timex', price: '$40', automatic: false },
  { id: '7', watchName: 'Patek Philippe Nautilus', company: 'Patek Philippe', price: '$30000', automatic: true },
  { id: '8', watchName: 'Breitling Navitimer', company: 'Breitling', price: '$6000', automatic: true },
  { id: '9', watchName: 'Audemars Piguet Royal Oak', company: 'Audemars Piguet', price: '$25000', automatic: true },
  { id: '10', watchName: 'Swatch Originals', company: 'Swatch', price: '$50', automatic: false },
].map(watch => ({ ...watch, image: 'https://s.alicdn.com/@sc04/kf/H9c4a235cf8de42459feae94929315f95Y.png_300x300.jpg' }));

const AutomaticScreen = () => {
  const navigation = useNavigation();
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoritesJSON = await AsyncStorage.getItem('favoritesList');
      const favoritesList = favoritesJSON ? JSON.parse(favoritesJSON) : [];

      const automaticWatches = watches
        .filter(watch => watch.automatic)
        .map(watch => ({
          ...watch,
          favorite: favoritesList.some(favWatch => favWatch.id === watch.id),
        }))
        .sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));

      setWatchList(automaticWatches);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const toggleFavorite = async (watch) => {
    Alert.alert(
      "Toggle Favorite",
      `Are you sure you want to ${watch.favorite ? "remove" : "add"} this watch from favorites?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK", onPress: async () => {
            const updatedWatchList = watchList.map(item =>
              item.id === watch.id ? { ...item, favorite: !item.favorite } : item
            );
            setWatchList(updatedWatchList);

            const favoritesList = updatedWatchList.filter(item => item.favorite);

            try {
              await AsyncStorage.setItem('favoritesList', JSON.stringify(favoritesList));
            } catch (error) {
              console.error('Error saving favorites:', error);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={watchList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate('Detail', { watch: item })}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.details}>
              <TouchableOpacity onPress={() => navigation.navigate('Detail', { watch: item })}>
                <Text style={styles.company}>{item.company}</Text>
                <Text style={styles.name}>{item.watchName}</Text>
              </TouchableOpacity>
              <Text style={styles.price}>Price: {item.price}</Text>
              <Text style={styles.automatic}>
                Automatic: <Text style={styles.automaticText}>{item.automatic ? 'Yes' : 'No'}</Text>
              </Text>
              <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.favoriteButton}>
                <Text style={styles.favoriteText}>{item.favorite ? '❤️ Favorite' : '🤍 Not Favorite'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#333' },
  listContent: { paddingHorizontal: 16, paddingBottom: 20 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15
  },
  details: {
    flex: 1,
  },
  company: { fontSize: 18, fontWeight: 'bold', color: '#007bff', marginBottom: 4 },
  name: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8 },
  price: { fontSize: 14, color: '#555', marginBottom: 8 },
  automatic: { fontSize: 14, color: '#333', marginBottom: 8 },
  automaticText: { fontWeight: '600', color: '#007bff' },
  favoriteButton: {
    marginTop: 5,
    padding: 6,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  favoriteText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
});

export default AutomaticScreen;

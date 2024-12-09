// screens/FavoriteScreen.js

import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlayerCard from '../components/PlayerCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

const FavoriteScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  // Hàm tải danh sách yêu thích từ AsyncStorage
  // useEffect(() => {
  //   loadFavorites();
  // }, []);
  useFocusEffect(() => {
    loadFavorites();
  });

  const loadFavorites = async () => {
    const storedFavorites = await AsyncStorage.getItem('favorites');
    setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
  };

  // Hàm xóa cầu thủ khỏi danh sách yêu thích
  const removeFromFavorites = async (player) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== player.id);
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    Alert.alert(`${player.playerName} removed from favorites`);
  };

  return (
    <SafeAreaView>
      <Text style={{ padding: 10, fontSize: 20, textAlign: 'center' }}>Favorites Screen</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlayerCard
            player={item}
            onPress={() => navigation.navigate('Detail', { player: item })}
            onFavoritePress={() => removeFromFavorites(item)} 
            isFavorite={true}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default FavoriteScreen;

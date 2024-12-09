// screens/CaptainScreen.js

import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlayerCard from '../components/PlayerCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const CaptainScreen = ({ navigation }) => {
  const [captains, setCaptains] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchCaptains();
    loadFavorites();
  }, []);

  // Hàm lấy dữ liệu đội trưởng từ API và lọc các cầu thủ là đội trưởng và trên 34 tuổi
  const fetchCaptains = async () => {
    try {
      const response = await fetch('https://66f66151436827ced976e16f.mockapi.io/players'); // Thay <mockapi-io-endpoint> bằng endpoint của bạn
      const data = await response.json();

      // Lọc các cầu thủ là đội trưởng trên 34 tuổi và sắp xếp theo minutesPlayed tăng dần
      const filteredCaptains = data
        .filter((player) => player.isCaptain && player.age > 34)
        .sort((a, b) => a.minutesPlayed - b.minutesPlayed);
      
      setCaptains(filteredCaptains);
    } catch (error) {
      console.error('Error fetching captains:', error);
    }
  };

  // Hàm tải danh sách yêu thích từ AsyncStorage
  const loadFavorites = async () => {
    const storedFavorites = await AsyncStorage.getItem('favorites');
    setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
  };

  // Hàm thêm hoặc xóa khỏi danh sách yêu thích
  const toggleFavorite = async (player) => {
    let updatedFavorites = [...favorites];
    if (favorites.some((fav) => fav.id === player.id)) {
      // Xóa cầu thủ nếu đã có trong danh sách yêu thích
      updatedFavorites = updatedFavorites.filter((fav) => fav.id !== player.id);
      Alert.alert(`${player.playerName} removed from favorites`);
    } else {
      // Thêm cầu thủ nếu chưa có trong danh sách yêu thích
      updatedFavorites.push(player);
      Alert.alert(`${player.playerName} added to favorites`);
    }
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <SafeAreaView>
      <Text style={{ padding: 10, fontSize: 20, textAlign: 'center' }}>Captains Screen</Text>
      <FlatList
        data={captains}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlayerCard
            player={item}
            onPress={() => navigation.navigate('Detail', { player: item })}
            onFavoritePress={() => toggleFavorite(item)}
            isFavorite={favorites.some((fav) => fav.id === item.id)} // Kiểm tra nếu cầu thủ nằm trong danh sách yêu thích
          />
        )}
      />
    </SafeAreaView>
  );
};

export default CaptainScreen;

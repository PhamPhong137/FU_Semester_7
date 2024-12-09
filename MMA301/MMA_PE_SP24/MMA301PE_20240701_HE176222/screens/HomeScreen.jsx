// screens/HomeScreen.js

import React, { useEffect, useState } from 'react'
import { View, FlatList, Alert, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PlayerCard from '../components/PlayerCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'

const HomeScreen = ({ navigation }) => {
  const [players, setPlayers] = useState([])
  const [favorites, setFavorites] = useState([])

  // Hàm lấy danh sách cầu thủ từ API
  useEffect(() => {
    fetch('https://66f66151436827ced976e16f.mockapi.io/players')
      .then((response) => response.json())
      .then((data) => {setPlayers(data)
    console.log(data)})
      .catch((error) => console.error('Error fetching players:', error))

    // loadFavorites();
  }, []);
  useFocusEffect(() => {
    loadFavorites()
  })

  // Hàm tải danh sách yêu thích từ AsyncStorage
  const loadFavorites = async () => {
    const storedFavorites = await AsyncStorage.getItem('favorites')
    setFavorites(storedFavorites ? JSON.parse(storedFavorites) : [])
  }

  // Hàm thêm/xóa cầu thủ khỏi danh sách yêu thích
  const toggleFavorite = async (player) => {
    let updatedFavorites = [...favorites]
    if (favorites.some((fav) => fav.id === player.id)) {
      // Nếu cầu thủ đã có trong danh sách yêu thích, xóa cầu thủ
      updatedFavorites = updatedFavorites.filter((fav) => fav.id !== player.id)
      Alert.alert(`${player.playerName} removed from favorites`)
    } else {
      // Nếu cầu thủ chưa có trong danh sách yêu thích, thêm cầu thủ
      updatedFavorites.push(player)
      Alert.alert(`${player.playerName} added to favorites`)
    }
    setFavorites(updatedFavorites)
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  return (
    <SafeAreaView>
      <Text style={{ padding: 10, fontSize: 20, textAlign: 'center' }}>Home Screen</Text>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlayerCard
            player={item}
            onPress={() => navigation.navigate('Detail', { player: item })}
            onFavoritePress={() => toggleFavorite(item)}
            isFavorite={favorites.some((fav) => fav.id === item.id)} // Truyền trạng thái yêu thích vào PlayerCard
          />
        )}
      />
    </SafeAreaView>
  )
}

export default HomeScreen

// https://66f66151436827ced976e16f.mockapi.io/players

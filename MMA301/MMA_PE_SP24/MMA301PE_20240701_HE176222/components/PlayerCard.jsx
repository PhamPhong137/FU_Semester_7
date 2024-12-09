import { Ionicons } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

const PlayerCard = ({ player, onPress, onFavoritePress, isFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite)

  // Kiểm tra xem cầu thủ đã được yêu thích khi tải component lên chưa
  useEffect(() => {
    setFavorite(isFavorite)
  }, [isFavorite])

  const handleFavoritePress = () => {
    setFavorite(!favorite) // Đổi trạng thái yêu thích
    if (onFavoritePress) {
      onFavoritePress() // Gọi hàm onFavoritePress từ props
    }
  }

  return (
    <View style={styles.container}>
      {/* Hiển thị hình ảnh của cầu thủ */}
      <Image source={{ uri: player.image }} style={styles.image} />

      {/* Thông tin chi tiết */}
      <View style={styles.info}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.name}>{player.playerName}</Text>
        </TouchableOpacity>
        <Text>Position: {player.position}</Text>
        <Text>Age: {new Date().getFullYear() - player.age}</Text>
      </View>

      {/* Nút thêm vào yêu thích */}
      <TouchableOpacity onPress={handleFavoritePress} style={styles.favoriteButton}>
        <Ionicons name="heart" size={24} color={favorite ? 'red' : 'grey'} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoriteButton: {
    padding: 5,
  },
})

export default PlayerCard

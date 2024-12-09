import React from 'react';
import { View, Text, Image } from 'react-native';

const DetailScreen = ({ route }) => {
  const { player } = route.params;

  return (
    <View style={{ padding: 10 }}>
      <Image source={{ uri: player.image }} style={{ width: 100, height: 100 }} />
      <Text>Name: {player.playerName}</Text>
      <Text>Position: {player.position}</Text>
      <Text>Age: {new Date().getFullYear() - player.age}</Text>
      <Text>Minutes Played: {player.minutesPlayed}</Text>
      <Text>Passing Accuracy: {player.passingAccuracy}%</Text>
    </View>
  );
};

export default DetailScreen;
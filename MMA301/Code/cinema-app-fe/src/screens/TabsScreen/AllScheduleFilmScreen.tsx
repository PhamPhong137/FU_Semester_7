import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";

const movies = [
  {
    id: "1",
    title: "TIẾNG GỌI CỦA OÁN HỒN-T18",
    image: "https://link-to-image.com/image1.jpg",
    times: ["12:40", "16:15", "19:50", "22:10", "23:25"],
  },
  {
    id: "2",
    title: "VÙNG ĐẤT BỊ NGUYỀN RỦA-T18",
    image: "https://link-to-image.com/image2.jpg",
    times: ["15:55", "18:00", "20:05", "23:30"],
  },
  {
    id: "3",
    title: "THẦN DƯỢC-T18",
    image: "https://link-to-image.com/image3.jpg",
    times: ["10:00", "12:30", "15:00", "17:30", "20:00", "21:05", "22:30"],
  },
  {
    id: "4",
    title: "THIÊN ĐƯỜNG QUẢ BÁO-T18",
    image: "https://link-to-image.com/image4.jpg",
    times: ["12:05", "16:15", "20:25", "22:10"],
  },
];

const MovieScheduleScreen = () => {
  const renderMovie = ({
    item,
  }: {
    item: { id: string; title: string; image: string; times: string[] };
  }) => (
    <View style={styles.movieContainer}>
      <Image source={{ uri: item.image }} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{item.title}</Text>
      <View style={styles.timeContainer}>
        {item.times.map((time, index) => (
          <TouchableOpacity key={index} style={styles.timeButton}>
            <Text style={styles.timeText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default MovieScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1b2f",
    
  },
  movieContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#2d2d44",
    borderRadius: 8,
    marginHorizontal: 12,
  },
  movieImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  movieTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeButton: {
    backgroundColor: "#444466",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 8,
  },
  timeText: {
    color: "#ffffff",
    fontSize: 14,
  },
});

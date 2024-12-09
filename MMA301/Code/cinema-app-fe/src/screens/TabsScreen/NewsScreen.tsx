import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import moment from "moment";
import newService from "../../apis/new";
import Loading from "../../components/Loading";

const NewsScreen = () => {
  interface NewsItem {
    id: number;
    image?: string;
    content: string;
    creation_time: string;
  }

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await newService.getAllNews();
        setNews(newsData);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.newsImage} />
            )}
            <View style={styles.newsTextContainer}>
              <Text style={styles.newsTitle}>{item.content}</Text>
              <Text style={styles.newsTime}>
                {moment(item.creation_time).format("HH:mm DD/MM/YYYY")}
              </Text>
            </View>
          </View>
        )}
      />
      
    </SafeAreaView>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "#192841",
  },
  newsItem: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#2C3A55",
    borderRadius: 8,
  },
  newsImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
  },
  newsTextContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  newsTime: {
    color: "gray",
    fontSize: 12,
  },
  newsTitle: {
    color: "#ffffff",
    fontSize: 20,
  },
});

import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import moment from "moment";
import Carousel from "react-native-reanimated-carousel";
import { BlurView as _BlurView } from "expo-blur";
import { parallaxLayout } from "../../constants/parallax";
import { window } from "@/constants/sizes";
import { SlideItem } from "@/components/SlideItem";
import filmService from "@/apis/film";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigator/root";
import { AppRoutes } from "src/navigator/type";
import Toast from "react-native-toast-message";
import { FlatList } from "react-native-gesture-handler";

const BlurView = Animated.createAnimatedComponent(_BlurView);

const PAGE_WIDTH = window.width / 2;

function HomeScreen() {
  interface FilmItem {
    id: number;
    title: string;
    img?: string;
    length: number;
    publish_time: string;
  }
  const [filmNowShowing, setFilmNowShowing] = useState<FilmItem[]>([]);
  const [upcomingFilm, setUpcomingFilm] = useState<FilmItem[]>([]);
  const [activeFilmTitle, setActiveFilmTitle] = useState<FilmItem | null>(null);

  const activeFilmTitleRef = useRef<FilmItem | null>(null);
  const onSnapToItem = (index: number) => {
    activeFilmTitleRef.current = filmNowShowing[index];
    setActiveFilmTitle(filmNowShowing[index]);
  };

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, AppRoutes.INFO_FILM_DETAIL>
    >();

  const handleFilmDetail = (filmId: number) => {
    navigation.navigate(AppRoutes.INFO_FILM_DETAIL, { filmId });
  };

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const [filmNowShowingData, filmUpcomingData] = await Promise.all([
          filmService.getAllFilmNowShowing(),
          filmService.getAllFilmUpComing(),
        ]);

        setFilmNowShowing(filmNowShowingData);
        if (filmNowShowingData.length > 0) {
          setActiveFilmTitle(filmNowShowingData[0]);
        }

        setUpcomingFilm(filmUpcomingData);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };

    fetchFilms();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Toast />
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={require("../../../assets/image/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Rạp chiếu phim P.P </Text>
        </View>
        <Text style={styles.sectionTitleFilmNow}>Phim đang chiếu</Text>

        <View style={styles.carouselContainer}>
          <Carousel
            loop={true}
            pagingEnabled={true}
            style={styles.carousel}
            width={PAGE_WIDTH}
            data={filmNowShowing}
            onSnapToItem={onSnapToItem}
            renderItem={({ item, index, animationValue }) => {
              return (
                <CustomItem
                  key={item.id}
                  index={index}
                  animationValue={animationValue}
                  source={item.img ?? ""}
                  filmId={item.id}
                  onPress={handleFilmDetail}
                />
              );
            }}
            customAnimation={parallaxLayout(
              {
                size: PAGE_WIDTH,
                vertical: false,
              },
              {
                parallaxScrollingScale: 0.95,
                parallaxAdjacentItemScale: 0.55,
                parallaxScrollingOffset: 35,
              }
            )}
            scrollAnimationDuration={1000}
            autoPlay={true}
            autoPlayInterval={3000}
            autoPlayReverse={false}
          />
        </View>

        <View style={styles.infoContainerWrapper}>
          <View style={styles.infoContainerLeft}>
            <Text style={styles.filmTitle}>{activeFilmTitle?.title}</Text>
            <Text style={styles.filmType}>2D</Text>
            <Text style={styles.filmInfo}>
              {activeFilmTitle?.length}p -{" "}
              {moment(activeFilmTitle?.publish_time).format("DD/MM/YYYY")}
            </Text>
          </View>
          <View style={styles.infoContainerRight}>
            <TouchableOpacity
              style={styles.bookingButton}
              onPress={() => handleFilmDetail(activeFilmTitle?.id ?? 0)}
            >
              <Text style={styles.bookingButtonText}>ĐẶT VÉ</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.line}></Text>
        <Text style={styles.sectionTitleFilmUpComing}>Phim sắp chiếu</Text>
        <FlatList
          data={upcomingFilm}
          renderItem={({ item }) => (
            <FilmListItem
              filmId={item.id}
              title={item.title}
              img={item.img}
              length={item.length}
              publish_time={item.publish_time}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.upcomingFilmList}
        />

       
      </ScrollView>
    </SafeAreaView>
  );
}

interface ItemProps {
  index: number;
  animationValue: Animated.SharedValue<number>;
  source: string;
  filmId: number;
  onPress: (filmId: number) => void;
}

const CustomItem: React.FC<ItemProps> = ({
  index,
  animationValue,
  source,
  filmId,
  onPress,
}) => {
  const maskStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animationValue.value, [-1, 0, 1], [1, 0, 1]);

    return {
      opacity,
    };
  }, [animationValue]);

  return (
    <TouchableOpacity
      style={styles.carouselItemContainer}
      onPress={() => onPress(filmId)}
    >
      <View style={{ flex: 1, width: "100%" }}>
        <SlideItem index={filmId} source={{ uri: source }} rounded />
      </View>
      <BlurView
        intensity={5}
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, maskStyle]}
      />
    </TouchableOpacity>
  );
};

interface FilmListItemProps {
  filmId: number;
  title: string;
  img?: string;
  length: number;
  publish_time: string;
}

const FilmListItem: React.FC<FilmListItemProps> = ({
  filmId,
  title,
  img,
  length,
  publish_time,
}) => {
  return (
    <View style={styles.filmListItem}>
      <Image source={{ uri: img }} style={styles.filmListItemImage} />
      <Text style={styles.filmListItemTitle}>{title}</Text>
      <Text style={styles.filmListItemInfo}>
        {length}p - {moment(publish_time).format("DD/MM/YYYY")}
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "#192841",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 10,
    marginTop: 20,
  },
  logo: {
    resizeMode: "contain",
    height: 100,
    width: "30%",
    marginRight: 70,
  },
  title: {
    fontSize: 25,
    flex: 1,
    fontWeight: "bold",
    color: "#ffffff",
    width: "50%",
    textAlign: "center",
    marginRight: 10,
  },
  sectionTitleFilmNow: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
    paddingLeft: 10,
  },
  sectionTitleFilmUpComing: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
    marginTop: 50,
    paddingLeft: 10,
  },
  carouselContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  carousel: {
    width: window.width,
    height: 450,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselItemContainer: {
    flex: 1,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#2a2a4f",
  },
  infoContainerWrapper: {
    flexDirection: "row",
    padding: 10,
  },
  infoContainerLeft: {
    flex: 0.7,
    paddingRight: 10,
  },
  infoContainerRight: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
  filmTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  filmInfo: {
    fontSize: 18,
    color: "#d3d3d3",
    marginBottom: 10,
  },
  filmType: {
    fontSize: 18,
    color: "red",
    marginBottom: 10,
    borderColor: "red",
    borderWidth: 1,
    padding: 2,
    width: 30,
    borderRadius: 5,
  },
  bookingButton: {
    backgroundColor: "#00aaff",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 10,
  },
  bookingButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  line: {
    width: "50%",
    height: 1,
    backgroundColor: "#d3d3d3",
    alignSelf: "center",
  },
  filmListItem: {
    marginBottom: 20,
    marginRight: 20,
  },
  filmListItemImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  filmListItemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
  },
  filmListItemInfo: {
    fontSize: 16,
    color: "#d3d3d3",
  },
  upcomingFilmList:{
    marginBottom: 20,
    paddingHorizontal: 10,
  }
});

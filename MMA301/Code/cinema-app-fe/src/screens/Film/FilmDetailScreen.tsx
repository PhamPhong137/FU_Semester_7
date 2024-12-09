import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { AppRoutes } from "@/navigator/type";
import filmService from "@/apis/film";
import { AGE_LIMIT } from "@/constants/type";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigator/root";
import moment from "moment";
import { checkAuthAndProceed } from "@/hoc/CheckAuthAndProceed";

type FilmDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  AppRoutes.INFO_FILM_DETAIL
>;

type FilmDetailScreenProps = {
  route: FilmDetailScreenRouteProp;
};

type FilmDetail = {
  id: number;
  title: string;
  img_background: string;
  description: string;
  publish_time: string;
  age_limit: number;
  category: string;
  director: string;
  actors: string;
  length: number;
  origin: string;
};

const FilmDetailScreen: React.FC<FilmDetailScreenProps> = ({ route }) => {
  const { filmId } = route.params;
  const [filmDetail, setFilmDetail] = useState<FilmDetail | null>(null);

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, AppRoutes.INFO_FILM_DETAIL>
    >();

  const handleScheduleFilm = async (filmId: number) => {
    try {
      await checkAuthAndProceed(navigation, () => {
        navigation.navigate(AppRoutes.SCHEDULE_FILM_DETAIL, { filmId });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchFilmById = async () => {
      try {
        const filmDetail = await filmService.getFilmById(filmId);
        setFilmDetail(filmDetail);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFilmById();
  }, [filmId]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông tin phim</Text>
      </View>

      <Image
        source={{ uri: filmDetail?.img_background }}
        style={styles.filmImage}
      />

      <View style={styles.infoContainer}>
        <View style={styles.infoContainerWrapper}>
          <View style={styles.infoContainerLeft}>
            <Text style={styles.filmTitle}>{filmDetail?.title}</Text>
            <Text style={styles.filmType}>2D</Text>
          </View>
          <View style={styles.infoContainerRight}>
            <TouchableOpacity
              style={styles.bookingButton}
              onPress={() =>
                filmDetail?.id && handleScheduleFilm(filmDetail.id)
              }
            >
              <Text style={styles.bookingButtonText}>ĐẶT VÉ</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.line}></Text>
        <ScrollView>
          <Text style={styles.description}>
            Mô tả phim: {filmDetail?.description}
          </Text>

          <Text style={styles.line}></Text>
          <Text style={styles.infoText}>
            Khởi chiếu: {moment(filmDetail?.publish_time).format("DD/MM/YYYY")}
          </Text>

          <Text style={styles.infoText}>
            Kiểm duyệt:{" "}
            {AGE_LIMIT[`T${filmDetail?.age_limit}` as keyof typeof AGE_LIMIT] ||
              "Không có thông tin"}
          </Text>

          <Text style={styles.infoText}>Thể loại: {filmDetail?.category}</Text>
          <Text style={styles.infoText}>Nguồn gốc: {filmDetail?.origin}</Text>
          <Text style={styles.infoText}>Đạo diễn: {filmDetail?.director}</Text>
          <Text style={styles.infoText}>Diễn viên: {filmDetail?.actors}</Text>
          <Text style={styles.infoText}>
            Thời lượng: {filmDetail?.length} phút
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F39",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 16,
    zIndex: 2,
  },
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  filmImage: {
    width: "100%",
    height: 300,
  },
  infoContainer: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    flex: 1,
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
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  filmType: {
    fontSize: 20,
    color: "white",
    padding: 5,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
    width: 40,
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
  button: {
    backgroundColor: "#4D78FF",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "white",
    marginVertical: 20,
    textAlign: "justify",
    lineHeight: 25,
  },
  infoText: {
    color: "white",
    marginVertical: 10,
    fontSize: 16,
    lineHeight: 25,
    textAlign: "justify",
  },
  line: {
    width: "50%",
    height: 1,
    backgroundColor: "#d3d3d3",
    alignSelf: "center",
    marginTop: 10,
    opacity: 0.6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default FilmDetailScreen;

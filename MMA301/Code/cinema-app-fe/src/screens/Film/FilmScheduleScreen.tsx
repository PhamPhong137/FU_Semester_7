import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/navigator/root";
import { AppRoutes } from "@/navigator/type";
import filmService from "@/apis/film";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const formatDate = (dateString: string) =>
  moment(dateString).format("YYYY-MM-DD");
const formatDisplayDate = (dateString: string) =>
  moment(dateString).format("DD/MM/YYYY");

type FilmScheduleScreenRouteProp = RouteProp<
  RootStackParamList,
  AppRoutes.SCHEDULE_FILM_DETAIL
>;

type FilmScheduleScreenProps = {
  route: FilmScheduleScreenRouteProp;
};

type FilmSchedule = {
  date: string;
};

type Showtime = {
  start_hour: string;
  film_schedule_id: number;
};

const FilmScheduleScreen: React.FC<FilmScheduleScreenProps> = ({ route }) => {
  const { filmId } = route.params;
  const [filmSchedule, setFilmSchedule] = useState<FilmSchedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, AppRoutes.ROOM_FILM>
    >();

  useEffect(() => {
    const fetchFilmSchedule = async () => {
      try {
        const schedule = await filmService.getFilmScheduleByFilmId(filmId);
        setFilmSchedule(schedule);
        if (schedule.length > 0) {
          const firstDate = formatDate(schedule[0].date);
          setSelectedDate(firstDate);
          fetchShowtimes(firstDate);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFilmSchedule();
  }, [filmId]);

  const fetchShowtimes = async (date: string) => {
    try {
      const time = await filmService.getTimeScheduleByFilmId(filmId, date);
      setShowtimes(time);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDatePress = (date: string) => {
    setSelectedDate(date);
    fetchShowtimes(date);
  };

  const handleShowTimePress = (showtime: any) => {
    navigation.navigate(AppRoutes.ROOM_FILM, {
      film_schedule_id: showtime.film_schedule_id,
      room_id: showtime.room_id,
      film_id: filmId,
      start_time: showtime.start_hour,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.headerText}>Chọn xuất chiếu</Text>
      </View>

      <View style={styles.dateContainer}>
        {filmSchedule.map((schedule) => (
          <TouchableOpacity
            key={schedule.date}
            style={[
              styles.dateButton,
              selectedDate === formatDate(schedule.date) &&
                styles.selectedDateButton,
            ]}
            onPress={() => handleDatePress(formatDate(schedule.date))}
          >
            <Text style={styles.dateText}>
              {formatDisplayDate(schedule.date)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.line}></Text>
      {/* Showtimes */}
      <View style={styles.timeContainer}>
        {showtimes.map((showtime) => (
          <TouchableOpacity
            key={showtime.start_hour}
            style={styles.timeButton}
            onPress={() => handleShowTimePress(showtime)}
          >
            <Text style={styles.timeButtonText}>{showtime.start_hour}</Text>
          </TouchableOpacity>
        ))}
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
  dateContainer: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  dateButton: {
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  selectedDateButton: {
    backgroundColor: "#ff4757",
  },
  dateText: {
    color: "white",
    fontWeight: "bold",
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  timeButton: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  timeButtonText: {
    color: "black",
    fontWeight: "bold",
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

export default FilmScheduleScreen;

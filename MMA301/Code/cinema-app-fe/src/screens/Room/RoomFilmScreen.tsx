import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";
import seatService from "@/apis/seat";
import filmService from "@/apis/film";
import { SEAT_TYPE } from "@/constants/type";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigator/root";
import { AppRoutes } from "@/navigator/type";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

type Seat = {
  seat_id: number;
  seat_name: string;
  seat_type_id: number;
  price: number;
  status: string;
};

type RoomFilmScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppRoutes.ROOM_FILM
>;

type RouteParams = {
  film_schedule_id: number;
  room_id: number;
  film_id: number;
  start_time: string;
};

const RoomFilmScreen: React.FC<RoomFilmScreenProps> = ({ route }) => {
  const { film_schedule_id, room_id, film_id, start_time } =
    route.params as RouteParams;
  const [seats, setSeats] = useState<Seat[]>([]);
  const [filmName, setFilmName] = useState<string>("");
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleBookingPress = () => {
    if (selectedSeats.length === 0) {
      Alert.alert("Bạn chưa chọn ghế nào", "Vui lòng chọn ghế để tiếp tục.");
      return;
    }
    navigation.navigate(AppRoutes.PAYMENT, {
      selectedSeats: selectedSeats,
      totalPrice: totalPrice,
      filmName: filmName,
      room_id: room_id,
      start_time: start_time,
      film_schedule_id: film_schedule_id,
    });
  };

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, AppRoutes.ROOM_FILM>
    >();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedSeats, filmDetail] = await Promise.all([
          seatService.getSeatsByRoomAndSchedule(film_schedule_id),
          filmService.getFilmById(film_id),
        ]);
        setSeats(fetchedSeats);
        setFilmName(filmDetail?.title);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [film_schedule_id, film_id]);

  const handleSeatPress = (seat: Seat) => {
    setSelectedSeats((prevSelectedSeats: any) => {
      const seatExists = prevSelectedSeats.find(
        (s: any) => s.seat_name === seat.seat_name
      );

      if (seatExists) {
        return prevSelectedSeats.filter(
          (s: any) => s.seat_name !== seat.seat_name
        );
      } else {
        return [
          ...prevSelectedSeats,
          {
            seat_id: seat.seat_id,
            seat_name: seat.seat_name,
            price: Number(seat.price),
          },
        ];
      }
    });

    setTotalPrice((prevTotalPrice) => {
      // Update total price based on the seat selection/deselection
      const seatExists = selectedSeats.find(
        (s: any) => s.seat_name === seat.seat_name
      );

      if (seatExists) {
        // If the seat was already selected, subtract its price from the total
        return prevTotalPrice - Number(seat.price);
      } else {
        // If the seat was not selected, add its price to the total
        return prevTotalPrice + Number(seat.price);
      }
    });
  };

  const renderRow = (rowLabel: string, seatsInRow: Seat[]) => (
    <View style={styles.rowContainer}>
      <View style={styles.rowLabelContainer}>
        <Text style={styles.rowLabelText}>{rowLabel}</Text>
      </View>
      {seatsInRow.map((seat) => (
        <TouchableOpacity
          key={seat.seat_name}
          style={[
            styles.seat,
            seat.status === "Booked" && styles.bookedSeat,
            seat.seat_type_id === SEAT_TYPE.VIP &&
              (seat.status === "Booked" ? styles.graySeat : styles.vipSeat),
            seat.seat_type_id === SEAT_TYPE.SWEETBOX &&
              (seat.status === "Booked"
                ? styles.graySeatVip
                : styles.coupleSeat),
            !!selectedSeats.find((s) => s.seat_name === seat.seat_name) &&
              styles.selectedSeat,
          ]}
          onPress={() => handleSeatPress(seat)}
          disabled={seat.status === "Booked"}
        ></TouchableOpacity>
      ))}
    </View>
  );

  const groupedSeats: Record<string, Seat[]> = seats.reduce((acc, seat) => {
    const match = seat.seat_name.match(/[A-Z]+/);
    const row = match ? match[0] : "";
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>Chọn ghế </Text>
      <FlatList
        data={Object.keys(groupedSeats)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => renderRow(item, groupedSeats[item])}
        contentContainerStyle={styles.seatMap}
      />
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.bookedSeat]} />
          <Text style={styles.legendText}>Đã đặt</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.selectedSeat]} />
          <Text style={styles.legendText}>Đang chọn</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.normalSeat]} />
          <Text style={styles.legendText}>Ghế thường</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.vipSeat]} />
          <Text style={styles.legendText}>Ghế Vip</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.coupleSeat]} />
          <Text style={styles.legendText}>Ghế Đôi</Text>
        </View>
      </View>
      <Text style={{ height: 120 }}></Text>

      <Text style={styles.titleFilm}> {filmName}</Text>
      <Text style={styles.selectedText}>
        {selectedSeats.length > 0
          ? "Ghế đang chọn: " +
            selectedSeats.map((s: any) => s.seat_name).join(", ")
          : ""}
      </Text>
      <Text style={styles.selectedText}>
        {selectedSeats.length > 0
          ? `${selectedSeats.length} ghế - ${totalPrice.toLocaleString()} VND`
          : "0 ghế - 0 VND"}
      </Text>
      <TouchableOpacity
        style={styles.bookingButton}
        onPress={handleBookingPress}
      >
        <Text style={styles.bookingButtonText}>Đặt vé</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#001A3B",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 16,
    zIndex: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 40,
    marginTop: 10,
  },
  seatMap: {
    alignItems: "center",
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  rowLabelContainer: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  rowLabelText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  seat: {
    width: 25,
    height: 25,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 5,
  },
  selectedSeat: {
    backgroundColor: "#rgb(59 130 246)",
  },
  bookedSeat: {
    backgroundColor: "#A9A9A9",
  },
  vipSeat: {
    backgroundColor: "#rgb(255 132 19)",
  },
  coupleSeat: {
    backgroundColor: "#FF69B4",
    width: 55,
  },
  selectedText: {
    fontSize: 20,
    color: "#FFF",
    marginTop: 10,
    marginLeft: 20,
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "30%",
    marginBottom: 20,
  },
  legendBox: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 5,
  },
  legendText: {
    color: "#FFF",
    fontSize: 14,
  },
  normalSeat: {
    backgroundColor: "#fff",
  },
  titleFilm: {
    color: "#FFF",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
    marginLeft: 10,
  },
  bookingButton: {
    backgroundColor: "#rgb(59 130 246)",
    paddingVertical: 15,
    marginHorizontal: 20,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  bookingButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  graySeat: {
    backgroundColor: "#A9A9A9",
  },
  graySeatVip: {
    backgroundColor: "#A9A9A9",
    width: 55,
  },
});

export default RoomFilmScreen;

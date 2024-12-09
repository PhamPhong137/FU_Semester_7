import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/navigator/root";
import CustomRadioButton from "@/components/CustomRadioButton";
import ticketService from "@/apis/ticket";
import { AppRoutes } from "@/navigator/type";
import Toast from "react-native-toast-message";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RouteParams = {
  selectedSeats: any;
  totalPrice: number;
  filmName: string;
  room_id: number;
  start_time: string;
  film_schedule_id: number;
};

type PaymentScreenProps = {
  route: RouteProp<RootStackParamList, AppRoutes.PAYMENT>;
};

const PaymentScreen: React.FC<PaymentScreenProps> = ({ route }) => {
  const {
    selectedSeats,
    totalPrice,
    filmName,
    room_id,
    start_time,
    film_schedule_id,
  } = route.params as RouteParams;
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handlePayment = async () => {
    if (!selectedValue) {
      Alert.alert("Thông báo", "Vui lòng chọn hình thức thanh toán.");
      return;
    }

    Alert.alert("Xác nhận thanh toán", "Bạn có chắc chắn muốn mua vé không?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Xác nhận",
        onPress: async () => {
          const token = await AsyncStorage.getItem("userToken");
          setIsLoading(true);

          await new Promise((resolve) => setTimeout(resolve, 2000));

          const ticketData = {
            selectedSeats,
            totalPrice,
            filmName,
            room_id,
            start_time,
            film_schedule_id,
            // paymentMethod: selectedValue,
          };
          try {
            const response = await ticketService.createTicket(
              ticketData,
              token as string
            );

            navigation.navigate(AppRoutes.TABS as never);

            Toast.show({
              type: "success",
              text1: "Thanh toán thành công!",
              position: "top",
            });

          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Có lỗi xảy ra. Vui lòng thử lại!",
              position: "top",
            });
          } finally {
            setIsLoading(false); // Hide loading spinner
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {isLoading ? (
        <>
          <ActivityIndicator
            style={styles.spinner}
            size="large"
            color="#ffffff"
          />
          <Text style={styles.text}>Đang tiến hành thanh toán...</Text>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Thanh Toán</Text>
            </View>

            <View style={styles.movieInfo}>
              <Image
                source={{ uri: "https://example.com/movie-poster.jpg" }}
                style={styles.poster}
              />
              <View style={styles.details}>
                <Text style={styles.movieTitle}>{filmName}</Text>
                <View style={styles.tagContainer}>
                  <Text style={styles.tag}>2D</Text>
                  <Text style={styles.tag}>PDV</Text>
                </View>
                <Text style={styles.infoText}>
                  {start_time} - {moment(Date.now()).format("DD/MM/YYYY")}
                </Text>
                <Text style={styles.infoText}>Phòng chiếu số {room_id}</Text>
                <Text style={styles.infoText}>
                  Ghế:{" "}
                  {selectedSeats.map((seat: any) => seat.seat_name).join(", ")}
                </Text>
                <Text style={styles.infoText}>Tổng cộng: {totalPrice} đ</Text>
              </View>
            </View>

            <Text style={styles.paymentTitle}>Hình thức thanh toán</Text>

            <View style={styles.paymentOptions}>
              <CustomRadioButton
                img={require("../../../assets/image/ZaloPay_Logo.png")}
                label="ZaloPay"
                selected={selectedValue === "option1"}
                onSelect={() => setSelectedValue("option1")}
              />
              <CustomRadioButton
                img={require("../../../assets/image/Logo-VNPAY-QR.webp")}
                label="VNPay"
                selected={selectedValue === "option2"}
                onSelect={() => setSelectedValue("option2")}
              />
              <CustomRadioButton
                img={require("../../../assets/image/logo-viettel-money.png")}
                label="Viettel Money"
                selected={selectedValue === "option3"}
                onSelect={() => setSelectedValue("option3")}
              />
            </View>

            <View style={styles.agreement}>
              <Text style={styles.agreementText}>
                Tôi đồng ý với{" "}
                <Text style={styles.linkText}>điều khoản sử dụng</Text> và đang
                mua vé cho người có độ tuổi phù hợp
              </Text>
            </View>

            <TouchableOpacity
              style={styles.payButton}
              onPress={handlePayment}
              disabled={isLoading}
            >
              <Text style={styles.payButtonText}>TIẾN HÀNH THANH TOÁN</Text>
            </TouchableOpacity>

            <Text style={styles.notice}>
              Lưu ý trước khi thanh toán:
              {"\n"}- Khách thanh toán xong quay lại app để đợi nhận vé
              {"\n"}- Nếu không nhận được vé khách hàng liên hệ số 024 35141791
              để được hỗ trợ
            </Text>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#1a1b41",
  },
  text: {
    marginTop: 16,
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 16,
    zIndex: 2,
  },
  title: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  movieInfo: {
    flexDirection: "row",
    backgroundColor: "#292a52",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  poster: {
    width: 100,
    height: 140,
    borderRadius: 8,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 19,
    color: "#ffffff",
    fontWeight: "bold",
  },
  tagContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },
  tag: {
    backgroundColor: "#8b4974",
    color: "#ffffff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  infoText: {
    color: "#ffffff",
    marginBottom: 4,
    fontSize: 16,
  },
  paymentTitle: {
    fontSize: 22,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 8,
  },
  paymentOptions: {
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#393a70",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  paymentOptionSelected: {
    backgroundColor: "#8b4974",
  },
  icon: {
    height: 30,
    width: "35%",
    marginRight: 12,
  },
  paymentText: {
    color: "#ffffff",
    fontSize: 18,
  },
  agreement: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  agreementText: {
    color: "#ffffff",
    flex: 1,
    fontSize: 17,
  },
  linkText: {
    color: "#8b4974",
    textDecorationLine: "underline",
  },
  payButton: {
    backgroundColor: "#4a91f2",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  payButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  notice: {
    color: "#ffffff",
    fontSize: 16,
    lineHeight: 25,
  },
  spinner: {
    marginTop: 300,
  },
});

export default PaymentScreen;

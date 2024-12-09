import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ticketService from "@/apis/ticket";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TicketItemProps {
  title: string;
  showTime: string;
  purchaseTime: string;
  seats: string;
  price: string;
}

const TicketItem: React.FC<TicketItemProps> = ({
  title,
  showTime,
  purchaseTime,
  seats,
  price,
}) => (
  <View style={styles.ticketContainer}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.text}>Giờ chiếu: {showTime}</Text>
    <Text style={styles.text}>Giờ mua: {purchaseTime}</Text>
    <Text style={styles.text}>Ghế: {seats}</Text>
    <Text style={styles.price}>{price}</Text>
  </View>
);

const HistoryTicketScreen = () => {
  const [tickets, setTickets] = useState<TicketItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await ticketService.getHistoryTickets(token as string);
        const formattedTickets = response.map((ticket:any) => ({
          title: ticket.title,
          showTime: ticket.showtime,
          purchaseTime: ticket.time_booked,
          seats: ticket.seats,
          price: ticket.price,
        }));
        setTickets(formattedTickets);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.header}>Vé đã mua</Text>
      <FlatList
        data={tickets}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TicketItem
            title={item.title}
            showTime={item.showTime}
            purchaseTime={item.purchaseTime}
            seats={item.seats}
            price={item.price}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C3052",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 16,
    zIndex: 2,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 20,
  },
  ticketContainer: {
    backgroundColor: "#2C3052",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingVertical: 15,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    color: "#AAAAAA",
    fontSize: 14,
    marginBottom: 5,
  },
  price: {
    color: "#FFA500",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default HistoryTicketScreen;

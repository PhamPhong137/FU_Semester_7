import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import React from 'react'

const ticketPrices = [
  {
    id: '1',
    timeSlot: 'Trước 12h',
    prices: {
      weekday: { standard: '50,000 VND', vip: '80,000 VND', couple: '120,000 VND' },
      weekend: { standard: '70,000 VND', vip: '100,000 VND', couple: '140,000 VND' },
    },
  },
  {
    id: '2',
    timeSlot: 'Từ 12h đến 20h',
    prices: {
      weekday: { standard: '70,000 VND', vip: '100,000 VND', couple: '150,000 VND' },
      weekend: { standard: '90,000 VND', vip: '120,000 VND', couple: '180,000 VND' },
    },
  },
  {
    id: '3',
    timeSlot: 'Sau 20h',
    prices: {
      weekday: { standard: '60,000 VND', vip: '90,000 VND', couple: '130,000 VND' },
      weekend: { standard: '80,000 VND', vip: '110,000 VND', couple: '160,000 VND' },
    },
  },
];

const PriceScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Giá Vé</Text>
      <FlatList
        data={ticketPrices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.priceItem}>
            <Text style={styles.timeSlot}>{item.timeSlot}</Text>
            <View style={styles.priceDetails}>
              <Text style={styles.priceHeader}>Ngày thường:</Text>
              <Text style={styles.priceType}>Ghế thường: {item.prices.weekday.standard}</Text>
              <Text style={styles.priceType}>Ghế VIP: {item.prices.weekday.vip}</Text>
              <Text style={styles.priceType}>Ghế đôi: {item.prices.weekday.couple}</Text>
              <Text style={styles.priceHeader}>Cuối tuần:</Text>
              <Text style={styles.priceType}>Ghế thường: {item.prices.weekend.standard}</Text>
              <Text style={styles.priceType}>Ghế VIP: {item.prices.weekend.vip}</Text>
              <Text style={styles.priceType}>Ghế đôi: {item.prices.weekend.couple}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default PriceScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: "#1E1F3B",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#00ADEF',
    textAlign: 'center',
  },
  priceItem: {
    backgroundColor: '#2E2F4F',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#41436A',
  },
  timeSlot: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5F5F5',
    marginBottom: 8,
    textAlign: 'center',
  },
  priceDetails: {
    marginTop: 8,
    backgroundColor: '#383A5C',
    borderRadius: 8,
    padding: 10,
  },
  priceHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00ADEF',
    marginTop: 8,
  },
  priceType: {
    fontSize: 15,
    color: '#D1D1E9',
    marginLeft: 8,
    marginTop: 2,
  },
});


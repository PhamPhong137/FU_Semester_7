import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert } from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppRoutes } from "src/navigator/type";
import Toast from 'react-native-toast-message';

const AccountScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const handleLogout = async () => {
    try {
      // Clear any stored user data
      await AsyncStorage.removeItem('userToken');
      
      // Navigate to the login screen
      navigation.navigate(AppRoutes.LOGIN);   
      // Show a success message
      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Đăng xuất thành công',
      });
    } catch (error) {
      console.error('Error during logout:', error);
      // Show an error message
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Đã có lỗi xảy ra',
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Ticket Section */}
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('HISTORY_TICKET')}>
        <Text style={styles.optionText}>💳  Vé đã mua</Text>
      </TouchableOpacity>

      {/* Account Section */}
      <View style={styles.sectionHeader}><Text style={styles.sectionText}>Tài Khoản</Text></View>
      <TouchableOpacity style={styles.optionButton}>
        <Text style={styles.optionText}>👤  Thông tin tài khoản</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('RESET_PASSWORD')}>
        <Text style={styles.optionText}>🔒  Đổi mật khẩu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton}>
        <Text style={styles.optionText}>🚫  Xóa tài khoản</Text>
      </TouchableOpacity>

      {/* Support Section */}
      <View style={styles.sectionHeader}><Text style={styles.sectionText}>Hỗ Trợ</Text></View>
      <TouchableOpacity style={styles.optionButton} onPress={() => Linking.openURL('tel:02435141791')}>
        <Text style={styles.optionText}>📞 Hotline: 0987563385</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={() => Linking.openURL('https://zalo.me/ttcpqg')}>
        <Text style={styles.optionText}>💬  Zalo: https://zalo.me/fpt.cinema</Text>
      </TouchableOpacity>

      {/* Settings Section */}
      <View style={styles.sectionHeader}><Text style={styles.sectionText}>Cài Đặt</Text></View>
      <TouchableOpacity style={styles.optionButton}>
        <Text style={styles.optionText}>🔨  Điều khoản sử dụng</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton}>
        <Text style={styles.optionText}>🔒  Chính sách bảo mật</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
        <Text style={styles.optionText}>↩️ Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F3251',
    padding: 20,
    paddingTop: 70,

  },
  sectionHeader: {
    marginTop: 20,
  },
  sectionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
});

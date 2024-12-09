import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const UserInformation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>Thông tin cá nhân</Text>
      
      <View style={styles.rowContainer}>
        <View style={styles.inputContainerHalf}>
          <Text style={styles.label}>Họ</Text>
          <TextInput style={styles.input} placeholder="Họ" defaultValue="Phong" />
        </View>
        <View style={styles.inputContainerHalf}>
          <Text style={styles.label}>Tên</Text>
          <TextInput style={styles.input} placeholder="Tên" defaultValue="Phạm" />
        </View>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput style={styles.input} placeholder="Số điện thoại" defaultValue="0987563385" keyboardType="phone-pad" />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput style={styles.input} placeholder="Địa chỉ" />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tên đăng nhập</Text>
        <TextInput style={styles.input} placeholder="Tên đăng nhập" defaultValue="Phamhong123" editable={false} />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="Email" defaultValue="pp072003@gmail.com" editable={false} />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#2F3251',
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#FFFFFF',
    paddingBottom: 10,
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputContainerHalf: {
    flex: 1,
    marginBottom: 16,
    marginRight: 8,
  },
  label: {
    color: '#FFFFFF',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import authService from "@/apis/authentication";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigator/root";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { AppRoutes } from "@/navigator/type";
import { ScrollView } from "react-native-gesture-handler";

const RegisterScreen: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleRegister = async () => {
    if (!firstName || !lastName || !phone || !gmail || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Validate email format
    if (!emailRegex.test(gmail)) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Invalid email format",  
      });
      return;
    }

    const userData = {
      firstName,
      lastName,
      phone_number: phone,
      gmail,
      password,
    };

    try {
      const response = await authService.register(userData);
      console.log("Register response:", response);
      if (response) {
        navigation.navigate(AppRoutes.LOGIN as never);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Login successful",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "An error occurred during registration",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Error", "An error occurred during registration.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.name}>P.P Cinema</Text>
        <View style={styles.formContainer}>
          <Text style={styles.header}>Đăng ký</Text>
          <View style={styles.inputRowContainer}>
            <TextInput
              placeholder="Họ"
              style={styles.inputHalf}
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              placeholder="Tên"
              style={styles.inputHalf}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <TextInput
            placeholder="Gmail"
            style={styles.input}
            keyboardType="email-address"
            value={gmail}
            onChangeText={setGmail}
          />
          <TextInput
            placeholder="Số điện thoại"
            style={styles.input}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Mật khẩu"
              secureTextEntry={!passwordVisible}
              style={[styles.input, { flex: 1 }]}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIconContainer}
            >
              <Text style={styles.eyeIcon}>
                {passwordVisible ? "👁️" : "👁️‍🗨️"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Đăng Ký</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2F64",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 100,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    width: "100%",
  },
  header: {
    color: "#2D2F64",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  inputRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputHalf: {
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    width: "48%",
  },
  input: {
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    width: "100%",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    marginBottom: 20,
  },
  eyeIconContainer: {
    padding: 10,
  },
  eyeIcon: {
    fontSize: 20,
    color: "#2D2F64",
  },
  registerButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

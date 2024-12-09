import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
} from "react-native";
import authService from "@/apis/authentication";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigator/root";
import { useNavigation } from "@react-navigation/native";
import { AppRoutes } from "@/navigator/type";

const LoginScreen = () => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [gmailError, setGmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleLogin = async () => {
    let valid = true;
    if (!gmail) {
      setGmailError("Trường này không được để trống");
      valid = false;
    } else {
      setGmailError("");
    }

    if (!password) {
      setPasswordError("Chưa nhập mật khẩu");
      valid = false;
    } else {
      setPasswordError("");
    }

    try {
      const response = await authService.login({
        gmail: gmail,
        password: password,
      });

      if (response.token) {
        await AsyncStorage.setItem("userToken", response.token);

        navigation.navigate(AppRoutes.TABS as never);
        
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Login successful",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Gmail or password is incorrect",
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "An error occurred during login.",
      });
      console.log("Login Error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Toast />
      <View style={styles.header}>
        <Image
          source={require("../../../assets/image/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Trung tâm rạp chiếu phim P.P </Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.logintext}>Đăng nhập</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Gmail hoặc tên đăng nhập"
            style={[styles.input, gmailError ? styles.inputError : null]}
            value={gmail}
            onChangeText={(text) => {
              setGmail(text);
              if (text) {
                setGmailError("");
              }
            }}
            autoCapitalize="none"
          />
          {gmailError ? (
            <Text style={styles.errorText}>{gmailError}</Text>
          ) : null}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Mật khẩu"
              secureTextEntry={!passwordVisible}
              style={[styles.input, passwordError ? styles.inputError : null]}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (text) {
                  setPasswordError("");
                }
              }}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Text style={styles.eyeIcon}>
                {passwordVisible ? "👁️" : "👁️‍🗨️"}
              </Text>
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonLoginText}>Đăng Nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate(AppRoutes.REGISTER) }>
          <Text style={styles.buttonRegisterText}>Đăng Ký</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2F64",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    marginBottom: 120,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logintext: {
    color: "#2D2F64",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 20,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 40,
    marginTop: 20,
  },
  logo: {
    resizeMode: "contain",
    height: 100,
    width: "30%",
    marginRight: 0,
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
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "column",
  },
  input: {
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    width: "100%",
    position: "relative",
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 10,
  },
  eyeIcon: {
    fontSize: 15,
    color: "#2D2F64",
    position: "absolute",
    right: 10,
    top: -15,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: "#D4F4DB",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonLoginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonRegisterText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;

import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppRoutes } from "@/navigator/type";

const checkAuth = (WrappedComponent: React.ComponentType) => {
  return function AuthComponent(props: any) {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigation = props.navigation;

    useEffect(() => {
      const checkToken = async () => {
        try {
          const token = await AsyncStorage.getItem("userToken");
          if (token) {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Failed to fetch the token.", error);
        } finally {
          setLoading(false);
        }
      };

      checkToken();
    }, []);

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    if (!isAuthenticated) {
        Alert.alert(
            "Thông báo",
            "Bạn phải đăng nhập để sủ dụng tính năng này.",
            [
              {
                text: "Đăng nhập",
                onPress: () => navigation.navigate(AppRoutes.LOGIN),
              },
              {
                text: "Hủy",
                style: "cancel",
              },
            ],
            { cancelable: true }
          );
    }

    return <WrappedComponent {...props} />;
  };
};

export default checkAuth;
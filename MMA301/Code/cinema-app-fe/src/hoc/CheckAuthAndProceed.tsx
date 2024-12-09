import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { AppRoutes } from "@/navigator/type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigator/root";




export const checkAuthAndProceed = async (
  navigation: NativeStackNavigationProp<RootStackParamList>,
  proceedCallback: () => void
) => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      // If there is no token, show an alert and navigate to the login screen
      Alert.alert(
        "Thông báo",
        "Bạn cần phải đăng nhập để sử dụng tính năng này.",
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
    } else {
        // If there is a token, proceed to the next step
      proceedCallback();
    }
  } catch (error) {
    console.error("Lỗi kiểm tra token:", error);
  }
};

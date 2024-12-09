import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AppRoutes } from "./type";
import LoginScreen from "../screens/Authentication/LoginScreen";
import ResgiterScreen from "../screens/Authentication/RegisterScreen";
import ResetPasswordSrceen from "../screens/Authentication/ResetPasswordSrceen";
import UserInformationScreen from "../screens/UserInfomationScreen";
import FilmDetailScreen from "../screens/Film/FilmDetailScreen";
import FilmScheduleScreen from "../screens/Film/FilmScheduleScreen";
import RoomFilmScreen from "../screens/Room/RoomFilmScreen";
import TabsNavigator from "./tabs";
import checkAuth from "@/hoc/CheckAuth";
import PaymentScreen from "@/screens/payment/PaymentScreen";
import HistoryTicketScreen from "@/screens/payment/HistoryTicketScreen";
import HomeScreen from "@/screens/TabsScreen/HomeScreen";

export type RootStackParamList = {
  [AppRoutes.LOGIN]: undefined;
  [AppRoutes.REGISTER]: undefined;
  [AppRoutes.TABS]: undefined;
  [AppRoutes.RESET_PASSWORD]: undefined;
  [AppRoutes.USER_INFORMATION]: undefined;
  [AppRoutes.INFO_FILM_DETAIL]: { filmId: number };
  [AppRoutes.SCHEDULE_FILM_DETAIL]: { filmId: number };
  [AppRoutes.ROOM_FILM]: {
    film_schedule_id: number;
    room_id: number;
    film_id: number;
    start_time: string;
  };
  [AppRoutes.PAYMENT]: {
    selectedSeats: any
    totalPrice: number;
    filmName: string;
    room_id: number;
    start_time: string;
    film_schedule_id: number;
  };
  [AppRoutes.HISTORY_TICKET]: undefined;
};

export default function RootNavigator() {
  const MainStack = createStackNavigator<RootStackParamList>();

  return (
    <MainStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName={AppRoutes.TABS}
    >
      <MainStack.Screen name={AppRoutes.LOGIN} component={LoginScreen} />
      <MainStack.Screen name={AppRoutes.REGISTER} component={ResgiterScreen} />
      <MainStack.Screen name={AppRoutes.TABS} component={TabsNavigator} />
      <MainStack.Screen
        name={AppRoutes.RESET_PASSWORD}
        component={ResetPasswordSrceen}
      />
      <MainStack.Screen
        name={AppRoutes.USER_INFORMATION}
        component={UserInformationScreen}
      />
      <MainStack.Screen
        name={AppRoutes.INFO_FILM_DETAIL}
        component={FilmDetailScreen}
      />
      <MainStack.Screen
        name={AppRoutes.SCHEDULE_FILM_DETAIL}
        component={FilmScheduleScreen}
      />
      <MainStack.Screen name={AppRoutes.ROOM_FILM} component={RoomFilmScreen} />
      <MainStack.Screen name={AppRoutes.PAYMENT} component={PaymentScreen} />
      <MainStack.Screen name={AppRoutes.HISTORY_TICKET} component={HistoryTicketScreen} />
    </MainStack.Navigator>
  );
}

import { IError } from "@/services";
import { NotificationToast } from "./notificationToast";

export const ShowNotificationError = (error: any) => {
  const errorAxios: IError = error.response?.data || {};
  console.log(errorAxios);
  NotificationToast.error(errorAxios?.message);
};

import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
const wait = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration));
export const NotificationToast = {
  success: (message?: string, options?: any) => {
    const { bodyClassName, ...restOptions } = options ?? {};
    toast.success(message || "Success !", {
      position: "center-top",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      bodyClassName: cn("text-base font-medium leading-6", bodyClassName),
      ...restOptions,
    });
  },
  error: (message?: string, options?: any) => {
    const { bodyClassName, ...restOptions } = options ?? {};
    toast.error(message || "Error !", {
      position: "center-top",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      bodyClassName: cn("text-base font-medium leading-6", bodyClassName),
      ...restOptions,
    });
  },
  loading: (message?: string, options?: any) => {
    const { bodyClassName, ...restOptions } = options ?? {};
    toast.loading(message || "Loading ...", {
      position: "center-top",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      bodyClassName: cn("text-base font-medium leading-6", bodyClassName),
      ...restOptions,
    });
  },
};

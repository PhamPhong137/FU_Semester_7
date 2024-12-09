import axiosIns from "../helpers/axiosInterceptor";
import { AuthAPI } from "./api";

export default {
    async login(data: { gmail: string; password: string }) {
        try {
            const response = await axiosIns.post(AuthAPI.LOGIN, data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    async register(data: any) {
        try {
            const response = await axiosIns.post(AuthAPI.REGISTER , data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    async resetPassword() {
        try {
            const response = await axiosIns.get(AuthAPI.RESET_PASSWORD);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
};

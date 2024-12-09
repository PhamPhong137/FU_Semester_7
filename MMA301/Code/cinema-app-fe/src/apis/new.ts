import axiosIns from "../helpers/axiosInterceptor";
import { NewAPI } from "./api";

export default {
  async getAllNews() {
    try {
      const response = await axiosIns.get(NewAPI.GET_ALL_NEW);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

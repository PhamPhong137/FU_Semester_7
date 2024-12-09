import axiosIns from "../helpers/axiosInterceptor";
import { SeatAPI } from "./api";

export default {
  async getSeatsByRoomAndSchedule(film_schedule_id: number) {
    try {
      const response = await axiosIns.get(SeatAPI.GET_SEAT_ROOM_SCHEDULE.replace(":schedule_film_id", film_schedule_id.toString()));
      return response.data;
    } catch (error) {
      console.log(error);
      throw error; 
    }
  },
};

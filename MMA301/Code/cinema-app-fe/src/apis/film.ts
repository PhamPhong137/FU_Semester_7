import axiosIns from "../helpers/axiosInterceptor";
import { FilmAPI } from "./api";

export default {
  async getAllFilmNowShowing() {
    try {
      const response = await axiosIns.get(FilmAPI.GET_CURRENT_FILM);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  async getAllFilmUpComing() {
    try {
      const response = await axiosIns.get(FilmAPI.GET_UPCOMING_FILM);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  async getFilmById(id: number) {    
    try {
      const response = await axiosIns.get(FilmAPI.GET_FILM.replace(":id", id.toString()));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getFilmScheduleByFilmId(id: number) {
    try {
      const response = await axiosIns.get(FilmAPI.GET_SCHEDULE_FILM_DETAIL.replace(":id", id.toString()));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getTimeScheduleByFilmId(id: number, dateTime?: string) {
    try {
      const url = `${FilmAPI.TIME_SCHEDULE_FILM_DETAIL.replace(":id", id.toString())}?date=${dateTime || ""}`;
      const response = await axiosIns.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  
  
  

};

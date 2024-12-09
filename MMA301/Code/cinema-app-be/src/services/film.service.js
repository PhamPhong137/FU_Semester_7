import filmRepository from "../repositories/film.repository.js";

const filmService = {
    getFilmById: async (id) => {
        try {
            const film = await filmRepository.findFilmById(id);
            return film;
        } catch (error) {
            console.error('Error in filmService.getFilmById:', error);
            throw error;
        }
    },
    getAllCurrentFilms: async () => {
        try {
            const films = await filmRepository.findAllCurrentFilm();
            return films;
        } catch (error) {
            console.error('Error in filmService.getAllCurrentFilms:', error);
            throw error;
        }
    },

    getAllUpcomingFilms: async () => {
        try {
            const films = await filmRepository.findAllUpcomingFilm();
            return films;
        } catch (error) {
            console.error('Error in filmService.getAllUpcomingFilms:', error);
            throw error;
        }
    },
    getAllScheduleByFilmId: async (id) => {
        try {
            const showDates = await filmRepository.findAllScheduleByFilmId(id);
            return showDates;
        } catch (error) {
            console.error('Error in filmService.getFilmShowDates:', error);
            throw error;
        }
    },

    getShowTimesByFilmAndDate: async (film_id, date_detail) => {
        try {
            const showTimes = await filmRepository.findShowTimesByFilmAndDate(film_id, date_detail);
            return showTimes;
        } catch (error) {
            console.error('Error in filmService.getFilmShowTimes:', error);
            throw error;
        }
    }
};

export default filmService;

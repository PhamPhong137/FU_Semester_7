"use strict";
import filmService from "../services/film.service.js";

export const FilmController = {

    getAllCurrentFilms: async (req, res) => {
        try {
            const films = await filmService.getAllCurrentFilms();
            res.status(200).json(films);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAllUpcomingFilms: async (req, res) => {
        try {
            const films = await filmService.getAllUpcomingFilms();
            res.status(200).json(films);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getFilmById: async (req, res) => {
        try {
            const film = await filmService.getFilmById(req.params.id);
            if (!film) {
                return res.status(404).json({ message: "Film not found" });
            }
            res.status(200).json(film);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAllScheduleByFilmId: async (req, res) => {
        try {
            const showDates = await filmService.getAllScheduleByFilmId(req.params.id);
            if (!showDates) {
                return res.status(404).json({ message: "Show dates not found" });
            }
            res.status(200).json(showDates);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getShowTimesByFilmAndDate: async (req, res) => {
        try {
            const film_id = req.params.id;
            const date_detail = req.query.date;
            const showTimes = await filmService.getShowTimesByFilmAndDate(film_id, date_detail);
            if (!showTimes) {
                return res.status(404).json({ message: "Show times not found" });
            }
            res.status(200).json(showTimes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


}
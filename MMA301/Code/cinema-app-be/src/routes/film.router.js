"use strict";

import express from 'express';
import { FilmController } from '../controllers/film.controller.js';

const filmRouter = express.Router()

filmRouter.get("/now-showing", FilmController.getAllCurrentFilms);
filmRouter.get("/upcoming", FilmController.getAllUpcomingFilms);
filmRouter.get("/:id", FilmController.getFilmById);
filmRouter.get("/:id/show-schedules", FilmController.getAllScheduleByFilmId);
filmRouter.get("/:id/showtimes", FilmController.getShowTimesByFilmAndDate);

export default filmRouter;








"use strict";

import express from 'express';
import { SeatController } from '../controllers/seat.controller.js';

const seatRouter = express.Router()

seatRouter.get("/:schedule_film_id", SeatController.getSeatsForRoomAtSchedule);



export default seatRouter;








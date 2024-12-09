"use strict"

import seatService from "../services/seat.service.js";

export const SeatController = {

    getSeatsForRoomAtSchedule: async (req, res) => {
        try {
            const schedule_film_id = req.params.schedule_film_id;
            const seats = await seatService.getSeatsOfRoomByScheduleTime(schedule_film_id);
            res.json(seats);
        } catch (error) {
            console.error('Error in SeatController.getSeatsOfRoomByScheduleTime:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },



}


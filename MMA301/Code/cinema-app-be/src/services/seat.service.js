import seatRepository from "../repositories/seat.repository.js";

const seatService = {
    getSeatsOfRoomByScheduleTime: async (schedule_film_id) => {
        try {         
            const seats = await seatRepository.getSeatsForRoomAtSchedule(schedule_film_id);
            return seats;
        } catch (error) {
            console.error('Error in SeatService.getAllSeatsOfRoomByScheduleTime:', error);
            return null;
        }
    }
   
}

export default seatService;

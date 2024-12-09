import ticketRepository from "../repositories/ticket.repository.js";
import moment from 'moment';

const ticketService = {

    createTicket: async (req) => {
        try {
            const { film_schedule_id, selectedSeats } = req.body;
            const user = req.user;
            const tickets = [];

            for (let seat of selectedSeats) {
                const newTicket = {
                    userId: user.id,
                    film_schedule_id,
                    seat_id: seat.seat_id,
                    bookingTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                    status: 0,
                    price: seat.price,
                };
                const ticket = await ticketRepository.createTicket(newTicket);
                tickets.push(ticket);
            }

            return tickets;
        } catch (error) {
            console.error('Error in ticketService.createTicket:', error);
            throw new Error("Error creating ticket");
        }
    },
    getTicketHistory: async (req) => {
        try {
            const user = req.user;
            const tickets = await ticketRepository.getTicketHistory(user.id);
            return tickets;
        } catch (error) {
            console.error('Error in ticketService.getTicketHistory:', error);
            throw new Error("Error getting ticket history");
        }
    },

}

export default ticketService;

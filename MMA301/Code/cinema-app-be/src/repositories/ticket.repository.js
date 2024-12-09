import db from '../database/dbConnect.js';
import { promisify } from 'util';

const query = promisify(db.query).bind(db);

const ticketRepository = {

    createTicket: async (data) => {
        try {
            const { userId, film_schedule_id, seat_id, bookingTime, status, price } = data;
            const sqlQuery = `INSERT INTO ticket_film (user_id, film_schedule_id, seat_id, bookingTime, status,price) VALUES (?, ?, ?, ?, ?,?)`;
            let binds = [userId, film_schedule_id, seat_id, bookingTime, status, price];
            await query(sqlQuery, binds);
            return data;
        } catch (error) {
            console.error('Error creating ticket:', error);
            return null;
        }
    },

    getTicketHistory: async (user_id) => {
        try {
            const sqlQuery = `SELECT 
                    f.title AS "title",
                    CONCAT(DATE_FORMAT(e.start_hour, '%H:%i'), ' ', DATE_FORMAT(fs.date, '%d/%m/%Y')) AS "showtime",
                    DATE_FORMAT(tf.bookingTime, '%H:%i %d/%m/%Y') AS "time_booked",
                    GROUP_CONCAT(s.seat_name ORDER BY s.seat_name SEPARATOR ', ') AS "seats",
                    CONCAT(FORMAT(SUM(sp.price), 0), ' VND') AS "price"
                FROM 
                    fpt_cinema.ticket_film tf
                JOIN 
                    fpt_cinema.film_showtime_schedule fs ON tf.film_schedule_id = fs.id
                JOIN 
                    fpt_cinema.film f ON fs.film_id = f.id
                JOIN 
                    fpt_cinema.seat s ON tf.seat_id = s.seat_id
                JOIN 
                    fpt_cinema.event e ON fs.event_id = e.id  
                JOIN 
                    fpt_cinema.seat_price sp ON s.seat_type_id = sp.seat_type_id 
                                            AND sp.day_type_id = fs.day_type_id 
                                            AND sp.timing_id = fs.timing_id
                                            AND sp.room_type_id = (SELECT room_type_id FROM fpt_cinema.room WHERE id = fs.room_id)
                                            AND sp.film_type_id = 1  -- Giả sử phim là loại 2D
                WHERE 
                    tf.user_id = ?
                    AND tf.status = 0  
                GROUP BY 
                    f.title, fs.date, e.start_hour, tf.bookingTime
                ORDER BY 
                    tf.bookingTime DESC;
                `;
            const binds = [user_id];
            const rows = await query(sqlQuery, binds);
            return rows;
        } catch (error) {
            console.error('Error fetching ticket history:', error);
            return null;
        }
    },
}

export default ticketRepository
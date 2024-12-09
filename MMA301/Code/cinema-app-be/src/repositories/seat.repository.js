import db from '../database/dbConnect.js';
import { promisify } from 'util';

const query = promisify(db.query).bind(db);

const seatRepository = {
    getSeatsForRoomAtSchedule: async (schedule_film_id) => {
        try {
            let sqlQueryData = `SELECT fss.room_id,fss.day_type_id,fss.timing_id,rt.id room_type_id 
            FROM fpt_cinema.film_showtime_schedule fss
            JOIN fpt_cinema.room_type rt ON fss.room_id = rt.id
            WHERE fss.id= ?;`;

            const data = await query(sqlQueryData, [schedule_film_id]);

            const { room_id, room_type_id, day_type_id, timing_id, film_type_id } = data[0];

            const sqlQuery = `
                            SELECT 
                s.seat_id,
                s.seat_name,
                s.seat_type_id,
                sp.price,
                CASE 
                    WHEN tf.seat_id IS NOT NULL THEN 
                        CASE 
                            WHEN tf.status = 0 THEN 'Booked'
                            WHEN tf.status = 1 THEN 'Pending'
                        END
                    ELSE 'Available'
                END AS status
            FROM 
                fpt_cinema.seat s
            JOIN 
                fpt_cinema.seat_price sp
                ON s.seat_type_id = sp.seat_type_id
            LEFT JOIN 
                fpt_cinema.ticket_film tf
                ON s.seat_id = tf.seat_id 
                AND tf.film_schedule_id = ?  
            WHERE 
                s.room_id = ?
                AND sp.day_type_id = ?
                AND sp.timing_id = ?
                AND sp.room_type_id = ?
                AND sp.film_type_id = ?
            ORDER BY 
                SUBSTRING(s.seat_name, 1, 1), 
                CAST(SUBSTRING(s.seat_name, 2) AS UNSIGNED);
            `;
            //film_type_id = 1 is 2D (Fix)
            const binds = [ schedule_film_id, room_id, day_type_id, timing_id, room_type_id, 1];
            const results = await query(sqlQuery, binds);
            return results;
        } catch (error) {
            console.error('Error fetching seats:', error);
            return null;
        }
    },
}

export default seatRepository;

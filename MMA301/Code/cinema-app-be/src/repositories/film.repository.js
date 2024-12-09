import db from '../database/dbConnect.js';
import { promisify } from 'util';
import { FILM_STATUS } from '../utils/contrant.js';

const query = promisify(db.query).bind(db);

const filmRepository = {

    findFilmsByStatus: async (status) => {
        try {
            const sqlQuery = 'SELECT * FROM film WHERE status = ?';
            const rows = await query(sqlQuery, [status]);
            return rows;
        } catch (error) {
            console.error('Error fetching films by status:', error);
            throw error;  
        }
    },
    findAllCurrentFilm: async () => {
        return filmRepository.findFilmsByStatus(FILM_STATUS.NOW_SHOWING);
    },

    findAllUpcomingFilm: async () => {
        return filmRepository.findFilmsByStatus(FILM_STATUS.UPCOMING);
    },

    findFilmById: async (id) => {
        try {
            const sqlQuery = 'SELECT * FROM film WHERE id = ?';
            const rows = await query(sqlQuery, [id]);
            return rows[0];
        } catch (error) {
            console.error('Error fetching film:', error);
            return null;
        }
    },
    findAllScheduleByFilmId: async (id) => {
        try {
            const sqlQuery = 'SELECT distinct date FROM film_showtime_schedule WHERE film_id = ?';
            const rows = await query(sqlQuery, [id]);
            return rows;
        } catch (error) {
            console.error('Error fetching film dates:', error);
            return null;
        }
    },

    findShowTimesByFilmAndDate: async (film_id, date_detail) => {
        try {
            const sqlQuery = 'SELECT e.start_hour,fss.id film_schedule_id,fss.room_id,fss.timing_id,fss.day_type_id,fss.event_id FROM film_showtime_schedule fss JOIN event e ON fss.event_id = e.id WHERE fss.film_id = ? AND fss.date = ?;';
            const binds = [film_id, date_detail];
            const rows = await query(sqlQuery, binds);
            return rows;
        } catch (error) {
            console.error('Error fetching film show times:', error);
            return null;
        }
    }

}

export default filmRepository;
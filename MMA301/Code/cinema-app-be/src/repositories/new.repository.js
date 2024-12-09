import db from '../database/dbConnect.js';
import { promisify } from 'util';

const query = promisify(db.query).bind(db);

const newRepository = {
    findAllNews: async (req, res) => {
        try {
            const sqlQuery = 'SELECT * FROM new';
            return await query(sqlQuery);
        } catch (err) {
            console.error('Error fetching new:', err);
            return null;
        }
    }
};

export default newRepository;

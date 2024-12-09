import db from '../database/dbConnect.js';
import { promisify } from 'util';

const query = promisify(db.query).bind(db);

const userRepository = {
    findUserByEmail: async (gmail) => {
        try {
            const sqlQuery = 'SELECT * FROM user WHERE gmail = ?';
            const rows = await query(sqlQuery, [gmail]);
            return rows[0];
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    },
    findUserByPhoneNumber: async (phone_number) => {
        try {
            const sqlQuery = 'SELECT * FROM user WHERE phone_number = ?';
            const rows = await query(sqlQuery, [phone_number]);
            return rows[0];
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    },

    createUser: async (user) => {
        try {
            const sqlQuery = `INSERT INTO user (gmail, fullname, phone_number, password, status, role_id)
                VALUES (?, ?, ?, ?, ?, ?)`
            let binds = [user.gmail, user.fullname, user.phone_number, user.password, user.status, user.role_id];
            await query(sqlQuery, binds);
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            return null;
        }
    },

    updatePassword: async (gmail, password) => {
        try {
            const sqlQuery = `UPDATE user SET password = ? WHERE gmail = ?`;
            let binds = [password, gmail];
            await query(sqlQuery, binds);
            return { message: "Password updated" };
        } catch (error) {
            console.error('Error updating password:', error);
            return null;
        }
    }

}

export default userRepository
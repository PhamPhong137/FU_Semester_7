'use strict'

import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

connection.connect(function (err) {
    if (err) {
        console.log('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
    
    
    // Close the connection
    // connection.end(function (err) {
    //     if (err) {
    //         return console.log('Error ending the connection: ' + err.message);
    //     }
    //     console.log('The connection was closed');
    // });
});

export default connection;
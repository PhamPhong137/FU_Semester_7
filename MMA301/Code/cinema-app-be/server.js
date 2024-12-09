import dotenv from 'dotenv';
import app from './src/app.js';
import getPhysicalIP from './IPv4.js';

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT;
// const HOSTNAME = process.env.HOSTNAME;

const IP = getPhysicalIP();

//const HOSTNAME = `${IP}`;

const HOSTNAME = '10.33.18.68'

// Create server and listen on the port
app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at: http://${HOSTNAME}:${PORT}`);
});


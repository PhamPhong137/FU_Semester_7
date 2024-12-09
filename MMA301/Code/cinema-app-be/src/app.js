import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import httpErrors from 'http-errors';
import router from './routes/index.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware configuration
app.use(express.json()); // Parse JSON payloads
app.use(bodyParser.json()); // Body-parser middleware
app.use(morgan('dev')); // Logger middleware
app.use(helmet()); // Secure HTTP headers
app.use(cors());

// Root route
app.get("/", async (req, res, next) => {
    res.status(200).send("<html><body><h1>Welcome to FPT Cinema</h1></body></html>")
});

// Routes
app.use("/api", router);

app.use(async (req, res, next) => {
    next(httpErrors.BadRequest("Bad request"));
});

app.use(async (err, req, res, next) => {
    res.status = err.status;
    res.send({ "error": { "status": err.status, "message": err.message } });
})

export default app;

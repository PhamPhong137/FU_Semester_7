import express from 'express';
import userRouter from './user.router.js';
import filmRouter from './film.router.js';
import newRouter from './new.router.js';
import seatRouter from './seat.route.js';
import ticketRouter from './ticket.router.js';

const router = express.Router()

router.use("/auth", userRouter);
router.use("/films", filmRouter);
router.use("/news", newRouter);
router.use("/seats", seatRouter);
router.use("/ticket", ticketRouter);


export default router
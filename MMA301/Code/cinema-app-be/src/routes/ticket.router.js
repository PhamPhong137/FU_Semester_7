"use strict";

import express from 'express';
import { TicketController } from '../controllers/ticket.controller.js';
import verifyToken from '../middlewares/authJWT.js';

const ticketRouter = express.Router()

ticketRouter.post("/create", verifyToken, TicketController.createTicket);
ticketRouter.get("/ticket-history", verifyToken, TicketController.getTicketHistory);



export default ticketRouter;








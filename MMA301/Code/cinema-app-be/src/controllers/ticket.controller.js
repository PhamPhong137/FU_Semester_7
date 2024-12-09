"use strict"
import ticketService from "../services/ticket.service.js";

export const TicketController = {

    createTicket: async (req, res) => {
        try {
            const ticket = await ticketService.createTicket(req);
            return res.status(200).json(ticket);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getTicketHistory: async (req, res) => {
        try {
            console.log("hêlo");
            const tickets = await ticketService.getTicketHistory(req);
            return res.status(200).json(tickets);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

}


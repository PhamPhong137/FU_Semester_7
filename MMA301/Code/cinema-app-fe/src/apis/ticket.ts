import axiosIns from "../helpers/axiosInterceptor";
import { TicketAPI } from "./api";

export default {
    createTicket: async (data: any, token: string) => {
        try {
            const response = await axiosIns.post(
                TicketAPI.CREATE_TICKET,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Token is sent here
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getHistoryTickets: async (token: string) => {
        try {
            const response = await axiosIns.get(TicketAPI.GET_TICKETS, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Token is sent here
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },


};

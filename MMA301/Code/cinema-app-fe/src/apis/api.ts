export enum AuthAPI{
    LOGIN = "auth/login",
    REGISTER = "auth/register",
    RESET_PASSWORD = "auth/reset-password",
}

export enum FilmAPI{
    GET_CURRENT_FILM = "films/now-showing",
    GET_UPCOMING_FILM = "films/upcoming",
    GET_FILM  = "films/:id",
    GET_SCHEDULE_FILM_DETAIL = "films/:id/show-schedules",
    TIME_SCHEDULE_FILM_DETAIL = "films/:id/showtimes",
}

export enum NewAPI{
    GET_ALL_NEW = "news",
}

export enum SeatAPI{
    GET_SEAT_ROOM_SCHEDULE = "seats/:schedule_film_id",
}

export enum TicketAPI{
    CREATE_TICKET = "ticket/create",
    GET_TICKETS = "ticket/ticket-history",
}
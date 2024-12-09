"use strict";
import UserService from '../services/user.service.js';

export const UserController = {
    login : async (req, res) => {
        try {
            const user = await UserService.login(req);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    register : async (req, res) => {
        try {
            const user = await UserService.register(req);
            console.log(user)
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    resetPassword: async (req, res) => {
        try {
            const user = await UserService.resetPassword(req);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
}


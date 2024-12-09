"use strict";

import express from 'express';
import { UserController } from '../controllers/user.controller.js';

const userRouter = express.Router()

userRouter.post("/login", UserController.login);
userRouter.post("/register", UserController.register);
userRouter.post("/reset-password", UserController.resetPassword);


export default userRouter;








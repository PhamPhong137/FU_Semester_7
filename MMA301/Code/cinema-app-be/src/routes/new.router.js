"use strict";

import express from 'express';
import { NewController } from '../controllers/new.controller.js';

const newRouter = express.Router()

newRouter.get("/", NewController.getAllNews);


export default newRouter;








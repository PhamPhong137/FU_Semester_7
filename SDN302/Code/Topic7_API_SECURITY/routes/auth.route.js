const express = require("express");
const bodyParser = require("body-parser");
const AuthController = require("../controllers/auth.controller");

const AuthRouter = express.Router();
AuthRouter.use(bodyParser.json());

// Routes:
AuthRouter.post("/sign-up", AuthController.signUp);

AuthRouter.post("/sign-in", AuthController.signIn);

module.exports = AuthRouter;
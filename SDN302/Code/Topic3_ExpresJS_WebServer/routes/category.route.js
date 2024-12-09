const express = require("express");
const {json} = require("body-parser");

const categoryRouter = express.Router(); // productRouter: mini Express
categoryRouter.use(json());

categoryRouter.get("/get-all", async (req, res, next) => {
    try {
        res.status(200).json({"data": "List of Categories"});
    } catch (error) {
        next(error);
    }
});

categoryRouter.post("/create", async (req, res, next) => {
    try {
        res.status(201).json({"result": "Create success"});
    } catch (error) {
        next(error);
    }
});

module.exports = categoryRouter;
const express = require("express");
const bodyParser = require("body-parser");
const Db = require("../models");
const { CustomerController } = require("../controllers");

const CustomerRouter = express.Router();
CustomerRouter.use(bodyParser.json());

CustomerRouter.post("/add", CustomerController.addNewCustomer);
CustomerRouter.post("/:id/add-order", CustomerController.addNewOrder);

module.exports = CustomerRouter;
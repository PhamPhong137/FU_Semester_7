const mongoose = require("mongoose");
const employee = require("./employee");
const department = require("./department");
const job = require("./job");


const db = {}

// Define schema
db.employee = employee
db.department = department
db.job = job

module.exports = db;
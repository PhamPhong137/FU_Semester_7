const mongoose = require("mongoose");
const category = require("./category");
const comment = require("./comment");
const customer = require("./customer");
const product = require("./product");

const db = {}

// Define schema
db.category = category
db.comment = comment
db.customer = customer
db.product = product

module.exports = db;
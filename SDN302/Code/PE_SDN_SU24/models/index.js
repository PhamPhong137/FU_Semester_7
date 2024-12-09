const mongoose = require("mongoose");
const Producer = require("./producer");
const Director = require("./director");
const Star = require("./star");
const Movie = require("./movie");

const db = {}

// Define schema
db.Producer = Producer
db.Director = Director
db.Star = Star
db.Movie = Movie

module.exports = db;
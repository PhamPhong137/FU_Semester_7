const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const directorSchema = new Schema({
    fullname: { type: String },
    dob: { type: Date },
    nationality: { type: String },
}, { timestamps: true });

const Director = mongoose.model("director", directorSchema);

module.exports = Director;

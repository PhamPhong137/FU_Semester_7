const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const starSchema = new Schema({
    name: { type: String },
    fullname: { type: String },
    male: { type: Boolean },
    dob: { type: Date },
    nationality: { type: String },
}, { timestamps: true });

const Star = mongoose.model("star", starSchema);

module.exports = Star;

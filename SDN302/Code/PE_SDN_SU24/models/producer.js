const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const producerSchema = new Schema({
    name: { type: String },
}, { timestamps: true });

const Producer = mongoose.model("producer", producerSchema);

module.exports = Producer;

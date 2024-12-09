const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const departmentSchema = new Schema({
    name: { type: String },
    description: { type: String },

}, { timestamps: true });

const department = mongoose.model("department", departmentSchema);

module.exports = department;


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const categorySchema = new Schema({
    name: { type: String },
    description: { type: String }

}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

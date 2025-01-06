const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        unique: [true, "Category name is unique"]
    },
    description: {
        type: String,
    }
})

const Category = mongoose.model("category", categorySchema);

module.exports = Category; //export model
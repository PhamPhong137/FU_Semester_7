const mongoose = require("mongoose");

const Category = require("./category.model");
const Products = require("./product.model");
const Customer = require("./customer.model");
const Comment = require("./comment.model");

const db = {}

// Define schema
db.Category = Category
db.Products = Products
db.Customer = Customer
db.Comment = Comment

// Connect to database
db.connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log("MongoDB connected successfully"))
    } catch (err) {
        next(err);
        process.exit();
    }
}

module.exports = db;
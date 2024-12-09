const mongoose = require("mongoose");

const Category = require("./category.model");
const Product = require("./product.model");
const Comment = require("./comment.model");

const db = {}

db.Category = Category;
db.Product = Product;
db.Comment = Comment;

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
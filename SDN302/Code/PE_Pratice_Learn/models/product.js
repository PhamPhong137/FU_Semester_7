const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const productSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    description: { type: String },
    unitInStock: { type: Number },
    discount: { type: Number },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

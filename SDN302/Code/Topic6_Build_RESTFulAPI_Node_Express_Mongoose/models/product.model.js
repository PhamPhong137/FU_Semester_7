const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: { type: String, required: [true, "Product name is required"] },
    price: { type: Number, required: [true, "Product price is required"] },
    description: { type: String },
    unitInStock: { type: Number },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    comments: [{
        text: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    }]
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
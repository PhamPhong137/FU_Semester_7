const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be a positive number"]
    },
    description: String,
    unitInStock: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category', 
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment' 
    }]
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

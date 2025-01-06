const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    unitInStock: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }]
});

const Product = mongoose.model("product", productSchema);

module.exports = Product; //export model
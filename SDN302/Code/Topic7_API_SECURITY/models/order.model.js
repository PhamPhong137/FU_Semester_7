const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderDate: Date,
    requireDate: Date,
    shipAddress: String,
    products: [{
        code: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        name: String,
        price: Number,
        quantity: Number,
        discount: Number,
    }]
})

const Order = mongoose.model("order", orderSchema);

module.exports = Order; //export model
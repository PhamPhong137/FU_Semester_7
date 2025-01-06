const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: String,
    address: String,
    email: {type: String, unique: true},
    phone: String,
    orders: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "order"
        },
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
    }]
});

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
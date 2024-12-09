const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: String,
    address: String,
    email: String,
    phone: String,
    orders: [{
        _id: mongoose.Schema.Types.ObjectId,
        orderDate: { type: Date, default: Date.now },
        requiredDate: {
            type: Date,
            validate: {
                validator: function (value) {
                    return value >= this.orderDate;
                },
                message: 'Required date must be the same or after order date'
            }
        },
        shipAddress: String,
        products: [{
            code: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            name: String,
            price: Number,
            quantity: Number,
            discount: Number
        }]
    }]
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;

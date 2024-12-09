const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const customerSchema = new Schema({
    name: { type: String },
    address: { type: String },
    email: { type: String, unique: true, required: [true, "Email already exists"] },
    phone: { type: String, unique: true },
    orders: [{
        //_id: false,
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
            quantity: Number
        }]
    }, { default: [] }]



}, { timestamps: true });

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;

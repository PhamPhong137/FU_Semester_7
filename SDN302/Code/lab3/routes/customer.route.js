const express = require('express');
const bodyParser = require('body-parser');
const Customer = require('../models/customer.model');
const Product = require('../models/product.model');
const mongoose = require('mongoose');  // Import mongoose

const customerRouter = express.Router();

customerRouter.use(bodyParser.json());

customerRouter.post("/add", async (req, res, next) => {
    try {
        const newCustomer = new Customer(req.body);
        await newCustomer.save().then(newDoc => {
            res.status(201).json({
                message: "Add a new customer success",
                data: {
                    id: newDoc._id,
                    name: newDoc.name,
                    email: newDoc.email,
                    phone: newDoc.phone
                }
            });
        });
    } catch (error) {
        next(error);
    }
});

customerRouter.post("/:id/add-order", async (req, res, next) => {
    try {
        const customerId = req.params.id;
        let customer;
        try {
             customer = await Customer.findById(customerId);
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
        } catch (error) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const { requiredDate, shipAddress, products } = req.body;
        const orderDate = new Date();

        
        for (let product of products) {
            const foundProduct = await Product.findById(product.code);
            if (!foundProduct) {
                return res.status(404).json({ message: `Product ${product.name} not found` });
            }
            if (foundProduct.unitInStock < product.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for product: ${product.name}`
                });
            }
        }

        const newOrder = {
            _id: new mongoose.Types.ObjectId(),
            orderDate,
            requiredDate,
            shipAddress,
            products
        };

        customer.orders.push(newOrder);
        await customer.save();

        for (let product of products) {
            const foundProduct = await Product.findById(product.code);
            const newQuantity = foundProduct.unitInStock - product.quantity;
            await Product.findByIdAndUpdate(product.code, { unitInStock: newQuantity });
        }
        res.json({
            orderId: newOrder._id,
            products: newOrder.products.
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

customerRouter.get("/:id/list-orders", async (req, res, next) => {
    try {
        const customerId = req.params.id;
        let customer;
        try {
             customer = await Customer.findById(customerId);
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
        } catch (error) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const orders = customer.orders.map(order => {
            let totalPrice = 0;

            const products = order.products.map(product => {
                const productTotal = (product.price * product.quantity) * (1 - product.discount / 100);
                totalPrice += productTotal;

                return {
                    pId: product.code._id,
                    pName: product.name,
                    pPrice: product.price
                };
            });

            return {
                orderId: order._id,
                products: products,
                totalPrice: totalPrice
            };
        });

        res.status(200).json({
            customerId: customer._id,
            customerName: customer.name,
            orders: orders
        });

    } catch (error) {
        next(error);
    }
});




module.exports = customerRouter;

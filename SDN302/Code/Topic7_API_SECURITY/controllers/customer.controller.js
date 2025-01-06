const Db = require("../models")

const addNewCustomer = async (req, res, next) => {
    try {
        if (req.body) {
            const { name, address, email, phone } = req.body;
            const newCustomer = await Db.Customers.create({ name, address, email, phone, orders: [] });
            res.status(201).json({
                message: "Create a new customer successfully",
                data: {id: newCustomer._id, name: newCustomer.name, email: newCustomer.email, phone: newCustomer.phone}
            })
        } else {
            res.status(400).json({ message: "Bad Request" });
        }
    } catch (err) {
        next(err);
    }
}

const addNewOrder = async (req, res, next) => {
    try {
        if (req.body && req.params) {
            const foundCustomer = await Db.Customers.findById(req.params.id).exec();
            if(!foundCustomer) {
                res.status(404).json({message: "Customer not found"})
            }
            const createdAt = new Date();
            const {requireDate, shipAddress, products} = req.body;

            const orderData = {
                orderDate: createdAt,
                requireDate: requireDate,
                shipAddress: shipAddress,
                products: products,
            }
            const createdOrder = await Db.Orders.create(orderData);
            const result = {
                orderId: createdOrder._id,
                products: createdOrder.products
            }
            const updatedCustomer = await Db.Customers.findByIdAndUpdate(foundCustomer._id, {orders: [...foundCustomer.orders, createdOrder]}, {new: true});
            res.status(200).json(result);
        } else {
            res.status(400).json({message: "Bad Request"});
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addNewCustomer,
    addNewOrder
}
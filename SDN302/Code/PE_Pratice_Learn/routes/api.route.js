const express = require("express");
const db = require("../models");


const ApiRouter = express.Router();

// Create user
ApiRouter.post("/customer/add", async (req, res, next) => {
    try {
        const data = req.body;
        const newUser = await db.customer.create(data);

        res.status(201).json({
            message: "Create a new customer successfully",
            data: newUser
        });

    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: error.message
            }
        })
    }
});

ApiRouter.post("/customer/:id/add-order", async (req, res, next) => {
    try {
        const customerId = req.params.id;
        const data = req.body;
        //console.log(data)
        let customer;
        try {
            customer = await db.customer.findById(customerId);
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
        } catch (error) {
            return res.status(404).json({ message: "Customer not found" });
        }
        const uniqueProducts = []
        for (let product of data.products) {
            const index = uniqueProducts.findIndex(p => p.pId === p.pId);
            if (index === -1) {
                // If product is not found, add it to validProducts
                uniqueProducts.push({ ...product });
            } else {
                // If product is found, update the quantity
                uniqueProducts[index].quantity += product.quantity;
            }
        }

        const newOrder = {
            requiredDate: data.requiredDate,
            shipAddress: data.shipAddress,
            products: uniqueProducts
        }

        const customerResponse = await db.customer.findByIdAndUpdate(customerId, {
            $push: { orders: newOrder }
        });

        for (let product of uniqueProducts) {
            //Cách 1
            // const foundProduct = await db.product.findById(product.pId);
            // const newQuantity = foundProduct.unitInStock - product.quantity;
            // await db.product.findByIdAndUpdate(product.pId, { unitInStock: newQuantity });

            //Cách 2
            await db.product.findByIdAndUpdate(product.pId, {
                $inc: {
                    unitInStock: -product.quantity // Use -quantity to decrement the stock
                }
            });
        }

        //ProductResponse
        const productResponse = []
        for (let product of uniqueProducts) {
            const foundProduct = await db.product.findById(product.pId);
            //console.log(foundProduct)
            productResponse.push({
                _id: foundProduct._id,
                name: foundProduct.name,
                price: foundProduct.price,
                quantity: product.quantity
            })
        }
        res.status(201).json({
            orderId: customerResponse.orders[customerResponse.orders.length - 1]._id,
            products: productResponse
        });

    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: error.message
            }
        })
    }
});

ApiRouter.get("/customer/:id/list-orders", async (req, res, next) => {
    try {
        const customerId = req.params.id;
        let customer;
        try {
            customer = await db.customer.findById(customerId);
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
        } catch (error) {
            return res.status(404).json({ message: "Customer not found" });
        }
        const orderResponse = []
        let productResponse = []

        for (let order of customer.orders) {
            let total = 0;
            for (let product of order.products) {
                const foundProduct = await db.product.findById(product._id);
                total += foundProduct.price * product.quantity * (1 - foundProduct.discount);
                productResponse.push({
                    _id: foundProduct._id,
                    name: foundProduct.name,
                    price: foundProduct.price,
                    quantity: product.quantity,
                    discount: foundProduct.discount
                })

            }
            
            orderResponse.push({
                _id: order._id,
                requiredDate: order.requiredDate,
                shipAddress: order.shipAddress,
                products: productResponse,
                totalPrice: total
            })
            productResponse = []

        }

        const data = {
            customerId: customer._id,
            customerName: customer.name,
            orders: orderResponse
        }
        res.status(201).json(data);

    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: error.message
            }
        })
    }
});

ApiRouter.put("/customer/:id/update", async (req, res, next) => {
    try {
        const customerId = req.params.id;
        const data = req.body;
        let customer;
        try {
            customer = await db.customer.findById(customerId);
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
        } catch (error) {
            return res.status(404).json({ message: "Customer not found" });
        }
        const updateCutomer = await db.customer.findByIdAndUpdate(customerId, {
            $set: {
                name: data.name,
                address: data.address,
                email: data.email,
                phone: data.phone
            },

        }, { new: true });

        res.status(201).json({
            message: "Update customer successfully",
            data: {
                name: updateCutomer.name,
                address: updateCutomer.address,
                email: updateCutomer.email,
                phone: updateCutomer.phone
            }
        });

    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: error.message
            }
        })
    }
});

ApiRouter.put("/product/add", async (req, res, next) => {
    try {
        const data = req.body;
        const newProduct = await db.product.create(data);

        res.status(201).json({
            message: " Create a new product successfully",
            data: newProduct
        });
    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: error.message
            }
        })
    }
});

ApiRouter.post("/product/:id/add-comment", async (req, res, next) => {
    try {
        const productId = req.params.id;
        const data = req.body;
        try {
            customer = await db.customer.findById(data.customerId);
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
        } catch (error) {
            return res.status(404).json({ message: "Customer not found" });
        }
        const product = await db.product.findById(productId);
        const newComment = await db.comment.create({
            author: data.customerId,
            text: data.commentText,
            rating: data.rating
        });
        product.comments.push(newComment._id);
        await product.save();


        res.status(201).json({
            message: "Create a new comment successfully",
            data: newComment
        });
    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: error.message
            }
        })
    }
});

ApiRouter.get("/product/:id/list-comments", async (req, res, next) => {
    try {
        const productId = req.params.id;

        const product = await db.product.findById(productId).populate({
            path: 'comments',
            select: '-_id -__v'
        });

        res.status(201).json({
            message: "List comments of product",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: error.message
            }
        })
    }
});
ApiRouter.put("/product/:id/update", async (req, res, next) => {
    try {
        const productId = req.params.id;
        const data = req.body;
        let product;
        try {
            product = await db.product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updateProduct = await db.product.findByIdAndUpdate(productId, {
            $set: {
                name: data.name,
                price: data.price,
                unitInStock: data.unitInStock
            },

        }, { new: true });

        res.status(201).json({
            message: "Update product successfully",
            data: {
                name: updateProduct.name,
                price: updateProduct.price,
                unitInStock: updateProduct.unitInStock
            }
        });

    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: error.message
            }
        })
    }
});

ApiRouter.get("/product/:id/delete", async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await db.product.findByIdAndDelete(productId);
        res.status(201).json({
            message: "Delete product successfully",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: error.message
            }
        })
    }
});

ApiRouter.get("/customer/:id/delete", async (req, res, next) => {
    try {
        const customerId = req.params.id;
        const customer = await db.customer.findByIdAndDelete(customerId);
        res.status(201).json({
            message: "Delete customer successfully",
            data: customer
        });
    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: error.message
            }
        })
    }
});

ApiRouter.put("/product/:productId/comment/:commentId/update", async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const commentId = req.params.commentId;
        const data = req.body;
        let product;
        try {
            product = await db.product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            return res.status(404).json({ message: "Product not found" });
        }
        const comment = await db.comment.findByIdAndUpdate(commentId, {
            $set: {
                text: data.text,
                rating: data.rating
            },

        }, { new: true });

        res.status(201).json({
            message: "Update comment successfully",
            data: {
                text: comment.text,
                rating: comment.rating
            }
        });

    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: error.message
            }
        })
    }
});

ApiRouter.get("/product/:productId/comment/:commentId/delete", async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const commentId = req.params.commentId;
        const product = await db.product.findById(productId);
        const comment = await db.comment.findByIdAndDelete(commentId);
        product.comments.pull(commentId);

        //Remove multiple comments
        //const commentIdsToRemove = [commentId1, commentId2]; 
        // commentIdsToRemove.forEach(commentId => {
        //     product.comments.pull(commentId);
        // });

        //Remove comment by filter
        // product.comments = product.comments.filter(comment => comment.id !== commentIdToRemove);

        // const commentIdsToRemove = ["commentId1", "commentId2"];

        // await db.product.findByIdAndUpdate(
        //     productId,
        //     { $pull: { comments: { id: { $in: commentIdsToRemove } } } } 
        // );
        await product.save();
        res.status(201).json({
            message: "Delete comment successfully",
            data: comment
        });
    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: error.message
            }
        })
    }
});







module.exports = ApiRouter;

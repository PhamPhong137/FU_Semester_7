const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");

const CategoryRouter = express.Router();

CategoryRouter.use(bodyParser.json());


CategoryRouter.post("/create", async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const newCategory = await db.Category.create({ name, description });

        //Insert one
        await newCategory.save().then(newDoc => {
            res.status(201).json({
                message: "Category created successfully",
                result: {
                    categoryCode: newDoc._id,
                    desc: newDoc.description
                }
            });
        });
    } catch (err) {
        next(err);
    }
});


CategoryRouter.post("/add", async (req, res, next) => {
    try {
        const { name, description, products } = req.body;
        
        const newCategory = await db.Category?.create({ name, description });

        if (products && products.length > 0) {
            const productPromises = products.map(async (product) => {
                const newProduct = await db.Product.create(
                    {
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        unitInStock: product.unitInStock,
                        category: newCategory._id
                    });
                return newProduct;
            })
            await Promise.all(productPromises);
        }

        res.status(201).json({
            message: "Category and products created successfully",
            result: {
                categoryCode: newCategory._id,
                desc: newCategory.description,
                products: products?.map(product => { productName: product.name })
            }
        });


    } catch (err) {
        res.status(500).json({ error: err });
    }
});



module.exports = CategoryRouter;
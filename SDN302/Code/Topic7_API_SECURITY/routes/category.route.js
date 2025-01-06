const express = require("express");
const bodyParser = require("body-parser");
const Db = require("../models");
const { CategoryController } = require("../controllers");

const CategoryRouter = express.Router();
CategoryRouter.use(bodyParser.json());

// Create a new category:
CategoryRouter.post("/create", async (req, res, next) => {
    try {
        // Get data from request object
        const { name, description } = req.body;
        const newCategory = new Db.Categories({ name, description });

        // Insert one
        await newCategory.save()
            .then(newDoc => {
                res.status(201).json({
                    message: "Create new category successfully",
                    result: {
                        newDoc
                    }
                });
            })
    } catch (error) {
        next(error)
    }
})

// Create a new category and products at the same time
CategoryRouter.post("/create-expand", async (req, res, next) => {
    try {
        const { name, description, products } = req.body;
        const newCategory = new Db.Categories({ name, description });
        let newCate;
        await newCategory.save()
            .then(newDoc => {
                newCate = newDoc;
            });

        products?.map(async p => {
            const newProduct = new Db.Products({ name: p.name, price: p.price, description: p.description, unitInStock: p.unitInStock, category: newCate._id, comments: p.comments });
            await newProduct.save()
                .then(newPro => console.log(newPro));
        })

        res.status(201).json({
            message: "Add new successful",
            result: {
                newCate
            }
        })
    } catch (err) {
        next(err);
    }
})

CategoryRouter.post("/add", CategoryController.createWithProducts);

module.exports = CategoryRouter;
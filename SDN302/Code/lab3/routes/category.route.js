const express = require('express');
const bodyParser = require('body-parser')
const Category = require('../models/category.model')
const db = require('../models/index');

const categoryRouter = express.Router();

categoryRouter.use(bodyParser.json());

// Create a new category
categoryRouter.post("/create", async (req, res, next) => {
    try {
        // const { name, description } = req.body;
        // Lay du lieu tu request (client)
        // const newCategory = new Category({ name, description })
        const newCategory = new db.Categories(req.body)
        await newCategory.save().then(newDoc => {
            res.status(201).json({
                message: "Insert Succesfully",
                result: {
                    categoryId: newDoc._id,
                    categoryName: newDoc.name,
                    categoryDescription: newDoc.description,
                }
            });
        });

        // await new db.Category(req.body).save().then(newDoc => {
        //     res.status(201).json({
        //         message: "Insert Succesfully",
        //         result: {
        //             categoryId: newDoc._id,
        //            categoryName: newDoc.name,
        //            categoryDescription: newDoc.description,
        //         }
        //     });
        // });

        // Category.create
    } catch (error) {
        next(error);
    }
})

// Create a new category
categoryRouter.post("/add", async (req, res, next) => {
    try {
        const newCategory = await db.Categories.create(req.body)

        const products = req.body.products
        const newProducts = products?.map(product => ({
            ...product,
            category: newCategory._id
        }));

        await db.Products.insertMany(newProducts)
            .then(newProduct => {
                res.status(201).json(newProduct);
            })

    } catch (error) {
        next(error);
    }
})


// .lean() được sử dụng để trả về dữ liệu dưới dạng các đối tượng JavaScript đơn thuần (plain JavaScript objects), thay vì các tài liệu Mongoose (Mongoose Documents)
categoryRouter.get("/get_all", async (req, res, next) => {
    try {
        const allCategories = await db.Categories.find().lean();
        const newCategories = allCategories.map(category => ({
            ...category,
            codeId: category._id
        }));
        res.status(200).json({
            message: "All Data",
            data: newCategories.map(c => ({
                id: c._id
            }))
        });
    } catch (error) {
        next(error);
    }
});


module.exports = categoryRouter;


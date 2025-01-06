const express = require("express");
const bodyParser = require("body-parser");
const Db = require("../models");
const { ProductController } = require("../controllers");
const VerifyAuth = require("../middlewares/verifyAuth");

const ProductRouter = express.Router();
ProductRouter.use(bodyParser.json());

ProductRouter.post("/create", async (req, res, next) => {
    try {
        const {name, price, description, unitInStock, category, comments} = req.body;
        const newProduct = new Db.Products({name, price, description, unitInStock, category, comments});

        await newProduct.save()
            .then(newDoc => {
                res.status(201).json({
                    message: "Create new product successfully",
                    result: {newDoc}
                });
            })
    } catch (error) {
        next(error);
    }
})

// GET: /product/get-all
ProductRouter.get("/get-all", [VerifyAuth.verifyToken, VerifyAuth.isAdmin] ,ProductController.getAll);

module.exports = ProductRouter;
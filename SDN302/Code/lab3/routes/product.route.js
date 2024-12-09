const express = require('express');
const bodyParser = require('body-parser');
const Product = require('../models/product.model');
const db = require('../models/index');

const productRouter = express.Router();

productRouter.use(bodyParser.json());

// Create a new product
productRouter.post("/create", async (req, res, next) => {
    try {
        await db.Products.create(req.body)
            .then(newProduct => {
                res.status(200).json(newProduct);
            })
    } catch (error) {
        next(error);
    }
});

// Get all products
productRouter.get("/get_all", async (req, res, next) => {
    try {
        await Product.find({}).populate("category").populate("comments").exec()
            .then(products => {
                res.status(200).json(products);
            });
    } catch (error) {
        next(error);
    }
});


// Create a new comment and add to product comments
productRouter.post("/:productId/add-comment", async (req, res, next) => {
    try {
        const newComment = await db.Comments.create(req.body);

        // Dùng push khi bạn muốn thêm một phần tử vào mảng (array).
        // Nếu bạn không sử dụng { new: true } trong findByIdAndUpdate, thì kết quả trả về sẽ là bản ghi trước khi cập nhật.
        await Product.findByIdAndUpdate(req.params.productId, { $push: { comments: newComment._id } }, { new: true })
            .then(updatedProduct => {
                // Lấy tất cả trừ id
                const { _id, ...rest } = updatedProduct._doc;
                res.status(200).json({
                    data: rest
                });
            });

        // Nếu không sử dụng $push, MongoDB sẽ cố gắng thay thế hoàn toàn trường comments thay vì thêm một phần tử vào nó.
        // await Product.updateOne({ _id: req.params.id }, { comments: newComment._id });

    } catch (error) {
        next(error);
    }
});



module.exports = productRouter;


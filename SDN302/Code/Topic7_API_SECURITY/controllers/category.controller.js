const Db = require("../models")

// Actions: Business logic work DB
async function createWithProducts(req, res, next) {
    try {
        if (req.body) {
            const { name, description } = req.body;
            // Create new Category
            const createdCategory = await Db.Categories.create({ name, description });

            // Create multi Products and Update category field
            const products = req.body.products;

            // products?.map(async p => {
            //     // Update category fields
            //     p.category = createdCategory._id;
            //     // save into Product collection
            //     await Db.Products.create(p);
            // });

            const productsRes = [];

            for (const p of products) {
                // Update category fields
                p.category = createdCategory._id;
                // Save into Product collection
                const tempProduct = await Db.Products.create(p);
                productsRes.push(tempProduct);
            }

            res.status(201).json({
                message: "Create Category and Products successfully",
                data: {
                    categoryId: createdCategory._id,
                    name: createdCategory.name,
                    products: productsRes?.map(p => ({ productCode: p._id, productName: p.name }))
                }
            });
        } else {
            res.status(400).json({ message: "Bad Request" });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createWithProducts,
}
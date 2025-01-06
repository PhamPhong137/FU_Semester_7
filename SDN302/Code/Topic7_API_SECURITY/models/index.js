//  Hoat dong tao ra cac doi tuong anh xa tu CSDL thong qua cac models
const mongoose = require("mongoose");
const Categories = require("./catagory.model");
const Products = require("./product.model");
const Comments = require("./comment.model");
const Customers = require("./customer.model");
const Orders = require("./order.model");
const Roles = require("./role.model");
const Users = require("./user.model");

const Db = {}; // Doi tuong dai dien DB co cac thuoc tinh (Entity Object) va phuong thuc ket noi

Db.Categories = Categories;
Db.Products = Products;
Db.Comments = Comments;
Db.Customers = Customers;
Db.Orders = Orders;
Db.Roles = Roles;
Db.Users = Users;

// Ket noi CSDL
Db.connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
            .then(() => console.log("Connect to MongoDB successfully"));
    } catch (error) {
        next(error);
        process.exit();
    }
}

module.exports = Db;

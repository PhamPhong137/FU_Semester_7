const express = require("express");
const morgan = require("morgan");
const httpErrors = require("http-errors");
const bodyParser = require("body-parser");
const Db = require("./models");
const CategoryRouter = require("./routes/category.route");
const CommentRouter = require("./routes/comment.route");
const ProductRouter = require("./routes/product.route");
const CustomerRouter = require("./routes/customer.route");
require("dotenv").config();
const cors = require("cors");
const AuthRouter = require("./routes/auth.route");

// Khoi tao ung dung Express Web Server
const app = express();

// Them cac middlewares kiem soat cac request, response
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

// Dinh tuyen tai cap do root (root router)
app.get("/", async (req, res, next) => {
    res.status(200).json({message: "Welcome to RESTFul API - NodeJS"});
})

// Receive requests
app.use("/category", CategoryRouter);
app.use("/comment", CommentRouter);
app.use("/product", ProductRouter);
app.use("/customer", CustomerRouter);
app.use("/api/auth", AuthRouter);

// Them middlewares kiem soat request, response loi cho web server
app.use(async (req, res, next) => {
    next(httpErrors.BadRequest());
})

app.use(async (err, req, res, next) => {
    res.status = err.status || 500;
    res.send({
        status: err.status,
        message: err.message
    })
})

const port = process.env.PORT_NUMBER || 8080;
const hostname  = process.env.HOST_NAME;

app.listen(port, hostname, () => {
    console.log(`Server running at: http://${hostname}:${port}`);
    Db.connectDb();
})
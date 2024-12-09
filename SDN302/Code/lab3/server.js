const express = require('express');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const httpErrors = require("http-errors");
//Template

require('dotenv').config();

const db = require('./models/index');
const CategoryRouter = require('./routes/category.route');
const ProductRouter = require('./routes/product.route');
const CustomerRouter = require('./routes/customer.route');

const app = express()
//Template

app.use(bodyParser.json());
app.use(morgan("dev"));
//Template


app.get("/", async (req, res, next) => {
    res.status(200).json({ message: "Welcome to RESTFull Api - NodeJs" });
})


//Routes
app.use("/category", CategoryRouter);
app.use("/product", ProductRouter);
app.use("/customer", CustomerRouter);;



app.use(async (req, res, next) => {
    next(httpErrors.BadRequest("Error: Bad request"));
})

app.use(async (err, req, res, next) => {
    res.status = err.status || 500;
    res.send({
        "error": {
            "status": err.status || 500,
            "message": err.message
        }
    })
})

const HOST = process.env.HOSTNAME
const PORT = process.env.PORT || 8080


app.listen(PORT, HOST, () => {
    console.log(`Server running at:  http://localhost:${PORT}`);
    db.connectDb();
});
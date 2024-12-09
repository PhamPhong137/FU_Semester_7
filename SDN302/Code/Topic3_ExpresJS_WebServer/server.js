const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const httpErrors = require("http-errors");
const productRouter = require("./routes/product.route");
const categoryRouter = require("./routes/category.route");
// const cors = require("cors");

// Khai bao thong tin cau hinh cho web server 
const hostname = "localhost";
const port = 9999;

// Khoi tao 1 Express web server
const app = express();

// Them cac middlewares cho web server -> Kiem soat cac requests, responses
app.use(bodyParser.json());
app.use(morgan("dev"));

// Thuc thi cac request va response boi web server: Root router
app.get("/", async (req, res, next) => {
    res.status(200).send("<html><body><h1>Welcome to Express server</h1></body></html>")
});

app.get("/get/:id/:name", async (req, res, next) => {
    res.status(200).send(`Product by Id: ${req.params.id} ~ Product name: ${req.params.name}`);
});

app.get("/get-all", async (req, res, next) => {
    res.send({"message": "All content"});
});

app.use("/product", productRouter);
app.use("/category", categoryRouter);


// Them middleware de kiem soat request sai yeu cau
app.use(async (req, res, next) => {
    next(httpErrors.BadRequest("Bad request"));
});

app.use(async (err, req, res, next) => {
    res.status = err.status;
    res.send({"error" : {"status": err.status, "message": err.message}});
})

app.listen(port, hostname, () => {
    console.log(`Server running at: http://${hostname}:${port}`);
});
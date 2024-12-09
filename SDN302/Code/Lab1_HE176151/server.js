const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const httpErrors = require("http-errors");
const studentRouter = require('./student.route.js');

// Khai bao thong tin cau hinh cho web server 
const hostname = "localhost";
const port = 9999;

// Khoi tao 1 Express web server
const app = express();

// Them cac middlewares cho web server -> Kiem soat cac requests, responses
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/", async (req, res, next) => {
    res.send({ "result": "Welcome to Express web server" });
});

app.use('/student', studentRouter);


// Them middleware de kiem soat request sai yeu cau
app.use(async (req, res, next) => {
    next(httpErrors.BadRequest("Bad request"));
});

app.use(async (err, req, res, next) => {
    res.status = err.status;
    res.send({ "error": { "status": err.status, "message": err.message } });
})

app.listen(port, hostname, () => {
    console.log(`Server running at: http://${hostname}:${port}`);
});
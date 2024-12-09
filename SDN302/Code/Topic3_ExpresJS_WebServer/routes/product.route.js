const express = require("express");
const bodyParser = require("body-parser");

//Khai báo doi tuong router
const productRouter = express.Router();

//Them middleware router
productRouter.use(bodyParser.json());

//Cach 1
productRouter.route("/")
    .all(async (req, res, next) => {
        res.statusCode = 200;
        next();
    })
    .get(async (req, res, next) => {
        try {
            res.status(200).send({ messsage: " Get suceed" });
        } catch (error) {
            next(error);
        }
    })
    .post(async (req, res, next) => {
        try {
            res.status(201).send({
                result: {
                    id: req.body.id,
                    name: req.body.name,
                    price: req.body.price,
                },
                messsageL: "update success"
            });
        } catch (error) {
            next(error);
        }
    })
    .put(async (req, res, next) => {
        try {
            res.status(201).send({
                result: {
                    id: req.body.id,
                    name: req.body.name,
                    price: req.body.price,
                },
                messsageL: "update success"
            });
        } catch (error) {
            next(error);
        }
    })

module.exports = productRouter


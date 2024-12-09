const express = require("express");
const { json } = require("body-parser");
const data = require('./database.json');

const studentRouter = express.Router();
studentRouter.use(json());

studentRouter.get("/list", async (req, res, next) => {
    try {
        if (data.length > 0) {
            res.status(200).json(data.map((item) => ({
                "id": item.id,
                "fullname": item.fname + " " + item.lname,
                "age": item.age,
                "gender": item.sex ? "male" : "female"
            })));
        } else {
            res.status(404).json({ message: "No students exist" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

studentRouter.get("/detail/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const student = data.find((item) => item.id == id);
        if (student) {
            res.status(200).json(student);
        } else {
            if (isNaN(id)) {
                res.status(400).json({ message: "Id is not a number" });
            } else {
                res.status(404).json({ message: `Student with id = ${id} does not exist` });
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

studentRouter.get("/sort-by-name", async (req, res, next) => {
    try {
        const type = req.query.order;

        if (type === "asc") {
            data.sort((a, b) => a.fname.localeCompare(b.fname));
        } else if (type === "desc") {
            data.sort((a, b) => b.fname.localeCompare(a.fname));
        } else {
            return res.status(400).json({ message: "Invalid data sort criteria" });
        }
        res.status(200).json(data.map((item) => ({
            "id": item.id,
            "fullname": item.fname + " " + item.lname,
            "age": item.age,
            "gender": item.sex ? "male" : "female"
        })));

    } catch (error) {
        res.status(500).send(error);
    }
});



module.exports = studentRouter;








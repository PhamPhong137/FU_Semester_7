const express = require("express");
const bodyParser = require("body-parser");
const Db = require("../models");

const CommentRouter = express.Router();
CommentRouter.use(bodyParser.json());

// Create a new category:
CommentRouter.post("/create", async (req, res, next) => {
    try {
        // Get data from request object
        const { author, text, rating } = req.body;
        const newComment = new Db.Comments({ author, text, rating });

        // Insert one
        await newComment.save()
            .then(newDoc => {
                res.status(201).json({
                    message: "Create new comment successfully",
                    result: newDoc
                });
            })
    } catch (error) {
        next(error)
    }
})

module.exports = CommentRouter;
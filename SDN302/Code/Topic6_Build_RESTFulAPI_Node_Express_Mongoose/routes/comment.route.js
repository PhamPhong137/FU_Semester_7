const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");

const CommentRouter = express.Router();

CommentRouter.use(bodyParser.json());


CommentRouter.post("/create", async (req, res, next) => {
    try {
        const { author, text } = req.body;
        const newComment = await db.Comment.create({ author, text });

        //Insert one
        await newComment.save().then(newDoc => {
            res.status(201).json({
                message: "Comment created successfully",
                result: {
                    commentCode: newDoc._id,
                    text: newDoc.text
                }
            });
        });
    } catch (err) {
        next(err);
    }
});


module.exports = CommentRouter;
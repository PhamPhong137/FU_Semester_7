const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const commentSchema = new Schema({
    author: { type: String },
    text: { type: String },
    rating: { type: Number, enum: { values: [1, 2, 3, 4, 5], message: "Rating must be between 1 and 5" }, required: [true, "Rating is required"] },

}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: [true, "Author name is required"]
    },
    text: {
        type: String,
        required: [true, "Comment text is required"],
        max: [200, "Content max size 200 characters"]
    },
    rating: {
        type: Number,
        min: [1, "Value must be at least 1"],
        max: [5, "Value must be at most 5"],
        required: [true, "Rating is required"],
        enum: [1, 2, 3, 4, 5]
    }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

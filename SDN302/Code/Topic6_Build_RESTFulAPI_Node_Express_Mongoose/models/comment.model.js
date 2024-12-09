const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    author: String,
    text: {
        type: String,
        validate: {
            validator: function (v) {
                return v.length <= 100;
            },
            message: "Max length of text is 100 characters",
        },
    },
    rate: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
    }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
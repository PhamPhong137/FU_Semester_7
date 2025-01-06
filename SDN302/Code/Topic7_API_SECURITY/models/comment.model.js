const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    author: String,
    text: {
        type: String,
        validate: {
            validator: (v) => {
                return v.length <= 100;
            },
            message: "Max length are 100 characters"
        }
    },
    rating: {
        type: Number,
        enum: [1,2,3,4,5],
    }
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment; //export model
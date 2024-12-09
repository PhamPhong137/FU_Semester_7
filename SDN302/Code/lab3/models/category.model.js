const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        // required: [true, "Category name is required"],
        // minlength: [5, "Minimum length is 5 characters"],
        // maxlength: [10, "Maximum length is 10 characters"],
        // default: "Value",
        // trim: true,
        // lowercase: true,

        // uppercase: true,

        validate: {
            validator: function (v) {
                return v.length > 3;
            },
            message: "Length of name must be greater than 3"
        },
        unique: [true, "Category name is duplicate"]
    },

    description: {
        type: String
    }
});

const Category = mongoose.model("Category", categorySchema)

module.exports = Category;









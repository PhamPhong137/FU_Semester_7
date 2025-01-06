const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles"
    }]
}, {timestamps: true});

const User = mongoose.model("user", userSchema);

module.exports = User;
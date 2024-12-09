const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const userSchema = new Schema({
    name: {
        firtName: { type: String },
        lastName: { type: String },
        middleName: { type: String }
    },
    dateOfBirth: { type: Date },
    gender: {
        type: { type: String, enum: ["male", "female", "other"] },
        value: String
    },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "department" },
    account: {
        email: { type: String },
        password: { type: String },
    },
    dependents: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            fullname: { type: String },
            relation: { type: String },
        }
    ],
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],


}, { timestamps: true });

const employee = mongoose.model("employee", userSchema);

module.exports = employee;


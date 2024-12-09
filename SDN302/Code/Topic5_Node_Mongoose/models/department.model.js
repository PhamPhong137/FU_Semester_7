const mongoose = require("mongoose");

// Định nghĩa cấu trúc dữ liệu cho department
const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        floor:{
            type: Number,
            required: [true, "Floor is required"]
        },
        room: String
    }
}, {timestamps: true});

// Định nghĩa model cho department
const Department = mongoose.model("department", departmentSchema);

// Export model
module.exports = Department;
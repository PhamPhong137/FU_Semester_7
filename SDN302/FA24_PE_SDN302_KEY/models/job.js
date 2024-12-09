const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const jobSchema = new Schema({
    name: { type: String, required: [true, "Job name is required"] },
    issues: [
        {
            title: { type: String, required: [true, "Title is required"] },
            date: { type: Date, required: [true, "Date is required"] },
            isCompleted: { Type: Boolean }
        }
    ],
    startDate: { type: Date },
    endDate: { type: Date },

}, { timestamps: true });

const job = mongoose.model("job", jobSchema);

module.exports = job;


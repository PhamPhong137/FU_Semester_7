const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log("MongoDB connected successfully " + process.env.MONGO_URI.toString()))
    } catch (err) {
        next(err);
        process.exit();
    }
}

module.exports = connectDb;

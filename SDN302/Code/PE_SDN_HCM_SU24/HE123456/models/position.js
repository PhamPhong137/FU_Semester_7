const mongoose = require('mongoose');
const positionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String
});
module.exports = mongoose.model('Position', positionSchema);

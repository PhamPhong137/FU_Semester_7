const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const movieSchema = new Schema({
    title: { type: String, required: [true, "movie validation failed: title: The movie title is required"] },
    release: { type: Date },
    description: { type: String },
    producer: { type: Schema.Types.ObjectId, ref: "producer" },
    director: { type: Schema.Types.ObjectId, ref: "director" },
    genres: {
        type: [String],
        enum: {
            values: ["Action", "Drama", "Comedy", "Cartoon"],
            message: `{VALUE} is not a supported`

        }
    },
    stars: [{ type: Schema.Types.ObjectId, ref: "star" }],
}, { timestamps: true });

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;

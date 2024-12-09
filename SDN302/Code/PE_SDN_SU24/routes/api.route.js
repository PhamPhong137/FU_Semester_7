const express = require("express");
const db = require("../models");


const ApiRouter = express.Router();

// Create user
ApiRouter.post("/movie/create", async (req, res, next) => {
    try {
        const movie = await db.Movie.create(req.body);

        res.status(201).json({
            movie
        });

    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: error.message
            }
        })
    }
});

ApiRouter.get("/movie/list", async (req, res, next) => {
    try {
        const movies = await db.Movie.find({}).populate("producer").populate("director").populate("stars");
        const formattedMovies = movies.map(movie => ({
            _id: movie._id,
            title: movie.title,
            release: movie.release,
            description: movie.description,
            producer: movie.producer.name,
            director: movie.director.fullname,
            genres: movie.genres,
            stars: movie.stars.map(star => star.fullname),
        }));

        res.status(200).json({
            formattedMovies
        });


    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: error.message
            }
        })
    }
});

ApiRouter.get("/movie/by-star/:starId", async (req, res, next) => {
    try {
        const { starId } = req.params;
        const star = await db.Star.findById(starId);
        if (!star) {
            return res.status(500).json({
                error: {
                    status: 500,
                    message: "This movie star does not exist"
                }
            })
        }

        const movies = await db.Movie.find({ stars: starId }).populate("producer").populate("director").populate("stars");

        const formattedMovies = movies.map(movie => ({
            _id: movie._id,
            title: movie.title,
            release: movie.release,
            description: movie.description,
            producer: movie.producer.name,
            director: movie.director.fullname,
            genres: movie.genres,
            stars: movie.stars.map(star => star.fullname),
        }));

        res.status(200).json(formattedMovies);

    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: error.message
            }
        })
    }
});

ApiRouter.get("/movie/count-by-director/:directorName", async (req, res, next) => {
    try {
        const { directorName } = req.params;
        const director = await db.Director.findOne({ fullname: directorName })

        if (!director) {
            return res.status(500).json({
                error: {
                    status: 500,
                    message: "This director does not exist"
                }
            })
        }

        const countMovies = await db.Movie.countDocuments({ director: director._id });

        res.status(200).json({
            director: directorName,
            count: countMovies
        });

    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: error.message
            }
        })
    }
});

ApiRouter.put("/movie/:movieId/add-stars", async (req, res, next) => {
    try {
        const { movieId } = req.params;
        const stars = req.body;
        const movie = await db.Movie.findById(movieId);

        const newStars = stars.filter(starId => !movie.stars.includes(starId))

        movie.stars.push(...newStars);
        await movie.save();

        res.status(200).json(movie);

    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: error.message
            }
        })
    }
});







module.exports = ApiRouter;

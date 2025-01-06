const createHttpError = require("http-errors");
const Db = require("../models")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Actions:
async function signUp(req, res, next) {
    try {
        if (req.body) {
            const newUser = new Db.Users({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, parseInt(process.env.PASSWORD_KEY)),
                email: req.body.email
            });

            if (req.body.roles) {
                // Admin add new user
                const roles = await Db.Roles.find({ name: { $in: req.body.roles } }).exec();
                // Update new user
                newUser.roles = roles?.map(r => r._id);
                await Db.Users.create(newUser)
                    .then(addedUser => res.status(201).json({
                        message: "Registered successfully",
                        addedUser: addedUser
                    }));

            } else {
                // Guest registration
                const role = await Db.Roles.findOne({ name: "member" }).exec();
                newUser.roles = [role._id];
                await Db.Users.create(newUser)
                    .then(addedUser => res.status(201).json({
                        message: "Registered successfully",
                        addedUser: addedUser
                    }));

            }
        }
    } catch (err) {
        next(err);
    }
}

async function signIn(req, res, next) {
    try {
        if(!req.body.username || !req.body.password) {
            throw createHttpError.BadRequest("Username or password is required!");
        }

        const existUser = await Db.Users.findOne({username: req.body.username}).populate("roles").exec();
        if(!existUser) {
            throw createHttpError.NotFound(`Username: ${req.body.username} not registered`);
        }
        // Compare password
        const isMatchPassword = bcrypt.compareSync(req.body.password, existUser.password);
        if (!isMatchPassword) {
            throw createHttpError.Unauthorized("Incorrect password!");
        }

        const token = jwt.sign({accId: existUser._id}, process.env.ACCESSTOKEN_KEY, {
            algorithm: process.env.ALGORITHMS,
            expiresIn: process.env.EXP_IN,
        });

        const authorities = [];
        for (let i = 0; i < existUser.roles.length; i++) {
           authorities.push(`ROLE_${existUser.roles[i].name.toUpperCase()}`);
        }

        res.status(200).json({
            message: "Login successfully",
            userInfo: {
                username: existUser.username,
                email: existUser.email,
            },
            token: token,
            authorities: authorities
        })
    } catch (err) {
        next(err);
    }
}

const AuthController = {
    signUp,
    signIn,
}

module.exports = AuthController;
const jwt = require("jsonwebtoken");
const Db = require("../models");
const createHttpError = require("http-errors");

// Middlewares kiem soat xac thuc token tu client app
const verifyToken = async (req, res, next) => {
    // Lay du lieu tu Request Headers
    const receiveToken = req.headers["x-access-token"] || req.headers["authorization"]?.split(" ")[1];

    if (!receiveToken) {
        throw createHttpError.BadRequest("No token provide");
    }

    // Xac thuc token co hop le khong?
    jwt.verify(receiveToken, process.env.ACCESSTOKEN_KEY, (err, decoded) => {
        if (err) {
            // throw createHttpError.BadRequest(err.message);
            return res.status(401).send({ message: "Unauthorized!" });
        }
        // Bo sung thuoc tinh cho request
        req.userId = decoded.accId;
        next();
    })
}

const isMember = async (req, res, next) => {
    try {
        const existUser = await Db.Users.findById(req.userId).exec();
    if (!existUser) {
        throw createHttpError.NotFound("This account not registered!");
    }
    const roles = await Db.Roles.find({ _id: { $in: existUser.roles } }).exec();

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "member") {
            next();
            return;
        }
    }

    throw createHttpError.Forbidden("Forbidden: Not 'member' role!");
    } catch (error) {
        next(error);
    }
}

const isManager = async (req, res, next) => {
    try {
        const existUser = await Db.Users.findById(req.userId).exec();
    if (!existUser) {
        throw createHttpError.NotFound("This account not registered!");
    }
    const roles = await Db.Roles.find({ _id: { $in: existUser.roles } }).exec();

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "manager") {
            next();
            return;
        }
    }

    throw createHttpError.Forbidden("Forbidden: Not 'member' role!");
    } catch (error) {
        next(error);
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const existUser = await Db.Users.findById(req.userId).exec();
    if (!existUser) {
        throw createHttpError.NotFound("This account not registered!");
    }
    const roles = await Db.Roles.find({ _id: { $in: existUser.roles } }).exec();

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return;
        }
    }

    throw createHttpError.Forbidden("Forbidden: Not 'member' role!");
    } catch (error) {
        next(error);
    }
}

const VerifyAuth = {
    verifyToken,
    isMember,
    isManager,
    isAdmin,
}

module.exports = VerifyAuth;
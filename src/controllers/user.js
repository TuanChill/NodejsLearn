const User = require("../models/user");
const userSchema = require("../utils/validator/schemas");
const {checkSameEmail} = require("../utils/validator/validator");
const {createToken} = require("./tokenHandler");

const signUp = async (req, res, next) => {

    //  check user email already exists in database
    const foundUser = await User.findOne({email: req.body.email});
    if (foundUser) {
        const err = new Error("Email already exists");
        err.status = 302;
        next(err);
    }

    // pre save to database: hash password

    //  create new user and save to database
    const newUser = await new User(req.body);
    await newUser.save();

    //  create token
    const token = createToken(newUser._id);
    res.setHeader("Authorization", token)
    res.status(201).json({
        status: 201,
        success: true,
        user: newUser
    });
};

const login = async (req, res, next) => {
};

const secretHandler = async (req, res, next) => {
};

module.exports = {
    login,
    signUp,
    secretHandler,
};

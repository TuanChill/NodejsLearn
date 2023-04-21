const createError = require("http-errors");

const User = require("../models/user");
const {createToken} = require("./tokenHandler");
const {userValidate, userSignUpSchema} = require("../helpers/validator");
const signUp = async (req, res, next) => {

    const { firstName, lastName, email, phoneNumber,  birthday, gender, password} = req.body;

    // pre validate before save to database
    const {error} = userValidate(userSignUpSchema, req.body);

    if(error) {
        throw createError(400, error);
    }

    //  check user email already exists in database
    const foundUser = await User.findOne({email: email});
    if (foundUser) {
        throw createError(409, `${email} already exists`);
    }


    //  create new user and save to database
    const newUser = await new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        birthday,
        gender,
        password,
    });
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

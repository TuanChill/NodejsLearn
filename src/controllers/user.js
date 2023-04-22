const createError = require("http-errors");

const {User} = require("../models/user");
const {userValidate, userSignUpSchema, userSignInSchema} = require("../helpers/validator");
const {signAccessToken} = require("../services/jwt");

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

    const {email, password} = req.body;

    // validate data user input
    const {error} = await userValidate(userSignInSchema, req.body);
    if (error) {
        throw createError(400, error);
    }

    // check user email exists in database
    const user = await User.findOne({email: email});
    if (!user) {
        throw createError(404, "User not found");
    }

    // compare password user input and password in database
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw createError(401, "Invalid password");
    }

    const accessToken  = await  signAccessToken(user._id);

    res.setHeader("Authorization", `Bearer ${accessToken}`);
    return res.status(200).json({
        status: 200,
        success: true,
        message: "Login successfully",
    });
};

const secretHandler = async (req, res, next) => {
};

module.exports = {
    login,
    signUp,
    secretHandler,
};

const express = require("express");
const { signUp, login, secretHandler } = require("../controllers/user");
const {validateBody} = require("../utils/validator/validator");
const {userSignInSchema, userSignUpSchema} = require("../utils/validator/schemas");

const authRoute = express.Router();

// userRoute.route("/users").get(getUser).post(createUser);

authRoute.route("/signup").post( validateBody(userSignUpSchema), signUp);

authRoute.route("/login").post(validateBody(userSignInSchema) ,login);

authRoute.route("/logout").post();

authRoute.route("refresh-token").post();

authRoute.route("/secret").post(secretHandler);

module.exports = authRoute;

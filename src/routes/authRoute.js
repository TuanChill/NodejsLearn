const express = require("express");
const {signUp, login, secretHandler} = require("../controllers/user");

const authRoute = express.Router();

// userRoute.route("/users").get(getUser).post(createUser);

authRoute.route("/signup").post(signUp);

authRoute.route("/login").post(login);

authRoute.route("/logout").post();


authRoute.route("refresh-token").post();

authRoute.route("/secret").post(secretHandler);

module.exports = authRoute;

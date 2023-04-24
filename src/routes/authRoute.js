const express = require("express");
const {signUp, login, refreshTokenHandler, logout} = require("../controllers/user");

const authRoute = express.Router();


authRoute.route("/signup").post(signUp);

authRoute.route("/login").post(login);

authRoute.route("/refresh-token").post(refreshTokenHandler);

authRoute.route("/logout").delete(logout);




module.exports = authRoute;

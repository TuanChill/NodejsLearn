// config env
require('dotenv').config();

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
require("express-async-errors");

const authRoute = require("./src/routes/authRoute");
require("./src/helpers/connectDB_mongo.js");
const {errHandler, notFoundHandler} = require("./src/middlewares/errHandler");


const app = express();
const PORT = process.env.PORT || 5001;

//Set up


// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({extended: true})); // convert data to json

// Routes
app.use('/user', authRoute);

//Catch 404 Errors and forward them to error handler
app.use(notFoundHandler);

//Error handler function
app.use(errHandler);

//Start server
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});


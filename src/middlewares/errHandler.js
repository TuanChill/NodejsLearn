const express = require("express");
const createError = require("http-errors");

const notFoundHandler = (req, res, next) => {
    const err = createError(404, `Not Found ${req.originalUrl}`);
    next(err);
};

const errHandler = (err, req, res, next) => {
    const error = express().get("env") === "development" ? err : {};
    const status = err.status || 500;

    //response to client
    return res.status(status).json({
        error: {
            status: status,
            message: error.message,
        },
    });
};


module.exports = {errHandler, notFoundHandler};

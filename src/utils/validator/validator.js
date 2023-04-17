const Joi = require("joi");
const User = require("../../models/user");
const validateBody = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 401,
                message: error.message,
            });
        }
        next();
    }
};


module.exports = {validateBody};
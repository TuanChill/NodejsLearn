const Joi = require("joi");

const userSignUpSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string()
        .required()
        .pattern(new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/))
        .max(11)
        .min(10),
    gender: Joi.string().allow(null, "male", "female"),
    birthday: Joi.date().max("now"),
    password: Joi.string().required().min(6),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
});

const userSignInSchema = Joi.object({
    email: Joi.string().email(),
    phoneNumber: Joi.string(),
    password: Joi.string().required().min(6),
}).xor("email", "phoneNumber");

module.exports = {userSignInSchema, userSignUpSchema};
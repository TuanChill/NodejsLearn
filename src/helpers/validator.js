const Joi = require("joi");

const userSignUpSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().pattern(new RegExp('gmail.com$')).required(),
    phoneNumber: Joi.string()
        .required()
        .pattern(new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/))
        .max(11)
        .min(10),
    gender: Joi.string().allow( "male", "female").required(),
    birthday: Joi.date().max("now"),
    password: Joi.string().required().min(6).max(20),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
});

const userSignInSchema = Joi.object({
    email: Joi.string().email(),
    phoneNumber: Joi.string(),
    password: Joi.string().required().min(6),
}).xor("email", "phoneNumber");

const userValidate = (schema, data) => {
    return schema.validate(data);
};

module.exports = {userSignInSchema, userSignUpSchema, userValidate};
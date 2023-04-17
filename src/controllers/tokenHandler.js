const jwt = require("jsonwebtoken");

const createToken = (userId) =>  jwt.sign({
    iss: 'tuan chill',
    sub: userId,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 3),
}, process.env.SECRET_KEy);

module.exports = {
    createToken,
};
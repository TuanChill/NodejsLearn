const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const crypto = require('crypto');

        process.env.ACCESS_TOKEN_SECRET = crypto.randomBytes(32).toString('hex');
        const payload = {
            userId,
        }
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: '7d'
        }

        jwt.sign(payload, secret, options, (err, token) => {
            if (err) reject(err);
            resolve(token);
        })
    });
};

module.exports = {
    signAccessToken,
}
const jwt = require("jsonwebtoken");
const createError = require('http-errors');
const ms = require('ms');

const client = require('../helpers/connectRedis');

const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {

        const payload = {
            userId,
        }
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: '10h'
        }

        jwt.sign(payload, secret, options, (err, token) => {
            if (err) reject(err);
            resolve(token);
        })
    });
};

const signRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {

        const payload = {
            userId,
        }
        const secret = process.env.REFRESH_TOKEN_SECERT;
        const options = {
            expiresIn: '7d',
        }

        // convert to seconds
        const ttlSeconds = Math.floor(ms(options.expiresIn) / 1000);

        jwt.sign(payload, secret, options, (err, token) => {
            if (err) reject(err);

            // set and save refresh token in redis database
            client.set(userId.toString(), token.toString(), {
                EX: ttlSeconds,
            }, (err, reply) => {
                if (err) return reject(createError(500, 'Internal Server Error'));
            });
            resolve(token);
        })
    });
};

const verifyAccessToken = async (req, res, next) => {
    if (!req.header['Authorization']) {
        throw createError(401, 'Unauthorized');
    }

    const authHeader = req.header['Authorization'];

    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    //start verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            throw createError(401, `${err.name}: ${err.message}`);
        }
        req.payload = payload;

        next();
    })
}

const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECERT, async (err, payload) => {
            if (err) return reject(err);

            // check refresh token exits in database
            try {
                const res = await client.get(payload.userId.toString())

                if (refreshToken === res)
                   return resolve(payload);

                reject(createError(401, "Unauthorized!"));

            } catch (err) {
                reject(createError(500, 'Internal Server Error'));
            }
        });
    });
}

module.exports = {
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
}
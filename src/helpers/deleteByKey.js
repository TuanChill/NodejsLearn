const client = require('./connectRedis');
const createError = require('http-errors');

const deleteByKey = (key) => {
    return new Promise((resolve, reject) => {
        client.del(key, (err, reply) => {
            if (err) throw createError(500, 'Internal Server Error');
        })
        resolve();
    })
}

module.exports = deleteByKey;
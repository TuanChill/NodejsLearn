const crypto = require('crypto');

process.env.ACCESS_TOKEN_SECRET = crypto.randomBytes(32).toString('hex');
process.env.REFRESH_TOKEN_SECERT = crypto.randomBytes(32).toString('hex');


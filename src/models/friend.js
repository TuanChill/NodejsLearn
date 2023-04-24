const mongoose = require('mongoose');
const mongoDB = require("../helpers/connectMongo");

const {Schema, model} = mongoose;

const friendSchema = new Schema({
    friendId: [{type: Schema.Types.ObjectId, ref: 'user'}],
});

const Friend = mongoDB.model('friend', friendSchema);

module.exports = Friend;
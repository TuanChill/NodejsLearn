const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const friendSchema = new Schema({
    friendId: [{type: Schema.Types.ObjectId, ref: 'user'}],
});

const Friend = model('friend', friendSchema);

module.exports = Friend;
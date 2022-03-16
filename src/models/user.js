const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: String,
    googleID: String,
    thumbnail: String,
}, { timestamps: true });

module.exports = mongoose.model('user', UserSchema);

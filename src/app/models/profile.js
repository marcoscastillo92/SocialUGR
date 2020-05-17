const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const profileSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    birthDate: Date,
    bios: String,
    following: Array,
    followers: Array,
    username: String,
    image: String
});

module.exports = mongoose.model('profiles', profileSchema);
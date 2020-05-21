const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const profileSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    birthDate: Date,
    bios: String,
    gender: String,
    following: Array,
    followers: Array,
    username: String,
    email: String,
    image: { type: String, default: __dirname + "../imgs/perfil.jpg" },
    landscape: { type: String, default: __dirname + "../imgs/paisaje.jpg" }
});

module.exports = mongoose.model('Profile', profileSchema, 'profiles');
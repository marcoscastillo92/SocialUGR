const path = require('path');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProfileSchema = new Schema ({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    birthDate: {type: Date, required: true},
    bios: {type: String, required: true},
    following: {type: Array},
    followers: {type: Array},
    username: {type: String, required: true},
    image: {type: String, default: __dirname + "../imgs/perfil.png"}
});

module.exports = mongoose.model('Profile', ProfileSchema);
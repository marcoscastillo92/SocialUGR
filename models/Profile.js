const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProfileSchema = new Schema ({
    username: {type: String, required: true},
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    birthDate: {type: Date, default: Date.now },
    bios: {type: String},
    following: {type: Array},
    followers: {type: Array},
    email: {type: String},
    gender: {type: String},
    image: {type: String, default: __dirname + "../imgs/perfil.png"},
    landscape: {type: String, default: __dirname + "../imgs/paisaje.png"}
});

module.exports = mongoose.model('Profile', ProfileSchema, 'profiles');
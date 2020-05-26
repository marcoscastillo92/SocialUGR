const mongoose = require('mongoose');

const authenticationSchema = new mongoose.Schema({
    username: String
});

module.exports = mongoose.model('Authentication', authenticationSchema, 'authentications');
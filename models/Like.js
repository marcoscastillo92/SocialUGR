const mongoose = require('mongoose');
const { Schema } = mongoose;

const LikeSchema = new Schema ({
    username: {type: String, required: true},
    date: {type: Date, default: Date.now },
    idPost: {type: String, required: true},
    idLike: {type: String, required: true}
});

module.exports = mongoose.model('Like', LikeSchema);
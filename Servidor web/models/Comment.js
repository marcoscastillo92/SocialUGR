const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema ({
    username: {type: String, required: true},
    comment: {type: String, required: true},
    date: {type: Date, default: Date.now },
    idPost: {type: String, required: true},
    likes: {type: Array},
    idComment: {type: String, required: true}
});

module.exports = mongoose.model('Comment', CommentSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema ({
    username: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now},
    fecha: {type: String},
    likes: {type: Array},
    image: {type: String, required: true},
    likesLong: {type: Number},
    comentLong: {type: Number},
    comentarios: {type: Object}
});

module.exports = mongoose.model('Post', PostSchema, 'posts');
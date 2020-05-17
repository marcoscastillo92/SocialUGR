const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema ({
    username: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now },
    idPost: {type: String, required: true},
    likes: {type: Array},
    image: {type: String, required: true}
});

module.exports = mongoose.model('Post', PostSchema);
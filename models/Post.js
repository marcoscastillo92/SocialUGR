const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema ({
    username: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now },
    idPost: {type: String, required: true},
    likes: {type: Array},
    comments: {type:Array},
    image: {type: String, required: true},
    type: {type:String, required: true},
    profileImage: String
});

module.exports = mongoose.model('Post', PostSchema);
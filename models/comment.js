const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    // comment belong to a user
    user: {
        type: mongoose.Schema.Types.objectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.objectId,
        ref: 'Post' 
    }
},{
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post).then(function(post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }).then(async function(comment){
                post.comments.push(comment);
                await post.save();

                return res.redirect('/');
            }).catch(function(error){
                console.log('Error in creating comment: ', error);
            });
        }
    }).catch(function(error){
        console.log('Error in finding post by given id: ', error);
    });
}
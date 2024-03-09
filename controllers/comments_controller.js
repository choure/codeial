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
        console.log('Error in finding post by given id when creating: ', error);
    });
}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id).then(function(comment){
        let postId = comment.post;
        Post.findById(postId).then(function(post){
            if(post.user == req.user.id || comment.user == req.user.id) {
                //comment.remove();
                Comment.deleteOne({_id: req.params.id}).then(function(comment){
                    Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}).then(function(post){
                        return res.redirect('back');
                    }).catch(function(error){console.log('Error in finding and updating Post comments id, ', error); return;});
                }).catch(function(error){console.log('Error in deleting comment: ', error); return;});
            } else {
                return res.redirect('back');
            }
        })
        
    }).catch(function(error){console.log('Error in finding comment by given id when deleting: ', error); return;});
}
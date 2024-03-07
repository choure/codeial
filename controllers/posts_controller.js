const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(function(post) {
        return res.redirect('back');
    }).catch(function(err) {
        console.log('Error in creating post', err);
    });
}

module.exports.destroy = function(req, res) {
    Post.findById(req.params.id).then(function(post) {
        // only those user can delete the post, who had created it...
        // .id means converting the object id into string, given by mongoose
        if(post.user == req.user.id) {
            Post.deleteOne({_id: req.params.id}).then(function(post) {
                Comment.deleteMany({post: req.params.id}).then(function(comment) {
                    return res.redirect('back');
                }).catch(function(err) {console.log('Error in deleting post comments:', err);});
            }).catch(function(err) {console.log('Error in deleting post:', err);});
        }
    }).catch( (err) => {console.log('Error in finding post to delete:', err);});
}

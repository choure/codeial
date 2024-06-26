const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res) {
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user.id
        });

        if(req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate([{path: 'user', select: 'name'}]);
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }
    
        req.flash('success', 'Post published!');

        return res.redirect('back');
    } catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res) {
    try {
        let post = await Post.findById(req.params.id)

        // only those user can delete the post, who had created it...
        // .id means converting the object id into string, given by mongoose

        if(post.user == req.user.id) {
            await Post.deleteOne({_id: req.params.id});

            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted!"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }else {
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }
    }catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

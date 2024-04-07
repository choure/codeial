class PostComments{
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        // let self = this;
        // $(' .delete-post-comment', this.postContainer).each(function(){
        //     self.deleteComment($(this));
        // });
    }

    createComment(postId) {
        let pSelf = this;
        this.newCommentForm.submit(function(event){
            event.preventDefault();
            let self = this;

            $.ajax({
                type: 'POST',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment){
        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(`<li id="comment-${ comment._id }">
                        <p>
                            
                            <small>
                                <a class="delete-comment-button" href="/comments/destroy/${ comment._id }">X</a>
                            </small>

                            ${ comment.content }
                            <br>
                            <small>
                                ${ comment.user.name }
                            </small>
                        </p>    

                </li>`);
    }
}
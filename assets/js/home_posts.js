{
    //method to submit the form data for new post using AJAX
    let createPost = function() {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(event) {
            event.preventDefault();

            $.ajax({
                method: "POST",
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    // console.log(data.data.post[0].user.name);
                    // new post is in form of array with single object
                    let newPost = newPostDom(data.data.post[0]);
                    $('#posts-list-container>ul').prepend(newPost);

                    //to hndle delete for newly created post from ajax request
                    //$(' selector', dom) -> find all the selected tags in that dom
                    deletePost($(' .delete-post-button', newPost));
                }, error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                        
                        <small>
                            <a class="delete-post-button"  href="/posts/destroy/${ post._id }">x</a>
                        </small>
                       
                        ${ post.content }
                        <br>
                        <small>
                            ${ post.user.name }
                        </small>
                    </p>
                    <div class="post-comments">
                        
                            <form action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${ post._id }" >
                                <input type="submit" value="Add Comment">
                            </form>
               
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                                
                            </ul>
                        </div>
                    </div>
                    
                </li>`)
    } 

    //method to delete a post from DOM 
    let deletePost = function(deleteLink) {
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'GET',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function(err){
                    console.log(err.responseText);
                }
            });

        });
    }

    //handle delete event when page gets refreshed 
    $(' .delete-post-button').click(function(event){
        event.preventDefault();
        $.ajax({
            type: 'GET',
            url: $(this).prop('href'),
            success: function(data){
                console.log(data);
                $(`#post-${data.data.post_id}`).remove();
            }, error: function(err){
                console.log(err.responseText);
            }
        });
    });

 
    
    createPost();
}
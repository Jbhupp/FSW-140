import Post from './Post';
import PostForm from './PostForm';

function PostList(props){
    return(
        <div>
            <h1>Welcome!</h1>
            <PostForm addPost = {props.addPost} />
            <ul>
                {props.post?.map((post) => {
                    return(
                        <Post post = {post} key = {post.id} deletePost = {props.deletePost} addPost = {props.addPost} updatePost = {props.updatePost}/>
                    )
                })}
            </ul>
        </div>
    )
}


export default PostList
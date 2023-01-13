import './App.css';
import React, { useState} from 'react';
import PostList from'./PostList';



function App() {

  const [post, setPost] = useState([]);
  const addPost = text => {

  var newPost = {text: text};
  const updatePost = [...post, newPost];

  setPost(updatePost);
  }

  const deletePost = id => {
    const tempPost = [...post];
    const newPost = tempPost.filter((post) => post.id !== id);

    setPost(newPost);
  }

  const updatePost = (update, id) => {
    const tempPost = [...post];
    const editedPost = tempPost.findIndex((post) => post.id === id);
    tempPost[editedPost].text = update

    setPost(editedPost);
  }

  return (
    <div className="App">
      <PostList Post = {post} key = {post.id} deletePost = {deletePost} addPost = {addPost} updatePost = {updatePost}/>
    </div>
  );
}

export default App;

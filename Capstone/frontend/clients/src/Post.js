import {useState } from "react"
import PostForm from "./PostForm"

function Post({post, deletePost, updatePost, addPost}){
    const initialInputs = {text:""}
    const [input, setInput] = useState(initialInputs)

    const [updateToggle, setUpdateToggle] = useState(true)
    const handleChange = (e) => {
        var {value, title, description, image_url} = e.target
        setInput({
            ...input, 
            [title]: value,
            [description]: value,
            [image_url]: value,
        })
    }

    const handleSubmit = (update) => {
        updatePost(update, post.id)
        setUpdateToggle(prevToggle => !prevToggle)
    }

    return(
        <li> 
            {!updateToggle ?
            <> 
            <PostForm addPost = {handleSubmit} updatePost = {setUpdateToggle}/>
            <button onClick= {()=> setUpdateToggle(prevToggle => !prevToggle)}> 
                Close
            </button>
            </>   
            :
            <>
            <div>
                <label htmlFor = {"post-" + post.id}> {post.text}</label>
                <button onClick = {() => deletePost(post.id)}> X </button>
                <button onClick= {()=> setUpdateToggle(prevToggle => !prevToggle)}> 
                    Edit
                </button>
            
            </div>
            </> 
        }
        </li>
    )
}

export default Post
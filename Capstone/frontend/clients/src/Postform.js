import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function PostForm({addPost, setEditToggle}){

    //const initialInputs = {text: ''}
    const [description, setDescription] = useState(" ")
    const [url, setUrl] = useState(" ")
    const [post, setPost] = useState([])
    const [name, setName] = useState(" ")
    const [current, setCurrent] = useState(" ")
    const [gender, setGender] = useState(" ")
    const [appearances, setAppearances] = useState(" ")

    useEffect(() =>{
        getData()
    }, []
    )

    const getData = async() => {
        let result =  await axios.get("getPost")
        setPost(result.data)

    
    }

    const handleSubmit = async() => {
        
        const postInfo = {
            
            description: description,
            url : url,
            name: name,
            current : current,
            gender: gender,
            appearances: appearances,
        }
        axios.post("/insertNewPost", postInfo).then(res => {
            console.log(res); 
            getData()
        })
    }    

    return(
        <div className= "design"> 
            <form onSubmit = {handleSubmit}>
                <input onChange={e=>setDescription(e.target.value)}
                type = "text" placeholder='Description'/>
                <input onChange = {e=>setUrl(e.target.value)}
                type = "file" accept='image/*'/>
                <input onChange = {e=>setName(e.target.value)}
                type = "text" placeholder='Name'/>
                <input onChange = {e=>setCurrent(e.target.value)}
                type = "text" placeholder='Current'/>
                <input onChange = {e=>setGender(e.target.value)}
                type = "text" placeholder='Gender' />
                <input onChange = {e=>setAppearances(e.target.value)}
                type = "text" placeholder='Appearances'/>
                <button type='Submit'> Submit </button>
            </form>

            <main>
                {post.map(post =>(
                    <div key={post.postID}>
                        <div src= {post.url} alt= {post.description}> </div>
                        <p> {post.description} </p>
                        <p> {post.name} </p>
                        <p> {post.Current} </p>
                        <p> {post.Gender} </p>
                        <p> {post.Appearances} </p>

                    </div>
                ))}
            </main>

        </div>
    )

}

export default PostForm
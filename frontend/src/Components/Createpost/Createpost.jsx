import React, { useState } from 'react'
import './createpost.scss'
import { createPost } from '../../Helper'
import { useNavigate } from 'react-router-dom'

function Createpost() {
    const [image, setImage] = useState()
    const [heading, setHeading] = useState()
    const [content, setContent] = useState()
   const navigate = useNavigate()

    const  imageHandler=async(e)=>{
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload=()=>{
            setImage(reader.result)
        } 
    }
    const submitHandler = (e)=>{
        e.preventDefault()
        createPost(heading,content,image)
        navigate('/profile')
    }
    return (
        <div className='createpost'>
            <form action="">
                <input type="text" placeholder='title' className='title' onChange={e=>setHeading(e.target.value)}/>
                <textarea name="" id="" cols="30" rows="10" placeholder='Post Content'  onChange={e=>setContent(e.target.value)}/>
                <input type="file" placeholder='Banner' className='banner' onChange={e=>{imageHandler(e)}}/>
                {
                    image &&
                    <img src={image} alt="" />
                }
                <button onClick={e=>{submitHandler(e)}}>Create Post</button>

            </form>
        </div>
    )
}

export default Createpost

import React, { useEffect, useState } from 'react'
import './home.scss'
import { Link } from 'react-router-dom'
import { getPosts, getUser } from '../../Helper'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Loading from '../Loading/Loading'
const baseUrl = 'http://localhost:5000'


function Post({ url, heading, content, id, date, userid }) {


  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(false)

  // const getUserData = async () => {
  //   setLoading(true)
  //   const { data } = await axios.get(`${baseUrl}/user/${userid}`, {
  //     withCredentials: true,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   setLoading(false)
  //   console.log("user data ")
  //   console.log(data)
  //   return data.user[0]
  // }
  // useEffect(async () => {
  //   const data =  getUserData();

  //   setUser(data)
  // },[loading])


  return <>
    {

      // loading ?


      // <h1>Loading</h1>
      // :

      // user &&
      < Link className='post' to={`/post/${id}`}>
        <div className="postInfo">
          {/* <img src={user.avatar.url} alt="auther" /> */}
          <div>
            {/* <p className='auther'>{user.name}</p> */}
            <p className='date'>{date.split('T')[0]}</p>
          </div>
        </div>
        <div className="post-content">
          <div className="content">
            <h2 className='title'> {heading}</h2>
            <p className="reading">{content.slice(0, 80)}...</p>
          </div>
          {
            url &&
            <img src={url} alt="Post Image" />
          }
        </div>
      </ Link>


    }
  </>
}


function Home() {
  const { posts } = useSelector(state => state.allposts)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <>

      <div className="home" >
        <div className="posts">

          {
            posts ?
            posts.posts.map(item => {
              return (

                <Post
                  url={item.avatar ? item.avatar.url : null}
                  heading={item.heading}
                  content={item.content}
                  id={item._id}
                  userid={item.user}
                  date={item.date}
                  key={item._id}
                />
              )
            }
            )
            :
            <Loading/>

          }
        </div>
      </div>

    </>

  )
}

export default Home

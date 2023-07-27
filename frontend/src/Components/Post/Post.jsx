import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './post.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../../Helper'
import Loading from '../Loading/Loading'
import Login from '../Login/Login'

function Post() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { post, loading } = useSelector(state => state.singlePost)
  const { isAuthenticated } = useSelector(state => state.userProfile)

  useEffect(() => {
    dispatch(getPost(id))
    console.log(post)
    console.log(loading)
  }, [])
  return (
    isAuthenticated ?
      <>
        {
          loading ?
            <Loading />
            :
            post &&
            <div className='user-posts'>
              <h1 className='notloginMessage'></h1>
              <div className="heading">
                <h1>{post.post.heading}</h1>
                <div className="info">
                  <Link>
                    <img src={post.user.avatar.url} alt="" />
                  </Link>
                  <p className='auther'> {post.user.name} </p>
                  <p className='date'>{post.post.date.split('T')[0]}</p>
                </div>
                <img src={post.post.avatar.url} alt="" />
              </div>
              <div className="post-content">
                <p>
                  {post.post.content}
                </p>
              </div>

              <Link className="userInfo" to={`/user/${post.user._id}`}>
                <h1>Posted By</h1>
                <img src={post.user.avatar.url} alt="" />
                <div className='info'>
                  <h2>{post.user.name}</h2>
                  <span>
                  On <h3>{post.post.date.split('T')[0]}</h3>

                  </span>
                </div>
              </Link>
            </div>

        }

      </>
      :
  <Login/>
  )
}

export default Post

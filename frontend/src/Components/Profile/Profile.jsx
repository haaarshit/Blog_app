import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './profile.scss'
import { deletePost, logout, profile } from '../../Helper'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'

function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, mydata } = useSelector(state => state.userProfile)
  const { isAuthenticated } = useSelector(state => state.userLogin)
  const logOutHandler = () => {
    dispatch(logout())
    dispatch(profile())
  }


  const deletePostHandler = (id) => {
    console.log(id)
    deletePost(id);
    dispatch(profile());
  }

  useEffect(() => {
    dispatch(profile())
    if (!mydata) {
      navigate('/')
    }
  }, [isAuthenticated])
  return <>

    {
      loading ?
        <Loading />
        :
        (
          mydata ?
            <div className="profile">
              <div className='infobox'>
                <div className="userinfo">
                  <img src={mydata.user.avatar.url} alt="" />
                  <h4 className='name'>{mydata.user.name}</h4>
                  <button onClick={logOutHandler}>Logout</button>
                </div>
                <div className="userstats">
                  <h1>User stats</h1>
                  <div className="postcount">
                    Total post
                    <h2>{mydata.posts.length}</h2>
                  </div>
                  <div className="addPost">
                    <Link to='/createpost'>Create a post</Link>
                  </div>
                </div>

              </div>
              <div className="profileposts">
                <h1>Your Blogs</h1>
                <div>

                  {
                    mydata.posts.map(item => {
                      return (



                        <div className='profilepost'>
                          <Link to={`/post/${item._id}`}>
                            <h1>{item.heading.slice(0, 30)}..</h1>
                            <p>{item.content.slice(0, 50)}..</p>
                            {
                              item.avatar &&
                              <img src={item.avatar.url} alt="" />
                            }
                          </Link>
                          <button onClick={e => { deletePostHandler(item._id) }}>Delete Post</button>
                        </div>

                      )
                    })
                  }
                </div>
              </div>
            </div>
            :
            <div className='pleaselogin'>
              <h1>Please login or Create Account</h1>
            </div>
        )
    }

  </>

}

export default Profile

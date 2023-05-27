import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getUser } from '../../Helper'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading/Loading'

function User() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userdata, loading } = useSelector(state => state.getUser)
    const { mydata } = useSelector(state => state.userProfile)

    const { id } = useParams()
    useEffect(() => {
        dispatch(getUser(id))
    }, [])
    
    const isLoggedUser = ()=>{
        
        if (mydata.user._id == userdata.user._id) {
            navigate('/profile')
        }
   }

    return <>

        {
            loading ?
                <Loading />
                :
                userdata &&
                (
                    
                    <div className="profile" onLoad={isLoggedUser}>
                        <div className='infobox'>
                            <div className="userinfo">
                                <img src={userdata.user.avatar.url} alt="" />
                                <h4 className='name'>{userdata.user.name}</h4>
                            </div>
                            <div className="userstats">
                                <h1>User stats</h1>
                                <div className="postcount">
                                    Total post
                                    <h2>{userdata.posts.length}</h2>
                                </div>
                            </div>

                        </div>
                        <div className="profileposts">
                            <h1>{userdata.user.name}'s Blogs</h1>
                            <div>

                                {
                                    userdata.posts.map(item => {
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
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                )
        }
    </>
}

export default User

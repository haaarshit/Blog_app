import React, { useState } from 'react'
import './header.scss'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Header({ darkmode, styles }) {


    const OpenNav = () => {
        document.getElementById("myNav").style.width = "100%";
        document.getElementById("myNav").style.height = "100%";
        document.getElementById("openbtn").style.opacity = 0;

    }
    const closeNav = () => {

        // document.getElementById("myNav").style.width = "40%";
        document.getElementById("myNav").style.height = "0%";
        setTimeout(() => {
            document.getElementById("openbtn").style.opacity = 1;

        }, 400);
        setTimeout(() => {
            document.getElementById("openbtn").style.opacity = 1;

            document.getElementById("myNav").style.height = "0%";
        }, 1000);
    }

    const { mydata, loading } = useSelector(state => state.userProfile)
    const { isAuthenticated } = useSelector(state => state.userLogin)


    return (
        <>
            <div className="header" style={styles}>
                <div className="logo">BLOG</div>

                {

                    <div className="login" >
                        {
                            !loading &&
                            <>
                                {

                                    !mydata ?
                                        <>
                                            <Link to="/login" style={{ color: styles.color }}>Login</Link>
                                            <Link to="/register" style={{ color: styles.color }}>Register</Link>
                                        </>

                                        :

                                        <>
                                            <Link to='/'>Home</Link>
                                            <Link to='/profile'>
                                                <img src={mydata.user.avatar.url} alt="" />
                                            </Link>
                                        </>
                                }
                            </>
                        }
                    </div>
                }

            </div>


        </>
    )

}

export default Header
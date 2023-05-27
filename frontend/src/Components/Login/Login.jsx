import React, { useEffect, useState } from 'react'
import './login.scss'
import { login, profile } from '../../Helper'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'

function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))

    }
    const { isAuthenticated, loading } = useSelector(state => state.userLogin)

    useEffect(() => {
        if (isAuthenticated == true) {
            dispatch(profile())
            navigate('/profile')
        }
    }, [isAuthenticated])
    
    
    return <>
    {
        loading ?
      <Loading/>
        :
        (
            <div className='login-form' >
                <div className="form">
                    <h1>Login </h1>
                    <form action="" onSubmit={e => submitHandler(e)}>

                        <div className='input-field'>
                            <input type="text" name="email" className='input' required="required" value={email} onChange={e => setEmail(e.target.value)} />
                            <label className='label'>Email</label>
                        </div>
                        <div className='input-field'>
                            <input type="password" name="password" className='input' required="required" value={password} onChange={e => setPassword(e.target.value)} />
                            <label className='label'>Password</label>
                        </div>
                        <button type='submit'>Login</button>
                    </form>
                </div>

            </div>
        )
        
    }

    </>
}
export default Login

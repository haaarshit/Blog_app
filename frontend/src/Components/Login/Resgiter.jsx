import React, { useEffect, useState } from 'react'
import './login.scss'
import { profile, register } from '../../Helper'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Resgiter() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [image,setImage] = useState("")

    const submitHandler =(e) => {
       e.preventDefault()
       dispatch(register(name,email,password,image))
    }

    const  imageHandler=async(e)=>{
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload=()=>{
            setImage(reader.result)
        } 
    }
    const { isAuthenticated } = useSelector(state => state.userLogin)

    useEffect(() => {
        if (isAuthenticated == true) {
            dispatch(profile())
            navigate('/profile')
        }
    }, [isAuthenticated])
    
    return (

        <div className='login-form'>
            <div className="form">
                <h1>Resgiter</h1>
                <form>

                    <div className='input-field'>
                        <input type="text" name="name" id="" className='input'  required="required" onChange={e=>{setName(e.target.value)}} value={name} />
                        <label htmlFor="email" className='label'>Name</label>
                    </div>
                    <div className='input-field'>
                        <input type="email" name="emailadd" id="" className='input'  required="required"  onChange={e=>{setEmail(e.target.value)}} value={email}/>
                        <label htmlFor="emailadd" className='label'>Email</label>
                    </div>
                    <div className='input-field'>
                        <input type="password" name="password" id="" className='input'  required="required"  onChange={e=>{setPassword(e.target.value)}} value={password}/>
                        <label htmlFor="password" className='label'>Password</label>
                    </div>
                    <div className='input-field img-input'>
                        <input type="file" name="password" id="" className='input'onChange={e=>imageHandler(e)} />
                        {
                            image&&
                            <img src={image} alt="" />
                        }
                    </div>
                    <button onClick={(e)=>submitHandler(e)}>Register</button>
                </form>
            </div>

        </div>

    )
}

export default Resgiter

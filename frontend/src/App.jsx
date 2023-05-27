import './App.scss'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Resgiter from './Components/Login/Resgiter'
import { useEffect, useState } from 'react'
import Header from './Components/Header/Header'
import {  useDispatch, useSelector } from 'react-redux'
import { profile } from './Helper'
import Profile from './Components/Profile/Profile'
import Post from './Components/Post/Post'
import Createpost from './Components/Createpost/Createpost'
import Loading from './Components/Loading/Loading'
import User from './Components/User/User'
import Footer from './Components/Footer/Footer'


function App() {
  const [darkmode,setDarkmode] = useState(false)
  const dispatch = useDispatch()
  const styles ={
    color:darkmode?"white":"black",
    backgroundColor:darkmode?"#060706f7":"white",
  }


  useEffect(()=>{
    dispatch(profile())
  },[dispatch])
  return (
    <>
    <Router>
      <Header darkmode={darkmode} styles={styles}/>
      <Routes>
        <Route path='/' element={ <Home  styles={styles}/>}/>
        <Route path='/login' element={ <Login styles={styles}/>}/>    
        <Route path='/register' element={ <Resgiter/>}/>
        <Route path='/register' element={ <Resgiter/>}/>
        <Route path='/profile' element={ <Profile/>}/>
        <Route path='/post/:id' element={ <Post/>}/>
        <Route path='/createpost' element={ <Createpost/>}/>
        <Route path='/user/:id' element={ <User/>}/>
      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App

import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';


export const Navbar = () => {
  const[check,setCheck]=useState(localStorage.getItem("login"))
  const navigate=useNavigate();
  useEffect(()=>{
    if(!check){
      navigate("/")
    }
  },[check])

    const logout=()=>{
      localStorage.removeItem("login");
      setCheck(false)
    }
  return (
    <div style={{display:"flex",width:"100%",margin:"auto",justifyContent:"space-between",fontSize:"30px",fontWeight:"500",backgroundColor:"rgb(24,24,24)",color:"white",padding:"10px 30px"}}>
       {localStorage.getItem("login")?<h1>Profile</h1>:<Link to="/register">Sign Up</Link>}
       {localStorage.getItem("login")?<h1 onClick={logout}>Logout</h1>:<Link to="/"><h1>Login</h1></Link>}

    </div>
  )
}
import React from 'react'
import { useState } from 'react';
import { useNavigate,Navigate } from 'react-router-dom';
import axios from "axios";
import { useEffect } from 'react';
const Dashboard = () => {
  const[details,setDetails]=useState(null)
  const navigate=useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("login")){
      navigate("/")
    }
  },[])
    const FetchUser= async ()=>{
        try {
          let res = await axios.get(`https://cointabbackend-0bio.onrender.com/users/profile/${localStorage.getItem("id")}`);
           res=res.data
           setDetails(res.msg)
          }
        catch (error) {
          alert(error.response.data.msg)
      }
    }

    useEffect(()=>{
     FetchUser()
    },[])

    // if(!token){
    //   return <Navigate to="/login"/>
    // }
  return (
    <div style={{width:"95%",margin:"auto",marginTop:"20px",display:"flex",justifyContent:"space-between"}}>
      {details &&<> <div>{`Welcome to ${details.name}`}</div>
      <div>{`Your email ${details.email}`}</div></>}
    </div>
  )
}

export default Dashboard

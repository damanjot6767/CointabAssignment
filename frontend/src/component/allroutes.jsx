import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './Auth/login';
import { Signup } from './Auth/signup';
import Dashboard from './UserBugs/dashboard';
const Allroutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/register" element={<Signup/>}></Route>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
    </div>
  )
}

export default Allroutes

import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Splash from '../styles/Splash'

const UserLayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default UserLayout
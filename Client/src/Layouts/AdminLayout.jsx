import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Slidebar from '../components/Slidebar'
import Splash from '../styles/Splash'
const AdminLayout = () => {
  return (
    <>
    <Navbar/>
    <div className='flex'>
      <Slidebar/>
      <div className='flex-1 w-full'>
    <Outlet/>
    </div>
    </div>
    
    </>
  )
}

export default AdminLayout
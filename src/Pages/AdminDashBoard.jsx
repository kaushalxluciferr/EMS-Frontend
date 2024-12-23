import React from 'react'
import { useAuth } from '../context/AuthContext'
import AdminSidebar from '../components/Dashboard/AdminSidebar'
import Navbar from '../components/Dashboard/Navbar'
import AdminDetails from '../components/Dashboard/AdminDetails'
import { Outlet } from 'react-router-dom'
function AdminDashBoard() {

  const {user,loading}=useAuth()
  return (
    <div className='flex'>
     <AdminSidebar/>
     <div className='flex-1 ml-64 '><Navbar/>
     <Outlet/>
     </div>
    </div>
  )
}

export default AdminDashBoard

import React from 'react'
import Sidebar from '../components/EmpDashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Dashboard/Navbar'

function EmployeeDashboard() {
  return (
    <div className='flex'>
     <Sidebar/>
     <div className='flex-1 ml-64 '><Navbar/>
     <Outlet/>
     </div>
    </div>
  )
}

export default EmployeeDashboard

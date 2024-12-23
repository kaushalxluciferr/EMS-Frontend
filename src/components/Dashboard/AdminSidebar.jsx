import React from 'react'
import {NavLink} from 'react-router-dom' 
import {FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUser} from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
function AdminSidebar() {
  return (
    <div className='fixed bg-[#1e1b4b] text-white h-screen left-0 top-0 bottom-0 space-y-2 w-64'>
      <div className='bg-gray-600 h-12 flex items-center justif-center'><h3 className='text-2xl text-center font-pacific' >Employee MS</h3></div>
      <div className='px-4'>
<NavLink to="/admin-dashboard" className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
<FaTachometerAlt/>
    <span>DashBoard</span>
</NavLink>
<NavLink to="/admin-dashboard/employees"  className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
<FaUser/>
    <span>Employees</span>
</NavLink>

<NavLink to="/admin-dashboard/departments" className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
<FaBuilding/>
    <span>Departments</span>
</NavLink>
<NavLink to={`/admin-dashboard/leaves`} className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
<FaCalendarAlt/>
    <span>Leaves</span>
</NavLink>
<NavLink to="/admin-dashboard/salary/add" className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
<FaMoneyBillWave/>
    <span>Salary</span>
</NavLink>
<NavLink to="/admin-dashboard/settings" className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
<FaCogs/>
    <span>Setting</span>
</NavLink>

      </div>
    </div>
  )
}

export default AdminSidebar

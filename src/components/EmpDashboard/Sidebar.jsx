import React from 'react'
import {NavLink} from 'react-router-dom' 
import {FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUser} from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
function Sidebar() {
  const {user}=useAuth()
  return (
    <div className='fixed bg-[#1e1b4b] text-white h-screen left-0 top-0 bottom-0 space-y-2 w-64'>
      <div className='bg-gray-600 h-12 flex items-center justif-center'><h3 className='text-2xl text-center font-pacific' >Employee MS</h3></div>
      <div className='px-4'>
<NavLink to="/employee-dashboard" className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
<FaTachometerAlt/>
    <span>DashBoard</span>
</NavLink>
<NavLink to={`/employee-dashboard/profile/${user._id}`}  className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
<FaUser/>
    <span>My Profile</span>
</NavLink>

<NavLink to={`/employee-dashboard/leaves/${user._id}`} className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
<FaBuilding/>
    <span>Leaves</span>
</NavLink>

<NavLink to={`/employee-dashboard/salary/${user._id}`} className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
<FaMoneyBillWave/>
    <span>Salary</span>
</NavLink>
<NavLink to="/employee-dashboard/setting" className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
<FaCogs/>
    <span>Setting</span>
</NavLink>

      </div>
    </div>
  )
}

export default Sidebar

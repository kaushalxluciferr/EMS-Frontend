import React from 'react'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
    const {user,logout}=useAuth()
  return (
    <div className='flex text-white px-5 justify-between items-center h-12 bg-gray-600'>
      <p className=' font-bold text-[20px]'>Welcome {user.role}</p>
      <button className='px-4 py-2 bg-red-700 rounded-[10px]  hover:bg-red-900'
      onClick={logout}
      >Logout</button>
    </div>
  )
}

export default Navbar

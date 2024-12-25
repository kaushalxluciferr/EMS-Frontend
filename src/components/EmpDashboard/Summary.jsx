import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

function Summary() {
const {user}=useAuth()
  return (
    <div className='rounded flex bg-white p-16'>
      <div className={` bg-yellow-600 text-3xl flex justify-center items-center  text-white px-4`}>
     <FaUser/>
      </div>
      <div className='pl-4 py-1'>
        <p className='text-lg font-semibold'>Welcome Back</p>
        <p className='text-xl font-bold'>{user.name}</p>
      </div>
    </div>
  )
}

export default Summary

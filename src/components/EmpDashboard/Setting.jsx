import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

function Setting() {
const {user}=useAuth()
const [setting,setsetting]=useState({
    userId:user._id,
    oldpass:"",
    newpass:"",
    confirmpass:"",
})
const navigate=useNavigate()


const handlechange=(e)=>{
    const{name,value}=e.target
    setsetting({...setting,[name]:value})
}

const handlesubmit=async (e)=>{
    e.preventDefault()
    if(setting.newpass!==setting.confirmpass)
    {
        toast.error("password is not matched")
    }
    else{
        try{
const response=await axios.put("http://localhost:4000/api/setting/change-password",setting,{
    headers:{
        "Authorization":`Bearer ${localStorage.getItem('token')}`,
    }
})
if(response.data.success)
{
    navigate("/employee-dashboard")
    toast.success("changed sucessfully")
}
        }catch(error)
        {
toast.error(error.message)
        }
    }
}


  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-6'>Change Password</h2>
<form onSubmit={handlesubmit}>
    {/* for old part */}
    <div>
        <label className='text-sm font-medium text-gray-700'>
            Old Password
        </label>
        <input type="text"
         name="oldpass"
         placeholder='Enter Your Old Pass'
         onChange={handlechange}
         className='mt-1 w-full p-2 border border-gray-300 rounded-md'
         required
         />
    </div>
    {/* new pass */}
    <div>
        <label className='text-sm font-medium text-gray-700'>
            New Password
        </label>
        <input type="text"
         name="newpass"
         placeholder='Enter Your new Pass'
         onChange={handlechange}
         className='mt-1 w-full p-2 border border-gray-300 rounded-md'
         required
         />
    </div>
    {/* confirm pas */}
    <div>
        <label className='text-sm font-medium text-gray-700'>
            Confirm Password
        </label>
        <input type="text"
         name="confirmpass"
         placeholder='Confirm Your Pass'
         onChange={handlechange}
         className='mt-1 w-full p-2 border border-gray-300 rounded-md'
         required
         />
    </div>
    <button
    
    type='submit'
    className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
    >Change Pass</button>

    </form>     
    </div>
  )
}

export default Setting

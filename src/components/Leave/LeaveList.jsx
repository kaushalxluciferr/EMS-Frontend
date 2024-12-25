import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

function LeaveList() {
const {user}=useAuth()
  const[leaves,setleaves]=useState([])
  let sn=1;
const {_id}=useParams()
const fetchLeave=async()=>{
try{
  const response=await axios.get(`https://employee-api-mu.vercel.app/api/leave/${_id}`,{
      headers:{
       "Authorization":`Bearer ${localStorage.getItem("token")}`,
      }
  })
  if(response.data.success)
  {
      setleaves(response.data.leaves)
  }
  
}catch(error)
{
  toast.error(error.message)
}
}


useEffect(()=>{
fetchLeave()
},[])


  return (
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Leaves</h3>
      </div>
      <div className='flex justify-between items-center'>
         <input type="text"
         placeholder='Search leave'
         className='px-5 py-1 border' />
         {user.role==="admin"?"":(
  <Link 
  to="/employee-dashboard/add-leave"
  className='px-5 py-1 bg-teal-600 text-white rounded'
  >
  Add new Leave
  </Link>)}
      </div>

      <table className='w-full text-sm text-left text-gray-500 mt-5'>
    <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
        <tr>
            <th className='px-6 py-3'>SNO</th>
            <th className='px-6 py-3'>Leave Type</th>
            <th className='px-6 py-3'>From</th>
            <th className='px-6 py-3'>To</th>
            <th className='px-6 py-3'>Description</th>
            <th className='px-6 py-3'>Applied Date</th>
            <th className='px-6 py-3'>Status</th>
        </tr>
    </thead>
    <tbody >
        {leaves.map((leave)=>(
            <tr
            key={leave._id}
            className='border-b bg-white dark:bg-gray-800 dark:border-gray-700'>
            <td className='text-white px-6 py-3'>{sn++}</td>
            <td className='text-white px-6 py-3'>{leave.leavetype}</td>
            <td className='text-white px-6 py-3'>{new Date(leave.startdate).toLocaleDateString()}</td>
            <td className='text-white px-6 py-3'>{new Date(leave.enddate).toLocaleDateString()}</td>
            <td className="px-6 py-3">
    <div className="w-40 h-10 overflow-auto text-white break-all">
        {leave.reason}
    </div>
</td>
            <td className='text-white px-6 py-3'>{new Date(leave.appliedAt).toLocaleDateString()}</td>
            <td className='text-white px-6 py-3'>{leave.status}</td>
            </tr>
        ))}
    </tbody>
</table>
      
    </div>
  )
}

export default LeaveList

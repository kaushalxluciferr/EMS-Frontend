import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddLeave() {
const {user}=useAuth()
const navigate=useNavigate()
const [leave,setleave]=useState({
    userId:user._id,

})


    const handlechange=(e)=>{
const {name,value}=e.target
setleave((prevState)=>({...prevState,[name]:value}))
    }

const handlesubmit=async (e)=>{
e.preventDefault()
try {
    const response = await axios.post(
        `https://employee-api-mu.vercel.app/api/leave/add`,leave,
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

    if (response.data && response.data.success) {
        navigate(`/employee-dashboard/leaves/${user._id}`)
    } else {
        toast.error("Failed to fetch employee details");
    }
} catch (error) {
    toast.error(error.message);
}
}


  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
     <h2 className='text-2xl font-bold mb-6'>Request For Leave</h2>
     <form onSubmit={handlesubmit}>
        <div className='flex flex-col space-y-4'>
<div>
    <label className='block text-sm font-medium text-gray-700'>
        Leave Type
    </label>
    <select name="leavetype"
    onChange={handlechange}
    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
    required>
<option value="">select leave</option>
<option value="sick leave">Sick Leave</option>
<option value="casual leave">Casual Leave</option>
<option value="annual leave">Annula Leave</option>
    </select>
</div>
<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
{/* form date */}
<div>
<label className='block text-sm font-medium text-gray-700'>From date</label>
<input type="date"
name='startdate'
onChange={handlechange}
className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
required
/>
</div>
{/* to date */}
<div>
<label className='block text-sm font-medium text-gray-700'>Till date</label>
<input type="date"
name='enddate'
onChange={handlechange}
className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
required
/>
</div>
{/* description for leave */}
</div>
<div>
<label className='block text-sm font-medium text-gray-700'>DEscription</label>
<textarea
name='reason'
placeholder='Give Your Reason Here'
onChange={handlechange}
className='p-4 w-full border border-gray-300'
></textarea>
</div>

        </div>
        <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>
            Apply Leave
        </button>
     </form>
    </div>
  )
}

export default AddLeave

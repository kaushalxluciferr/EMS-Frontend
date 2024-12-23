import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios';
function AddDepartment() {

    const navigate=useNavigate();
    const [department,setdepartment]=useState({
        dep_name:'',
        description:''
    })

const handlechange=(e)=>{
const {name,value}=e.target
setdepartment({...department,[name]:value})

}

const handlesubmit=async (e)=>{
e.preventDefault()
try{
const response=await axios.post('http://localhost:4000/api/department/add',department,{
   headers:{ "Authorization":`Bearer ${localStorage.getItem('token')} `
}
})
if(response.data.success)
{
navigate("/admin-dashboard/departments")
}

}catch(error)
{
    toast.error(error.message)
}

}

  return (
    <div className='mx-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
     <div className='text-2xl font-bold mb-6'>
        <h3>Add A New Department </h3>
        <form onSubmit={handlesubmit} >
            <div>
                <label 
                className='text-sm font-medium text-gray-700'
                 htmlFor="dep_name">Department</label>
                   <input type="text" 
                   name='dep_name' 
                   onChange={handlechange}
                   className='mt-1 w-full p-1 border border-gray-300 rounded-md' required placeholder='Enter Department:' />
            </div>
            <div className='mt-3'>
                <label htmlFor="descripyion"
                className='block text-sm font-medium text-gray-700'
                >Description</label>
                <textarea name='description'
                rows="4"
                onChange={handlechange}
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                placeholder='Enter something about Department'></textarea>
            </div>
            <button
            type='submit'
            className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded '
            >Add Department</button>
        </form>
     </div>
    </div>
  )
}

export default AddDepartment

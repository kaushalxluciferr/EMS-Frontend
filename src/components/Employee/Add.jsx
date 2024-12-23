import React, { useEffect, useState } from 'react'
import { fetchDepartment } from '../../utils/EmployeeHelper'
import  {toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Add() {
    const [formdata,setformdata]=useState({})
const [departments,setdepartments]=useState([])
useEffect(()=>{
    const getDepartments=async ()=>{
        const departments=await fetchDepartment()
        setdepartments(departments)
    }
    getDepartments()
},[])
const navigate=useNavigate()

const handlechange=(e)=>{
const {name,value,files}=e.target

if(name==='image')
{
    setformdata((prevData)=>({...prevData,[name]:files[0]}))
}else{
    setformdata((prevData)=>({...prevData,[name]:value}))
}
}

const handlesubmit=async (e)=>{
e.preventDefault()  //it will refresh again and again if we dont use this
const formDataObj=new FormData()
Object.keys(formdata).forEach((key)=>{
    formDataObj.append(key,formdata[key]) 
})
try{
const response=await axios.post('http://localhost:4000/api/employee/add',formDataObj,{
    headers:{
        "Authorization":`Bearer ${localStorage.getItem('token')}`
    }
})
if(response.data.success)
{
navigate('/admin-dashboard/employees')
}
}catch(error)
{
 toast.error(error.message)   
}
}


  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6'>Add New Employee</h2>
        <form onSubmit={handlesubmit}>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

{/* name section here */}
<div>
    <label className='block text-sm font-medium text-gray-700'>
        Name:
    </label>
    <input type="text" name='name'
    placeholder='Enter Name' 
    onChange={handlechange}
    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
    required
    />
</div>

{/* email section starts here */}
<div>
    <label className='block text-sm font-medium text-gray-700'>
        Email:
    </label>
    <input type="email" name='email'
    placeholder='Enter email'
    onChange={handlechange}
    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
    required
    />
</div>

{/* Employee id */}

<div>
    <label className='block text-sm font-medium text-gray-700'>
        Employee ID:
    </label>
    <input type="text" name='employeeId'
    placeholder='Enter Employee-ID:' 
    onChange={handlechange}

    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
    required
    />
</div>
{/* password */}

<div>
    <label className='block text-sm font-medium text-gray-700'>
       password:
    </label>
    <input
    onChange={handlechange}

    placeholder='Enter Password'
    type="password" name='password'
    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
    required
    />
</div>

{/* Gender */}
<div>
    <label className='block text-sm font-medium text-gray-700'>
        Gender:
    </label>
    <select name="gender" 
    onChange={handlechange}

    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
    required
    >
<option value="">select  Gender</option>
<option value="male">Male</option>
<option value="female">Female</option>
<option value="other">other</option>
    </select>
</div>
{/* date of brith */}

<div>
    <label className='block text-sm font-medium text-gray-700'>
        Date Of Birth:
    </label>
    <input type="date" name='dob'
    onChange={handlechange}

    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
    required
    />
</div>



{/* Matritak status */}
<div>
    <label className='block text-sm font-medium text-gray-700'>
        Marital Status
    </label>
    <select name="maritalstatus"
    onChange={handlechange}

    placeholder='Marital Status' 
    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
    required
    >
<option value="">select  status</option>
<option value="single">single</option>
<option value="Married">Married</option>
    </select>
</div>
{/* department */}
<div>
    <label className='block text-sm font-medium text-gray-700'>
        Select Department
    </label>
    <select 
    onChange={handlechange}

    name="department" 
    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
    required
    >
<option value="">select Department</option>
{departments.map((dep)=>(
    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
))}
    </select>
</div>
{/* salary */}

<div>
    <label className='block text-sm font-medium text-gray-700'>
        salary:
    </label>
    <input
    onChange={handlechange}

    placeholder='Enter salary'
    type="number" name='salary'
    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
    required
    />
</div>

{/* Designation */}


<div>
    <label className='block text-sm font-medium text-gray-700'>
        Designation:
    </label>
    <input
    onChange={handlechange}
    placeholder='Enter Designation'
    type="text" name='designation'
    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
    required
    />
</div>



{/* Role */}
<div>
    <label className='block text-sm font-medium text-gray-700'>
        Role:
    </label>
    <select name="role" 
    onChange={handlechange}

    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
    required
    >
<option value="">select  role</option>
<option value="admin">Admin</option>
<option value="employee">Employee</option>
    </select>
</div>
{/* Upload image */}
<div>
    <label className='block text-sm font-medium text-gray-700'>
       Upload Image:
    </label>
    <input
    placeholder='Upload Image '
    onChange={handlechange}

    type="file" name='image'
    accept='image/'
    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
    required
    />
</div>
 </div>
 <button
 className='text-white font-bold py-2 px-4 w-full mt-6 bg-teal-600 hover:bg:teal-700 rounded-md'
 >Add Employee</button>
        </form>
    
    </div>
  )
}

export default Add

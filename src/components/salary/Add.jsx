import React, { useEffect, useState } from 'react'
import { fetchDepartment, fetchEmployees } from '../../utils/EmployeeHelper'
import  {toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
function Add() {
    const {_id}=useParams()
    const navigate=useNavigate()


const [employee,setEmployee]=useState({
    employeeId:null,
    basicsalary:0,
    allowances:0,
    deductions:0,
    paydate:null,
})
const [departments,setdepartments]=useState([])
const [employees,setemployees]=useState([])


useEffect(()=>{
    const getDepartments=async ()=>{
        const departments=await fetchDepartment()
        setdepartments(departments)
    }
    getDepartments()
},[])

const handledep=async (e)=>{
const emps=await fetchEmployees(e.target.value)
setemployees(emps)
}




const handlechange=(e)=>{
const {name,value}=e.target
setEmployee((prevData)=>({...prevData,[name]:value}))
}



const handlesubmit=async (e)=>{
e.preventDefault()  //it will refresh again and again if we dont use this

try{
const response=await axios.post(`https://employee-api-mu.vercel.app/api/salary/add`,employee,{
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
console.log(employees);


  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6'>Add Salary</h2>
        <form onSubmit={handlesubmit}>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>


{/* department */}
<div>
    <label className='block text-sm font-medium text-gray-700'>
        Select Department
    </label>
    <select 
    onChange={handledep}
value={employee.department}
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

{/* name of employee */}
<div>
    <label className='block text-sm font-medium text-gray-700'>
        Employee
    </label>
    <select 
    onChange={handlechange}
    name="employeeId" 
    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
    required
    >
<option value="">select Employee</option>
{employees.map((emp)=>(
    <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
))}
    </select>
</div>



{/* salary */}

<div>
    <label className='block text-sm font-medium text-gray-700'>
        Basic salary:
    </label>
    <input
    onChange={handlechange}
    placeholder='Basic salary '
    type="number" name='basicsalary'
    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
    required
    />
</div>

{/* Allowance */}


<div>
    <label className='block text-sm font-medium text-gray-700'>
        Allowances:
    </label>
    <input
    onChange={handlechange}
    placeholder='Enter Allowances:'
    type="number" name='allowances'
    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
    required
    />
</div>

{/* deduction part */}
<div>
    <label className='block text-sm font-medium text-gray-700'>
        deduction:
    </label>
    <input
    onChange={handlechange}
    placeholder='Enter Deduction:'
    type="number" name='deductions'
    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
    required
    />
</div>

{/* paydate part */}
<div>
    <label className='block text-sm font-medium text-gray-700'>
        paydate:
    </label>
    <input
    onChange={handlechange}
    type="date" name='paydate'
    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
    required
    />
</div>





 </div>
 <button
 className='text-white font-bold py-2 px-4 w-full mt-6 bg-teal-600 hover:bg:teal-700 rounded-md'
 >Update Employee</button>
        </form>
    
    </div>
  )
}

export default Add

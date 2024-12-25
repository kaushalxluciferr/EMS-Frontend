import React, { useEffect, useState } from 'react'
import { fetchDepartment } from '../../utils/EmployeeHelper'
import  {toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
function Edit() {
    const {_id}=useParams()
    const navigate=useNavigate()


const [employee,setEmployee]=useState({
    name:'',
    maritalstatus:'',
    designation:'',
    salary:'',
    department:'',
})
const [departments,setdepartments]=useState([])
useEffect(()=>{
    const getDepartments=async ()=>{
        const departments=await fetchDepartment()
        setdepartments(departments)
    }
    getDepartments()
},[])



useEffect(()=>{
    const GetEmployee = async () => {
        try {
            const response = await axios.get(
                `https://employee-api-mu.vercel.app/api/employee/${_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data && response.data.success) {
                const employee=response.data.employee
                setEmployee((prev)=>({...prev,name:employee.userId.name,maritalstatus:employee.maritalstatus,designation:employee.designation,salary:employee.salary,department:employee.department}));
            } else {
                toast.error("Failed to fetch employee details");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    GetEmployee()
},[])



const handlechange=(e)=>{
const {name,value}=e.target
setEmployee((prevData)=>({...prevData,[name]:value}))
}

const handlesubmit=async (e)=>{
e.preventDefault()  //it will refresh again and again if we dont use this

try{
const response=await axios.put(`https://employee-api-mu.vercel.app/api/employee/${_id}`,employee,{
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
        <h2 className='text-2xl font-bold mb-6'>Edit Your Employee</h2>
        <form onSubmit={handlesubmit}>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

{/* name section here */}
<div>
    <label className='block text-sm font-medium text-gray-700'>
        Name:
    </label>
    <input type="text" name='name'
    value={employee?.name}
    placeholder='Enter Name' 
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
value={employee.maritalstatus}
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
{/* salary */}

<div>
    <label className='block text-sm font-medium text-gray-700'>
        salary:
    </label>
    <input
    onChange={handlechange}
value={employee.salary}
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
    value={employee.designation}
    placeholder='Enter Designation'
    type="text" name='designation'
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

export default Edit

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper'
import { toast } from 'react-toastify'
import axios from 'axios'
function List() {
const [filter,setfilter]=useState([])
const [employees,setemployees]=useState([])
const  [emload,setempload]=useState(false)
useEffect(()=>{
  const fetchEmployees=async ()=>{
    setempload(true)
    try{
  const response=await axios.get('http://localhost:4000/api/employee',{
    headers:{
      "Authorization":`Bearer ${localStorage.getItem('token')}`
    }
  })

  
  if (response.data && response.data.success) {
    let sno = 1;
    const data = response.data.employees.map((emp) => ({
      sno: sno++, // Assign serial number
      dep_name: emp.department.dep_name, // Department name
      name: emp.userId.name, // Employee's name
      dob: new Date(emp.dob).toLocaleDateString(), // Format date
      profileImage:<img width={"40px"} height={"40px"} style={{borderRadius: "50%"}} src={ `http://localhost:4000/${emp.userId.profileImage}`}/>, // Profile image URL
      action: <EmployeeButtons  _id={emp._id} />, // Action buttons
    }));
    setemployees(data); // Update state
    setfilter(data)
  }
  
    }catch(error)
    {
      toast.error(error.message);  }
  }
  fetchEmployees()
  },[]);

const handlefilter=(e)=>{
  const records=employees.filter((emp)=>(
    emp.name.toLowerCase().includes(e.target.value.toLowerCase())
  ))
  setfilter(records)
}


  return (
    <div className='p-5'>
         <div className='text-center'>
    <h3 className='text-2xl font-bold'>Manage Your Employee</h3>
    </div>
    <div className='flex justify-between items-center'>
      <input type="text" placeholder='Search your Employee' 
      onChange={handlefilter}
      className='px-4 py-0.5 border'
      />
      <Link to="/admin-dashboard/add-employee" className='px-4 py-1 text-white rounded bg-teal-600'>Add new Employee</Link>
    </div>
<DataTable columns={columns}
data={filter}
pagination
/>

    </div>
  )
}

export default List

import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper'
import axios from 'axios'
import { toast } from 'react-toastify'

function Department() {
const [fildep,setfildep]=useState([])

  const [departments,setdepartments]=useState([])
const [depLoading,setdeploading]=useState(false)

const ondepdelete = () => {
  fetchDepartment()

};
const fetchDepartment=async ()=>{
  setdeploading(true)
  try{
const response=await axios.get('http://localhost:4000/api/department',{
  headers:{
    "Authorization":`Bearer ${localStorage.getItem('token')}`
  }
})
console.log(response);

if( response.data&&response.data.success)
{
let sno=1;
const data=await response.data.departments.map((dep)=>({
  _id:dep._id,
  sno:sno++,
  dep_name:dep.dep_name,
  action:(<DepartmentButtons _id={dep._id} ondepdelete={ondepdelete} />)

}))
setdepartments(data)
setfildep(data)
}
  }catch(error)
  {
    toast.error("Failed to fetch departments");  }finally{
    setdeploading(false)
  }
}
useEffect(()=>{

fetchDepartment()
},[]);

//here by this method we can search the departmnet by their name 
const searchdep=(e)=>{
 const data=departments.filter((dep)=>
dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))  //filtering the data 
  setfildep(data)
}

  return (

    <>{depLoading? <div>
      loading....
    </div>:
    <div className='p-5'>
    <div className='text-center'>
    <h3 className='text-2xl font-bold'>Manage Your Department</h3>
    </div>
    <div className='flex justify-between items-center'>
      <input type="text" placeholder='Search By department' className='px-4 py-0.5 border'
      onChange={searchdep}
      />
      <Link to="/admin-dashboard/add-departments" className='px-4 py-1 text-white rounded bg-teal-600'>Add new Department</Link>
    </div>

<div>

<DataTable
columns={columns}
data={fildep}
pagination
/>
</div>


    </div>
    }</>
  )
}

export default Department

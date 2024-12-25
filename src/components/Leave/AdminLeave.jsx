import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Department from '../Departments/Department';
import axios from 'axios';
import { LeaveButton,Columns } from '../../utils/LeaveHelper';
import DataTable from 'react-data-table-component';
function AdminLeave() {

    const[leaves,setleaves]=useState([])
  const [filter,setfilter]=useState([])
  const fetchLeave=async()=>{
  try{
    const response=await axios.get("https://employee-api-mu.vercel.app/api/leave",{
        headers:{
         Authorization:`Bearer ${localStorage.getItem("token")}`,
        }
    })
    if(response?.data?.success)
    {
        let sn=1;
        const data=await response.data.leaves.map((leave=>(
            {
                _id:leave._id,
                sno:sn++,
                employeeId:leave.employeeId.employeeId,
                name:leave.employeeId.userId.name,
                leavetype:leave.leavetype,
                department:leave.employeeId.department.dep_name,
                days:
                new Date(leave.enddate).getDate()-
                new Date(leave.startdate).getDate(),
                status:leave.status,
                action:<LeaveButton Id={leave._id}/>
            }
        )))
        setleaves(data)
        setfilter(data)
    }
    
  }catch(error)
  {
    toast.error(error.message)
  }
  }
  
  
  useEffect(()=>{
  fetchLeave()
  },[])

const filterbyid=async(e)=>{
const record=leaves.filter(leave=>leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()))
setfilter(record)
}
const filterBystatus=(status)=>{
  const record=leaves.filter(leave=>leave.status.toLowerCase().includes(status.toLowerCase()))
  setfilter(record)
  
}


  return (
    <div className='p-5'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Leaves</h3>
      </div>
      <div className='flex justify-between items-center'>
         <input type="text"
         placeholder='Search By EMPID'
         onChange={filterbyid}
         className='px-5 py-1 border ' />
         <div className='space-x-5'>
  <button className='py-2 bg-yellow-600 px-2 text-white hover:bg-yellow-700 rounded-md'
  onClick={()=>filterBystatus("Pending")}
  >
    Pending
    </button>
        <button 
          onClick={()=>filterBystatus("Approved")}
        className='rounded-md py-2 bg-teal-600 px-2 text-white hover:bg-teal-700'>
Approved
        </button>
    
    <button
      onClick={()=>filterBystatus("Rejected")}
    className='rounded-md py-2 bg-red-600 px-2 text-white hover:bg-red-700'>
        rejected
        </button>
        
        </div>
      </div>
      <div className='mt-4'>
      <DataTable
      columns={Columns}
      data={filter}
      pagination
      />
      </div>
    </div>
  )
}

export default AdminLeave

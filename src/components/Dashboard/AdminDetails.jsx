import React, { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'

const AdminDetails = () => {
const[summ,setsumm]=useState(null)
useEffect(()=>{
const fetchSumm=async()=>{
  try{
const response=await axios.get('http://localhost:4000/api/dashboard/summary',{
  headers:{
    "Authorization":`Bearer ${localStorage.getItem('token')}`
  }
})
setsumm(response.data)
  }catch(error)
  {
    toast.error(error.message);
  }
}
fetchSumm()
},[])

if(!summ)
{
  return <div>Loading...</div>
}

  return (
    <div className='p-6'>
      <h3 className='text-2xl font-bold'>Dashboard OverView</h3>
      <div className='  grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummaryCard icon={<FaUsers/>} text={"Total Employees"} number={summ.totalEmp} color={"bg-teal-600"} />
        <SummaryCard icon={<FaBuilding/>} text={"Total Department"} number={summ.totalDep}  color={"bg-yellow-600"} />
        <SummaryCard icon={<FaMoneyBillWave/>} text={"Monthly Pay"} number={"$"+summ.totalsalary}  color={"bg-red-600"} />
      </div>
      <div className='mt-12'>
        <h4 className='text-center text-2xl font-bold'>Leave Details</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        <SummaryCard icon={<FaFileAlt/>} text={"Leave Applied"} number={summ.leavesummary.appliedFor}  color={"bg-teal-600"} />
        <SummaryCard icon={<FaCheckCircle/>} text={"Leave Approved"} number={summ.leavesummary.approved}  color={"bg-green-600"} />
        <SummaryCard icon={<FaHourglassHalf/>} text={"Leave Pending"} number={summ.leavesummary.pending}  color={"bg-yellow-600"} />
        <SummaryCard icon={<FaTimesCircle/>} text={"Leave Rejected"} number={summ.leavesummary.rejected}  color={"bg-red-600"} />

        </div>
      </div>
    </div>
  )
}

export default AdminDetails
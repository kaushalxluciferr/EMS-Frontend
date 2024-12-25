import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

function View() {
const {_id}=useParams();
    const[salaries,setsalaries]=useState(null)
    const [filter,setfilter]=useState(null)
const {user}=useAuth()
    let sn=1;

const fetchSalary=async()=>{
try{
    const response=await axios.get(`https://employee-api-mu.vercel.app/api/salary/${_id}/${user.role}`,{
        headers:{
         Authorization:`Bearer ${localStorage.getItem("token")}`,
        }
    })
    console.log(response.data);
    if(response?.data?.success)
    {
        setsalaries(response.data.salary)
        setfilter(response.data.salary)
    }
    
}catch(error)
{
    toast.error(error.message)
}
}


useEffect(()=>{
fetchSalary()
},[])



const filtersalary=(d)=>{
    const filterdata=salaries.filter((sal)=>
    sal.employeeId.employeeId.toLowerCase().includes(d.toLowerCase()))
    setfilter(filterdata)
}
console.log(salaries);


  return (
   <>
   {filter===null?( <div>Loading..</div>):(
    <div className='overflow-x-auto p-5'>
        <div className='text-center'>
            <h2 className='text-2xl font-bold'>Salary History</h2>
        </div>
        <div className='flex justify-end my-3'>
            <input type="text"
            placeholder='Search EMPID'
            className='border px-2 rounded-md py-0.5 border0gray-300'
            onChange={(e)=>filtersalary(e.target.value)}
            />
        </div>
{filter.length>0?(
<table className='w-full text-sm text-left text-gray-500'>
    <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
        <tr>
            <th className='px-6 py-3'>SNO</th>
            <th className='px-6 py-3'>EMP_ID</th>
            <th className='px-6 py-3'>salary</th>
            <th className='px-6 py-3'>Allowances</th>
            <th className='px-6 py-3'>Deduction</th>
            <th className='px-6 py-3'>Total</th>
            <th className='px-6 py-3'>Pay Date</th>
        </tr>
    </thead>
    <tbody >
        {filter.map((salary)=>(
            <tr
            key={salary.id}
            className='border-b bg-white dark:bg-gray-800 dark:border-gray-700'>
            <td className='text-white px-6 py-3'>{sn++}</td>
            <td className='text-white px-6 py-3'>{salary.employeeId.employeeId}</td>
            <td className='text-white px-6 py-3'>{salary.basicsalary}</td>
            <td className='text-white px-6 py-3'>{salary.allowances}</td>
            <td className='text-white px-6 py-3'>{salary.deductions}</td>
            <td className='text-white px-6 py-3'>{salary.netsalary}</td>
            <td className='text-white px-6 py-3'>{new Date(salary.paydate).toLocaleDateString()}</td>
            </tr>
        ))}
    </tbody>
</table>
):(<h2>No Records</h2>)}
    </div>
   )}
   </>
  )
}

export default View

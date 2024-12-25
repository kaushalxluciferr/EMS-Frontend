import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function LeaveDetail() {
    const { _id } = useParams();
    const [leave, setleave] = useState(null);
const navigate=useNavigate()
    useEffect(() => {
        const getLeave = async () => {
            try {
                const response = await axios.get(
                    `https://employee-api-mu.vercel.app/api/leave/detail/${_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                if (response.data && response.data.success) {
                    setleave(response.data.leave);
                } else {
                    toast.error("Failed to fetch employee details");
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        getLeave();
    }, [_id]);
const changestatus=async (_id,status)=>{
 try{
const response=await axios.put(`https://employee-api-mu.vercel.app/api/leave/${_id}`,{status},{
    headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
    }
})
if(response.data.success)
{
navigate("/admin-dashboard/leaves")
}
 }
 catch(error)
 {
    toast.error(error.message)
 }
}
  
    return (
        <div className="max-w-3xl mx-auto mt-5 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-red-700 mb-8 text-center">Leave Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="">
                <img
                    src={`https://employee-api-mu.vercel.app/${leave?.employeeId?.userId?.profileImage}`}
                    alt=""
                    className="rounded-full border w-68"
                />
            </div>
            <div className="ml-10">
            <div className="flex space-x mb-5">
                    <p className="text-lg font-bold">{leave?.status==="Pending"?"Action: ":"Status:"}</p>
                    {leave?.status==="Pending"?(
                        <div className="flex space-x-2">
                            <button 
                            onClick={()=>changestatus(leave._id,"Approved")}
                            className="ml-4 px-2 text-white py-1 rounded-md bg-green-500">Approve</button>
                            <button 
                            onClick={()=>changestatus(leave._id,"Rejected")}
                            className="ml-3 px-2 text-white py-0.5 rounded-md bg-red-500">Reject</button>
                        </div>
                    ):<p className="ml-1 mt-0.5 text font-bold">
                    {leave?.status}
                </p>}
                    
                </div>
                <div className="flex space-x mb-5">
                    <p className="text-lg font-bold">Name:</p>
                    <p className="ml-1 text-lg font-bold">
                        {leave?.employeeId?.userId?.name || "N/A"}
                    </p>
                </div>
                <div className="flex space-x mb-5">
                    <p className="text-lg font-bold">Employee ID:</p>
                    <p className="ml-1 text-lg font-bold">{leave?.employeeId?.employeeId || "N/A"}</p>
                </div>
                <div className="flex space-x mb-5">
                    <p className="text-lg font-bold">Leave Type:</p>
                    <p className="ml-1 mt-1 text font-bold">
                        {leave?.leavetype}
                    </p>
                </div>
                <div className="flex space-x mb-5">
                    <p className="text-lg font-bold">reason:</p>
                    <p className="ml-1 text-lg font-bold">{leave?.reason}</p>
                </div>
                <div className="flex space-x mb-5">
                    <p className="text-lg font-bold">Department:</p>
                    <p className="ml-1 text-lg font-bold">
                        {leave?.employeeId?.department?.dep_name || "N/A"}
                    </p>
                </div>
                <div className="flex space-x mb-5">
                    <p className="text-lg font-bold">Start Date:</p>
                    <p className="ml-1 text-lg font-bold">
                        {new Date(leave?.startdate).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex space-x mb-5">
                    <p className="text-lg font-bold">End Date:</p>
                    <p className="ml-1 text-lg font-bold">
                        {new Date(leave?.enddate).toLocaleDateString()}
                    </p>
                </div>
               
            </div>
        </div>
    </div>
    );
}

export default LeaveDetail;

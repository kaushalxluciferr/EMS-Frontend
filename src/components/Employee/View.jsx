import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function View() {
    const { _id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
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
                    setEmployee(response.data.employee);
                } else {
                    toast.error("Failed to fetch employee details");
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        GetEmployee();
    }, [_id]);

    if (!employee) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-8 text-center">Employee Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <img
                        src={`https://employee-api-mu.vercel.app/${employee?.userId?.profileImage}`}
                        alt=""
                        className="rounded-full border w-68"
                    />
                </div>
                <div className="ml-10 mt-5">
                    <div className="flex space-x mb-5">
                        <p className="text-lg font-bold">Name:</p>
                        <p className="ml-1 text-lg font-bold">
                            {employee?.userId?.name || "N/A"}
                        </p>
                    </div>
                    <div className="flex space-x mb-5">
                        <p className="text-lg font-bold">Employee ID:</p>
                        <p className="ml-1 text-lg font-bold">{employee?.employeeId || "N/A"}</p>
                    </div>
                    <div className="flex space-x mb-5">
                        <p className="text-lg font-bold">Date Of Birth:</p>
                        <p className="ml-1 text font-bold">
                            {new Date(employee?.dob).toLocaleDateString() || "N/A"}
                        </p>
                    </div>
                    <div className="flex space-x mb-5">
                        <p className="text-lg font-bold">Gender:</p>
                        <p className="ml-1 text-lg font-bold">{employee?.gender || "N/A"}</p>
                    </div>
                    <div className="flex space-x mb-5">
                        <p className="text-lg font-bold">Department:</p>
                        <p className="ml-1 text-lg font-bold">
                            {employee?.department?.dep_name || "N/A"}
                        </p>
                    </div>
                    <div className="flex space-x mb-5">
                        <p className="text-lg font-bold">Marital Status:</p>
                        <p className="ml-1 text-lg font-bold">
                            {employee?.maritalstatus || "N/A"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default View;

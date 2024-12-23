import { useNavigate } from "react-router-dom"

export const Columns=[
    {
        name:"S No",
        selector:(row)=>row.sno,
        width:"65px",
    },
    {
        name:"EMP_ID",
        selector:(row)=>row.employeeId,
        width:"100px",
    },
    {
        name:"Name",
        selector:(row)=>row.name,
        width:"100px",
    },
    {
        name:"LeaveType",
        selector:(row)=>row.leavetype,
        width:"120px",
    },
    {
        name:"Department",
        selector:(row)=>row.department,
        width:"120px",
    },
    {
        name:"Days",
        selector:(row)=>row.days,
        width:"70px",
    },
    {
        name:"Status",
        selector:(row)=>row.status,
        width:"100px",
    },
    {
        name:"Action",
        selector:(row)=>row.action,
        center:"true",
    },
]

export const LeaveButton=({Id})=>{

    const navigate=useNavigate()
    const handleview=(Id)=>{
        navigate(`/admin-dashboard/leaves/${Id}`)
    }
    return(
        <button
        className="px-3 py-2 bg-gray-600 rounded-md text-white hover:bg-gray-800"
        onClick={()=>handleview(Id)}
        >View</button>
    )
}
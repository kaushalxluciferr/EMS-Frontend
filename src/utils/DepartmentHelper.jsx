import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
export const columns=[
    {
        name:"S No",
        selector:(row)=>row.sno 
    },{
        name:"Department Name",
        selector:(row)=>row.dep_name
    },{
        name:"Action",
         selector:(row)=>row.action
    },
]

export const DepartmentButtons=({_id,ondepdelete})=>{


    const handledelete=async (_id,ondepdelete)=>
        {
            const conform=window.confirm("Dou you want To delete?")
            if(conform)
            {
            try{
                const response=await axios.delete(`https://employee-api-mu.vercel.app/api/department/${_id}`,{
                  headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                  }
                })
               
                if( response.data&&response.data.success)
                {
                    ondepdelete()
                    toast.success("department deleted sucessully")
                }
                  }catch(error)
                  {
                    toast.error(error.message);
                   }
                }
        }

    const navigate=useNavigate()
    return(
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 ronded-md"
            onClick={()=>navigate(`/admin-dashboard/department/${_id}`)}
            >Edit</button>
            <button className="px-3 py-1 bg-red-600 text-white"
            onClick={()=>handledelete(_id,ondepdelete)}
            >Delete</button>
        </div>
    )
}
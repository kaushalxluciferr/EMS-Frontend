import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

function RoleBaseRoute({children,requiredRole}) {
    const {user,loading}=useAuth()

    if(loading)
    {
        return <div>loading...</div>
    }
if(!requiredRole.includes(user.role))
{
<Navigate to="/unauthorized"/>
}

return user?children:<Navigate to="/login"/>
  
}

export default RoleBaseRoute

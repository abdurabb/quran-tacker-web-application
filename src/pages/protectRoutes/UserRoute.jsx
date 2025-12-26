import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function UserRoute() {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (!token) return <Navigate to="/login" />
    if (!role) return <Navigate to="/login" />
    if (role === 'user') return <Outlet />
    return <Navigate to={`/${role}-home`} />
}

export default UserRoute

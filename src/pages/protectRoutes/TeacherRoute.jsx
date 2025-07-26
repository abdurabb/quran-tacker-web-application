import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function TeacherRoute() {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (!token) return <Navigate to="/login" />
    if (!role) return <Navigate to="/login" />
    if (role === 'teacher') return <Outlet />
    return <Navigate to={`/${role}-home`} />
}

export default TeacherRoute

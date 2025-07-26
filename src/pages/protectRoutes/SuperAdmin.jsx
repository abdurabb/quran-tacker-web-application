import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function SuperAdmin() {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (!token) return <Navigate to="/login" />
  if(!role) return <Navigate to="/login" />
  if (role === 'admin') return <Outlet />
  // User is logged in but not an admin
  return <Navigate to={`/${role}-home`} /> 
}

export default SuperAdmin

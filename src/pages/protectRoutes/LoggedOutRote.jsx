import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function LoggedOutRote() {
    const user = localStorage.getItem("token");
    if (!user) {
        return <Outlet />;
    } else {
        return <Navigate to="/" replace />
    }

}

export default LoggedOutRote

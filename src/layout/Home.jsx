import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import NavBar from '../components/navbar/AdminNavBar'
import Content from "../components/navbar/Content";
import AdminSideBar from '../components/navbar/AdminSidebar'

function AdminHome() {

    const toggleSidebar = useSelector((state) => state.root.toggleSidebar);

    return (
        <div>
            <NavBar />
            <AdminSideBar />
            <Content>
                <Outlet />
            </Content>

        </div>
    )
}

export default AdminHome
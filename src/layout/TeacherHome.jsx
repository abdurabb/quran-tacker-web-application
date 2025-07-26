import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import NavBar from '../components/navbar/TeacherNavbar'
import Content from "../components/navbar/TeacherContent";
import AdminSideBar from '../components/navbar/TeacherSidebar'

function TeacherHome() {
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

export default TeacherHome
import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import TeacherNavbar from '../components/navbar/TeacherNavbar'
import TeacherContent from "../components/navbar/TeacherContent";
import TeacherSidebar from '../components/navbar/TeacherSidebar'

function TeacherHome() {
    return (
        <div>
            <TeacherNavbar />
            <TeacherSidebar />
            <TeacherContent>
                <Outlet />
            </TeacherContent>

        </div>
    )
}

export default TeacherHome
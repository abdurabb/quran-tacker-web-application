import React from 'react'
import { Outlet } from 'react-router-dom'
import UserContent from "../components/navbar/UserContent";
import UserNavbar from '../components/navbar/UserNavbar'
import UserFooter from '../components/navbar/UserFooter'


function TeacherHome() {
    return (
        <div>
            <UserNavbar />
            <UserContent>
                <Outlet />
            </UserContent>
            <UserFooter />

        </div>
    )
}

export default TeacherHome
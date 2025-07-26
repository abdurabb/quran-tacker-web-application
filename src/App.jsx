import React from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SuperAdmin from './pages/protectRoutes/SuperAdmin.jsx'
import TeacherRoute from './pages/protectRoutes/TeacherRoute.jsx'
import Home from './layout/Home'
import TeacherHome from './layout/TeacherHome.jsx'
import AuthPage from './pages/auth/AuthPage.jsx'
import LoggedOutRote from './pages/protectRoutes/LoggedOutRote.jsx'
import LandingPage from './pages/auth/LandingPage.jsx'

import AdminDashBoard from './pages/admin/dashboard/DashBoard.jsx'
import Class from './pages/admin/class/Class.jsx'
import DailyReports from './pages/admin/daily-reports/DailyReports.jsx'
import MonthlyTopper from './pages/admin/monthly-toper/MonthlyTopper.jsx'
import LessonsAndMark from './pages/admin/lessons-mark/LessonsAndMark.jsx'
import Student from './pages/admin/students/Student.jsx'
import StudentDetails from './pages/admin/students/StudentDetails.jsx'
import Teacher from './pages/admin/teacher/Teacher.jsx'
import TeacherDetails from './pages/admin/teacher/TeacherDetails.jsx'
import Attendance from './pages/admin/attendance/Attendance.jsx'


function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        limit={1}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          {/* admin */}
          <Route element={<SuperAdmin />}>
            <Route element={<Home />}>
              <Route path="/admin-home" element={<AdminDashBoard />} />
              <Route path="/class" element={<Class />} />
              <Route path="/teachers" element={<Teacher />} />
              <Route path="/teacher-details" element={<TeacherDetails />} />
              <Route path="/students" element={<Student />} />
              <Route path="/student-details" element={<StudentDetails />} />
              <Route path="/lessons-mark" element={<LessonsAndMark />} />
              <Route path="/daily-reports" element={<DailyReports />} />
              <Route path="/monthly-toper" element={<MonthlyTopper />} />
              <Route path="/attendance" element={<Attendance />} />

            </Route>
          </Route>

          {/* teacher  */}
          <Route element={<TeacherRoute />}>
            <Route element={<TeacherHome />}>

              {/*  */}
            </Route>
          </Route>

          {/* user section */}


          {/* logout */}
          <Route element={<LoggedOutRote />}>
            <Route path="/login" element={<AuthPage />} />
          </Route>

          {/* common */}
          <Route path="/" element={<LandingPage />} />



        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

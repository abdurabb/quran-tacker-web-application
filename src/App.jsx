import React from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SuperAdmin from './pages/protectRoutes/SuperAdmin.jsx'
import TeacherRoute from './pages/protectRoutes/TeacherRoute.jsx'
import UserRoute from './pages/protectRoutes/UserRoute.jsx'
import Home from './layout/Home'
import TeacherHome from './layout/TeacherHome.jsx'
import UserHome from './layout/UserHome.jsx'
import AuthPage from './pages/auth/AuthPage.jsx'
import LoggedOutRote from './pages/protectRoutes/LoggedOutRote.jsx'
import LandingPage from './pages/auth/LandingPage.jsx'
import NotFound from './pages/NotFount.jsx'

import AdminDashBoard from './pages/admin/dashboard/DashBoard.jsx'
import Class from './pages/admin/class/Class.jsx'
import DailyReports from './pages/admin/daily-reports/DailyReports.jsx'
import ReportDetails from './pages/admin/daily-reports/ReportDetails.jsx'
import LessonsAndMark from './pages/admin/lessons-mark/LessonsAndMark.jsx'
import Student from './pages/admin/students/Student.jsx'
import StudentDetails from './pages/admin/students/StudentDetails.jsx'
import Teacher from './pages/admin/teacher/Teacher.jsx'
import TeacherDetails from './pages/admin/teacher/TeacherDetails.jsx'
import Attendance from './pages/admin/attendance/Attendance.jsx'

// teacher
import TeacherDashBoard from './pages/teacher/dashboard/Dashboard.jsx'
import TeacherStudents from './pages/teacher/students/Students.jsx'
import TeacherStudentDetails from './pages/teacher/students/StudentDetails.jsx'
import TeacherAttendance from './pages/teacher/attendance/Attendance.jsx'
import TeacherDailyReports from './pages/teacher/daily-reports/DailyReports.jsx'
import TeacherReportDetails from './pages/teacher/daily-reports/ReportDetails.jsx'

// user
import UserProfile from './pages/user/profile/Profile.jsx'


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
              <Route path="/report-details" element={< ReportDetails />} />
              <Route path="/attendance" element={<Attendance />} />

            </Route>
          </Route>

          {/* teacher  */}
          <Route element={<TeacherRoute />}>
            <Route element={<TeacherHome />}>
              <Route path="/teacher-home" element={<TeacherDashBoard />} />
              <Route path="/teacher-students" element={<TeacherStudents />} />
              <Route path="/teacher-student-details" element={<TeacherStudentDetails />} />
              <Route path="/teacher-attendance" element={<TeacherAttendance />} />
              <Route path="/teacher-daily-reports" element={<TeacherDailyReports />} />
              <Route path="/teacher-report-details" element={<TeacherReportDetails />} />
            </Route>
          </Route>

          {/* user */}
          <Route element={<UserRoute />}>
            <Route element={<UserHome />}>
              <Route path="/user-profile" element={<UserProfile />} />
            </Route>
          </Route>
         
          {/* logout */}
          <Route element={<LoggedOutRote />}>
            <Route path="/login" element={<AuthPage />} />
          </Route>

          {/* common */}
          <Route path="/" element={<LandingPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

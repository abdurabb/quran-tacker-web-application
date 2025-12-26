import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  BookOpen,
  Award,
} from 'lucide-react';
import {
  useGetDashboardData,
  useGetTopStudents,
} from '../../../apis/useAdminDataController';
import { UserIcon } from 'lucide-react';

function DashBoard() {
  const navigate = useNavigate();

  const { data: dashboardData, isLoading } = useGetDashboardData();
  const { data: topStudentsData } = useGetTopStudents('', '', 3);

  const [showClassesModal, setShowClassesModal] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState([]);

  const openClassesModal = (classes) => {
    setSelectedClasses(classes);
    setShowClassesModal(true);
  };

  const stats = [
    {
      title: 'Total Lessons',
      value: dashboardData?.totalLessons ?? 0,
      icon: <BookOpen />,
      link: '/lessons-mark',
    },
    {
      title: 'Total Classes',
      value: dashboardData?.totalClasses ?? 0,
      icon: <GraduationCap />,
      link: '/class',
    },
    {
      title: 'Total Teachers',
      value: dashboardData?.totalTeachers ?? 0,
      icon: <Users />,
      link: '/teachers',
    },
    {
      title: 'Total Students',
      value: dashboardData?.totalStudents ?? 0,
      icon: <Users />,
      link: '/students',
    },
  ];

  if (isLoading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Welcome Back Admin
      </h1>

      {/* ================= Stats ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">
                {stat.value}
              </p>
              <button
                onClick={() => navigate(stat.link)}
                className="text-xs text-blue-600 mt-2 hover:underline"
              >
                View details →
              </button>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* ================= Student Toppers ================= */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
            <Award className="text-yellow-500" />
            Student Toppers
          </h2>

          <button
            onClick={() => navigate('/daily-reports')}
            className="text-sm text-blue-600 hover:underline"
          >
            View more →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topStudentsData?.topStudents?.map((student) => (
            <div
              key={student._id}
              className="border rounded-xl p-5 bg-gradient-to-br from-yellow-50 to-white"
            >
              <h3 className="font-semibold text-gray-800">
                {student.name}
              </h3>
              <p className="text-sm text-gray-500">
                Class: {student.class}
              </p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                <p>{student.totalMark} <p className="text-xs text-gray-500">Marks</p></p>
              </p>

              <button
                onClick={() =>
                  navigate(`/report-details?studentId=${student?.studentId}`)
                }
                className="text-xs text-blue-600 mt-3 hover:underline"
              >
                View details →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ================= Recently Added Students ================= */}

      {/* ================= Recently Added Students ================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Recently Added Students
          </h2>
          <p className="text-sm text-gray-500">
            Latest students registered in the system
          </p>
        </div>

        {/* ===== Desktop Table ===== */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-100">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Student</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Class</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData?.recentlyAddedStudents?.map((student) => (
                <tr key={student._id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        {student.image ? (
                          <img
                            src={student.image}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <UserIcon className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {student.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {student.classId?.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {student.dialCode}-{student.phone}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {student.email}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {student.classId?.name}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() =>
                        navigate(`/student-details?hashId=${student._id}`)
                      }
                      className="text-xs font-medium text-blue-600 hover:text-blue-800 transition"
                    >
                      View details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== Mobile Cards ===== */}
        <div className="sm:hidden space-y-4">
          {dashboardData?.recentlyAddedStudents?.map((student) => (
            <div
              key={student._id}
              className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {student.image ? (
                    <img
                      src={student.image}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-6 h-6 text-gray-500" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {student.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {student.classId?.name}
                  </p>
                </div>
              </div>

              <div className="space-y-1 text-sm text-gray-600">
                <p>📞 {student.dialCode}-{student.phone}</p>
                <p className="truncate">✉️ {student.email}</p>
              </div>

              <button
                onClick={() =>
                  navigate(`/student-details?hashId=${student._id}`)
                }
                className="mt-4 w-full text-center text-sm font-medium text-blue-600 bg-blue-50 rounded-lg py-2 hover:bg-blue-100 transition"
              >
                View details →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ================= Recently Added Teachers ================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Recently Added Teachers
          </h2>
          <p className="text-sm text-gray-500">
            New teachers and their assigned classes
          </p>
        </div>

        {/* ===== Desktop Table ===== */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-100">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Teacher</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Classes</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData?.recentlyAddedTeachers?.map((teacher) => {
                const visible = teacher.classes.slice(0, 3);
                const remaining = teacher.classes.length - 3;

                return (
                  <tr
                    key={teacher._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                          {teacher.image ? (
                            <img
                              src={teacher.image}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <UserIcon className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                        <p className="font-medium text-gray-800">
                          {teacher.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {teacher.dialCode}-{teacher.phone}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {teacher.email}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {visible.map((cls) => (
                          <span
                            key={cls._id}
                            className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                          >
                            {cls.name}
                          </span>
                        ))}
                        {remaining > 0 && (
                          <button
                            onClick={() =>
                              openClassesModal(teacher.classes)
                            }
                            className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-gray-200 transition"
                          >
                            +{remaining}
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() =>
                          navigate(`/teacher-details?hashId=${teacher._id}`)
                        }
                        className="text-xs font-medium text-blue-600 hover:text-blue-800 transition"
                      >
                        View details →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ===== Mobile Cards ===== */}
        <div className="sm:hidden space-y-4">
          {dashboardData?.recentlyAddedTeachers?.map((teacher) => (
            <div
              key={teacher._id}
              className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {teacher.image ? (
                    <img
                      src={teacher.image}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-6 h-6 text-gray-500" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {teacher.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {teacher.dialCode}-{teacher.phone}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 truncate">
                ✉️ {teacher.email}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {teacher.classes.slice(0, 3).map((cls) => (
                  <span
                    key={cls._id}
                    className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                  >
                    {cls.name}
                  </span>
                ))}
                {teacher.classes.length > 3 && (
                  <button
                    onClick={() =>
                      openClassesModal(teacher.classes)
                    }
                    className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-gray-200 transition"
                  >
                    +{teacher.classes.length - 3}
                  </button>
                )}
              </div>

              <button
                onClick={() =>
                  navigate(`/teacher-details?hashId=${teacher._id}`)
                }
                className="mt-4 w-full text-center text-sm font-medium text-blue-600 bg-blue-50 rounded-lg py-2 hover:bg-blue-100 transition"
              >
                View details →
              </button>
            </div>
          ))}
        </div>
      </div>



      {/* ================= Classes Modal ================= */}
      {showClassesModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">
              Assigned Classes
            </h3>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedClasses.map((cls) => (
                <span
                  key={cls._id}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm"
                >
                  {cls.name}
                </span>
              ))}
            </div>

            <div className="text-right">
              <button
                onClick={() => setShowClassesModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashBoard;

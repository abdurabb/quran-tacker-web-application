import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetDashboardData, useGetDailyReports , useGetTopStudents} from '../../../apis/useTeacherDataController';
import Loader from '../../../components/loader/Loader';
import { 
  Users, 
  GraduationCap, 
  Award, 
  Trophy, 
  Medal, 
  Calendar,
  ArrowRight,
  Eye,
  UserCheck,
  FileText
} from 'lucide-react';

function Dashboard() {
  const navigate = useNavigate();

  // APIs
  const { data: dashboardData, isLoading: dashboardLoading } = useGetDashboardData();
  const { data: topStudentsData, isLoading: topStudentsLoading } = useGetTopStudents('', '', 3);
  const { data: dailyReportsData, isLoading: reportsLoading } = useGetDailyReports('', '', '', 1, 10, '', -1);

  // Extract data from API response
  const {
    totalClasses = 0,
    myTotalClasses = 0,
    totalStudents = 0,
    myTotalStudents = 0,
    weekMarksCount = 0,
    weekTotalMarks = 0,
    classes = []
  } = dashboardData || {};

  // Get top students and recent reports from separate API calls
  const topThree = topStudentsData?.topStudents || [];
  const recentReports = dailyReportsData?.marks || [];

  const isLoading = dashboardLoading || topStudentsLoading || reportsLoading;

  const StatCard = ({ icon: Icon, title, totalValue, assignedValue, colorClass = "blue", onClick }) => {
    const colorMap = {
      blue: { bg: "bg-blue-100", text: "text-blue-600" },
      green: { bg: "bg-green-100", text: "text-green-600" },
      purple: { bg: "bg-purple-100", text: "text-purple-600" },
      orange: { bg: "bg-orange-100", text: "text-orange-600" },
    };
    const colors = colorMap[colorClass] || colorMap.blue;

    return (
      <div
        onClick={onClick}
        className={`bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all ${
          onClick ? 'cursor-pointer hover:border-blue-300' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold text-gray-700">Total:</p>
                <p className="text-xl font-bold text-gray-900">{totalValue}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold text-gray-700">Assigned:</p>
                <p className="text-xl font-bold text-blue-600">{assignedValue}</p>
              </div>
            </div>
          </div>
          <div className={`${colors.bg} p-3 rounded-lg`}>
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your teaching activities.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader />
        </div>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <StatCard
              icon={GraduationCap}
              title="Classes"
              totalValue={totalClasses}
              assignedValue={myTotalClasses}
              colorClass="blue"
              onClick={() => navigate('/teacher-students')}
            />
            <StatCard
              icon={Users}
              title="Students"
              totalValue={totalStudents}
              assignedValue={myTotalStudents}
              colorClass="green"
              onClick={() => navigate('/teacher-students')}
            />
          </div>

          {/* This Week Summary */}
          {(weekMarksCount > 0 || weekTotalMarks > 0) && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-800">This Week's Activity</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Marks Given</p>
                  <p className="text-2xl font-bold text-blue-600">{weekMarksCount}</p>
                  <p className="text-xs text-gray-500 mt-1">This week</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Total Marks</p>
                  <p className="text-2xl font-bold text-blue-600">{weekTotalMarks}</p>
                  <p className="text-xs text-gray-500 mt-1">This week</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Top 3 Performers */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-xl font-bold text-gray-800">Top 3 Performers</h2>
                </div>
                <button
                  onClick={() => navigate('/teacher-daily-reports')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  View All
                  <ArrowRight size={16} />
                </button>
              </div>

              {topStudentsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader />
                </div>
              ) : topThree.length > 0 ? (
                <div className="space-y-4">
                  {topThree.map((student, index) => {
                    const colors = [
                      { bg: 'from-yellow-400 to-yellow-600', icon: Trophy, text: '1st' },
                      { bg: 'from-gray-300 to-gray-500', icon: Medal, text: '2nd' },
                      { bg: 'from-orange-400 to-orange-600', icon: Award, text: '3rd' }
                    ];
                    const color = colors[index] || colors[0];

                    return (
                      <div
                        key={student._id || student.studentId || index}
                        className={`bg-gradient-to-r ${color.bg} rounded-lg p-4 text-white shadow-md hover:shadow-lg transition-shadow`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-lg">
                              <color.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-bold text-lg">{student.name || 'N/A'}</p>
                              <p className="text-sm opacity-90">{student.class || 'N/A'}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">{student.totalMark || 0}</p>
                            <p className="text-xs opacity-90">Marks</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Trophy className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No top performers yet</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/teacher-students')}
                  className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left"
                >
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-700">View Students</span>
                </button>
                <button
                  onClick={() => navigate('/teacher-daily-reports')}
                  className="w-full flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left"
                >
                  <FileText className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-700">Daily Reports</span>
                </button>
                <button
                  onClick={() => navigate('/teacher-attendance')}
                  className="w-full flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left"
                >
                  <UserCheck className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-700">Attendance</span>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-800">Recent Marks Added</h2>
              </div>
              <button
                onClick={() => navigate('/teacher-daily-reports')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                View All
                <ArrowRight size={16} />
              </button>
            </div>

            {reportsLoading ? (
              <div className="flex justify-center py-8">
                <Loader />
              </div>
            ) : recentReports.length > 0 ? (
              <div className="space-y-3">
                {recentReports.map((report, index) => (
                  <div
                    key={report._id || report.studentId || index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Award className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{report.name || 'N/A'}</p>
                        <p className="text-sm text-gray-600">{report.class || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{report.totalMark || 0}</p>
                        <p className="text-xs text-gray-500">Marks</p>
                      </div>
                      <button
                        onClick={() => {
                          const params = new URLSearchParams();
                          params.append('studentId', report._id || report.studentId);
                          navigate(`/teacher-report-details?${params.toString()}`);
                        }}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Award className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No recent marks added</p>
              </div>
            )}
          </div>

          {/* Class Overview */}
          {classes.length > 0 && (
            <div className="mt-6 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">My Classes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes.map((cls) => (
                  <div
                    key={cls._id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => navigate('/teacher-students')}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">{cls.name}</h3>
                    </div>
                    {cls.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">{cls.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;

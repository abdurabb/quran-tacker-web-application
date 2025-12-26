import React from 'react'
import Loader from '../loader/Loader';
import { useNavigate } from 'react-router-dom';
import { Trophy, Medal, Award, Eye, Filter, ArrowUpDown, Search } from 'lucide-react';
import DatePicker from '../datePicker/DatePicker';
import PageNation from '../pagination/Pagination';

function Report({ startDate, setStartDate, endDate, setEndDate, classId, setClassId, page, setPage,
    topStudentsLoading, search, setSearch, classes, reports, sort, isLoading, topThree, totalPages, setSort, type }) {
    const navigate = useNavigate();
    const handleResetDates = () => {
        setStartDate('');
        setEndDate('');
    };

    const toggleSort = () => {
        setSort(prev => prev === 1 ? -1 : 1);
    };

    const handleViewDetails = (studentId) => {
        const params = new URLSearchParams();
        params.append('studentId', studentId);
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        if (type == 'teacher') {
            navigate(`/teacher-report-details?${params.toString()}`);
        }
        if (type == 'admin') {
            navigate(`/report-details?${params.toString()}`);
        }
    };

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Daily Reports</h1>

            {/* Date Range Picker */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Date Range</h3>
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex-1 w-full sm:w-auto">
                        <DatePicker
                            value={startDate}
                            onChange={setStartDate}
                            label="Start Date"
                            max={endDate || undefined}
                            placeholder="Select start date"
                        />
                    </div>
                    <div className="flex-1 w-full sm:w-auto">
                        <DatePicker
                            value={endDate}
                            onChange={setEndDate}
                            label="End Date"
                            min={startDate || undefined}
                            placeholder="Select end date"
                        />
                    </div>
                    {(startDate || endDate) && (
                        <button
                            onClick={handleResetDates}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium whitespace-nowrap h-[42px]"
                        >
                            Reset Dates
                        </button>
                    )}
                </div>
            </div>

            {
                topStudentsLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <Loader />
                    </div>
                ) : (
                    <>
                        {
                            topThree?.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
                                    {/* First Place */}
                                    {topThree[0] && (
                                        <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform">
                                            <div className="flex items-center justify-between mb-4">
                                                <Trophy className="w-8 h-8 text-white" />
                                                <span className="text-white font-bold text-lg">1st</span>
                                            </div>
                                            <h3 className="text-white font-bold text-lg mb-1">{topThree[0].name || 'N/A'}</h3>
                                            <p className="text-yellow-100 text-sm mb-2">{topThree[0].class || 'N/A'}</p>
                                            <p className="text-white font-semibold text-2xl">{topThree[0].totalMark || 0} Marks</p>
                                        </div>
                                    )}

                                    {/* Second Place */}
                                    {topThree[1] && (
                                        <div className="bg-gradient-to-br from-gray-300 to-gray-500 rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform">
                                            <div className="flex items-center justify-between mb-4">
                                                <Medal className="w-8 h-8 text-white" />
                                                <span className="text-white font-bold text-lg">2nd</span>
                                            </div>
                                            <h3 className="text-white font-bold text-lg mb-1">{topThree[1].name || 'N/A'}</h3>
                                            <p className="text-gray-100 text-sm mb-2">{topThree[1].class || 'N/A'}</p>
                                            <p className="text-white font-semibold text-2xl">{topThree[1].totalMark || 0} Marks</p>
                                        </div>
                                    )}

                                    {/* Third Place */}
                                    {topThree[2] && (
                                        <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform">
                                            <div className="flex items-center justify-between mb-4">
                                                <Award className="w-8 h-8 text-white" />
                                                <span className="text-white font-bold text-lg">3rd</span>
                                            </div>
                                            <h3 className="text-white font-bold text-lg mb-1">{topThree[2].name || 'N/A'}</h3>
                                            <p className="text-orange-100 text-sm mb-2">{topThree[2].class || 'N/A'}</p>
                                            <p className="text-white font-semibold text-2xl">{topThree[2].totalMark || 0} Marks</p>
                                        </div>
                                    )}
                                </div>
                            )
                        }
                    </>
                )
            }

            {/* Filters: Search, Class Filter, Sort */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters & Search</h3>
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    {/* Search */}
                    <div className="flex-1 w-full sm:w-auto">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Search size={16} className="inline mr-2" />
                            Search Student
                        </label>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by student name..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm bg-white"
                        />
                    </div>

                    {/* Class Filter */}
                    <div className="flex-1 w-full sm:w-auto">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Filter size={16} className="inline mr-2" />
                            Filter by Class
                        </label>
                        <select
                            value={classId}
                            onChange={(e) => setClassId(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg
               focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               outline-none text-sm bg-white"
                            disabled={classes.length === 0}
                        >
                            {/* All Classes Option */}
                            <option value="">All Classes</option>

                            {classes.map((cls) => (
                                <option key={cls._id} value={cls._id}>
                                    {cls.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort Button */}
                    <div className="w-full sm:w-auto">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sort by Marks
                        </label>
                        <button
                            onClick={toggleSort}
                            className="w-full sm:w-auto flex items-center gap-2 px-4 py-2 bg-commonColorButton  text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                            <ArrowUpDown size={16} />
                            {sort === 1 ? 'Low to High' : 'High to Low'}
                        </button>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-12">
                    <Loader />
                </div>
            ) : (
                <>

                    {/* Reports - Mobile Card View */}
                    <div className="md:hidden space-y-4 mb-6">
                        {reports.length > 0 ? (
                            reports.map((report, index) => (
                                <div
                                    key={report._id || report.studentId || index}
                                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-all duration-300"
                                >
                                    {/* Header Section */}
                                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                                        <div className="flex-shrink-0 h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                                            <span className="text-white font-bold text-xl">
                                                {report?.name?.charAt(0)?.toUpperCase() || 'N'}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-bold text-gray-900 truncate mb-1">
                                                {report?.name || 'N/A'}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                                    {report?.class || 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats and Action Section */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Marks</p>
                                            <div className="flex items-baseline gap-2">
                                                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                                                    {report?.totalMark || 0}
                                                </p>
                                                <span className="text-sm text-gray-500 font-medium">marks</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleViewDetails(report._id || report.studentId)}
                                            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                                        >
                                            <Eye size={18} />
                                            <span>View</span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
                                No reports available
                            </div>
                        )}
                    </div>

                    {/* Reports - Desktop Table View */}
                    <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Student Name
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Class
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total Marks
                                        </th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Details
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {reports.length > 0 ? (
                                        reports.map((report, index) => (
                                            <tr
                                                key={report._id || report.studentId || index}
                                                className="hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                                            <span className="text-commonColorButton font-semibold">
                                                                {report?.name?.charAt(0)?.toUpperCase() || 'N'}
                                                            </span>
                                                        </div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {report?.name || 'N/A'}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {report?.class || 'N/A'}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <span className="text-sm font-semibold text-gray-900">
                                                        {report?.totalMark || 0}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-center">
                                                    <button
                                                        onClick={() => handleViewDetails(report._id || report.studentId)}
                                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-commonColorButton text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                                    >
                                                        <Eye size={16} />
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                                                No reports available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination - Desktop */}
                        {totalPages > 1 && (
                            <div className="px-4 py-4 border-t border-gray-200">
                                <PageNation totalPage={totalPages} setPage={setPage} page={page} />
                            </div>
                        )}
                    </div>

                    {/* Pagination - Mobile */}
                    {totalPages > 1 && (
                        <div className="md:hidden bg-white rounded-xl shadow-sm p-4">
                            <PageNation totalPage={totalPages} setPage={setPage} page={page} />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Report


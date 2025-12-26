import React, { useState } from 'react';
import { FileText, BookOpen, Calendar, Filter, X } from 'lucide-react';
import { useGetReports } from '../../../apis/useUserDataController';
import PageNation from '../../../components/pagination/Pagination';

function Reports() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // API call with date filters
    const { data, isLoading, error } = useGetReports({ 
        page, 
        limit,
        startDate: startDate ,
        endDate: endDate 
    });

    const reports = data?.reports || [];
    const totalPages = data?.totalPages || 1;

    const handleClearFilters = () => {
        setStartDate('');
        setEndDate('');
        setPage(1);
    };

    const hasActiveFilters = startDate || endDate;

    return (
        <div>
            {/* Heading */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <FileText className="text-orange-600" size={32} />
                    Academic Reports
                </h2>

                {/* Filter Toggle Button (Mobile) */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="md:hidden flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                >
                    <Filter size={18} />
                    Filters
                    {hasActiveFilters && (
                        <span className="bg-white text-orange-600 rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                            !
                        </span>
                    )}
                </button>
            </div>

            {/* Filters Section */}
            <div className={`mb-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
                <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                            <Filter size={20} className="text-orange-600" />
                            Filter by Date Range
                        </h3>
                        {hasActiveFilters && (
                            <button
                                onClick={handleClearFilters}
                                className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                                <X size={16} />
                                Clear
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Start Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Date
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                        setPage(1);
                                    }}
                                    max={endDate || undefined}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                            </div>
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                End Date
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => {
                                        setEndDate(e.target.value);
                                        setPage(1);
                                    }}
                                    min={startDate || undefined}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                            </div>
                        </div>
                    </div>

                    {/* Active Filters Display */}
                    {hasActiveFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600 mb-2">Active Filters:</p>
                            <div className="flex flex-wrap gap-2">
                                {startDate && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                                        From: {new Date(startDate).toLocaleDateString()}
                                        <button
                                            onClick={() => {
                                                setStartDate('');
                                                setPage(1);
                                            }}
                                            className="hover:bg-orange-200 rounded-full p-0.5"
                                        >
                                            <X size={14} />
                                        </button>
                                    </span>
                                )}
                                {endDate && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                                        To: {new Date(endDate).toLocaleDateString()}
                                        <button
                                            onClick={() => {
                                                setEndDate('');
                                                setPage(1);
                                            }}
                                            className="hover:bg-orange-200 rounded-full p-0.5"
                                        >
                                            <X size={14} />
                                        </button>
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="text-center py-10">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-600"></div>
                    <p className="text-gray-600 mt-4">Loading reports...</p>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <p className="text-red-600 font-semibold">Failed to load reports</p>
                    <p className="text-red-500 text-sm mt-1">Please try again later</p>
                </div>
            )}

            {/* ---------------- Mobile View ---------------- */}
            {!isLoading && !error && (
                <>
                    <div className="md:hidden space-y-4">
                        {reports.length > 0 ? (
                            reports.map((report) => {
                                const isFixed = report.typeName === 'Fixed Marks';

                                const markInfo = isFixed
                                    ? `Fixed Marks (${report.initialMark})`
                                    : `${report.initialMark} mark per ${report.initialCount} ${report.typeName}`;

                                return (
                                    <div
                                        key={report._id}
                                        className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition"
                                    >
                                        {/* Lesson */}
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="bg-orange-100 p-2 rounded-lg">
                                                <BookOpen className="text-orange-600" size={18} />
                                            </div>
                                            <h3 className="font-semibold text-gray-800">
                                                {report.lessonName}
                                            </h3>
                                        </div>

                                        {/* Mark Info */}
                                        <p className="text-sm text-gray-600 mb-3">
                                            {markInfo}
                                        </p>

                                        {/* Stats */}
                                        <div className="grid grid-cols-2 gap-4 mb-3">
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <p className="text-xs text-gray-500">Count</p>
                                                <p className="text-xl font-bold text-gray-800">
                                                    {report.obtainedCount}
                                                </p>
                                            </div>

                                            <div className="bg-orange-50 p-3 rounded-lg">
                                                <p className="text-xs text-orange-600">Mark</p>
                                                <p className="text-xl font-bold text-orange-700">
                                                    {report.obtainedMark}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Date */}
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Calendar size={14} />
                                            {new Date(report.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center text-gray-500 py-12 bg-white rounded-xl shadow-sm">
                                <FileText className="mx-auto mb-3 text-gray-400" size={48} />
                                <p className="font-medium">No reports available</p>
                                {hasActiveFilters && (
                                    <p className="text-sm mt-2">Try adjusting your date filters</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ---------------- Desktop View ---------------- */}
                    <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Lesson
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Mark Info
                                        </th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                            Count
                                        </th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                            Mark
                                        </th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                            Date
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    {reports.length > 0 ? (
                                        reports.map((report) => {
                                            const isFixed = report.typeName === 'Fixed Marks';

                                            const markInfo = isFixed
                                                ? `Fixed Marks (${report.initialMark})`
                                                : `${report.initialMark} mark per ${report.initialCount} ${report.typeName}`;

                                            return (
                                                <tr key={report._id} className="hover:bg-gray-50 transition">
                                                    <td className="px-4 py-4 font-medium text-gray-800">
                                                        {report.lessonName}
                                                    </td>
                                                    <td className="px-4 py-4 text-gray-700">
                                                        {markInfo}
                                                    </td>
                                                    <td className="px-4 py-4 text-center font-semibold">
                                                        {report.obtainedCount}
                                                    </td>
                                                    <td className="px-4 py-4 text-center font-bold text-orange-600">
                                                        {report.obtainedMark}
                                                    </td>
                                                    <td className="px-4 py-4 text-center text-sm text-gray-500">
                                                        {new Date(report.createdAt).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-4 py-12 text-center text-gray-500"
                                            >
                                                <FileText className="mx-auto mb-3 text-gray-400" size={48} />
                                                <p className="font-medium">No reports found</p>
                                                {hasActiveFilters && (
                                                    <p className="text-sm mt-2">Try adjusting your date filters</p>
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Desktop Pagination */}
                        {totalPages > 1 && (
                            <div className="p-4 border-t">
                                <PageNation
                                    totalPage={totalPages}
                                    page={page}
                                    setPage={setPage}
                                />
                            </div>
                        )}
                    </div>

                    {/* Mobile Pagination */}
                    {totalPages > 1 && (
                        <div className="md:hidden mt-4 bg-white rounded-xl shadow-sm p-4">
                            <PageNation
                                totalPage={totalPages}
                                page={page}
                                setPage={setPage}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Reports;
import React, { useState, useEffect } from 'react'
import Loader from '../loader/Loader';
import { ArrowLeft, BookOpen, Award, Calendar, TrendingUp, Edit, Trash2 } from 'lucide-react';
import DatePicker from '../datePicker/DatePicker';
import PageNation from '../pagination/Pagination';
import { Modal } from '@mui/material';
import ConfirmationModal from '../confirmationModal/ConfirmationModal';
import EditReportModal from '../../pages/teacher/daily-reports/EditReportModal';
import { useNavigate } from 'react-router-dom';
import { useUpdateReport, useDeleteReport } from '../../apis/useTeacherDataController';
import { toast } from 'react-toastify';

function StudentReport({ isLoading, startDate, setStartDate, endDate, setEndDate, page, setPage, student, reports, totalPages, type }) {
    const navigate = useNavigate();

    // apis
    const { mutate: updateReportMutate, isPending: isUpdating } = useUpdateReport();
    const { mutate: deleteReportMutate, isPending: isDeleting } = useDeleteReport();

    const handleResetDates = () => {
        setStartDate('');
        setEndDate('');
    };

    // State for modals
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    // Handle Edit
    const handleEdit = (report) => {
        setSelectedReport(report);
        setOpenEditModal(true);
    };

    const handleEditClose = () => {
        setOpenEditModal(false);
        setSelectedReport(null);
    };

    const handleEditSubmit = (formData) => {
        updateReportMutate(formData, {
            onSuccess: (data) => {
                toast.success(data?.message || 'Report updated successfully!');
                handleEditClose();
            },
            onError: (error) => {
                toast.error(error?.response?.data?.message || 'Failed to update report');
            }
        });
    };


    // Handle Delete
    const handleDelete = (report) => {
        setSelectedReport(report);
        setOpenDeleteModal(true);
    };

    const handleDeleteClose = () => {
        setOpenDeleteModal(false);
        setSelectedReport(null);
    };

    const handleDeleteConfirm = () => {
        if (selectedReport?._id) {
            deleteReportMutate(selectedReport._id, {
                onSuccess: (data) => {
                    toast.success(data?.message || 'Report deleted successfully!');
                    handleDeleteClose();
                },
                onError: (error) => {
                    toast.error(error?.response?.data?.message || 'Failed to delete report');
                    handleDeleteClose();
                }
            });
        }
    };

    return (
        <div className="p-4 sm:p-6">
            {/* Edit Modal */}
            <Modal
                open={openEditModal}
                onClose={handleEditClose}
                className="flex items-center justify-center p-4 outline-none"
            >
                <EditReportModal
                    setClose={handleEditClose}
                    report={selectedReport}
                    handleSubmit={handleEditSubmit}
                    isSubmitting={isUpdating}
                />
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                open={openDeleteModal}
                onClose={handleDeleteClose}
                className="flex items-center justify-center p-4 outline-none"
            >
                <ConfirmationModal
                    setClose={handleDeleteClose}
                    message={`Are you sure you want to delete this report for "${selectedReport?.lessonName}"?`}
                    confirmFunction={handleDeleteConfirm}
                    type="delete"
                />
            </Modal>

            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                        Report Details
                    </h1>
                    {student.name && (
                        <p className="text-gray-800">Student: {student.name}</p>
                    )}
                    {student.class && (
                        <p className="text-gray-800">Class: {student.class}</p>
                    )}
                </div>
                <button
                    onClick={() => {
                        if (type == 'teacher') {
                            navigate('/teacher-daily-reports');
                        }
                        if (type == 'admin') {
                            navigate('/daily-reports');
                        }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Reports</span>
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-12">
                    <Loader />
                </div>
            ) : (
                <>
                    {/* Date Range Picker */}
                    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Date Range</h3>
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


                    {/* Reports - Mobile Card View */}
                    <div className="md:hidden space-y-4 mb-6">
                        {reports.length > 0 ? (
                            reports.map((report, index) => {
                                const isFixedMarks = report.typeName === 'Fixed Marks';
                                const markInfo = isFixedMarks
                                    ? `Fixed Marks (${report.initialMark} marks)`
                                    : `${report.initialMark} mark per ${report.initialCount} ${report.typeName}`;

                                return (
                                    <div
                                        key={report._id || index}
                                        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-all duration-300"
                                    >
                                        {/* Header Section */}
                                        <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="bg-blue-100 p-2.5 rounded-xl">
                                                    <BookOpen className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-base font-bold text-gray-900 truncate">
                                                        {report.lessonName || 'N/A'}
                                                    </h3>
                                                    <div className="mt-1">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mark Info Section */}
                                        <div className="mb-4 pb-4 border-b border-gray-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Award className="w-4 h-4 text-gray-400" />
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Mark Info</p>
                                            </div>
                                            <p className="text-sm text-gray-700 font-medium ml-6">{markInfo}</p>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <TrendingUp className="w-4 h-4 text-gray-400" />
                                                    <p className="text-xs font-medium text-gray-500">Count</p>
                                                </div>
                                                <p className="text-2xl font-bold text-gray-900 ml-6">
                                                    {report.obtainedCount || 0}
                                                </p>
                                            </div>
                                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 border border-blue-200">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Award className="w-4 h-4 text-blue-600" />
                                                    <p className="text-xs font-medium text-blue-700">Mark</p>
                                                </div>
                                                <p className="text-2xl font-bold text-blue-700 ml-6">
                                                    {report.obtainedMark || 0}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Date Section */}
                                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <p className="text-xs text-gray-500">
                                                    {report.createdAt
                                                        ? new Date(report.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })
                                                        : 'N/A'}
                                                </p>
                                            </div>
                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(report)}
                                                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                                    disabled={isUpdating || isDeleting}
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(report)}
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                    disabled={isUpdating || isDeleting}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
                                No reports found
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
                                            Lesson Name
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Mark Info
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Obtained Count
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Obtained Mark
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        {
                                            type == 'teacher' && (
                                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            )
                                        }

                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {reports.length > 0 ? (
                                        reports.map((report, index) => {
                                            const isFixedMarks = report.typeName === 'Fixed Marks';
                                            const markInfo = isFixedMarks
                                                ? `Fixed Marks (${report.initialMark} marks)`
                                                : `${report.initialMark} mark per ${report.initialCount} ${report.typeName}`;

                                            return (
                                                <tr
                                                    key={report._id || index}
                                                    className="hover:bg-gray-50 transition-colors"
                                                >
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {report.lessonName || 'N/A'}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-700">
                                                            {markInfo}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {report.obtainedCount || 0}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <span className="text-sm font-semibold text-gray-900">
                                                            {(report.obtainedMark || 0).toFixed(2)}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : 'N/A'}
                                                    </td>
                                                    {
                                                        type == 'teacher' && (
                                                            <td className="px-4 py-4 whitespace-nowrap text-center">
                                                                <div className="flex items-center justify-center gap-2">
                                                                    <button
                                                                        onClick={() => handleEdit(report)}
                                                                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                                                        disabled={isUpdating || isDeleting}
                                                                        title="Edit"
                                                                    >
                                                                        <Edit size={16} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDelete(report)}
                                                                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                                        disabled={isUpdating || isDeleting}
                                                                        title="Delete"
                                                                    >
                                                                        <Trash2 size={16} />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        )
                                                    }
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                                                No reports found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Summary - Desktop */}
                        {reports.length > 0 && (
                            <div className="hidden md:block bg-gray-50 px-4 py-4 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">
                                        Total Marks:
                                    </span>
                                    <span className="text-lg font-bold text-gray-900">
                                        {reports.reduce((sum, report) => sum + (report.obtainedMark || 0), 0)}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Pagination - Desktop */}
                        {totalPages > 1 && (
                            <div className="hidden md:block px-4 py-4 border-t border-gray-200">
                                <PageNation totalPage={totalPages} setPage={setPage} page={page} />
                            </div>
                        )}
                    </div>

                    {/* Summary - Mobile */}
                    {reports.length > 0 && (
                        <div className="md:hidden bg-white rounded-xl shadow-sm p-4 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-base font-medium text-gray-700">
                                    Total Marks:
                                </span>
                                <span className="text-xl font-bold text-gray-900">
                                    {reports.reduce((sum, report) => sum + (report.obtainedMark || 0), 0)}
                                </span>
                            </div>
                        </div>
                    )}

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

export default StudentReport
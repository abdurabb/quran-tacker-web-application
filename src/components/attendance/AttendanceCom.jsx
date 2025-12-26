import React, { useState } from 'react'
import Loader from '../loader/Loader';
import { Filter, Calendar, Plus, Edit, CheckCircle, XCircle, Clock } from 'lucide-react';
import DatePicker from '../datePicker/DatePicker';
import { Modal } from '@mui/material';
import AddEditAttendanceModal from '../../pages/teacher/attendance/AddEditAttendanceModal';
import PageNation from '../pagination/Pagination';
import { useAddAttendance, useUpdateAttendance } from '../../apis/useTeacherDataController';
import { toast } from 'react-toastify';


function AttendanceCom({ classes, classId, attendanceRecords, totalPages, setClassId, selectedDate, setSelectedDate, page, setPage, attendanceLoading, classesLoading, type }) {

    const [openModal, setOpenModal] = useState(false);
    const [editingAttendance, setEditingAttendance] = useState(null);
    // apis
    const { mutate: addAttendanceMutate, isPending: isAdding } = useAddAttendance();
    const { mutate: updateAttendanceMutate, isPending: isUpdating } = useUpdateAttendance();
    // get status icon
    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'present':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'absent':
                return <XCircle className="w-5 h-5 text-red-600" />;
            case 'late':
                return <Clock className="w-5 h-5 text-yellow-600" />;
            default:
                return null;
        }
    };
    // get status badge
    const getStatusBadge = (status) => {
        const statusLower = status?.toLowerCase();
        const badgeClasses = {
            present: 'bg-green-100 text-green-800',
            absent: 'bg-red-100 text-red-800',
            late: 'bg-yellow-100 text-yellow-800'
        };
        return badgeClasses[statusLower] || 'bg-gray-100 text-gray-800';
    };

    const handleAddAttendance = () => {
        if (!classId) {
            toast.error('Please select a class');
            return;
        }
        setEditingAttendance(null);
        setOpenModal(true);
    };

    const handleEditAttendance = (attendance) => {
        setEditingAttendance(attendance);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditingAttendance(null);
    };

    const handleSubmit = (formData) => {
        if (editingAttendance) {
            // Update attendance
            updateAttendanceMutate(
                {
                    attendanceId: editingAttendance._id,
                    ...formData
                },
                {
                    onSuccess: (data) => {
                        toast.success(data?.message || 'Attendance updated successfully!');
                        handleCloseModal();
                    },
                    onError: (error) => {
                        toast.error(error?.response?.data?.message || 'Failed to update attendance');
                    }
                }
            );
        } else {
            // Add attendance
            addAttendanceMutate(
                formData,
                {
                    onSuccess: (data) => {
                        toast.success(data?.message || 'Attendance added successfully!');
                        handleCloseModal();
                    },
                    onError: (error) => {
                        toast.error(error?.response?.data?.message || 'Failed to add attendance');
                    }
                }
            );
        }
    };

    const isLoading = classesLoading || attendanceLoading;


    return (
        <div className="p-4 sm:p-6">
            {/* Header */}
            {
                type == 'teacher' && (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Attendance</h1>
                        <button
                            onClick={handleAddAttendance}
                            className="flex items-center gap-2 px-4 py-2 bg-commonColorButton text-white rounded-lg hover:bg-blue-900 transition-colors font-medium"
                        >
                            <Plus size={20} />
                            <span>Add Attendance</span>
                        </button>
                    </div>
                )
            }

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    {/* Class Filter */}
                    <div className="flex-1 w-full sm:w-auto">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Filter size={16} className="inline mr-2" />
                            Filter by Class
                        </label>
                        {classesLoading ? (
                            <div className="flex items-center justify-center py-2">
                                <Loader />
                            </div>
                        ) : (
                            <select
                                value={classId}
                                onChange={(e) => setClassId(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm bg-white"
                                disabled={classes.length === 0}
                            >
                                {classes.length === 0 ? (
                                    <option value="">No Classes Available</option>
                                ) : (
                                    classes.map((cls) => (
                                        <option key={cls._id} value={cls._id}>
                                            {cls.name}
                                        </option>
                                    ))
                                )}
                            </select>
                        )}
                    </div>

                    {/* Date Picker */}
                    <div className="flex-1 w-full sm:w-auto">
                        <DatePicker
                            value={selectedDate}
                            onChange={setSelectedDate}
                            label="Select Date"
                            placeholder="Select date"
                        />
                    </div>
                </div>
            </div>

            {/* Add/Edit Attendance Modal */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                className="flex items-center justify-center p-4 outline-none"
            >
                <AddEditAttendanceModal
                    setClose={handleCloseModal}
                    classes={classes}
                    initialClassId={classId}
                    date={selectedDate}
                    editingAttendance={editingAttendance}
                    handleSubmit={handleSubmit}
                    isSubmitting={isAdding || isUpdating}
                />
            </Modal>

            {isLoading ? (
                <div className="flex justify-center items-center py-12">
                    <Loader />
                </div>
            ) : (
                <>
                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4 mb-6">
                        {attendanceRecords.length > 0 ? (
                            attendanceRecords.map((record) => (
                                <div
                                    key={record._id}
                                    className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-md transition-all"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                                                {record.studentId?.name?.charAt(0)?.toUpperCase() || 'N'}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{record.studentId?.name || 'N/A'}</h3>
                                                <p className="text-sm text-gray-600">{record.studentId?.classId?.name || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(record.status)}
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(record.status)}`}>
                                                {record.status || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar size={16} />
                                            <span>{record.date ? new Date(record.date).toLocaleDateString() : 'N/A'}</span>
                                        </div>
                                        {
                                            type == 'teacher' && (
                                                <>
                                                    <button
                                                        onClick={() => handleEditAttendance(record)}
                                                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                                                    >
                                                        <Edit size={16} />
                                                        <span>Edit</span>
                                                    </button>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
                                <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                <p>No attendance records found</p>
                                {
                                    type == 'teacher' && (
                                        <>
                                            {classId && (
                                                <button
                                                    onClick={handleAddAttendance}
                                                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                                                >
                                                    Add attendance for this date
                                                </button>
                                            )}
                                        </>
                                    )
                                }
                            </div>
                        )}
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Student Name
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
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
                                    {attendanceRecords.length > 0 ? (
                                        attendanceRecords.map((record) => (
                                            <tr key={record._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                                            <span className="text-blue-600 font-semibold">
                                                                {record.studentId?.name?.charAt(0)?.toUpperCase() || 'N'}
                                                            </span>
                                                        </div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {record.studentId?.name || 'N/A'}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {record.date ? new Date(record.date).toLocaleDateString() : 'N/A'}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        {getStatusIcon(record.status)}
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(record.status)}`}>
                                                            {record.status || 'N/A'}
                                                        </span>
                                                    </div>
                                                </td>
                                                {
                                                    type == 'teacher' && (
                                                        <td className="px-4 py-4 whitespace-nowrap text-center">
                                                            <button
                                                                onClick={() => handleEditAttendance(record)}
                                                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
                                                            >
                                                                <Edit size={16} />
                                                                <span>Edit</span>
                                                            </button>
                                                        </td>
                                                    )
                                                }
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                                                <div className="flex flex-col items-center">
                                                    <Calendar className="w-12 h-12 mb-2 text-gray-300" />
                                                    <p>No attendance records found</p>
                                                    {
                                                        type == 'teacher' && (
                                                            <>
                                                                {classId && (
                                                                    <button
                                                                        onClick={handleAddAttendance}
                                                                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                                                                    >
                                                                        Add attendance for this date
                                                                    </button>
                                                                )}
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-6">
                            <PageNation totalPage={totalPages} setPage={setPage} page={page} />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default AttendanceCom
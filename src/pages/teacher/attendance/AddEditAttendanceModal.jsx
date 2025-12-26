import React, { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, Clock, Filter, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';
import { useGetStudents } from '../../../apis/useTeacherDataController';
import Loader from '../../../components/loader/Loader';

function AddEditAttendanceModal({ setClose, classes, initialClassId, date, editingAttendance, handleSubmit, isSubmitting }) {
  const [attendanceData, setAttendanceData] = useState({});
  const [selectedClassId, setSelectedClassId] = useState(initialClassId || '');

  // Get students for selected class
  const { data: studentsData, isLoading: studentsLoading } = useGetStudents(
    selectedClassId || editingAttendance?.studentId?.classId?._id || '', 
    1, 
    1000, 
    ''
  );
  
  const students = studentsData?.students || [];

  // Set default class when classes are loaded
  useEffect(() => {
    if (classes.length > 0 && !selectedClassId && !editingAttendance) {
      setSelectedClassId(classes[0]._id);
    }
    if (editingAttendance?.studentId?.classId?._id) {
      setSelectedClassId(editingAttendance.studentId.classId._id);
    }
  }, [classes, editingAttendance]);

  useEffect(() => {
    if (editingAttendance) {
      // If editing a single record, initialize with that record's data
      const initialData = {};
      if (editingAttendance.studentId?._id) {
        // Single record edit
        initialData[editingAttendance.studentId._id] = editingAttendance.status || '';
      } else if (editingAttendance.students) {
        // Multiple records edit
        students.forEach(student => {
          const existingRecord = editingAttendance.students.find(
            s => s.studentId === student._id || s.studentId?._id === student._id
          );
          initialData[student._id] = existingRecord?.status || '';
        });
      }
      setAttendanceData(initialData);
    } else {
      // If adding new, initialize empty
      const initialData = {};
      students.forEach(student => {
        initialData[student._id] = '';
      });
      setAttendanceData(initialData);
    }
  }, [editingAttendance, students]);

  // Reset attendance data when class changes
  useEffect(() => {
    if (!editingAttendance && selectedClassId) {
      const initialData = {};
      students.forEach(student => {
        initialData[student._id] = '';
      });
      setAttendanceData(initialData);
    }
  }, [selectedClassId, students]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!selectedClassId) {
      toast.error('Please select a class');
      return;
    }

    if (!date) {
      toast.error('Please select a date');
      return;
    }

    // Check if at least one student has attendance marked
    const hasAnyAttendance = Object.values(attendanceData).some(status => status !== '');
    if (!hasAnyAttendance) {
      toast.error('Please mark attendance for at least one student');
      return;
    }

    if (editingAttendance && editingAttendance.studentId?._id) {
      // Editing a single record
      const studentId = editingAttendance.studentId._id;
      const status = attendanceData[studentId];
      if (!status) {
        toast.error('Please select a status');
        return;
      }
      handleSubmit({
        studentId,
        status,
        date: editingAttendance.date || date
      });
    } else {
      // Adding new or editing multiple
      const studentsData = Object.entries(attendanceData)
        .filter(([_, status]) => status !== '')
        .map(([studentId, status]) => ({
          studentId,
          status
        }));

      handleSubmit({
        students: studentsData,
        date,
        classId: selectedClassId
      });
    }
  };

  const getStatusButton = (studentId, status, currentStatus) => {
    const isSelected = currentStatus === status;
    const buttonClasses = {
      present: isSelected
        ? 'bg-green-600 text-white border-green-600'
        : 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100',
      absent: isSelected
        ? 'bg-red-600 text-white border-red-600'
        : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100',
      late: isSelected
        ? 'bg-yellow-600 text-white border-yellow-600'
        : 'bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100'
    };

    const icons = {
      present: CheckCircle,
      absent: XCircle,
      late: Clock
    };

    const Icon = icons[status];

    return (
      <button
        type="button"
        onClick={() => handleStatusChange(studentId, status)}
        disabled={isSubmitting}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
          buttonClasses[status]
        } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Icon size={18} />
        <span className="capitalize">{status}</span>
      </button>
    );
  };

  return (
    <div className="bg-white w-full max-w-[700px] font-urbanist md:rounded-[30px] rounded-lg shadow-lg overflow-hidden max-h-[90vh] flex flex-col">
      <div className="p-6 flex-shrink-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#1D2939]">
            {editingAttendance ? 'Edit Attendance' : 'Add Attendance'}
          </h2>
          <button
            onClick={setClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            type="button"
            disabled={isSubmitting}
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <hr className="mb-6 border-t border-gray-200" />

        {/* Date and Class Filter */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-2" />
                Date
              </label>
              <p className="font-semibold text-gray-800">
                {date ? new Date(date).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter size={16} className="inline mr-2" />
                Select Class
              </label>
              {editingAttendance?.studentId?._id ? (
                <p className="font-semibold text-gray-800">
                  {editingAttendance.studentId?.classId?.name || 'N/A'}
                </p>
              ) : (
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm bg-white"
                  disabled={isSubmitting || classes.length === 0}
                >
                  {classes.length === 0 ? (
                    <option value="">No Classes Available</option>
                  ) : (
                    <>
                      <option value="">-- Select a class --</option>
                      {classes.map((cls) => (
                        <option key={cls._id} value={cls._id}>
                          {cls.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {isSubmitting || studentsLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader />
          </div>
        ) : !selectedClassId && !editingAttendance ? (
          <div className="text-center py-8 text-gray-500">
            <p>Please select a class to view students</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            {(editingAttendance && editingAttendance.studentId?._id
              ? [editingAttendance.studentId]
              : students
            ).length > 0 ? (
              (editingAttendance && editingAttendance.studentId?._id
                ? [editingAttendance.studentId]
                : students
              ).map((student) => {
                const studentId = student._id || student;
                const currentStatus = attendanceData[studentId] || '';

                return (
                  <div
                    key={studentId}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {(student.name || student)?.charAt(0)?.toUpperCase() || 'N'}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{student.name || student || 'N/A'}</p>
                          {student.email && (
                            <p className="text-xs text-gray-500">{student.email}</p>
                          )}
                        </div>
                      </div>
                      {currentStatus && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          currentStatus === 'present' ? 'bg-green-100 text-green-800' :
                          currentStatus === 'absent' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {currentStatus}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {getStatusButton(studentId, 'present', currentStatus)}
                      {getStatusButton(studentId, 'absent', currentStatus)}
                      {getStatusButton(studentId, 'late', currentStatus)}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No students found in this class</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-4 sticky bottom-0 bg-white border-t border-gray-200 -mx-6 px-6 pb-6">
              <button
                type="button"
                onClick={setClose}
                disabled={isSubmitting}
                className="flex-1 bg-gray-200 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-300 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-commonColorButton text-white font-medium py-3 rounded-lg hover:bg-blue-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? (editingAttendance ? 'Updating...' : 'Adding...')
                  : (editingAttendance ? 'Update Attendance' : 'Add Attendance')
                }
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AddEditAttendanceModal;


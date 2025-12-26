import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useGetAllTeachers, useGetStudents, useGetStudentsFilteredByClass, useAssignClassForStudents, useRemoveTeacherFromClass } from '../../../apis/useAdminDataController'
import Loader from '../../../components/loader/Loader'
import PageNation from '../../../components/pagination/Pagination';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../../components/confirmationModal/ConfirmationModal';
import { Modal } from "@mui/material";

function ClassDetailModal({ setClose, handleSubmit, classData, refetch }) {
    const [selectedTeacherId, setSelectedTeacherId] = useState('');
    const [allTeachers, setAllTeachers] = useState([])
    const [activeTab, setActiveTab] = useState('students'); // 'students' or 'addStudents'
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
    // Students tab state
    const [studentsPage, setStudentsPage] = useState(1)
    const [studentsLimit] = useState(10)
    const [studentSearch, setStudentSearch] = useState('')
    const { data: studentsData, refetch: studentsRefetch, isLoading: studentsLoading, refetch: refetchStudents } = useGetStudents(studentsPage, studentsLimit, studentSearch, classData?._id, { enabled: activeTab === 'students', disabled: activeTab === 'addStudents' })

    // Add Students tab state
    const [addStudentsPage, setAddStudentsPage] = useState(1)
    const [addStudentsLimit] = useState(10)
    const [addStudentSearch, setAddStudentSearch] = useState('')
    const [selectedStudents, setSelectedStudents] = useState([])
    // search, page, limit, classId, isClass
    const { data: allStudentsData, refetch: refetchAllStudents, isLoading: allStudentsLoading } = useGetStudentsFilteredByClass(addStudentSearch, addStudentsPage, addStudentsLimit, classData?._id, false, { enabled: activeTab === 'addStudents', disabled: activeTab === 'students' })

    // Teacher assignment
    const [search, setSearch] = useState('')
    const { data, isLoading } = useGetAllTeachers(search)
    const { mutate: assignStudentMutate, isPending: isAssigningStudents } = useAssignClassForStudents();
    // remove teacher from class
    const { mutate: removeTeacherMutate, isPending: isRemovingTeacher, isSuccess: isRemovingTeacherSuccess } = useRemoveTeacherFromClass();

    // Generate select options
    const teacherOptions = allTeachers.map(teacher => ({
        value: teacher._id,
        label: teacher.name,
    }));

    useEffect(() => {
        if (Array.isArray(data?.teachers) && data?.teachers?.length > 0) {
            setAllTeachers(data?.teachers)
        }
    }, [data])

    useEffect(() => {
        if (activeTab === 'students') {
            studentsRefetch();
        } else {
            refetchAllStudents();
        }
    }, [activeTab])

    useEffect(() => {
        if (isRemovingTeacherSuccess) {
            refetch();
            setClose()
            setOpenConfirmationModal(false)
        }
    }, [isRemovingTeacherSuccess])

    const handleAssignTeacher = () => {
        if (selectedTeacherId && classData?._id) {
            handleSubmit(classData?._id, selectedTeacherId)
            setClose(); // Close the modal after submit
        }
    };

    // Handle student selection for bulk assignment
    const handleStudentSelect = (studentId) => {
        setSelectedStudents(prev => {
            if (prev.includes(studentId)) {
                return prev.filter(id => id !== studentId);
            } else {
                return [...prev, studentId];
            }
        });
    };

    // Handle select all students on current page
    const handleSelectAll = () => {
        const currentPageStudentIds = allStudentsData?.students?.map(student => student._id) || [];
        const allSelected = currentPageStudentIds.length > 0 && currentPageStudentIds.every(id => selectedStudents.includes(id));

        if (allSelected) {
            // Deselect all from current page
            setSelectedStudents(prev => prev.filter(id => !currentPageStudentIds.includes(id)));
        } else {
            // Select all from current page
            setSelectedStudents(prev => {
                const newSelection = [...prev];
                currentPageStudentIds.forEach(id => {
                    if (!newSelection.includes(id)) {
                        newSelection.push(id);
                    }
                });
                return newSelection;
            });
        }
    };

    // Handle bulk assignment
    const handleBulkAssign = () => {
        if (selectedStudents.length === 0) {
            toast.error('Please select at least one student');
            return;
        }

        if (!classData?._id) {
            toast.error('Class ID is missing');
            return;
        }

        // Send array of student IDs
        assignStudentMutate(
            { classId: classData._id, studentId: selectedStudents },
            {
                onSuccess: (data) => {
                    toast.success(data?.message || `Successfully assigned ${selectedStudents.length} student(s) to the class!`);
                    setSelectedStudents([]);
                    refetchStudents();
                    setActiveTab('students');
                },
                onError: (error) => {
                    toast.error(error?.response?.data?.message || 'Failed to assign students');
                }
            }
        );
    };

    const handleRemoveTeacher = () => {

        if (classData?._id) {
            setOpenConfirmationModal(false)
            removeTeacherMutate({ classId: classData._id }, {
                onSuccess: (data) => {
                    toast.success(data?.message);
                },
                onError: (error) => {
                    toast.error(error?.response?.data?.message || 'Failed to remove teacher');
                }
            })

        } else {
            toast.error('Class ID is missing');
            setOpenConfirmationModal(false)
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl font-urbanist overflow-y-auto max-h-[90vh]">
            <Modal
                open={openConfirmationModal}
                onClose={() => setOpenConfirmationModal(false)}
                className="flex items-center justify-center p-4 outline-none"
            >
                <ConfirmationModal setClose={() => setOpenConfirmationModal(false)} message={`Are you sure want to remove the teacher from the class?`} confirmFunction={handleRemoveTeacher} type={'delete'} />
            </Modal>
            {isLoading || isRemovingTeacher ? (
                <div className="text-center py-4">
                    <div className="flex justify-center">
                        <Loader />
                    </div>
                </div>
            ) : (
                <>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-[#1D2939]">Class Details</h2>
                        <button
                            onClick={setClose}
                            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                        >
                            ✕
                        </button>
                    </div>

                    <hr className="mb-6 border-t border-gray-200" />

                    {/* Class Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Class Name</p>
                            <p className="font-semibold text-lg">{classData?.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Description</p>
                            <p className="font-semibold text-lg">{classData?.description || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Students</p>
                            <p className="font-semibold text-lg">{studentsData?.total || 0}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Teacher</p>
                            <p className="font-semibold text-lg">{classData?.teacherName || 'Not assigned'}</p>
                        </div>
                    </div>

                    {/* Assign Teacher Section */}
                    {Array.isArray(allTeachers) && allTeachers.length > 0 && (
                        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    {classData?.teacherName ? (
                                        <h3 className="text-lg font-medium mb-1">Change Teacher</h3>
                                    ) : (
                                        <h3 className="text-lg font-medium mb-1">Assign a Teacher</h3>
                                    )}
                                </div>
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex-1 min-w-[200px]">
                                        <Select
                                            options={teacherOptions}
                                            onChange={(selected) => setSelectedTeacherId(selected?.value || '')}
                                            placeholder="Select a Teacher"
                                            isSearchable
                                            isClearable
                                            className="text-sm"
                                            classNamePrefix="react-select"
                                        />
                                    </div>
                                    {selectedTeacherId && (
                                        <button
                                            onClick={handleAssignTeacher}
                                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 whitespace-nowrap"
                                        >
                                            Assign
                                        </button>
                                    )}
                                    {classData?.teacherName && (
                                        <button
                                            onClick={() => setOpenConfirmationModal(true)}
                                            className="bg-red-600 text-white text-xs md:text-sm px-2 py-1 rounded hover:bg-red-700 whitespace-nowrap"
                                        >
                                            Remove Teacher
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="mb-4 border-b border-gray-200">
                        <div className="flex gap-4">
                            <button
                                onClick={() => {
                                    setActiveTab('students');
                                    setSelectedStudents([]);
                                }}
                                className={`px-4 py-2 font-medium transition-colors ${activeTab === 'students'
                                    ? 'text-commonColorButton border-b-2 border-commonColorButton'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                Students
                            </button>
                            <button
                                onClick={() => {
                                    setActiveTab('addStudents');
                                    setSelectedStudents([]);
                                }}
                                className={`px-4 py-2 font-medium transition-colors ${activeTab === 'addStudents'
                                    ? 'text-commonColorButton border-b-2 border-commonColorButton'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                Add Students
                            </button>
                        </div>
                    </div>

                    {/* Students Tab */}
                    {activeTab === 'students' && (
                        <div>
                            {/* Search */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Search students..."
                                    value={studentSearch}
                                    onChange={(e) => {
                                        setStudentSearch(e.target.value);
                                        setStudentsPage(1);
                                    }}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Students Table */}
                            {studentsLoading ? (
                                <div className="text-center py-8">
                                    <Loader />
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white rounded shadow text-sm">
                                            <thead>
                                                <tr>
                                                    <th className="py-2 px-4 border-b border-gray-200 text-left">No.</th>
                                                    <th className="py-2 px-4 border-b border-gray-200 text-left">Name</th>
                                                    <th className="py-2 px-4 border-b border-gray-200 text-left hidden md:table-cell">Phone</th>
                                                    <th className="py-2 px-4 border-b border-gray-200 text-left hidden md:table-cell">Email</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {studentsData?.students?.length > 0 ? (
                                                    studentsData.students.map((student, idx) => (
                                                        <tr key={student._id} className="hover:bg-gray-50 transition">
                                                            <td className="py-2 px-4 border-b border-gray-200">
                                                                {(studentsPage - 1) * studentsLimit + idx + 1}
                                                            </td>
                                                            <td className="py-2 px-4 border-b border-gray-200">
                                                                <div className="flex items-center gap-2">
                                                                    <img
                                                                        src={student?.image || "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80"}
                                                                        alt={student?.name}
                                                                        className="w-8 h-8 rounded-full object-cover"
                                                                    />
                                                                    <span className="font-medium">{student?.name}</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-2 px-4 border-b border-gray-200 hidden md:table-cell">
                                                                {student?.dialCode ? `${student.dialCode}-${student.phone}` : student?.phone || 'N/A'}
                                                            </td>
                                                            <td className="py-2 px-4 border-b border-gray-200 hidden md:table-cell">
                                                                {student?.email || 'N/A'}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="text-center py-4 text-gray-500">
                                                            No students found in this class.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    {studentsData?.totalPages > 1 && (
                                        <div className="mt-4">
                                            <PageNation totalPage={studentsData?.totalPages} setPage={setStudentsPage} />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    {/* Add Students Tab */}
                    {activeTab === 'addStudents' && (
                        <div>
                            {/* Search */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Search students to add..."
                                    value={addStudentSearch}
                                    onChange={(e) => {
                                        setAddStudentSearch(e.target.value);
                                        setAddStudentsPage(1);
                                    }}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Selected count and Submit button */}
                            {selectedStudents.length > 0 && (
                                <div className="mb-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                                    <span className="text-sm font-medium text-blue-700">
                                        {selectedStudents.length} student(s) selected
                                    </span>
                                    <button
                                        onClick={handleBulkAssign}
                                        disabled={isAssigningStudents}
                                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 whitespace-nowrap"
                                    >
                                        {isAssigningStudents ? 'Assigning...' : `Assign ${selectedStudents.length} Student(s)`}
                                    </button>
                                </div>
                            )}

                            {/* Students Table with Checkboxes */}
                            {allStudentsLoading ? (
                                <div className="text-center py-8">
                                    <Loader />
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white rounded shadow text-sm">
                                            <thead>
                                                <tr>
                                                    <th className="py-2 px-4 border-b border-gray-200 text-center">
                                                        <input
                                                            type="checkbox"
                                                            onChange={handleSelectAll}
                                                            checked={allStudentsData?.students?.length > 0 && allStudentsData.students.every(student => selectedStudents.includes(student._id))}
                                                            className="cursor-pointer"
                                                        />
                                                    </th>
                                                    <th className="py-2 px-4 border-b border-gray-200 text-left">No.</th>
                                                    <th className="py-2 px-4 border-b border-gray-200 text-left">Name</th>
                                                    <th className="py-2 px-4 border-b border-gray-200 text-left hidden md:table-cell">Phone</th>
                                                    <th className="py-2 px-4 border-b border-gray-200 text-left hidden md:table-cell">Email</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allStudentsData?.students?.length > 0 ? (
                                                    allStudentsData.students.map((student, idx) => (
                                                        <tr key={student._id} className="hover:bg-gray-50 transition">
                                                            <td className="py-2 px-4 border-b border-gray-200 text-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedStudents.includes(student._id)}
                                                                    onChange={() => handleStudentSelect(student._id)}
                                                                    className="cursor-pointer"
                                                                />
                                                            </td>
                                                            <td className="py-2 px-4 border-b border-gray-200">
                                                                {(addStudentsPage - 1) * addStudentsLimit + idx + 1}
                                                            </td>
                                                            <td className="py-2 px-4 border-b border-gray-200">
                                                                <div className="flex items-center gap-2">
                                                                    <img
                                                                        src={student?.image || "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80"}
                                                                        alt={student?.name}
                                                                        className="w-8 h-8 rounded-full object-cover"
                                                                    />
                                                                    <span className="font-medium">{student?.name}</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-2 px-4 border-b border-gray-200 hidden md:table-cell">
                                                                {student?.dialCode ? `${student.dialCode}-${student.phone}` : student?.phone || 'N/A'}
                                                            </td>
                                                            <td className="py-2 px-4 border-b border-gray-200 hidden md:table-cell">
                                                                {student?.email || 'N/A'}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center py-4 text-gray-500">
                                                            {addStudentSearch ? 'No students found matching your search.' : 'No students available.'}
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    {allStudentsData?.totalPages > 1 && (
                                        <div className="mt-4">
                                            <PageNation totalPage={allStudentsData?.totalPages} setPage={setAddStudentsPage} />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ClassDetailModal;

import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useGetAllTeachers } from '../../../apis/useAdminDataController'
import Loader from '../../../components/loader/Loader'


function ClassDetailModal({ setClose, handleSubmit, classData, }) {
    const [selectedTeacherId, setSelectedTeacherId] = useState('');
    const [allTeachers, setAllTeachers] = useState([])

    // apis
    const[search,setSearch] = useState('')
    const { data, isLoading } = useGetAllTeachers(search)


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

    const handleAssignTeacher = () => {
        if (selectedTeacherId && classData?._id) {
            handleSubmit(classData?._id, selectedTeacherId)
            setClose(); // Close the modal after submit
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl font-urbanist">

            {
                (isLoading) ? (
                    <>
                        <div>
                            <div colSpan={5} className="text-center py-4">
                                <div className="flex justify-center">
                                    <Loader />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Class Details</h2>
                            <button
                                onClick={setClose}
                                className="text-red-700 hover:text-red-800 text-sm"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Class Info */}
                        <div className="space-y-2 mb-6">
                            <p><strong>Name:</strong> {classData?.name}</p>
                            <p><strong>Description:</strong> {classData?.description}</p>
                            <p><strong>Total Students:</strong> {classData?.totalStudent}</p>
                            <p><strong> Teacher:</strong> {classData?.teacherName || 'Not assigned'}</p>
                        </div>

                        {/* Assign Teacher Dropdown */}
                        {Array.isArray(allTeachers) && allTeachers.length > 0 && (
                            <div className="w-full mt-4">
                                {
                                    classData?.teacherName ? <h3 className="text-lg font-medium mb-2">Change Teacher</h3> : <h3 className="text-lg font-medium mb-2">Assign a Teacher</h3>
                                }

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
                                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                        >
                                            Assign
                                        </button>
                                    )}
                                </div>

                                <h1> remove teacher</h1>
                                <h1>add students</h1>
                            </div>
                        )}
                    </>
                )}

        </div>
    );
}

export default ClassDetailModal;

import React, { useState } from 'react'
import { useGetAllClasses, useAssignClassForStudents } from '../../../apis/useAdminDataController'
import Select from 'react-select';
import { toast } from 'react-toastify';

function ClassAssignModal({ selectedStudentId, setSelectedStudentId }) {

    const [selectedClassId, setSelectedClassId] = useState(null)// assign classes
    const [classSearch, setClassSearch] = useState('')



    // apis
    const { isPending: classAssignPending, mutate: classAssignMutate, error: classAssignError, isSuccess: classAssignSuccess, isError: isClassAssignError } = useAssignClassForStudents();
    const { data: classData, isLoading: classLoading } = useGetAllClasses(classSearch, !!selectedStudentId)


    const classOptions = Array.isArray(classData?.classes) && classData?.classes?.length > 0 ? classData?.classes?.map(cls => ({
        value: cls?._id,
        label: cls?.name
    })) || [] : [];

    const handleAssignClass = () => {
        classAssignMutate({ classId: selectedClassId, studentId: selectedStudentId }, {
            onSuccess: (data) => {
                toast.success(data?.message);
                setSelectedClassId(null);
                setSelectedStudentId(null);
            },
        });
    }
    return (
        <div className='bg-white w-full md:w-1/2 p-2  rounded-lg '>
            {
                selectedStudentId && !classLoading && (
                    <>
                        <div className=" md:flex  justify-between items-center mb-6 ">
                            {Array.isArray(classData?.classes) && classData?.classes?.length > 0 && (
                                <div className="mt-6 w-full">
                                    <h2 className="text-lg font-semibold mb-2">Assign a Class</h2>
                                    <div className="flex flex-wrap items-center gap-4 w-full">
                                        <div className="flex-1 min-w-[200px]">
                                            <Select
                                                options={classOptions}
                                                onChange={(selectedOption) => setSelectedClassId(selectedOption?.value || '')}
                                                placeholder="Select a class"
                                                isSearchable
                                                isClearable
                                                className="text-sm"
                                                classNamePrefix="react-select"
                                            />
                                        </div>

                                        {selectedClassId && selectedStudentId && (
                                            <div className='flex items-center  gap-2'>
                                                <button
                                                    onClick={handleAssignClass}
                                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                                >
                                                    Submit
                                                </button>

                                                {
                                                    selectedStudentId && (<>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedClassId(null),
                                                                    setSelectedStudentId(null)
                                                            }}
                                                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                                        >
                                                            Close
                                                        </button>
                                                    </>)
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default ClassAssignModal
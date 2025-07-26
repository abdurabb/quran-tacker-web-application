import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pencil, Trash2, ArrowLeft } from 'lucide-react';
import Loader from '../../../components/loader/Loader'
import { useGetStudentDetails, useDeleteStudent } from '../../../apis/useAdminDataController'
import ConfirmationModal from '../../../components/confirmationModal/ConfirmationModal'
import { Modal } from "@mui/material";
import { toast } from 'react-toastify';


function StudentDetails() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const studentId = searchParams.get('hashId');
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    // apis
    const { data, isLoading } = useGetStudentDetails(studentId)
    const { data: teacherDeleteData, isPending: deletePending, mutate: deleteMutate, error: deleteError } = useDeleteStudent();



    const {
        image,
        name,
        email,
        password,
        dialCode,
        phone,
        dob,
        gender,
        address,
        classId,
        admissionDate,
        classes,
        teacher
    } = data?.student || {}

    // delete Student
    const handleClose = () => {
        setOpenDeleteModal(false);
    }
    const confirmFunction = () => {
        deleteMutate({ _id: studentId }, {
            onSuccess: (data) => {
                toast.success(data?.message);
            }
        })
        setOpenDeleteModal(false);
        navigate('/students')
    }




    const Detail = ({ label, value }) => (
        <div>
            <p className="text-gray-500 text-sm mb-1">{label}</p>
            <p className="font-medium text-gray-800">{value}</p>
        </div>
    );

    const formatDate = (date) =>
        new Date(date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });



    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
            {/* open delete confirmation modal */}
            <Modal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                className="flex items-center justify-center p-4 outline-none"
            >
                <ConfirmationModal setClose={handleClose} message={`Are you sure want to delete the Student" ${name}" `}
                    confirmFunction={confirmFunction} type={'delete'} />
            </Modal>

            {
                isLoading ? (
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
                        <div className="md:flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800">Student Details</h2>
                            <div className="flex gap-2 mt-4 md:mt-0">
                                <button
                                    onClick={() => navigate('/students')}
                                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                                >
                                    <ArrowLeft size={16} />
                                    Back
                                </button>
                                <button
                                    onClick={() => { alert('Edit') }}
                                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                                >
                                    <Pencil size={16} />
                                    Edit
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setOpenDeleteModal(true)
                                    }}
                                    className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            {/* Image & Name */}
                            <div className="col-span-1 flex flex-col items-center gap-3">
                                <img
                                    src={
                                        image ||
                                        'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                                    }
                                    alt={name}
                                    className="w-32 h-32 rounded-full object-cover shadow"
                                />
                                <h3 className="text-xl font-medium text-center">{name}</h3>
                            </div>

                            {/* Student Info */}
                            <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Detail label="Email" value={email} />
                                <Detail label="Password" value={password} />
                                <Detail label="Phone" value={`${dialCode}-${phone}`} />
                                <Detail label="Date of Birth" value={formatDate(dob)} />
                                <Detail label="Gender" value={gender} />
                                <Detail label="Admission Date" value={formatDate(admissionDate)} />
                                <Detail label="Address" value={address} />
                                <Detail label="Class" value={classes || 'Not assigned'} />
                                <Detail label="Class Teacher" value={teacher || '—'} />
                            </div>
                        </div>

                        {/* Class Action */}
                        <div className="mt-6 text-right">
                            <button
                                onClick={() => { }}
                                className={`px-4 py-2 rounded text-white text-sm ${classId
                                    ? 'bg-blue-600 hover:bg-blue-700'
                                    : 'bg-green-600 hover:bg-green-700'
                                    }`}
                            >
                                {classId ? 'Change Class' : 'Add Class'}
                            </button>
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default StudentDetails;

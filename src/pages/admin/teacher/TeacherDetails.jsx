import React, { useState, useEffect } from 'react';
import { Modal } from "@mui/material";
import { toast } from 'react-toastify';
import ConfirmationModal from '../../../components/confirmationModal/ConfirmationModal'
import { useUpdateTeacher, useDeleteTeacher, useGetTeacherDetails, useGetAllClasses, useAssignClass, useImageUpload } from '../../../apis/useAdminDataController'
import { useNavigate, useSearchParams } from 'react-router-dom';
import TeacherModal from './TeacherModal';
import Select from 'react-select';
import Loader from '../../../components/loader/Loader'
import PageNation from '../../../components/pagination/Pagination';


function TeacherDetails({ teacher, onEdit, onDelete }) {
  const [searchParams] = useSearchParams();
  const hashId = searchParams.get('hashId');
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [allClasses, setAllClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [search, setSearch] = useState('')

  const navigate = useNavigate()

  const { data, isLoading } = useGetTeacherDetails(hashId)
  const { data: teacherData, isLoading: classLoading } = useGetAllClasses(search)
  const { data: teacherDeleteData, isPending: deletePending, mutate: deleteMutate, error: deleteError } = useDeleteTeacher();
  const { data: assignTeacher, isPending: assignPending, mutate: assignMutate, error: assignError } = useAssignClass();
  const { data: teacherUpdateData, isPending: teacherUpdatePending, mutate: updateMutate, error: updateError } = useUpdateTeacher();
  const { mutate: imageMutate, isPending: imagePending } = useImageUpload()


  // delete Class
  const handleClose = () => {
    setOpenDeleteModal(false);
  }
  const confirmFunction = () => {
    deleteMutate({ _id: hashId }, {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    })
    setOpenDeleteModal(false);
    navigate('/teachers')
  }

  // update 
  const handleAddModalClose = () => {
    setOpenAddModal(false)
  }
  const handleSubmit = (form, setIsAdding, id) => {
    const newForm = { _id: id, ...form }
    const file = form?.image
    if (!file) {
      setIsAdding(true);
      updateMutate(newForm, {
        onSuccess: (data) => {
          toast.success(data?.message);
          setOpenAddModal(false)
          setIsAdding(false);
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Failed to add Teacher.");
          setIsAdding(false);
        }
      });
    } else {
      setIsAdding(true);
      imageMutate(file, {
        onSuccess: (data) => {
          updateMutate({ ...newForm, image: data?.secure_url }, {
            onSuccess: (data) => {
              toast.success(data?.message);
              setOpenAddModal(false);
              setIsAdding(false);
            },
            onError: (error) => {
              toast.error(error?.response?.data?.message || "Failed to add Teacher.");
              setIsAdding(false);
            }
          });
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Image upload failed.");
          setIsAdding(false);
        }
      });
    }
  }

  useEffect(() => {
    setAllClasses(teacherData?.classes)
  }, [teacherData])


  const classOptions = allClasses?.map(cls => ({
    value: cls?._id,
    label: cls?.name
  })) || [];



  // assign classes
  const handleAssignClass = () => {
    assignMutate({ classId: selectedClassId, teacherId: hashId }, {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    });
  }

  const {
    name,
    image,
    email,
    password,
    qualification,
    dob,
    joiningDate,
    dialCode,
    phone,
    address,
    gender,
    experience,
    classes = [],
  } = data?.teacher || {};

  useEffect(() => {
    if (Array.isArray(classes) && classes.length > 0) {
      setSelectedClass(classes[0]?._id)
    }
  }, [classes])




  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-4 md:mt-14 font-urbanist">
      {/* open delete confirmation modal */}
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        className="flex items-center justify-center p-4 outline-none"
      >
        <ConfirmationModal setClose={handleClose} message={`Are you sure want to delete the " ${name}" Teacher`}
          confirmFunction={confirmFunction} type={'delete'} />
      </Modal>

      {/* add  modal */}
      <Modal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        className="flex items-center justify-center p-4 outline-none"
      >
        {/* setClose, handleSubmit, type, teacher = {} */}
        <TeacherModal setClose={handleAddModalClose} handleSubmit={handleSubmit} type={'Update'} teacher={data?.teacher} />
      </Modal>


      {
        (isLoading || classLoading || deletePending || assignPending || teacherUpdatePending || imagePending) ? (
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

            <div className="flex gap-3 mt-2 md:mt-0 ">
              <button
                onClick={() => {
                  navigate('/teachers');
                }}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {/* Back Arrow Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
                Back
              </button>

              <button
                onClick={() => { setOpenAddModal(true) }}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDeleteModal(true)
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>

            {/* Header */}
            <div className=" md:flex justify-between items-center mb-6 ">
              {Array.isArray(allClasses) && allClasses.length > 0 && (
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

                    {selectedClassId && (
                      <button
                        onClick={handleAssignClass}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Assign
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={image || "https://imgs.search.brave.com/TnArB88gluKnynsOtxMrOjRzop_vKbOXKS7yG_6OndE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by91c2VyLWljb24t/cGVyc29uLXN5bWJv/bC1odW1hbi1hdmF0/YXItM2QtcmVuZGVy/XzQ3MzkzMS0yMTcu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MA"}
                  alt={name}
                  className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
                />
              </div>
              <div className="space-y-2">
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Password:</strong> {password}</p>
                <p><strong>Phone:</strong> {dialCode}-{phone}</p>
                <p><strong>Gender:</strong> {gender}</p>
                <p><strong>Address:</strong> {address}</p>
                <p><strong>Qualification:</strong> {qualification}</p>
                <p><strong>Experience:</strong> {experience} years</p>
                <p><strong>Date of Birth:</strong> {new Date(dob).toLocaleDateString()}</p>
                <p><strong>Joining Date:</strong> {new Date(joiningDate).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Classes */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Assigned Classes</h2>
              <div className="flex flex-wrap gap-3">
                {classes?.length > 0 ? (
                  classes.map((cls, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedClass(cls?._id)}
                      className={`px-4 py-2 rounded-full border ${selectedClass === cls?._id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-blue-100'}`}
                    >
                      {cls?.name}
                    </button>
                  ))
                ) : (
                  <p>No classes assigned</p>
                )}
              </div>
            </div>

            {/* Students */}
            {/* {selectedClass && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Students in {selectedClass}</h2>
          {students?.length > 0 ? (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={student._id}>
                    <td className="p-2 border">{idx + 1}</td>
                    <td className="p-2 border">{student.name}</td>
                    <td className="p-2 border">{student.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No students found in this class.</p>
          )}
        </div>
      )} */}
          </>
        )
      }

    </div>
  );
}

export default TeacherDetails;

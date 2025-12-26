import React, { useState } from 'react';
import { useAddStudent, useImageUpload, useGetStudents, } from '../../../apis/useAdminDataController'
import StudentAddModal from './StudentAddModal';
import { Modal } from "@mui/material";
import { toast } from 'react-toastify';
import Loader from '../../../components/loader/Loader'
import PageNation from '../../../components/pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import ClassAssignModal from './ClassAssignModal';



function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [classSearch, setClassSearch] = useState('')
  const [openAddModal, setOpenAddModal] = useState(false)
  const [selectedStudentId, setSelectedStudentId] = useState(null)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const navigate = useNavigate()

  // apis
  const { mutate: imageMutate, isPending: imagePending } = useImageUpload()
  const { data: studentAddData, isPending, mutate, error } = useAddStudent();
  const { data, isLoading } = useGetStudents(page, limit, searchTerm)



  // add 
  const handleAddModalClose = () => {
    setOpenAddModal(false)
  }
  const handleSubmit = (form, setIsAdding) => {
    const file = form?.image
    if (form?.phone?.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }
    if (!file) {
      mutate(form, {
        onSuccess: (data) => {
          toast.success(data?.message);
          setOpenAddModal(false);
          setIsAdding(false);
        },
        onError: (error) => {
          // toast.error(error?.response?.data?.message || "Failed to add student.");
          setIsAdding(false);
        }
      });
    } else {
      setIsAdding(true);
      imageMutate(file, {
        onSuccess: (data) => {
          mutate({ ...form, image: data?.secure_url }, {
            onSuccess: (data) => {
              toast.success(data?.message);
              setOpenAddModal(false);
              setIsAdding(false);
            },
            onError: (error) => {
              toast.error(error?.response?.data?.message || "Failed to add student.");
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



  return (
    <div className="p-6">

      {/* add  modal */}
      <Modal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        className="flex items-center justify-center p-4 outline-none"
      >
        <StudentAddModal setClose={handleAddModalClose} handleSubmit={handleSubmit} type={'Create'} />
      </Modal>

      {/* class change  */}
      <Modal
        open={selectedStudentId}
        onClose={() => setSelectedStudentId(false)}
        className="flex items-center justify-center p-4 outline-none"
      >

        <ClassAssignModal selectedStudentId={selectedStudentId} setSelectedStudentId={setSelectedStudentId} />
      </Modal>


      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Students</h1>
        <button
          onClick={() => {
            setOpenAddModal(true)
          }}
          className="bg-commonColorButton text-white px-4 py-2 rounded hover:bg-blue-900"
        >
          + Add New Student
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search student name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        />
      </div>

      {
        (isLoading || isPending || imagePending) ? (
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
            <table className="min-w-full bg-white rounded shadow text-sm">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Name</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left hidden md:table-cell">Phone</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Class</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-center">Class Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.students?.length > 0 ? (
                  data?.students?.map((student) => (
                    <tr
                      onClick={() => {
                        navigate(`/student-details?hashId=${student?._id}`)
                      }}
                      key={student?._id} className="hover:bg-gray-50 transition hover:cursor-pointer">
                      <td className="py-2 px-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              student?.image ||
                              "https://imgs.search.brave.com/TnArB88gluKnynsOtxMrOjRzop_vKbOXKS7yG_6OndE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by91c2VyLWljb24t/cGVyc29uLXN5bWJv/bC1odW1hbi1hdmF0/YXItM2QtcmVuZGVy/XzQ3MzkzMS0yMTcu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MA"
                            }
                            alt={student?.name}
                            className="w-8 h-8 rounded-full object-cover hidden md:table-cell"
                          />
                          <span className="font-medium text-sm md:text-medium">{student?.name}</span>
                        </div>
                      </td>

                      <td className="py-2 px-4 border-b border-gray-200 hidden md:table-cell text-sm md:text-medium">
                        {student?.dialCode}-{student?.phone}
                      </td>

                      <td className="py-2 px-4 border-b border-gray-200">
                        {student?.class ? (
                          student?.class
                        ) : (
                          <span className="text-red-400  text-sm md:text-medium">Class not Added</span>
                        )}
                      </td>

                      <td className="py-2 px-4 border-b border-gray-200 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedStudentId(student?._id)
                          }}
                          className={`${student.class ? "bg-commonColorButton hover:bg-blue-900" : "bg-green-600 hover:bg-green-700"
                            } text-white text-xs px-2 py-1.5 rounded whitespace-nowrap
              sm:text-sm sm:px-3 sm:py-2 
              md:text-base md:px-2 md:py-1`}
                        >
                          <span className="hidden sm:inline">{student.class ? "+ Change Class" : "+ Add Class"}</span>
                          <span className="sm:hidden">{student.class ? "Change" : "Add"}</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {data?.totalPages > 1 ? (<>
              <div className='p-2 '>
                <PageNation totalPage={data?.totalPages} setPage={setPage} />
              </div>
            </>) : ""}
          </>
        )
      }
    </div>
  );
}

export default Students;

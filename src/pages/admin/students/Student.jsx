import React, { useState } from 'react';
import { useAddStudent, useImageUpload, useGetStudents } from '../../../apis/useAdminDataController'
import StudentAddModal from './StudentAddModal';
import { Modal } from "@mui/material";
import { toast } from 'react-toastify';
import Loader from '../../../components/loader/Loader'
import PageNation from '../../../components/pagination/Pagination';
import { useNavigate } from 'react-router-dom';



function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false)
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
    if (!file) {
      mutate(form, {
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

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Students</h1>
        <button
          onClick={() => {
            setOpenAddModal(true)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left hidden md:table-cell">Phone</th>
                  <th className="py-2 px-4 border-b text-left">Class</th>
                  <th className="py-2 px-4 border-b text-center">Class Action</th>
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
                      <td className="py-2 px-4 border-b">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              student?.image ||
                              "https://imgs.search.brave.com/TnArB88gluKnynsOtxMrOjRzop_vKbOXKS7yG_6OndE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by91c2VyLWljb24t/cGVyc29uLXN5bWJv/bC1odW1hbi1hdmF0/YXItM2QtcmVuZGVy/XzQ3MzkzMS0yMTcu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MA"
                            }
                            alt={student?.name}
                            className="w-8 h-8 rounded-full object-cover hidden md:table-cell"
                          />
                          <span className="font-medium">{student?.name}</span>
                        </div>
                      </td>

                      <td className="py-2 px-4 border-b hidden md:table-cell">
                        {student?.dialCode}-{student?.phone}
                      </td>

                      <td className="py-2 px-4 border-b">
                        {student?.class ? (
                          student?.class
                        ) : (
                          <span className="text-red-400 font-medium">Class not Added</span>
                        )}
                      </td>

                      <td className="py-2 px-4 border-b text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                          className={`${student.class ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
                            } text-white text-[10px] px-1.5 py-0.5 rounded 
              sm:text-xs sm:px-2 sm:py-1 
              md:text-sm md:px-3 md:py-1.5`}
                        >
                          {student.class ? "+ Change Class" : "+ Add Class"}
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

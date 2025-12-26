import React, { useState } from 'react'
import Loader from '../../../components/loader/Loader'
import PageNation from '../../../components/pagination/Pagination';
import ConfirmationModal from '../../../components/confirmationModal/ConfirmationModal'
import { useGetTeachers, useAddTeacher, useImageUpload } from '../../../apis/useAdminDataController'
import TeacherModal from './TeacherModal';
import { Modal } from "@mui/material";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Teacher() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [search, setSearch] = useState('')

  // apis
  const { data, isLoading } = useGetTeachers(page, limit, search)
  const { data: teacherAddData, isPending, mutate, error } = useAddTeacher();
  const { mutate: imageMutate, isPending: imagePending } = useImageUpload()



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
      setIsAdding(true);
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
        <TeacherModal setClose={handleAddModalClose} handleSubmit={handleSubmit} type={'Create'} />
      </Modal>


      <div className="flex justify-between items-center mb-6">
        <h1 className="hidden md:block text-2xl font-bold">Teachers</h1>
        <div className='flex items-center gap-3 w-full md:w-auto'>
          <input
            type="text"
            placeholder="Search teacher..."
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => setOpenAddModal(true)}
            className="
    bg-commonColorButton 
    text-white 
    px-3 sm:px-4 
    py-2 sm:py-2.5 
    text-sm sm:text-base 
    rounded 
    hover:bg-blue-900 
    transition 
    duration-200 
    w-full sm:w-auto
  "
          >
            + Add Teacher
          </button>

        </div>
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
            <div className='overflow-x-auto w-full'>
              <table className="min-w-full bg-white rounded shadow text-sm">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">Name</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left hidden md:table-cell">Email</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left hidden md:table-cell">Phone</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.teachers?.length > 0 ? (
                    data.teachers.map((teacher) => (
                      <tr key={teacher.id} className="hover:bg-gray-50 transition">
                        <td className="py-2 px-4 border-b border-gray-200">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                teacher?.image ||
                                "https://imgs.search.brave.com/TnArB88gluKnynsOtxMrOjRzop_vKbOXKS7yG_6OndE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by91c2VyLWljb24t/cGVyc29uLXN5bWJv/bC1odW1hbi1hdmF0/YXItM2QtcmVuZGVy/XzQ3MzkzMS0yMTcu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MA"
                              }
                              alt={teacher?.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="font-medium">{teacher?.name}</span>
                          </div>
                        </td>

                        <td className="py-2 px-4 border-b border-gray-200 hidden md:table-cell">
                          {teacher?.email}
                        </td>

                        <td className="py-2 px-4 border-b border-gray-200 hidden md:table-cell">
                          {teacher?.dialCode}-{teacher?.phone}
                        </td>

                        <td className="py-2 px-4 border-b border-gray-200 text-center">
                          <button
                            onClick={() => navigate(`/teacher-details?hashId=${teacher?._id}`)}
                            className="text-blue-900 hover:underline text-xs md:text-sm"
                          >
                            Go to Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-gray-500">
                        No teachers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>


            </div>
          </>
        )}

      {data?.totalPages > 1 ? (<>
        <div className='p-2 '>
          <PageNation totalPage={data?.totalPages} setPage={setPage} />
        </div>
      </>) : ""}
    </div>
  );
}

export default Teacher
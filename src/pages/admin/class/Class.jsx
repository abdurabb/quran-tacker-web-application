import React, { useState } from 'react';
import PageNation from '../../../components/pagination/Pagination';
import { useGetClasses, useAddClass, useUpdateClass, useDeleteClass, useAssignTeacher } from '../../../apis/useAdminDataController'
import { Modal } from "@mui/material";
import ClassAddModal from './ClassModal'
import ClassDetailModal from './ClassDetailModal';
import Loader from '../../../components/loader/Loader'
import ConfirmationModal from '../../../components/confirmationModal/ConfirmationModal'
import { toast } from 'react-toastify';


function Class() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [classData, setClassData] = useState({})
  const [search, setSearch] = useState('')

  // apis
  const { data, refetch, isLoading } = useGetClasses(page, limit, search)
  const { data: classAddData, isPending, mutate, error } = useAddClass();
  const { data: classDeleteData, isPending: deletePending, mutate: deleteMutate, error: deleteError } = useDeleteClass();
  const { data: classUpdateData, isPending: couponUpdatePending, mutate: updateMutate, error: updateError } = useUpdateClass();
  const { data: assignTeacher, isPending: assignPending, mutate: assignMutate, error: assignError } = useAssignTeacher();

  // delete Class
  const handleClose = () => {
    setId('')
    setName('')
    setType('')
    setDescription('')
    setOpenDeleteModal(false);
  }
  const confirmFunction = () => {
    deleteMutate({ _id: id }, {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    })

    setId('')
    setName('')
    setType('')
    setDescription('')
    setOpenDeleteModal(false);
  }

  // add and update class
  const handleAddModalClose = () => {
    setId('')
    setName('')
    setType('')
    setDescription('')
    setOpenAddModal(false)
  }
  const handleSubmit = (updatedName, updateDescription) => {
    if ((id) && (name !== updatedName || description !== updateDescription)) {
      updateMutate({ _id: id, name: updatedName, description: updateDescription }, {
        onSuccess: (data) => {
          toast.success(data?.message);
          setId('')
          setName('')
          setDescription('')
          setType('')
          setOpenAddModal(false)
        }
      });
    } else if (!id) {
      mutate({ name: updatedName, description: updateDescription }, {
        onSuccess: (data) => {
          toast.success(data?.message);
          setId('')
          setName('')
          setDescription('')
          setType('')
          setOpenAddModal(false)
        }
      });
    }
  }

  // assign teacher
  const handleAssignTeacher = (classId, teacherId) => {
    assignMutate({ classId, teacherId }, {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    });
    setId('')
    setClassData({})
  }

  return (
    <div className="p-6">

      {/* add and update category modal */}
      <Modal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        className="flex items-center justify-center p-4 outline-none"
      >
        <ClassAddModal setClose={handleAddModalClose} handleSubmit={handleSubmit} type={type} name={name} description={description} />
      </Modal>

      {/* open detail modal */}
      <Modal
        open={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
        className="flex items-center justify-center p-4 outline-none"
      >
        <ClassDetailModal setClose={() => { setOpenDetailModal(false) }} handleSubmit={handleAssignTeacher} classData={classData} refetch={refetch} />
      </Modal>

      {/* open delete confirmation modal */}
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        className="flex items-center justify-center p-4 outline-none"
      >
        <ConfirmationModal setClose={handleClose} message={`Are you sure want to delete the " ${name}" Class`}
          confirmFunction={confirmFunction} type={'delete'} />
      </Modal>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-xl md:text-2xl font-bold">Class Management</h1>

        {/* Search input and button wrapper */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search class..."
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => {
              setType('Create');
              setOpenAddModal(true);
            }}
            className="bg-commonColorButton text-white px-4 py-2 rounded hover:bg-blue-900 whitespace-nowrap"
          >
            + Add New Class
          </button>
        </div>
      </div>


      {
        (isLoading || isPending || couponUpdatePending || deletePending || assignPending) ? (
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
            <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 text-left">Class</th>
                    <th className="px-4 py-3 text-left">Description</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {data?.classes?.length >= 1 ? (
                    data.classes.map((cls) => (
                      <tr
                        key={cls._id}
                        className="border-b hover:bg-gray-50 transition cursor-pointer"
                        onClick={() => {
                          setClassData(cls);
                          setOpenDetailModal(true);
                        }}
                      >
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-800">{cls?.name}</p>
                        </td>

                        <td className="px-4 py-3 text-gray-600">
                          {cls?.description || '—'}
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setId(cls?._id);
                                setName(cls?.name);
                                setDescription(cls?.description);
                                setType('Update');
                                setOpenAddModal(true);
                              }}
                              className="px-3 py-1.5 text-xs font-medium rounded-md
                             bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                            >
                              Edit
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setId(cls?._id);
                                setName(cls?.name);
                                setType('Delete');
                                setOpenDeleteModal(true);
                              }}
                              className="px-3 py-1.5 text-xs font-medium rounded-md
                             bg-red-100 text-red-700 hover:bg-red-200 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-6 text-gray-500">
                        No classes found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>


            {/* mobile view */}
            <div className="md:hidden space-y-4">
              {data?.classes?.length >= 1 ? (
                data.classes.map((cls) => (
                  <div
                    key={cls._id}
                    onClick={() => {
                      setClassData(cls);
                      setOpenDetailModal(true);
                    }}
                    className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition cursor-pointer"
                  >
                    <div className="mb-2">
                      <h3 className="font-semibold text-gray-800">{cls?.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {cls?.description || 'No description available'}
                      </p>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setId(cls?._id);
                          setName(cls?.name);
                          setDescription(cls?.description);
                          setType('Update');
                          setOpenAddModal(true);
                        }}
                        className="flex-1 px-3 py-2 text-sm font-medium rounded-lg
                       bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setId(cls?._id);
                          setName(cls?.name);
                          setType('Delete');
                          setOpenDeleteModal(true);
                        }}
                        className="flex-1 px-3 py-2 text-sm font-medium rounded-lg
                       bg-red-100 text-red-700 hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No classes found
                </div>
              )}
            </div>



          </>
        )
      }
      {data?.totalPages > 1 ? (<>
        <div className='p-2 '>
          <PageNation totalPage={data?.totalPages} setPage={setPage} />
        </div>
      </>) : ""}
    </div>
  );
}

export default Class;

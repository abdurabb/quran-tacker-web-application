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
  const { data, isLoading } = useGetClasses(page, limit, search)
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
        <ClassDetailModal setClose={() => { setOpenDetailModal(false) }} handleSubmit={handleAssignTeacher} classData={classData} />
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
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap"
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
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Class Name</th>
                  <th className="py-2 px-4 border-b text-left hidden md:table-cell">Description</th>
                  <th className="py-2 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.classes?.length >= 1 ? (
                  data.classes.map((cls) => (
                    <tr
                      key={cls.id}
                      className="hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => {
                        setClassData(cls);
                        setOpenDetailModal(true);
                      }}
                    >
                      <td className="py-2 px-4 border-b">{cls?.name}</td>
                      <td className="py-2 px-4 border-b hidden md:table-cell">{cls?.description}</td>
                      <td className="py-2 px-4 border-b text-center">
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
                            className="bg-yellow-500 text-white text-xs md:text-sm px-2 md:px-3 py-1 rounded hover:bg-yellow-600"
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
                            className="bg-red-600 text-white text-xs md:text-sm px-2 md:px-3 py-1 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
                      No classes found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

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

import React, { useState, useEffect } from 'react';
import { useGetLessonTypes, useAddLessonType, useUpdateLessonType, useDeleteLessonType } from '../../../apis/useAdminDataController';
import { Modal } from "@mui/material";
import { toast } from 'react-toastify';
import Loader from '../../../components/loader/Loader';
import ConfirmationModal from '../../../components/confirmationModal/ConfirmationModal';

function LessonType() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedType, setSelectedType] = useState('Create');
  const [lessonTypeData, setLessonTypeData] = useState({});
  const [lessonTypeName, setLessonTypeName] = useState('');

  // APIs
  const { data, isLoading } = useGetLessonTypes();
  const { mutate: addMutate, isPending: isAdding } = useAddLessonType();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateLessonType();
  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteLessonType();

  // Handle modal close
  const handleAddModalClose = () => {
    setOpenAddModal(false);
    setLessonTypeData({});
    setLessonTypeName('');
    setSelectedType('Create');
  };

  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
    setLessonTypeData({});
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!lessonTypeName.trim()) {
      toast.error('Please enter a lesson type name');
      return;
    }

    if (selectedType === 'Create') {
      addMutate({ name: lessonTypeName.trim() }, {
        onSuccess: (data) => {
          toast.success(data?.message || "Lesson type added successfully!");
          handleAddModalClose();
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Failed to add lesson type.");
        }
      });
    } else {
      updateMutate({ _id: lessonTypeData._id, name: lessonTypeName.trim() }, {
        onSuccess: (data) => {
          toast.success(data?.message || "Lesson type updated successfully!");
          handleAddModalClose();
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Failed to update lesson type.");
        }
      });
    }
  };

  // Handle delete
  const handleDelete = () => {
    deleteMutate({ _id: lessonTypeData._id }, {
      onSuccess: (data) => {
        toast.success(data?.message || "Lesson type deleted successfully!");
        handleDeleteModalClose();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Failed to delete lesson type.");
        handleDeleteModalClose();
      }
    });
  };

  // Handle edit click
  const handleEdit = (lessonType) => {
    setLessonTypeData(lessonType);
    setLessonTypeName(lessonType.name);
    setSelectedType('Update');
    setOpenAddModal(true);
  };

  // Handle delete click
  const handleDeleteClick = (lessonType) => {
    setLessonTypeData(lessonType);
    setOpenDeleteModal(true);
  };

  useEffect(() => {
    if (selectedType === 'Update' && lessonTypeData?.name) {
      setLessonTypeName(lessonTypeData.name);
    }
  }, [lessonTypeData, selectedType]);

  return (
    <div className='p-6 bg-white w-full max-w-[800px] font-urbanist md:rounded-[30px] rounded-lg shadow-lg overflow-y-auto max-h-[90vh]'>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className='text-xl font-semibold text-[#1D2939]'>Lesson Types</h1>
        <button
          onClick={() => {
            setSelectedType('Create');
            setLessonTypeName('');
            setLessonTypeData({});
            setOpenAddModal(true);
          }}
          className="bg-commonColorButton text-white px-4 py-2 rounded hover:bg-blue-900 whitespace-nowrap w-full md:w-auto"
        >
          + Add New Lesson Type
        </button>
      </div>
      <hr className='mb-6 border-t border-gray-200' />

      {/* Add/Update Modal */}
      <Modal
        open={openAddModal}
        onClose={handleAddModalClose}
        className="flex items-center justify-center p-4 outline-none"
      >
        <div className="bg-white w-full max-w-[474px] font-urbanist text-center md:rounded-[30px] rounded-lg shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-[#1D2939] mb-4">{selectedType} Lesson Type</h2>
            <hr className="mb-6 border-t border-gray-200" />

            <form onSubmit={handleSubmit}>
              <div className="mb-6 text-left">
                <label htmlFor="lessonTypeName" className="block text-sm font-medium text-gray-700 mb-1">
                  Lesson Type Name
                </label>
                <input
                  type="text"
                  id="lessonTypeName"
                  name="lessonTypeName"
                  value={lessonTypeName}
                  onChange={(e) => setLessonTypeName(e.target.value)}
                  placeholder={selectedType === 'Create' ? 'Enter lesson type name' : lessonTypeName}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleAddModalClose}
                  className="flex-1 bg-gray-300 text-gray-700 font-medium py-2 rounded-md hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding || isUpdating}
                  className="flex-1 bg-blue-900 text-white font-medium py-2 rounded-md hover:bg-blue-800 transition-all disabled:bg-gray-400"
                >
                  {isAdding || isUpdating ? (selectedType === 'Create' ? 'Adding...' : 'Updating...') : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={openDeleteModal}
        onClose={handleDeleteModalClose}
        className="flex items-center justify-center p-4 outline-none"
      >
        <ConfirmationModal
          setClose={handleDeleteModalClose}
          message={`Are you sure you want to delete "${lessonTypeData?.name}"?`}
          confirmFunction={handleDelete}
          type="delete"
        />
      </Modal>

      {/* Table */}
      {isLoading || isDeleting ? (
        <div className="text-center py-4">
          <div className="flex justify-center">
            <Loader />
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white rounded shadow text-sm">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Lesson Type Name</th>
                <th className="py-2 px-4 border-b border-gray-200 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.lessonTypes?.length > 0 ? (
                data.lessonTypes.map((lessonType) => (
                  <tr key={lessonType._id} className="hover:bg-gray-50 transition">
                    <td className="py-2 px-4 border-b border-gray-200">
                      <span className="font-medium text-sm md:text-base">{lessonType?.name}</span>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(lessonType)}
                          className="bg-yellow-500 text-white text-xs md:text-sm px-2 md:px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(lessonType)}
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
                  <td colSpan="2" className="text-center py-4 text-gray-500">
                    No lesson types found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LessonType;

import React, { useState } from 'react';
import { useGetLessons, useAddLesson, useUpdateLesson, useDeleteLesson } from '../../../apis/useAdminDataController';
import LessonAddModal from './LessonAddModal';
import { Modal } from "@mui/material";
import { toast } from 'react-toastify';
import Loader from '../../../components/loader/Loader';
import PageNation from '../../../components/pagination/Pagination';
import LessonType from './LessonType';
import ConfirmationModal from '../../../components/confirmationModal/ConfirmationModal';

function LessonsAndMark() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [lessonData, setLessonData] = useState({})
  const [selectedType, setSelectedType] = useState('Create')
  const [openLessonTypesModal, setOpenLessonTypesModal] = useState(false)

  // APIs
  const { data, isLoading } = useGetLessons(page, limit, searchTerm);
  const { isPending: isAdding, mutate: addMutate } = useAddLesson();
  const { isPending: isUpdating, mutate: updateMutate } = useUpdateLesson();
  const { isPending: isDeleting, mutate: deleteMutate } = useDeleteLesson();

  // Handle modal close
  const handleAddModalClose = () => {
    setOpenAddModal(false);
    setLessonData({});
    setSelectedType('Create');
  };

  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
    setLessonData({});
  };

  // Handle form submit
  const handleSubmit = (form, setIsAdding, lessonId) => {
    if (selectedType === 'Create') {
      addMutate(form, {
        onSuccess: (data) => {
          toast.success(data?.message || "Lesson added successfully!");
          setOpenAddModal(false);
          setIsAdding(false);
        },
        onError: (error) => {
          // toast.error(error?.response?.data?.message || "Failed to add lesson.");
          setIsAdding(false);
        }
      });
    } else {
      updateMutate({ ...form, _id: lessonId }, {
        onSuccess: (data) => {
          toast.success(data?.message || "Lesson updated successfully!");
          setOpenAddModal(false);
          setIsAdding(false);
        },
        onError: (error) => {
          // toast.error(error?.response?.data?.message || "Failed to update lesson.");
          setIsAdding(false);
        }
      });
    }
  };

  // Handle delete
  const handleDelete = () => {
    deleteMutate({ _id: lessonData._id }, {
      onSuccess: (data) => {
        toast.success(data?.message || "Lesson deleted successfully!");
        handleDeleteModalClose();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Failed to delete lesson.");
        handleDeleteModalClose();
      }
    });
  };

  // Handle edit click
  const handleEdit = (lesson) => {
    setLessonData(lesson);
    setSelectedType('Update');
    setOpenAddModal(true);
  };

  // Handle delete click
  const handleDeleteClick = (lesson) => {
    setLessonData(lesson);
    setOpenDeleteModal(true);
  };

  return (
    <div className="p-6">
      {/* Add Lesson Modal */}
      <Modal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        className="flex items-center justify-center p-4 outline-none"
      >
        <LessonAddModal setClose={handleAddModalClose} handleSubmit={handleSubmit} type={selectedType} lesson={lessonData} />
      </Modal>

      <Modal
        open={openLessonTypesModal}
        onClose={() => setOpenLessonTypesModal(false)}
        className="flex items-center justify-center p-4 outline-none"
      >
        <LessonType />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={openDeleteModal}
        onClose={handleDeleteModalClose}
        className="flex items-center justify-center p-4 outline-none"
      >
        <ConfirmationModal
          setClose={handleDeleteModalClose}
          message={`Are you sure you want to delete "${lessonData?.name}"?`}
          confirmFunction={handleDelete}
          type="delete"
        />
      </Modal>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Lessons & Marks </h1>
        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search lesson..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className='bg-commonColorButton text-white px-4 py-2 rounded hover:bg-blue-900 whitespace-nowrap w-full md:w-auto'
            onClick={() => setOpenLessonTypesModal(true)}>See Lesson Types</button>
          <button
            onClick={() => setOpenAddModal(true)}
            className="bg-commonColorButton text-white px-4 py-2 rounded hover:bg-blue-900 whitespace-nowrap w-full md:w-auto"
          >
            + Add New Lesson
          </button>
        </div>
      </div>

      {/* Table */}
      {
        (isLoading || isAdding || isUpdating || isDeleting) ? (
          <div className="text-center py-4">
            <div className="flex justify-center">
              <Loader />
            </div>
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 text-left">Lesson</th>
                    <th className="px-4 py-3 text-left">Description</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Marks</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {data?.lessons?.length > 0 ? (
                    data.lessons.map((lesson) => (
                      <tr
                        key={lesson._id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-800">
                            {lesson?.name}
                          </p>
                        </td>

                        <td className="px-4 py-3 text-gray-600">
                          {lesson?.description?.length > 60
                            ? `${lesson.description.slice(0, 60)}…`
                            : lesson?.description || '—'}
                        </td>

                        <td className="px-4 py-3 text-center text-gray-700">
                          {lesson?.criteriaNumber > 0 ? lesson?.criteriaNumber :''}{' '}
                          <span className="text-gray-500">
                            {lesson?.criteriaNumber > 0 ? lesson?.lessonType?.name:'-' || '-'}
                          </span>
                        </td>

                        <td className="px-4 py-3 font-semibold text-gray-800">
                          {lesson?.mark || '0'}
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(lesson)}
                              className="px-3 py-1.5 text-xs font-medium rounded-md
                             bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteClick(lesson)}
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
                      <td colSpan="5" className="text-center py-6 text-gray-500">
                        No lessons found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* mobile view */}
            <div className="md:hidden space-y-4">
              {data?.lessons?.length > 0 ? (
                data.lessons.map((lesson) => (
                  <div
                    key={lesson._id}
                    className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
                  >
                    <div className="mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {lesson?.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {lesson?.criteriaNumber} {lesson?.lessonType?.name || 'N/A'}
                      </p>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">
                      {lesson?.description || 'No description provided'}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-gray-700">
                        Marks: {lesson?.mark || '0'}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(lesson)}
                        className="flex-1 px-3 py-2 text-sm font-medium rounded-lg
                       bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(lesson)}
                        className="flex-1 px-3 py-2 text-sm font-medium rounded-lg
                       bg-red-100 text-red-700 hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-6">
                  No lessons found
                </div>
              )}
            </div>



            {/* Pagination */}
            {data?.totalPages > 1 && (
              <div className="p-2 mt-4">
                <PageNation totalPage={data?.totalPages} setPage={setPage} />
              </div>
            )}
          </>
        )
      }
    </div>
  );
}

export default LessonsAndMark;
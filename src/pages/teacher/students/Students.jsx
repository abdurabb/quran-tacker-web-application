import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/loader/Loader';
import PageNation from '../../../components/pagination/Pagination';
import { useGetStudents, useGetClasses, useAddMark } from '../../../apis/useTeacherDataController';
import AddMark from './AddMark';
import { Modal } from '@mui/material';

function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [classId, setClassId] = useState('');
  const [data, setData] = useState({})
  const navigate = useNavigate();
  const [openAddMarkModal, setOpenAddMarkModal] = useState(false);
  const [studentId, setStudentId] = useState('');
  // apis
  const { data: classesData, isSuccess: isClassesSuccess, isLoading: classesLoading } = useGetClasses(page, limit, searchTerm);
  const { data: studentsData,refetch, isSuccess: isStudentsSuccess, isLoading: studentsLoading } = useGetStudents(classId, page, limit, searchTerm, { skip: !classId });
  const { mutate: addMarkMutate, isSuccess: isAddingMarkSuccess, isPending: isAddingMark } = useAddMark();

  useEffect(() => {
    if (isStudentsSuccess) {
      setData(studentsData);
    }
  }, [isStudentsSuccess, studentsData, searchTerm]);

  useEffect(() => {
    if (isAddingMarkSuccess) {
      toast.success('Mark added successfully!');
    }
  }, [isAddingMarkSuccess]);

  useEffect(() => {
    if (isClassesSuccess) {
      setClassId(classesData?.classes?.[0]?._id);
    }
  }, [isClassesSuccess]);

 
  const handleAddMarkClose = () => {
    setOpenAddMarkModal(false);
  };

  const handleAddMarkSubmit = (formData, setIsSubmitting) => {
    addMarkMutate(formData, {
      onSuccess: (data) => {
        toast.success(data?.message || 'Mark added successfully!');
        setIsSubmitting(false);
        setOpenAddMarkModal(false);
      },
      onError: (error) => {
        // toast.error(error?.response?.data?.message || 'Failed to add mark');
        setIsSubmitting(false);
        setOpenAddMarkModal(false);
      }
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Classes & Students</h1>
      </div>

      {/* Add Mark Modal */}
      <Modal
        open={openAddMarkModal}
        onClose={handleAddMarkClose}
        className="flex items-center justify-center p-4 outline-none"
      >
        <AddMark setClose={handleAddMarkClose} studentId={studentId} handleSubmit={handleAddMarkSubmit} />
      </Modal>
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
        studentsLoading || classesLoading ? (
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
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              {classesData?.classes?.map((cls) => (
                <button
                  key={cls?._id}
                  onClick={() => setClassId(cls?._id)}
                  className={`
                   px-4 py-2 sm:px-5 sm:py-2.5 
                    rounded-lg border text-sm sm:text-base 
                    w-full sm:w-auto
                      ${classId === cls?._id
                      ? 'bg-commonColorButton text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-blue-100'
                    }
      `}
                >
                  {cls?.name}
                </button>
              ))}
            </div>


            <table className="min-w-full bg-white rounded shadow text-sm">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Name</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left hidden md:table-cell">Phone</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Email</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Add Mark</th>

                </tr>
              </thead>
              <tbody>
                {data?.students?.length > 0 ? (
                  data?.students?.map((student) => (
                    <tr
                      onClick={() => {
                        navigate(`/teacher-student-details?hashId=${student?._id}`)
                      }}
                      key={student?._id} className="hover:bg-gray-50 transition hover:cursor-pointer">
                      <td className="py-2 px-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              student?.image ||
                              "https://static.vecteezy.com/system/resources/previews/043/361/860/non_2x/hand-drawnman-avatar-profile-icon-for-social-networks-forums-and-dating-sites-user-avatar-profile-placeholder-anonymous-user-male-no-photo-web-template-default-user-picture-profile-male-symbol-free-vector.jpg"
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
                        {student?.email}
                      </td>

                      <td className="py-2 px-4 border-b border-gray-200 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setOpenAddMarkModal(true)
                            setStudentId(student?._id)
                          }}
                          className="bg-commonColorButton text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-900 transition-colors font-medium text-sm sm:text-base shadow-md hover:shadow-lg">Add Mark</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
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



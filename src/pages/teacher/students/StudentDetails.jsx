import React, { useState } from 'react';
import { useGetStudentDetails, useAddMark } from '../../../apis/useTeacherDataController';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Loader from '../../../components/loader/Loader';
import { ArrowLeft, Mail, Phone, GraduationCap, BookOpen, User } from 'lucide-react';
import { Modal } from '@mui/material';
import AddMark from './AddMark';
import { toast } from 'react-toastify';

function StudentDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('hashId');
  const [openAddMarkModal, setOpenAddMarkModal] = useState(false);

  // apis
  const { data, isLoading } = useGetStudentDetails(studentId);
  const { mutate: addMarkMutate, isPending: isAddingMark } = useAddMark();

  const {
    image,
    name,
    email,
    dialCode,
    phone,
    classId
  } = data?.student || {};

  const DetailCard = ({ icon: Icon, label, value, className = "" }) => (
    <div className={`bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-start gap-3">
        <div className="bg-blue-50 p-2 rounded-lg flex-shrink-0">
          {Icon && <Icon className="w-5 h-5 text-blue-600" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-gray-500 text-xs sm:text-sm mb-1 font-medium">{label}</p>
          <p className="font-semibold text-gray-800 text-sm sm:text-base break-words">{value || '—'}</p>
        </div>
      </div>
    </div>
  );

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
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      {/* Add Mark Modal */}
      <Modal
        open={openAddMarkModal}
        onClose={handleAddMarkClose}
        className="flex items-center justify-center p-4 outline-none"
      >
        <AddMark
          setClose={handleAddMarkClose}
          studentId={studentId}
          handleSubmit={handleAddMarkSubmit}
        />
      </Modal>

      <div className="max-w-6xl mx-auto">
        {
          isLoading ? (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex justify-center items-center min-h-[400px]">
                <Loader />
              </div>
            </div>
          ) : (
            <>
              {/* Header Section */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Student Details</h2>
                  <button
                    onClick={() => navigate('/teacher-students')}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors w-full sm:w-auto justify-center"
                  >
                    <ArrowLeft size={18} />
                    <span>Back to Students</span>
                  </button>
                </div>
              </div>

              {/* Profile Card */}
              <div className="flex justify-between items-center bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={
                          image ||
                          'https://static.vecteezy.com/system/resources/previews/043/361/860/non_2x/hand-drawnman-avatar-profile-icon-for-social-networks-forums-and-dating-sites-user-avatar-profile-placeholder-anonymous-user-male-no-photo-web-template-default-user-picture-profile-male-symbol-free-vector.jpg'
                        }
                        alt={name}
                        className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-4 border-white"
                      />
                      <div className="absolute bottom-0 right-0 sm:right-2 bg-green-500 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white"></div>
                    </div>
                  </div>

                  {/* Student Name */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <User className="w-5 h-5 text-gray-400" />
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{name || 'N/A'}</h3>
                    </div>
                    {classId?.name && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                        <GraduationCap className="w-4 h-4" />
                        <span>{classId.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Add Mark button */}
                <button
                  onClick={() => setOpenAddMarkModal(true)}
                  className="bg-commonColorButton text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-900 transition-colors font-medium text-sm sm:text-base shadow-md hover:shadow-lg"
                >
                  Add Mark
                </button>
              </div>

              {/* Student Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
                <DetailCard
                  icon={Mail}
                  label="Email Address"
                  value={email}
                />
                <DetailCard
                  icon={Phone}
                  label="Phone Number"
                  value={phone ? `${dialCode}-${phone}` : null}
                />
                <DetailCard
                  icon={GraduationCap}
                  label="Class Name"
                  value={classId?.name}
                />
              </div>

              {/* Class Information Card */}
              {classId && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm p-6 sm:p-8 border border-blue-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-800">Class Information</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="bg-white p-4 sm:p-5 rounded-lg border border-blue-200">
                      <p className="text-gray-500 text-xs sm:text-sm mb-2 font-medium">Class Name</p>
                      <p className="font-bold text-gray-800 text-base sm:text-lg">{classId?.name || '—'}</p>
                    </div>
                    <div className="bg-white p-4 sm:p-5 rounded-lg border border-blue-200">
                      <p className="text-gray-500 text-xs sm:text-sm mb-2 font-medium">Description</p>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base break-words">{classId?.description || '—'}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )
        }
      </div>
    </div>
  );
}

export default StudentDetails;



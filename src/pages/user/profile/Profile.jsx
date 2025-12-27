import React, { useEffect, useState } from 'react';
import {
  User,
  Calendar,
  BookOpen,
  FileText,
  Trophy,
  Mail,
  Phone,
  MapPin,
  UserCircle ,
} from 'lucide-react';

import Attendance from './Attendance';
import Class from './Class';
import Reports from './Reports';
import Toppers from './Toppers';
import { useGetProfile } from '../../../apis/useUserDataController';

function Profile() {

  const [activeTab, setActiveTab] = useState('profile');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { data, isLoading, error } = useGetProfile();

  const navigationCards = [
    { id: 'profile', icon: User, title: 'Profile Details', color: 'from-blue-500 to-blue-600' },
    { id: 'attendance', icon: Calendar, title: 'Attendance', color: 'from-green-500 to-green-600' },
    { id: 'classes', icon: BookOpen, title: 'Classes', color: 'from-purple-500 to-purple-600' },
    { id: 'reports', icon: FileText, title: 'Reports', color: 'from-orange-500 to-orange-600' },
    { id: 'toppers', icon: Trophy, title: 'College Toppers', color: 'from-yellow-500 to-yellow-600' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % navigationCards.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [navigationCards.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load profile
      </div>
    );
  }
  const user = data?.user;
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center gap-4">
          {
            user?.image ? (
              <img
                src={user?.image}
                alt={user?.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-green-500"
              />
            ) : (
              <UserCircle className="w-16 h-16 text-gray-400" />
            )
          }
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
            <p className="text-gray-600 capitalize">
              {user?.class} • {user?.gender}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
  {/* Navigation */}
  <div className="
    flex gap-3 overflow-x-auto pb-3
    md:grid md:grid-cols-5 md:gap-4 md:overflow-visible
    mb-6
  ">
    {navigationCards.map((card) => {
      const Icon = card.icon;
      return (
        <button
          key={card.id}
          onClick={() => setActiveTab(card.id)}
          className={`
            min-w-[140px] md:min-w-0
            p-4 md:p-6
            rounded-xl
            transition-all
            flex flex-col items-center justify-center
            ${activeTab === card.id
              ? `bg-gradient-to-br ${card.color} text-white shadow-xl`
              : 'bg-white shadow-md hover:shadow-lg'
            }
          `}
        >
          <Icon className="mb-2" size={26} />
          <p className="text-xs sm:text-sm font-semibold text-center">
            {card.title}
          </p>
        </button>
      );
    })}
  </div>

  {/* Content */}
  <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
    {/* Profile Heading */}
    {activeTab === 'profile' && (
      <>
        <h2 className="
          text-xl sm:text-2xl md:text-3xl
          font-bold text-gray-800
          mb-4 sm:mb-6
          flex items-center gap-2
        ">
          <User className="text-blue-600" size={28} />
          Profile Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-3 sm:space-y-4">
            <InfoCard icon={Mail} label="Email" value={user?.email} />
            <InfoCard
              icon={Phone}
              label="Phone"
              value={`${user?.dialCode} ${user?.phone}`}
            />
            <InfoCard
              icon={MapPin}
              label="Address"
              value={user?.address}
            />
          </div>

          <div className="space-y-3 sm:space-y-4">
            <DetailCard label="Class" value={user?.class} />
            <DetailCard
              label="Date of Birth"
              value={new Date(user?.dob).toLocaleDateString()}
            />
            <DetailCard
              label="Admission Date"
              value={new Date(user?.admissionDate).toLocaleDateString()}
            />
          </div>
        </div>
      </>
    )}

    {activeTab === 'attendance' && <Attendance />}
    {activeTab === 'classes' && <Class />}
    {activeTab === 'reports' && <Reports />}
    {activeTab === 'toppers' && <Toppers />}
  </div>
</div>

    </div>
  );
}

/* 🔹 Small reusable components */
const InfoCard = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
    <Icon className="text-green-600" size={20} />
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const DetailCard = ({ label, value }) => (
  <div className="p-4 bg-blue-50 rounded-lg">
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="font-bold text-lg text-blue-700">{value}</p>
  </div>
);

export default Profile;

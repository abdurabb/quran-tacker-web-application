import React from 'react';
import { BookOpen, User, Mail, Phone, Briefcase } from 'lucide-react';
import { useGetClasses } from '../../../apis/useUserDataController';

function Class() {
    // API call
    const { data, isLoading, error } = useGetClasses();

    const classData = data?.classData;
    const teacher = classData?.teacher;

    return (
        <div>
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <BookOpen className="text-purple-600" size={32} />
                Class Details
            </h2>

            {/* Loading */}
            {isLoading && (
                <div className="text-center py-10 text-gray-600">
                    Loading class information...
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="text-center py-10 text-red-600">
                    Failed to load class data
                </div>
            )}

            {/* Data */}
            {!isLoading && !error && classData && (
                <div className="space-y-6">
                    {/* Class Info */}
                    <div className="p-6 rounded-xl bg-purple-50 border border-purple-100">
                        <h3 className="text-xl font-bold text-purple-700 mb-1">
                            {classData.name}
                        </h3>
                        <p className="text-gray-600">
                            {classData.description}
                        </p>
                    </div>

                    {/* Teacher Info */}
                    {teacher && (
                        <div className="p-6 bg-white rounded-xl shadow-md border">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <User className="text-purple-600" />
                                Class Teacher
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InfoItem
                                    icon={User}
                                    label="Name"
                                    value={teacher.name}
                                />
                                <InfoItem
                                    icon={Mail}
                                    label="Email"
                                    value={teacher.email}
                                />
                                <InfoItem
                                    icon={Phone}
                                    label="Phone"
                                    value={`${teacher.dialCode} ${teacher.phone}`}
                                />
                                <InfoItem
                                    icon={Briefcase}
                                    label="Experience"
                                    value={`${teacher.experience} years`}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Class;

/* ---------- Small Reusable Component ---------- */
function InfoItem({ icon: Icon, label, value }) {
    return (
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Icon className="text-purple-600 mt-1" size={18} />
            <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="font-semibold text-gray-800 break-words">
                    {value || '—'}
                </p>
            </div>
        </div>
    );
}



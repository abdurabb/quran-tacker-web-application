import React, { useState, useEffect } from 'react';
import { useGetLessonsAndMarks } from '../../../apis/useTeacherDataController';
import Loader from '../../../components/loader/Loader';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';

function AddMark({ setClose, studentId, handleSubmit }) {
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [typeCount, setTypeCount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // APIs
    const { data: lessonsData, isLoading: lessonsLoading } = useGetLessonsAndMarks();

    const lessons = lessonsData?.lessons || [];

    // Reset form when lesson changes
    useEffect(() => {
        setTypeCount('');
    }, [selectedLesson]);

    const handleLessonChange = (e) => {
        const lessonId = e.target.value;
        const lesson = lessons.find(item => item._id === lessonId);
        setSelectedLesson(lesson || null);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!selectedLesson) {
            toast.error('Please select a lesson');
            return;
        }

        // If lesson has a type, typeCount is required
        if (selectedLesson.lessonType && !typeCount) {
            toast.error(`Please enter the count for ${selectedLesson.lessonType}`);
            return;
        }

        // Validate typeCount is a positive number if lesson has type
        if (selectedLesson.lessonType && (isNaN(typeCount) || parseInt(typeCount) <= 0)) {
            toast.error('Please enter a valid positive number');
            return;
        }

        const formData = {
            lessonId: selectedLesson._id,
            studentId: studentId,
            typeCount: selectedLesson.lessonType ? parseInt(typeCount) : null,
        };

        setIsSubmitting(true);
        handleSubmit(formData, setIsSubmitting);
    };

    return (
        <div className="bg-white w-full max-w-[600px] font-urbanist md:rounded-[30px] rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#1D2939]">Add Mark</h2>
                    <button
                        onClick={setClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        type="button"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <hr className="mb-6 border-t border-gray-200" />

                {isSubmitting ? (
                    <div className="flex justify-center items-center py-12">
                        <Loader />
                    </div>
                ) : (
                    <form onSubmit={onSubmit} className="space-y-6">
                        {/* Lesson Selection */}
                        <div>
                            <label htmlFor="lesson" className="block text-sm font-medium text-gray-700 mb-2">
                                Select Lesson <span className="text-red-500">*</span>
                            </label>
                            {lessonsLoading ? (
                                <div className="flex items-center justify-center py-4">
                                    <Loader />
                                </div>
                            ) : (
                                <select
                                    id="lesson"
                                    name="lesson"
                                    value={selectedLesson?._id || ''}
                                    onChange={handleLessonChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base bg-white"
                                >
                                    <option value="">-- Select a lesson --</option>
                                    {lessons.map((lesson) => (
                                        <option key={lesson._id} value={lesson._id}>
                                            {lesson.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {lessons.length === 0 && !lessonsLoading && (
                                <p className="text-sm text-gray-500 mt-2">No lessons available</p>
                            )}
                        </div>

                        {/* Selected Lesson Info */}
                        {selectedLesson && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-800 mb-2">Lesson Information</h3>
                                <div className="space-y-2 text-sm">
                                    <p><span className="text-gray-600">Name:</span> <span className="font-medium">{selectedLesson.name}</span></p>
                                    {selectedLesson.description && (
                                        <p><span className="text-gray-600">Description:</span> <span className="font-medium">{selectedLesson.description}</span></p>
                                    )}
                                    <p><span className="text-gray-600">Marks:</span> <span className="font-medium">{selectedLesson.mark || 0} Mark {selectedLesson?.lessonType ? "per " + selectedLesson.lessonType : ""}</span></p>
                                </div>
                            </div>
                        )}

                        {/* Type Count Input (if lesson has type) */}
                        {selectedLesson?.lessonType && (
                            <div>
                                <label htmlFor="typeCount" className="block text-sm font-medium text-gray-700 mb-2">
                                    {selectedLesson.lessonType.charAt(0).toUpperCase() + selectedLesson.lessonType.slice(1)} Count <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="typeCount"
                                    name="typeCount"
                                    value={typeCount}
                                    onChange={(e) => setTypeCount(e.target.value)}
                                    required
                                    min="1"
                                    placeholder={`Enter ${selectedLesson.lessonType} count`}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base"
                                />
                                <div className="mt-2">
                                    <p className="text-xs text-gray-500 mb-1">
                                        Mark per {selectedLesson.lessonType}: {selectedLesson.mark || 0}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Static Criteria (if lesson has no type) */}
                        {selectedLesson && !selectedLesson.lessonType && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mark 
                                </label>
                                <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm sm:text-base">
                                    {selectedLesson
                                        ? `${selectedLesson.mark || 0} ${selectedLesson.lessonType ? `per ${selectedLesson.lessonType}` : ""}`
                                        : 0}
                                </div>

                                <p className="text-xs text-gray-500 mt-1">
                                    This is a fixed Mark lesson.
                                </p>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={setClose}
                                className="flex-1 bg-gray-200 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || !selectedLesson}
                                className="flex-1 bg-commonColorButton text-white font-medium py-3 rounded-lg hover:bg-blue-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default AddMark;

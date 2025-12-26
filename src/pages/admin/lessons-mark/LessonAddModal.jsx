import React, { useEffect, useState } from 'react';
import { useGetLessonTypes, useAddLessonType } from '../../../apis/useAdminDataController'
import Loader from '../../../components/loader/Loader'
import Select from 'react-select';
import { toast } from 'react-toastify';

function LessonAddModal({ setClose, handleSubmit, type, lesson = {} }) {

    // apis 
    const { data: lessonTypesData, isLoading: lessonTypesLoading, refetch: refetchLessonTypes } = useGetLessonTypes();
    const { mutate: addLessonTypeMutate, isPending: isAddingLessonType } = useAddLessonType();
    const [isAdding, setIsAdding] = useState(false);
    const [showNewLessonTypeInput, setShowNewLessonTypeInput] = useState(false);
    const [newLessonTypeName, setNewLessonTypeName] = useState('');
    const [marksIsFixed, setMarksIsFixed] = useState(false);

    const [form, setForm] = useState({
        name: '',
        description: '',
        mark: '',
        criteriaNumber: '',
        lessonType: '',
        marksIsFixed: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleLessonTypeChange = (selectedOption) => {
        if (selectedOption?.value === 'create_new') {
            setShowNewLessonTypeInput(true);
            setForm((prev) => ({ ...prev, lessonType: '' }));
        } else {
            setShowNewLessonTypeInput(false);
            setForm((prev) => ({ ...prev, lessonType: selectedOption?.value || '' }));
        }
    };

    const handleCreateNewLessonType = () => {
        if (!newLessonTypeName.trim()) {
            toast.error('Please enter a lesson type name');
            return;
        }

        addLessonTypeMutate({ name: newLessonTypeName.trim() }, {
            onSuccess: async (data) => {
                toast.success(data?.message || 'Lesson type created successfully!');
                const lessonTypeName = newLessonTypeName.trim();
                setNewLessonTypeName('');
                setShowNewLessonTypeInput(false);

                // Refetch lesson types and then select the newly created one
                const result = await refetchLessonTypes();
                const newLessonType = result?.data?.lessonTypes?.find(lt => lt?.name === lessonTypeName);
                if (newLessonType?._id) {
                    setForm((prev) => ({ ...prev, lessonType: newLessonType._id }));
                }
            },
            onError: (error) => {
                toast.error(error?.response?.data?.message || 'Failed to create lesson type');
            }
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // Validate lesson type is selected
        if (!form.lessonType && !marksIsFixed) {
            toast.error('Please select or create a lesson type');
            return;
        }

        if (marksIsFixed) {
            form.criteriaNumber = 0;
            form.lessonType = '';
            form.isFixedMarks = true;
        } else {
            form.isFixedMarks = false;
        }

        setIsAdding(true)
        handleSubmit(form, setIsAdding, lesson?._id, marksIsFixed);
    };

    useEffect(() => {
        if (type === 'Update' && lesson) {
            setForm({
                name: lesson.name || '',
                description: lesson.description || '',
                mark: lesson.mark || '',
                criteriaNumber: lesson.criteriaNumber || '',
                lessonType: lesson.lessonType?._id || lesson.lessonType || '',
                marksIsFixed: lesson.isFixedMarks || false,
            });
            setMarksIsFixed(lesson.isFixedMarks || false);
        }
    }, [lesson, type]);

    return (
        <div className="bg-white w-full max-w-[600px] font-urbanist text-center md:rounded-[30px] rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">

            {
                isAdding ? (
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
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-[#1D2939] mb-4">{type} Lesson</h2>
                            <hr className="mb-6 border-t border-gray-200" />
                            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 text-left">

                                {/* Lesson Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Lesson Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter lesson name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter lesson description"
                                        rows="4"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                {/* Marks is Fixed or not fixed */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="marksIsFixed"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            Marks is Fixed
                                        </label>

                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                id="marksIsFixed"
                                                name="marksIsFixed"
                                                checked={marksIsFixed}
                                                onChange={() => setMarksIsFixed(!marksIsFixed)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-100 peer-focus:outline-none rounded-full peer dark:bg-gray-700
                                                 peer-checked:bg-commonColorButton relative transition">
                                                <span className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full
                                       peer-checked:translate-x-5 transition ${marksIsFixed ? 'translate-x-5' : 'translate-x-0'}`}></span>
                                            </div>
                                        </label>
                                    </div>

                                    <p className="text-sm text-gray-500 mt-1">
                                        If marks is fixed, criteria amount and lesson type will be ignored.
                                    </p>
                                </div>


                                {/* Criteria Number */}
                                {
                                    !marksIsFixed && (
                                        <>
                                            <div>
                                                <label htmlFor="criteriaNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Criteria Number
                                                </label>
                                                <input
                                                    type="number"
                                                    disabled={marksIsFixed}
                                                    id="criteriaNumber"
                                                    name="criteriaNumber"
                                                    value={form.criteriaNumber}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Enter criteria number"
                                                    min="1"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                />
                                            </div>

                                            {/* Lesson Type */}
                                            <div>
                                                <label htmlFor="lessonType" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Lesson Type
                                                </label>
                                                {lessonTypesLoading ? (
                                                    <div className="flex items-center justify-center py-2">
                                                        <Loader />
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Select
                                                            disabled={marksIsFixed}
                                                            id="lessonType"
                                                            name="lessonType"
                                                            options={[
                                                                ...(lessonTypesData?.lessonTypes?.map(lt => ({
                                                                    value: lt?._id,
                                                                    label: lt?.name
                                                                })) || []),
                                                                { value: 'create_new', label: '+ Create New Lesson Type' }
                                                            ]}
                                                            value={form.lessonType ? {
                                                                value: form.lessonType,
                                                                label: lessonTypesData?.lessonTypes?.find(lt => lt?._id === form.lessonType)?.name || 'Select Lesson Type'
                                                            } : null}
                                                            onChange={handleLessonTypeChange}
                                                            isSearchable
                                                            placeholder="Select a lesson type"
                                                            className="text-sm"
                                                            classNamePrefix="react-select"
                                                        />
                                                        {showNewLessonTypeInput && !marksIsFixed && (
                                                            <div className="mt-2 flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={newLessonTypeName}
                                                                    onChange={(e) => setNewLessonTypeName(e.target.value)}
                                                                    placeholder="Enter new lesson type name"
                                                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={handleCreateNewLessonType}
                                                                    disabled={isAddingLessonType}
                                                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400"
                                                                >
                                                                    {isAddingLessonType ? 'Adding...' : 'Add'}
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setShowNewLessonTypeInput(false);
                                                                        setNewLessonTypeName('');
                                                                    }}
                                                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </>
                                    )
                                }


                                {/* Marks */}
                                <div>
                                    <label htmlFor="marks" className="block text-sm font-medium text-gray-700 mb-1">
                                        Marks
                                    </label>
                                    <input
                                        type="number"
                                        id="mark"
                                        name="mark"
                                        value={form?.mark}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter total marks"
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>


                                {/* Buttons */}
                                <div className="mt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={setClose}
                                        className="flex-1 bg-gray-300 text-gray-700 font-medium py-2 rounded-md hover:bg-gray-400 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    {
                                        isAdding ? (
                                            <button
                                                type="button"
                                                className="flex-1 bg-commonColorButton text-white font-medium py-2 rounded-md hover:bg-blue-900 transition-all"
                                                disabled
                                            >
                                                {type === 'Create' ? 'Adding...' : 'Updating...'}
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                className="flex-1 bg-commonColorButton text-white font-medium py-2 rounded-md hover:bg-blue-900 transition-all"
                                            >
                                                {type === 'Create' ? 'Add Lesson' : 'Update Lesson'}
                                            </button>
                                        )
                                    }
                                </div>
                            </form>
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default LessonAddModal;


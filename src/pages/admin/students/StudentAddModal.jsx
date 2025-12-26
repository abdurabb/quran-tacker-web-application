import React, { useEffect, useState } from 'react';
import { useGetAllClasses } from '../../../apis/useAdminDataController'
import Loader from '../../../components/loader/Loader'
import Select from 'react-select';

function StudentAddModal({ setClose, handleSubmit, type, student = {} }) {

    // apis 
    const [search, setSearch] = useState('')
    const { data, isLoading } = useGetAllClasses(search)
    const [isAdding, setIsAdding] = useState(false)

    const [form, setForm] = useState({
        name: '',
        image: null,
        email: '',
        password: '',
        dialCode: '+91',
        phone: '',
        dob: '',
        gender: '',
        address: '',
        classId: '',
        admissionDate: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setForm((prev) => ({ ...prev, image: files[0] }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setIsAdding(true)
        handleSubmit(form, setIsAdding, student?._id,);
    };

    useEffect(() => {
        if (type === 'Update' && student) {
            setForm({
                name: student.name || '',
                image: null,
                email: student.email || '',
                password: student.password || '',
                dialCode: student.dialCode || '',
                phone: student.phone || '',
                dob: student.dob ? student.dob.slice(0, 10) : '',
                gender: student.gender || '',
                address: student.address || '',
                classId: student.classId || '',
                admissionDate: student.admissionDate ? student.admissionDate.slice(0, 10) : ''
            });
        }
    }, [student, type]);

    return (
        <div className="bg-white w-full max-w-[600px] font-urbanist text-center md:rounded-[30px] rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">

            {
                isLoading ? (
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
                            <h2 className="text-xl font-semibold text-[#1D2939] mb-4">{type} Student</h2>
                            <hr className="mb-6 border-t border-gray-200" />
                            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">

                                {[
                                    { label: 'Name', name: 'name' },
                                    { label: 'Email', name: 'email', type: 'email' },
                                    { label: 'Password', name: 'password', type: 'password' },
                                    // { label: 'Dial Code', name: 'dialCode' },
                                    { label: 'Phone', name: 'phone', type: 'Number' },
                                    { label: 'Address', name: 'address' },
                                    // { label: 'Class ID', name: 'classId' },
                                ].map(({ label, name, type = 'text' }) => (
                                    <div key={name}>
                                        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                                            {label}
                                        </label>
                                        <input
                                            type={type}
                                            id={name}
                                            name={name}
                                            value={form[name]}
                                            onChange={handleChange}
                                            required
                                            placeholder={label}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>
                                ))}

                                {/* class id */}
                                <div>
                                    <label htmlFor="classId" className="block text-sm font-medium text-gray-700 mb-1">
                                        Class
                                    </label>
                                    <Select
                                        id="classId"
                                        name="classId"
                                        options={data?.classes?.map(cls => ({
                                            value: cls?._id,
                                            label: cls?.name
                                        }))}
                                        value={data?.classes?.find(cls => cls?._id === form.classId) ? {
                                            value: form.classId,
                                            label: data.classes.find(cls => cls?._id === form.classId).name
                                        } : null}
                                        onChange={(selectedOption) =>
                                            setForm(prev => ({ ...prev, classId: selectedOption?.value || '' }))
                                        }
                                        isSearchable
                                        placeholder="Select a class"
                                        className="text-sm"
                                        classNamePrefix="react-select"
                                    />
                                </div>


                                {/* Gender */}
                                <div>
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                                        Gender
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={form.gender}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                {/* DOB */}
                                <div>
                                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        id="dob"
                                        name="dob"
                                        value={form.dob}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                {/* Admission Date */}
                                <div>
                                    <label htmlFor="admissionDate" className="block text-sm font-medium text-gray-700 mb-1">
                                        Admission Date
                                    </label>
                                    <input
                                        type="date"
                                        id="admissionDate"
                                        name="admissionDate"
                                        value={form.admissionDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                {/* Image Upload */}
                                <div className="md:col-span-2">
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                                        Upload Profile Image
                                    </label>

                                    <div className="flex items-center gap-4">
                                        <label
                                            htmlFor="image"
                                            className="cursor-pointer inline-block bg-commonColorButton text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-900 transition duration-200"
                                        >
                                            Choose File
                                        </label>

                                        <span className="text-sm text-gray-600">
                                            {form.image?.name || 'No file selected'}
                                        </span>
                                    </div>

                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="hidden"
                                    />

                                    {form.image && typeof form.image !== 'string' && (
                                        <div className="mt-4">
                                            <img
                                                src={URL.createObjectURL(form.image)}
                                                alt="Preview"
                                                className="w-24 h-24 object-cover rounded-md border"
                                            />
                                        </div>
                                    )}
                                </div>


                                {/* Buttons */}
                                <div className="md:col-span-2 mt-4">
                                    {
                                        isAdding ? (
                                            <>
                                                <button
                                                    type=""
                                                    className="w-full bg-commonColorButton text-white font-medium py-2 rounded-md hover:bg-blue-900 transition-all"
                                                >
                                                    Adding ....
                                                </button>
                                            </>

                                        ) : (
                                            <div className="flex flex-col md:flex-row gap-3">
                                                <button
                                                    type="button"
                                                    onClick={setClose}
                                                    className="w-full md:w-1/2 bg-gray-200 text-black font-medium py-2 rounded-md hover:bg-gray-300 transition-all"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="w-full md:w-1/2 bg-commonColorButton text-white font-medium py-2 rounded-md hover:bg-blue-900 transition-all"
                                                >
                                                    {type === 'Create' ? 'Add Student' : 'Update Student'}
                                                </button>
                                            </div>
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

export default StudentAddModal;

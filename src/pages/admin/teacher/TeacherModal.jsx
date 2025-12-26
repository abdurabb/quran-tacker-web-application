import React, { useEffect, useState } from 'react';

function TeacherModal({ setClose, handleSubmit, type, teacher = {} }) {
    const [isAdding, setIsAdding] = useState(false)
    const [form, setForm] = useState({
        name: '',
        image: '',
        email: '',
        password: '',
        qualification: '',
        dob: '',
        joiningDate: '',
        dialCode: '+91',
        phone: '',
        address: '',
        gender: '',
        experience: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setIsAdding(true)
        handleSubmit(form, setIsAdding, teacher?._id);
    };

    useEffect(() => {
        if (type === 'Update' && teacher) {
            setForm({
                name: teacher.name || '',
                image: teacher.image || '',
                email: teacher.email || '',
                password: teacher.password || '',
                qualification: teacher.qualification || '',
                dob: teacher.dob ? teacher.dob.slice(0, 10) : '',
                joiningDate: teacher.joiningDate ? teacher.joiningDate.slice(0, 10) : '',
                dialCode: teacher.dialCode || '',
                phone: teacher.phone || '',
                address: teacher.address || '',
                gender: teacher.gender || '',
                experience: teacher.experience || ''
            });
        }
    }, [teacher, type]);

    return (
        <div className="bg-white w-full max-w-[600px] font-urbanist text-center md:rounded-[30px] rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <div className="p-6">
                <h2 className="text-xl font-semibold text-[#1D2939] mb-4">{type} Teacher</h2>
                <hr className="mb-6 border-t border-gray-200" />
                <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    {[
                        { label: 'Name', name: 'name' },
                        { label: 'Email', name: 'email' },
                        { label: 'Password', name: 'password', type: 'password' },
                        { label: 'Qualification', name: 'qualification' },
                        // { label: 'Dial Code', name: 'dialCode' },
                        { label: 'Phone', name: 'phone' },
                        { label: 'Address', name: 'address' },
                        { label: 'Experience (Years)', name: 'experience', type: 'number' },
                    ].map(({ label, name, type = 'text' }) => (
                        <div key={name}>
                            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                                {label}
                            </label>
                            <input
                                type={type}
                                id={name}
                                name={name}
                                disabled={name === 'dialCode'}
                                value={name === 'dialCode' ? form.dialCode : form[name]}
                                onChange={handleChange}
                                required={name !== 'image'}
                                placeholder={label}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    ))}

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
                            <option value="trans">Trans</option>
                        </select>
                    </div>

                    {/* Date of Birth */}
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

                    {/* Joining Date */}
                    <div>
                        <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Joining Date
                        </label>
                        <input
                            type="date"
                            id="joiningDate"
                            name="joiningDate"
                            value={form.joiningDate}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Image (Optional) */}
                    <div className="md:col-span-2">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                            Profile Image <span className="text-xs text-gray-500">(optional)</span>
                        </label>

                        <div className="flex items-center gap-3">
                            <label
                                htmlFor="image"
                                className="cursor-pointer bg-commonColorButton text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-900 transition"
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
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setForm((prev) => ({ ...prev, image: file }));
                            }}
                            className="hidden"
                        />

                        {form.image && typeof form.image !== 'string' && (
                            <div className="mt-3">
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
                                        Adding...
                                    </button>
                                </>
                            ) :
                                (
                                    <div className='flex flex-col md:flex-row gap-3 '>
                                        <button
                                            onClick={setClose}
                                            className="w-full  md:w-1/2 bg-gray-200  text-black font-medium py-2 rounded-md hover:bg-gray-300 transition-all"
                                        >
                                            {'Cancel'}
                                        </button>
                                        <button
                                            type="submit"
                                            className="w-full  md:w-1/2 bg-commonColorButton text-white font-medium py-2 rounded-md hover:bg-blue-900 transition-all"
                                        >
                                            {type === 'Create' ? 'Add Teacher' : 'Update Teacher'}
                                        </button>
                                    </div>
                                )
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TeacherModal;

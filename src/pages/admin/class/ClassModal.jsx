import React, { useEffect, useState } from 'react';

function ClassAddModal({ setClose, handleSubmit, type, name, description }) {
    const [className, setClassName] = useState("");
    const [updateDescription, setUpdateDescription] = useState("")

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(className, updateDescription);
    };

    useEffect(() => {
        if (name) {
            setClassName(name);
        }
        if (description) {
            setUpdateDescription(description)
        }
    }, [name, description]);

    return (
        <div className="bg-white w-full max-w-[474px] font-urbanist text-center md:rounded-[30px] rounded-lg shadow-lg">
            <div className="p-6">
                {/* Title */}
                <h2 className="text-xl font-semibold text-[#1D2939] mb-4">{type} Class</h2>
                <hr className="mb-6 border-t border-gray-200" />

                <form onSubmit={onSubmit}>
                    {/* Input field */}
                    <div className="mb-6 text-left">
                        <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-1">
                            Class
                        </label>
                        <input
                            type="text"
                            id="className"
                            name="className"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            placeholder={type === 'Create' ? 'Enter Class name' : className}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="mb-6 text-left">
                        <label htmlFor="updateDescription" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <input
                            type="text"
                            id="updateDescription"
                            name="updateDescription"
                            value={updateDescription}
                            onChange={(e) => setUpdateDescription(e.target.value)}
                            placeholder={type === 'Create' ? 'Enter Class Description' : updateDescription}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Buttons */}
                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white font-medium py-2 rounded-md hover:bg-blue-800 transition-all"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ClassAddModal;

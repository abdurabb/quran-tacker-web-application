import React, { useEffect, useState } from 'react';
import { useLogin } from '../../apis/useAdminDataController';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [err, setErr] = useState('');
    const navigate = useNavigate();
    const { data, isPending, mutate, error } = useLogin();

    useEffect(() => {
        if (err) {
            toast.error(err)
        }
    }, [err])

    useEffect(() => {
        toast.clearWaitingQueue();
        if (data) {
            localStorage.setItem("token", data?.token);
            localStorage.setItem("role", data?.role);
            if (data?.role === 'user') {
                navigate('/')
            } else {
                navigate(`/${data?.role}-home`)
            }
        } else if (error) {
            if (error?.response?.data?.message) {
                console.log(error?.response?.data?.message);
                // toast.error(error?.response?.data?.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    }, [data, error]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=600&fit=crop
')] bg-cover bg-center font-urbanist relative">
            <div className="w-max-w-md p-4 md:p-14  bg-white rounded-xl shadow-lg z-10">


                <div className="w-full max-w-2xl"> {/* Adjust max-w-* as needed */}
                    <h2 className="text-2xl md:text-3xl font-bold text-start text-black mb-2">
                        Sign In to your Account
                    </h2>
                    <p className="text-xl text-start text-gray-500 mb-6">
                        Please enter your Details Below
                    </p>
                </div>





                {/* role selecting */}
                <div className="relative w-full mt-4">
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="appearance-none w-full p-4 bg-[#ECEBE5] text-black font-medium rounded-md transition-all duration-200 pr-10"
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="teacher">Teacher</option>
                        <option value="user">Student</option>
                    </select>

                    {/* Arrow Icon */}
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <svg
                            className="w-5 h-5 text-gray-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                <input
                    type="text"
                    placeholder='Enter Your Email'
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    className='w-full mt-4 p-4 bg-[#ECEBE5] text-black font-medium py-2 rounded-md hover:bg-[#ECEBE5] transition-all duration-200'
                />

                <input
                    type="text"
                    placeholder='Enter Your Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full mt-4 p-4 bg-[#ECEBE5] text-black font-medium py-2 rounded-md hover:bg-[#ECEBE5] transition-all duration-200'
                />

                {/* Sign In Button */}
                <button
                    onClick={() => {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!mail) {
                            setErr("Enter your email");
                            return;
                        }

                        if (!emailRegex.test(mail)) {
                            setErr("Enter a valid email address");
                            return;
                        }

                        if (!password) {
                            setErr("Enter your password");
                            return;
                        }

                        if (!role) {
                            setErr("Select Your Role");
                            return;
                        }
                        setErr('');
                        mutate({ role, email: mail, password }, {
                            onSuccess: (data) => {
                                toast.success(data?.message);
                            }
                        });
                    }}
                    className="w-full mt-4 bg-[#0B2B6C] text-white font-medium py-2 rounded-md hover:bg-[#0a265e] transition-all duration-200"
                >
                    {isPending ? 'Loading...' : 'Sign In'}
                </button>

                {/* cancel button */}
                <button
                    onClick={() => {navigate('/')}}
                    className="w-full mt-4 bg-gray-200 text-black font-medium py-2 rounded-md hover:bg-bg-gray-400 transition-all duration-200"
                >
                    {'Cancel'}
                </button>
            </div>
        </div>
    );
}

export default Login;


{/*  */ }
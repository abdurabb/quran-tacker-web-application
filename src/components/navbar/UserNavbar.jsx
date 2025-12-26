import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function UserNavbar() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogin = () => {
        if (isLoggedIn) {
            localStorage.clear('token');
            localStorage.clear('role');
            navigate('/');
        } else {
            navigate('/login');
        }
    }

    const quickLinks = [
        "Admissions 2025",
        "Entrance Exams",
        "Scholarships",
        "Campus Tour",
        "Online Courses",
        "Research Programs"
    ];
    return (
        <>
            {/* Top Header Bar */}
            <div className="bg-green-600 text-white py-2 px-4 text-sm hidden md:block">
                <div className="max-w-7xl mx-auto flex justify-between   flex-wrap gap-2">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <Phone size={14} /> +1 (555) 123-4567
                        </span>
                        <span className="flex items-center gap-1">
                            <Mail size={14} /> info@greenvalley.edu
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Facebook size={16} className="cursor-pointer hover:scale-110 transition" />
                        <Twitter size={16} className="cursor-pointer hover:scale-110 transition" />
                        <Instagram size={16} className="cursor-pointer hover:scale-110 transition" />
                        <Linkedin size={16} className="cursor-pointer hover:scale-110 transition" />
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                GV
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-green-700">Qaf Institute</h1>
                                <p className="text-xs text-gray-600">Excellence in Education</p>
                            </div>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-6">
                            <button
                                onClick={() => {
                                    navigate('/')
                                }}
                                className="text-gray-700 hover:text-green-600 font-medium transition">Home</button>
                            <a href="#about" className="text-gray-700 hover:text-green-600 font-medium transition">About</a>
                            <a href="#courses" className="text-gray-700 hover:text-green-600 font-medium transition">Courses</a>
                            <a href="#admissions" className="text-gray-700 hover:text-green-600 font-medium transition">Admissions</a>
                            <a href="#contact" className="text-gray-700 hover:text-green-600 font-medium transition">Contact</a>
                            {
                                isLoggedIn && role === 'user' && (
                                    <button onClick={() => {
                                        navigate('/user-profile')
                                    }} className="text-gray-700 hover:text-green-600 font-medium transition">Profile</button>
                                )
                            }

                            {
                                isLoggedIn && role !== 'user' && (
                                    <button
                                        onClick={() => {
                                            navigate(`/${role}-home`)
                                        }}
                                        href="#admin-home" className="text-gray-700 hover:text-green-600 font-medium transition">Go to Portal</button>
                                )
                            }

                            <button
                                onClick={() => {
                                    handleLogin()
                                }}
                                className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition font-medium"
                            >
                                {isLoggedIn ? 'Logout' : 'Login'}
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-gray-700"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden mt-4 pb-4 space-y-3">
                            <button onClick={() => {
                                navigate('/')
                            }} className="block text-gray-700 hover:text-green-600 font-medium">Home</button>
                            <a href="#about" className="block text-gray-700 hover:text-green-600 font-medium">About</a>
                            <a href="#courses" className="block text-gray-700 hover:text-green-600 font-medium">Courses</a>
                            <a href="#admissions" className="block text-gray-700 hover:text-green-600 font-medium">Admissions</a>
                            <a href="#contact" className="block text-gray-700 hover:text-green-600 font-medium">Contact</a>
                            {
                                isLoggedIn && role === 'user' && (
                                    <button onClick={() => {
                                        navigate('/user-profile')
                                    }} className="text-gray-700 hover:text-green-600 font-medium transition">Profile</button>
                                )
                            }

                            {
                                isLoggedIn && role !== 'user' && (
                                    <button
                                        onClick={() => {
                                            navigate(`/${role}-home`)
                                        }}
                                        href="#admin-home" className="text-gray-700 hover:text-green-600 font-medium transition">Go to Portal</button>
                                )
                            }
                            <button
                                onClick={() => {
                                    handleLogin()
                                }}
                                className="w-full bg-green-600 text-white px-5 py-2 mt-3 rounded-full hover:bg-green-700 transition font-medium"
                            >
                                {isLoggedIn ? 'Logout' : 'Login'}
                            </button>
                        </div>
                    )}
                </div>

                {/* Quick Links Carousel */}
                {
                    window.location.pathname === '/' && (
                        <>
                            <div className="bg-green-50 border-t border-green-100">
                                <div className="max-w-7xl mx-auto px-4 py-3 overflow-hidden">
                                    <div className="flex items-center gap-6 animate-scroll">
                                        {quickLinks.concat(quickLinks).map((link, idx) => (
                                            <a
                                                key={idx}
                                                href="#"
                                                className="whitespace-nowrap text-sm font-medium text-green-700 hover:text-green-900 transition"
                                            >
                                                {link}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </nav>
        </>
    )
}

export default UserNavbar
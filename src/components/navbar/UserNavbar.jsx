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
            <div className="text-white py-2 px-4 text-sm hidden md:block" style={{ backgroundColor: '#0B2B6C' }}>
                <div className="max-w-7xl mx-auto flex justify-between   flex-wrap gap-2">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <Phone size={14} /> +91 7909199591
                        </span>
                        <span className="flex items-center gap-1">
                            <Mail size={14} /> info@schoolofquran.edu
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
                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl overflow-hidden" style={{ backgroundColor: '#0B2B6C' }}>
                                <img src="/qaflogo.jpg" alt="logo" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold" style={{ color: '#0B2B6C' }}>Qaf International Campus</h1>
                                <p className="text-xs text-gray-600">READ. LEARN. EVOLVE</p>
                            </div>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-6">
                            <button
                                onClick={() => {
                                    navigate('/')
                                }}
                                className="text-gray-700 font-medium transition" style={{ '--hover-color': '#0B2B6C' }} onMouseEnter={(e) => e.target.style.color = '#0B2B6C'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Home</button>
                            <a href="#about" className="text-gray-700 font-medium transition" onMouseEnter={(e) => e.target.style.color = '#0B2B6C'} onMouseLeave={(e) => e.target.style.color = '#374151'}>About</a>
                            <a href="#courses" className="text-gray-700 font-medium transition" onMouseEnter={(e) => e.target.style.color = '#0B2B6C'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Courses</a>
                            <a href="#admissions" className="text-gray-700 font-medium transition" onMouseEnter={(e) => e.target.style.color = '#0B2B6C'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Admissions</a>
                            <a href="#contact" className="text-gray-700 font-medium transition" onMouseEnter={(e) => e.target.style.color = '#0B2B6C'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Contact</a>
                            {
                                isLoggedIn && role === 'user' && (
                                    <button onClick={() => {
                                        navigate('/user-profile')
                                    }} className="text-gray-700 font-medium transition" onMouseEnter={(e) => e.target.style.color = '#0B2B6C'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Profile</button>
                                )
                            }

                            {
                                isLoggedIn && role !== 'user' && (
                                    <button
                                        onClick={() => {
                                            navigate(`/${role}-home`)
                                        }}
                                        href="#admin-home" className="text-gray-700 font-medium transition" onMouseEnter={(e) => e.target.style.color = '#0B2B6C'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Go to Portal</button>
                                )
                            }

                            <button
                                onClick={() => {
                                    handleLogin()
                                }}
                                className="text-white px-5 py-2 rounded-full transition font-medium"
                                style={{ backgroundColor: '#0B2B6C' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#0a2458'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#0B2B6C'}
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
                            }} className="block text-gray-700 font-medium" onMouseEnter={(e) => e.target.style.color = '#0B2B6C'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Home</button>
                            <a href="#about" className="block text-gray-700 font-medium" onMouseEnter={(e) => e.target.style.color = '#0B2B6C'} onMouseLeave={(e) => e.target.style.color = '#374151'}>About</a>
                            <a href="#courses" className="block text-gray-700 font-medium" onMouseEnter={(e) => e.target.style.color = '#0B2B6C'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Courses</a>
                            <a href="#admissions" className="block text-gray-700 font-medium" onMouseEnter={(e) => e.target.style.color = '#0B2B6C'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Admissions</a>
                            <a href="#contact" className="block text-gray-700 font-medium" onMouseEnter={(e) => e.target.style.color = '#0B2B6C'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Contact</a>
                            {
                                isLoggedIn && role === 'user' && (
                                    <button onClick={() => {
                                        navigate('/user-profile')
                                    }} className="text-gray-700 font-medium transition" onMouseEnter={(e) => e.target.style.color = '#0B2B6C'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Profile</button>
                                )
                            }

                            {
                                isLoggedIn && role !== 'user' && (
                                    <button
                                        onClick={() => {
                                            navigate(`/${role}-home`)
                                        }}
                                        href="#admin-home" className="text-gray-700 font-medium transition" onMouseEnter={(e) => e.target.style.color = '#0B2B6C'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Go to Portal</button>
                                )
                            }
                            <button
                                onClick={() => {
                                    handleLogin()
                                }}
                                className="w-full text-white px-5 py-2 mt-3 rounded-full transition font-medium"
                                style={{ backgroundColor: '#0B2B6C' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#0a2458'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#0B2B6C'}
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
                            <div className="border-t" style={{ backgroundColor: '#E6F0FF', borderColor: '#B3D9FF' }}>
                                <div className="max-w-7xl mx-auto px-4 py-3 overflow-hidden">
                                    <div className="flex items-center gap-6 animate-scroll">
                                        {quickLinks.concat(quickLinks).map((link, idx) => (
                                            <a
                                                key={idx}
                                                href="#"
                                                className="whitespace-nowrap text-sm font-medium transition"
                                                style={{ color: '#0B2B6C' }}
                                                onMouseEnter={(e) => e.target.style.color = '#0a2458'}
                                                onMouseLeave={(e) => e.target.style.color = '#0B2B6C'}
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
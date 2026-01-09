import React from 'react'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

function UserFooter() {
    return (
        <>
            {/* Footer */}
            <footer className="text-white py-12" style={{ backgroundColor: '#0B2B6C' }}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">Qaf Institute</h3>
                            <p className="text-sm leading-relaxed" style={{ color: '#B3D9FF' }}>
                                Empowering students with quality education and preparing them for a bright future since 1985.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="transition" style={{ color: '#B3D9FF' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = '#B3D9FF'}>About Us</a></li>
                                <li><a href="#" className="transition" style={{ color: '#B3D9FF' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = '#B3D9FF'}>Admissions</a></li>
                                <li><a href="#" className="transition" style={{ color: '#B3D9FF' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = '#B3D9FF'}>Courses</a></li>
                                <li><a href="#" className="transition" style={{ color: '#B3D9FF' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = '#B3D9FF'}>Campus Life</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Resources</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="transition" style={{ color: '#B3D9FF' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = '#B3D9FF'}>Library</a></li>
                                <li><a href="#" className="transition" style={{ color: '#B3D9FF' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = '#B3D9FF'}>Student Portal</a></li>
                                <li><a href="#" className="transition" style={{ color: '#B3D9FF' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = '#B3D9FF'}>Career Services</a></li>
                                <li><a href="#" className="transition" style={{ color: '#B3D9FF' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = '#B3D9FF'}>Alumni</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Connect With Us</h4>
                            <div className="flex gap-4 mb-4">
                                <Facebook className="cursor-pointer hover:scale-110 transition" size={20} />
                                <Twitter className="cursor-pointer hover:scale-110 transition" size={20} />
                                <Instagram className="cursor-pointer hover:scale-110 transition" size={20} />
                                <Linkedin className="cursor-pointer hover:scale-110 transition" size={20} />
                            </div>
                            <p className="text-sm" style={{ color: '#B3D9FF' }}>
                                Stay updated with our latest news and events.
                            </p>
                        </div>
                    </div>
                    <div className="pt-8 text-center text-sm" style={{ borderTop: '1px solid rgba(179, 217, 255, 0.3)', color: '#B3D9FF' }}>
                        <p>© 2025 Ainul Maarif College. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default UserFooter
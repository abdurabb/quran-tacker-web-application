import React from 'react'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

function UserFooter() {
    return (
        <>
            {/* Footer */}
            <footer className="bg-green-700 text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">Ainul Maarif</h3>
                            <p className="text-green-100 text-sm leading-relaxed">
                                Empowering students with quality education and preparing them for a bright future since 1985.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-green-100 hover:text-white transition">About Us</a></li>
                                <li><a href="#" className="text-green-100 hover:text-white transition">Admissions</a></li>
                                <li><a href="#" className="text-green-100 hover:text-white transition">Courses</a></li>
                                <li><a href="#" className="text-green-100 hover:text-white transition">Campus Life</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Resources</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-green-100 hover:text-white transition">Library</a></li>
                                <li><a href="#" className="text-green-100 hover:text-white transition">Student Portal</a></li>
                                <li><a href="#" className="text-green-100 hover:text-white transition">Career Services</a></li>
                                <li><a href="#" className="text-green-100 hover:text-white transition">Alumni</a></li>
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
                            <p className="text-green-100 text-sm">
                                Stay updated with our latest news and events.
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-green-600 pt-8 text-center text-sm text-green-100">
                        <p>© 2025 Ainul Maarif College. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default UserFooter
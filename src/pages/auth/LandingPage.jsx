import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center px-6">
      <div className="text-center text-white max-w-xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-red-700 bg-green-500">
          Welcome to Our Platform
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Build faster. Launch sooner. Impress your users.
        </p>
        <button
          onClick={() => {
            if (!token) {
              navigate('/login')
            } else {
              navigate(`/${role}-home`)
            }
          }}
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gray-100 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;

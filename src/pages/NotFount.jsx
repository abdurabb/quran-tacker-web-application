import React from 'react'
import { Link } from "react-router-dom";


function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-bold text-green-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;

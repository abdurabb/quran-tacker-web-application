import React from 'react';

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] flex-col">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Text */}
      <p className="mt-4 text-gray-700 text-sm">Loading...</p>
    </div>
  );
}

export default Loader;

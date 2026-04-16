import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

function NotFound() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center'>
      
      {/* Large Status Code */}
      <h1 className='text-8xl font-black text-amber-500'>
        {error?.status || '404'}
      </h1>
      
      {/* Clear, Normal Status Text */}
      <div className='mt-2 bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide'>
        {error?.statusText || 'Page Not Found'}
      </div>

      <div className='mt-8'>
        <h3 className='text-2xl font-bold text-gray-800'>
          Oops! Something went wrong.
        </h3>
        <p className='text-gray-600 mt-2 max-w-md'>
          {error?.data || "We can't seem to find the page you're looking for."}
        </p>
      </div>

      {/* Action Buttons */}
      <div className='mt-10 flex flex-col sm:flex-row gap-4'>
        <Link 
          to="/" 
          className='px-8 py-3 bg-amber-500 text-white font-bold rounded-lg shadow-sm hover:bg-amber-600 transition-colors'
        >
          Back to ShoppyGlobe
        </Link>
        
        <button 
          onClick={() => window.location.reload()}
          className='px-8 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors'
        >
          Refresh Page
        </button>
      </div>
      
    </div>
  )
}

export default NotFound;
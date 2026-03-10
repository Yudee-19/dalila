'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-800">Error</h1>
          <div className="text-4xl font-semibold text-gray-700 mt-4">
            Something went wrong
          </div>
        </div>
        
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          An unexpected error has occurred. Please try again.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => reset()}
            className="inline-block bg-[#030822] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#030822]/90 transition-colors mr-4"
          >
            Try Again
          </button>
          
          <Link
            href="/"
            className="inline-block bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

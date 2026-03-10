'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="text-center px-4">
            <div className="mb-8">
              <h1 className="text-9xl font-bold text-gray-800">500</h1>
              <div className="text-4xl font-semibold text-gray-700 mt-4">
                Something went wrong
              </div>
            </div>
            
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              An unexpected error has occurred. Please try again later.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => reset()}
                className="inline-block bg-[#030822] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#030822]/90 transition-colors"
              >
                Try Again
              </button>
              
              <div className="mt-6">
                <a
                  href="/"
                  className="inline-block text-[#030822] hover:underline text-sm"
                >
                  Go to Homepage
                </a>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

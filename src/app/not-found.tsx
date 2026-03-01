import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-800">404</h1>
          <div className="text-4xl font-semibold text-gray-700 mt-4">
            Page Not Found
          </div>
        </div>
        
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-[#030822] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#030822]/90 transition-colors"
          >
            Go to Homepage
          </Link>
          
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-4">Or explore these pages:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/aboutUs"
                className="text-[#030822] hover:underline text-sm"
              >
                About Us
              </Link>
              <span className="text-gray-400">•</span>
              <Link
                href="/diamondKnowledge"
                className="text-[#030822] hover:underline text-sm"
              >
                Diamond Knowledge
              </Link>
              <span className="text-gray-400">•</span>
              <Link
                href="/contact"
                className="text-[#030822] hover:underline text-sm"
              >
                Contact
              </Link>
              <span className="text-gray-400">•</span>
              <Link
                href="/diamond-source"
                className="text-[#030822] hover:underline text-sm"
              >
                Diamond Source
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

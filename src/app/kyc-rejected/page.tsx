import Link from "next/link";
import { XCircle, Mail, AlertTriangle, RefreshCw } from "lucide-react";

export default function KycRejected() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Application Not Approved
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            Unfortunately, we were unable to approve your account at this time.
            This may be due to incomplete information or documentation issues.
          </p>

          {/* Info Box */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm text-yellow-900 font-medium mb-1">
                  What can you do?
                </p>
                <p className="text-sm text-yellow-800">
                  Please contact our support team to understand the reason for
                  rejection and resubmit your application with the correct
                  information.
                </p>
              </div>
            </div>
          </div>

          {/* Common Reasons */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Common reasons for rejection:
            </p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Incomplete business documentation</li>
              <li>Unclear or invalid identification</li>
              <li>Missing required certificates</li>
              <li>Inconsistent information</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <Mail className="w-5 h-5 text-blue-600" />
              <div className="text-sm">
                <p className="font-medium text-blue-900">Get help from our team</p>
                <a
                  href="mailto:info@daliladiamonds.com"
                  className="text-[#030822] hover:underline"
                >
                  info@daliladiamonds.com
                </a>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Link
              href="/customer-details"
              className="flex items-center justify-center gap-2 w-full bg-[#030822] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#030822]/90 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Update Information
            </Link>
            <Link
              href="/contact"
              className="block w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/"
              className="block w-full text-gray-600 hover:text-gray-800 py-2 text-sm"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

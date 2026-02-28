import Link from "next/link";
import { Clock, Mail, AlertCircle } from "lucide-react";

export default function PendingApproval() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="w-10 h-10 text-yellow-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Approval Pending
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            Your account is currently under review. Our team is verifying your
            information and will notify you once your account has been approved.
          </p>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm text-blue-900 font-medium mb-1">
                  What happens next?
                </p>
                <p className="text-sm text-blue-800">
                  You will receive an email notification once your account has
                  been reviewed. This typically takes 1-2 business days.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <Mail className="w-5 h-5" />
              <div className="text-sm">
                <p className="font-medium">Need help?</p>
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
              href="/"
              className="block w-full bg-[#030822] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#030822]/90 transition-colors"
            >
              Return to Homepage
            </Link>
            <Link
              href="/contact"
              className="block w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

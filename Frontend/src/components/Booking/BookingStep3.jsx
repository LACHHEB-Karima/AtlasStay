import React from "react";
import { Link } from "react-router-dom";

const BookingStep3 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Confirmation Message */}
      <div className="flex items-center justify-center mt-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-teal-700 mb-6">🎉 Yay! Payment Completed</h2>
          <p className="text-gray-600 mb-10">
            Please check your email. We've sent you all the details.
          </p>

          <Link
            to="/"
            className="bg-teal-600 text-white py-3 px-4 rounded w-full hover:bg-teal-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingStep3;

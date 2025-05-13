import React from "react";
import { Link } from "react-router-dom";

const BookingStep3 = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Branding */}
      <div className="w-full text-center py-6">
        <h4 className='text-teal-500'><strong className='text-teal-600 text-[30px]'>Atlas</strong><span className='text-[25px]'>Stay</span></h4>
      </div>

      {/* Step indicators */}
      <div className="flex justify-center w-full mb-4 mt-4 gap-4">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-teal-600 text-white">✓</div>
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-teal-600 text-white">✓</div>
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-teal-600 text-white">✓</div>
      </div>

      {/* Confirmation Message */}
      <div className="flex items-center justify-center mt-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-teal-700 mb-4">🎉 Yay! Payment Completed</h2>
          <p className="text-gray-600 mb-6">
            Please check your email. We've sent you all the details.
          </p>

          <Link
            to="/"
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 mt-2"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingStep3;

import React from "react";
import { Link } from "react-router-dom";


const BookingStep3 = () => {
    return (
      <div className="p-8 text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <div className="bg-teal-600 rounded-full p-2 text-white">✓</div>
          <div className="bg-teal-600 rounded-full p-2 text-white">✓</div>
          <div className="bg-teal-600 rounded-full p-2 text-white">✓</div>
        </div>
        <h2 className="text-2xl font-bold text-teal-600 mb-4">Yay! Payment Completed</h2>
        <p className="text-gray-600 mb-6">Please check your email & phone. We have sent all the information.</p>
        <Link to="/" className="bg-teal-600 text-white px-6 py-2 rounded-2xl shadow hover:bg-teal-700">
          Back to home
        </Link>
      </div>
    );
  };

  export default BookingStep3;
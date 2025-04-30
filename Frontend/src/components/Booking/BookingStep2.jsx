import React from "react";


const BookingStep2 = ({ onNext }) => {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-teal-600 mb-4">Payment</h2>
        <p className="mb-6 text-gray-600">2 Days at Blue Origin Fams, Galle, Sri Lanka</p>
        <p className="font-semibold text-gray-800 mb-4">Total: <span className="text-black">$400 USD</span></p>
        <p className="font-semibold text-gray-800 mb-6">Initial Payment: <span className="text-black">$200</span></p>
        <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
          <input className="border rounded p-2" type="text" placeholder="Card Number" />
          <input className="border rounded p-2" type="text" placeholder="Bank" />
          <input className="border rounded p-2" type="text" placeholder="Exp Date" />
          <input className="border rounded p-2" type="text" placeholder="CVV" />
        </div>
        <button
          className="mt-6 bg-teal-600 text-white px-6 py-2 rounded-2xl shadow hover:bg-teal-700"
          onClick={onNext}
        >
          Pay Now
        </button>
      </div>
    );
  };

  export default BookingStep2;
import React, { useState } from "react";

const BookingStep1 = ({ onNext }) => {
  const [days, setDays] = useState(2);
  const pricePerDay = 200;
  const totalPrice = days * pricePerDay;

  const handleIncrement = () => setDays((prev) => prev + 1);
  const handleDecrement = () => {
    if (days > 1) setDays((prev) => prev - 1);
  };

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold text-teal-600 mb-4">Booking Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src="https://i.imgur.com/3VQkKQo.jpg"
          alt="Blue Origin Fams"
          className="rounded-2xl shadow-md"
        />
        <div className="text-left">
          <p className="text-lg font-medium text-gray-800 mb-2">
            Blue Origin Fams, Galle, Sri Lanka
          </p>
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={handleDecrement}
              className="bg-teal-500 text-white px-3 py-1 rounded-md hover:bg-teal-600"
            >
              −
            </button>
            <span className="text-lg font-semibold">{days} Day{days > 1 && "s"}</span>
            <button
              onClick={handleIncrement}
              className="bg-teal-500 text-white px-3 py-1 rounded-md hover:bg-teal-600"
            >
              +
            </button>
          </div>
          <p className="text-md text-gray-600 mb-4">
            You will pay <span className="font-semibold text-gray-800">${totalPrice} USD</span>
          </p>
          <button
            className="bg-teal-600 text-white px-6 py-2 rounded-2xl shadow hover:bg-teal-700"
            onClick={() => onNext(days, totalPrice)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingStep1;

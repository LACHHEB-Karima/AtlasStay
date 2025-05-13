import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { checkRoomAvailability, createBooking } from "../../services/bookingService";

export default function BookingStep1({ roomId, roomTitle, roomPrice, roomPhotoUrl, onNext }) {
  const today = new Date();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isValidBooking = checkInDate && checkOutDate && checkInDate < checkOutDate;

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const calculateDays = () => {
    if (checkInDate && checkOutDate) {
      const diffTime = Math.abs(checkOutDate - checkInDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const days = calculateDays();
  const totalPrice = roomPrice * days;

  const handleBookingCheck = async () => {
    if (!isValidBooking) return;

    const bookingPayload = {
      roomId,
      checkInDate: formatDate(checkInDate),
      checkOutDate: formatDate(checkOutDate),
      numOfAdults: adults,
      numOfChildren: children,
      totalPrice,
    };

    try {
      const checkResponse = await checkRoomAvailability({
        roomId: bookingPayload.roomId,
        checkInDate: bookingPayload.checkInDate,
        checkOutDate: bookingPayload.checkOutDate,
      });

      if (!checkResponse.available) {
        setError(checkResponse.message || "Room is not available for the selected dates.");
        return;
      }

      const createdBooking = await createBooking(bookingPayload);

      onNext({
        ...bookingPayload,
        bookingId: createdBooking,
        roomTitle,
        days,
      });

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };



  const handleCancelClick = () => {
    navigate(`/room/${roomId}`)
  }


  const closeErrorPopup = () => setError(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {/* Branding */}
      <div className="w-full text-center py-6">
        <h4 className='text-teal-500'><strong className='text-teal-600 text-[30px]'>Atlas</strong><span className='text-[25px]'>Stay</span></h4>
      </div>

      {/* Step indicators */}
      <div className="flex justify-center w-full mb-8 gap-4">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 border border-teal-600 text-gray-600">1</div>
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 text-gray-600">2</div>
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 text-gray-600">3</div>
      </div>

      {/* Title and instructions */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Booking Information</h2>
        <p className="text-gray-500">Please fill up the blank fields below</p>
      </div>

      {/* Form and preview */}
      <div className="flex w-full flex-col md:flex-row gap-6 px-4">
        {/* Preview panel */}
        <div className="w-full mr-8 md:w-1/2">
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src={roomPhotoUrl}
              alt={roomTitle}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800">{roomTitle}</h3>
              <p className="text-gray-500">Your ideal comfort in Atlas moutains</p>
            </div>
          </div>
        </div>

        {/* Booking form */}
        <div className="w-full md:w-1/2 space-y-6">
          {/* Check-in Date */}
          <div className="mb-6">
            <p className="mb-2 text-gray-700">Check-in date</p>
            <div className="flex items-center bg-gray-100 p-3 rounded">
              <div className="bg-teal-900 text-white p-2 rounded mr-4">
                <Calendar size={24} />
              </div>
              <DatePicker
                selected={checkInDate}
                onChange={date => {
                  setCheckInDate(date);
                  setCheckOutDate(null);
                }}
                minDate={today}
                placeholderText="Select check-in date"
                className="w-full h-full text-gray-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Check-out Date */}
          <div className="mb-6">
            <p className="mb-2 text-gray-700">Check-out date</p>
            <div className="flex items-center bg-gray-100 p-3 rounded">
              <div className="bg-teal-900 text-white p-2 rounded mr-4">
                <Calendar size={24} />
              </div>
              <DatePicker
                selected={checkOutDate}
                onChange={date => setCheckOutDate(date)}
                minDate={checkInDate ? new Date(checkInDate.getTime() + 86400000) : today}
                placeholderText="Select check-out date"
                className="w-full h-full p-2 focus:outline-none"
                disabled={!checkInDate}
              />
            </div>
          </div>

          {/* Guest counts */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Adults</label>
              <input
                type="number"
                min="1"
                value={adults}
                onChange={(e) => setAdults(parseInt(e.target.value))}
                className="w-full p-3 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Children</label>
              <input
                type="number"
                min="0"
                value={children}
                onChange={(e) => setChildren(parseInt(e.target.value))}
                className="w-full p-3 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Price calculation */}
          {days > 0 && (
            <div className="text-gray-500">
              <p>
                You will pay{" "}
                <span className="text-gray-800 font-bold">{totalPrice}$</span>
                <br />
                for <span className="text-gray-800">{days} Days</span>
              </p>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleBookingCheck}
              className={`${isValidBooking ? "bg-teal-600 hover:bg-teal-700" : "bg-gray-300 cursor-not-allowed"
                } text-white font-bold py-3 px-4 rounded text-center`}
              disabled={!isValidBooking}
            >
              Book Now
            </button>
            <button onClick={handleCancelClick} className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-3 px-4 rounded text-center">
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Error Popup */}
      {error && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-100 bg-opacity-50 flex justify-center items-center z-50">
          <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg shadow-lg max-w-md">
            <svg fill="#6f1f1f" height="64px" width="64px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 52 52" xml:space="preserve" stroke="#6f1f1f"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26 S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"></path> <path d="M26,10c-0.552,0-1,0.447-1,1v22c0,0.553,0.448,1,1,1s1-0.447,1-1V11C27,10.447,26.552,10,26,10z"></path> <path d="M26,37c-0.552,0-1,0.447-1,1v2c0,0.553,0.448,1,1,1s1-0.447,1-1v-2C27,37.447,26.552,37,26,37z"></path> </g> </g></svg>
            <p className="text-gray-700 font-medium mb-4">{error}</p>
            <button
              onClick={closeErrorPopup}
              className="bg-red-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-gray-900"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

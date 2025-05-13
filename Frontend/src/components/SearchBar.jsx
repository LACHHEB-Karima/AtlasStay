import { useState } from 'react';
import { Link } from 'react-router-dom';


const SearchBar = () => {

  // Get today's date as a string in format YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [roomType, setRoomType] = useState('');
  const [showRoomTypeOptions, setShowRoomTypeOptions] = useState(false);

  // Validate check-out date is after check-in date
  const validateCheckOutDate = (date) => {
    if (checkInDate && date <= checkInDate) {
      return false;
    }
    return true;
  };

  // Handler for selecting room type
  const handleRoomTypeSelect = (type) => {
    setRoomType(type);
    setShowRoomTypeOptions(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="bg-teal-50 rounded-2xl p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:justify-between md:items-center">
          {/* Check-in Date Selector */}
          <div className="bg-white flex flex-col sm:flex-row items-start sm:items-center px-4 py-3 rounded-lg shadow hover:shadow-md w-full md:w-auto">
            <div className="flex items-center mb-2 sm:mb-0">
              <span className="mr-2">Check-in Date</span>
            </div>
            <input
              type="date"
              min={today}
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="outline-none w-full sm:w-auto"
            />
          </div>

          {/* Check-out Date Selector */}
          <div className="bg-white flex flex-col sm:flex-row items-start sm:items-center px-4 py-3 rounded-lg shadow hover:shadow-md w-full md:w-auto">
            <div className="flex items-center mb-2 sm:mb-0">
              <span className="mr-2">Check-out Date</span>
            </div>
            <input
              type="date"
              min={checkInDate || today}
              value={checkOutDate}
              onChange={(e) => {
                if (validateCheckOutDate(e.target.value)) {
                  setCheckOutDate(e.target.value);
                }
              }}
              className="outline-none w-full sm:w-auto"
              disabled={!checkInDate}
            />
          </div>

          {/* Room Type Selector */}
          <div className="bg-white relative flex items-center px-4 py-3 rounded-lg shadow hover:shadow-md w-full md:w-auto">
            <div
              className="cursor-pointer flex items-center justify-between w-full"
              onClick={() => setShowRoomTypeOptions(!showRoomTypeOptions)}
            >
              <span className="truncate">{roomType || 'Select Room Type'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Dropdown menu for room types */}
            {showRoomTypeOptions && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-lg shadow-lg z-10">
                <div
                  className="px-4 py-2 hover:bg-teal-50 cursor-pointer"
                  onClick={() => handleRoomTypeSelect('Single')}
                >
                  Single
                </div>
                <div
                  className="px-4 py-2 hover:bg-teal-50 cursor-pointer"
                  onClick={() => handleRoomTypeSelect('Double')}
                >
                  Double
                </div>
                <div
                  className="px-4 py-2 hover:bg-teal-50 cursor-pointer"
                  onClick={() => handleRoomTypeSelect('Family')}
                >
                  Family
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <Link
            to={`/search-results?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`}
            className={`bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors w-full md:w-auto text-center ${(!checkInDate || !checkOutDate || !roomType) && 'pointer-events-none opacity-50'
              }`}
          >
            Search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader, Search, CreditCard, Calendar, Users, ArrowRight, } from "lucide-react";
import { getMyBookings } from "../../services/bookingService";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
        setFilteredBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);


  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === "") {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(
        bookings.filter((booking) =>
          booking.bookingConfirmationCode.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const handleRoomDetails = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  if (bookings.length === 0)
    return <p className="text-center mt-8 text-gray-600">You have no paid bookings.</p>;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader className="w-10 h-10 text-teal-600 animate-spin" />
        <p className="mt-4 text-gray-600 font-medium">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
          <p className="text-gray-500 mb-6">View your upcoming and old stays</p>

          {/* Search bar */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by confirmation code"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
            />
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-4 bg-gray-100 rounded-full p-4 inline-flex">
                <CreditCard className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">No bookings found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                You don't have any paid bookings yet. Start planning your next trip!
              </p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-4 bg-gray-100 rounded-full p-4 inline-flex">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">No results found</h3>
              <p className="text-gray-500">No booking matches "{searchTerm}"</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Status & Price Banner */}
                  <div className="flex justify-between items-center bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-3 text-white">
                    <div className="flex items-center">
                      <span className="flex items-center justify-center bg-white text-teal-600 rounded-full h-6 w-6 mr-2">
                        <span className="text-xs font-bold">✓</span>
                      </span>
                      <span className="font-medium">Confirmed Booking</span>
                    </div>
                    <div className="font-bold">${booking.totalPrice}</div>
                  </div>

                  {/* Main Content */}
                  <div className="p-6">
                    {/* Room Title */}
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {booking.room?.roomTitle || "Unknown Room"}
                    </h3>

                    {/* Booking Details */}
                    <div className="space-y-4 mb-6">
                      {/* Dates */}
                      <div className="flex items-start">
                        <div className="bg-teal-50 rounded-lg p-2 mr-4">
                          <Calendar className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Stay Dates</p>
                          <p className="font-medium text-gray-800">
                            {formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}
                          </p>
                        </div>
                      </div>

                      {/* Guests */}
                      <div className="flex items-start">
                        <div className="bg-teal-50 rounded-lg p-2 mr-4">
                          <Users className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Guests</p>
                          <p className="font-medium text-gray-800">
                            {booking.totalNumOfGuest} {booking.totalNumOfGuest === 1 ? 'Guest' : 'Guests'}
                          </p>
                        </div>
                      </div>

                      {/* Confirmation Code */}
                      <div className="flex items-start">
                        <div className="bg-teal-50 rounded-lg p-2 mr-4">
                          <CreditCard className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Confirmation Code</p>
                          <p className="font-medium text-gray-800 font-mono">
                            {booking.bookingConfirmationCode}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Room Preview */}
                    {/* <div className="relative rounded-xl overflow-hidden h-40 mb-6">
                      <img 
                        src={booking.room?.roomPhotoUrl} 
                        alt={booking.room?.roomTitle}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div> */}

                    {/* Action Button */}
                    <button
                      onClick={() => handleRoomDetails(booking.room?.id)}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors duration-200 font-medium"
                    >
                      <span>View Room Details</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default MyBookings;
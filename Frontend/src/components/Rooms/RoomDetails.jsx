import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import { fetchRoomById } from '../../services/roomService';
import { Wifi, Snowflake, Coffee, PawPrint, ParkingCircle, Moon, Home, Coins} from 'lucide-react';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const amenities = [
    { name: 'WiFi', icon: <Wifi className="w-5 h-5 text-teal-600 " /> },
    { name: 'Air conditioning', icon: <Snowflake className="w-5 h-5 text-teal-600" /> },
    { name: 'Breakfast', icon: <Coffee className="w-5 h-5 text-teal-600" /> },
    { name: 'Pet', icon: <PawPrint className="w-5 h-5 text-teal-600" /> },
    { name: 'Parking', icon: <ParkingCircle className="w-5 h-5 text-teal-600" /> },
  ];

  const handleBookNow = () => {
    if (isAuthenticated) {
      navigate("/booking", { state: { 
      roomId: room.id, 
      roomTitle: room.roomTitle, 
      roomPrice: room.roomPrice, 
      roomPhotoUrl: room.roomPhotoUrl 
     }});
    } else {
      navigate("/login", { state: { from: `/room/${room.id}` } });
    }
  };

  useEffect(() => {
    const loadRoom = async () => {
      const data = await fetchRoomById(id);
      if (data) setRoom(data);
    };
    loadRoom();
  }, [id]);

  // Decorative Divider
  const DecorativeDivider = () => (
    <div className="flex items-center justify-center my-8">
      <div className="h-px bg-teal-600 opacity-30 w-16"></div>
      <div className="mx-4">
        <svg width="20" height="20" viewBox="0 0 20 20" className="text-teal-600 opacity-50">
          <path d="M10 0L20 10L10 20L0 10Z" fill="currentColor" />
          <circle cx="10" cy="10" r="4" fill="none" stroke="white" strokeWidth="1" />
        </svg>
      </div>
      <div className="h-px bg-teal-600 opacity-30 w-16"></div>
    </div>
  );

  if (!room) return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-600"></div>
    </div>
  );

  return (
    <div className="relative min-h-screen py-10 px-6 md:px-20 overflow-hidden">

      {/* Content Container */}
      <div className="relative max-w-5xl mx-auto">

        {/* Title  */}
        <div className="text-center mb-8 relative">
          <h2 className="relative inline-block px-6 text-3xl font-bold text-teal-800">
            {room.roomTitle}
          </h2>
        </div>

        {/* Header Image */}
        <div className="relative mb-10">
          {/* Ornamental Border */}
          <div className="absolute -inset-1 border-4 border-teal-600 opacity-10 rounded-3xl transform rotate-1"></div>
          
          {/* Image Container */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={room.roomPhotoUrl} 
              alt={room.roomTitle} 
              className="w-full h-72 md:h-96 object-cover" 
            />
          </div>
          
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-teal-600 opacity-20 rounded-tl"></div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-teal-600 opacity-20 rounded-tr"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-teal-600 opacity-20 rounded-bl"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-teal-600 opacity-20 rounded-br"></div>
        </div>

        {/* Badge Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-gray-700 mb-8">
          {[
              { label: `${room.beds} Beds`, icon: <Moon className="w-5 h-5 text-teal-600" /> },
              { label: room.roomType, icon: <Home className="w-5 h-5 text-teal-600" /> },
              { label: `$${room.roomPrice} night`, icon: <Coins className="w-5 h-5 text-teal-600" /> }
          ].map((badge, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute inset-0 bg-teal-700 opacity-10 rounded-full transform rotate-3 group-hover:rotate-0 transition-transform"></div>
              <span className="relative flex items-center bg-white px-4 py-2 rounded-full text-sm font-medium text-teal-800 border border-teal-200 shadow-sm">
                <span className="mr-2">{badge.icon}</span> {badge.label}
              </span>
            </div>
          ))}
        </div>

        <DecorativeDivider />

        {/* Main Content */}
        <div className="relative p-8 mb-10 ">
          {/* Amazigh pattern corners */}
          <div className="absolute top-0 left-0 w-32 h-32 opacity-5">
            <svg viewBox="0 0 100 100">
              <pattern id="cornerPattern" patternUnits="userSpaceOnUse" width="20" height="20">
                <path d="M5,5 L15,15 M15,5 L5,15" stroke="#0D9488" strokeWidth="1" />
              </pattern>
              <rect width="100" height="100" fill="url(#cornerPattern)" />
            </svg>
          </div>
          
          <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
            <svg viewBox="0 0 100 100">
              <pattern id="cornerPattern2" patternUnits="userSpaceOnUse" width="20" height="20">
                <path d="M5,5 L15,15 M15,5 L5,15" stroke="#0D9488" strokeWidth="1" />
              </pattern>
              <rect width="100" height="100" fill="url(#cornerPattern2)" />
            </svg>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-12">
            {/* Room Description */}
            <div className="flex-1">
              <div className="border-l-4 border-teal-600 pl-6 mb-8">
                <h3 className="text-xl font-bold text-teal-800 mb-3">Room Description</h3>
                <p className="text-gray-700 leading-relaxed">{room.roomDescription}</p>
              </div>

              {/* Amenities with Moroccan styling */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-teal-800 mb-6 flex items-center">
                  <div className="w-2 h-2 rotate-45 bg-teal-600 mr-3"></div>
                  Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center group">
                      <div className="p-2 border border-teal-200 rounded-lg bg-teal-50 mr-3 group-hover:bg-teal-100 transition-colors">
                        {item.icon}
                      </div>
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Section with Moroccan styling */}
            <div className="w-full md:w-80">
              <div className="relative bg-white border-2 border-teal-100 rounded-xl p-6 shadow-md">                
                <div className="flex items-baseline justify-center space-x-1 mb-6">
                  <span className="text-3xl font-bold text-teal-700">${room.roomPrice}</span>
                  <span className="text-gray-500 text-base">per night</span>
                </div>
                
                <button
                  onClick={handleBookNow}
                  className="relative overflow-hidden w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg text-sm font-medium text-center transition-colors group"
                > 
                  <span className="relative z-10 flex items-center justify-center">
                    Book Your Stay
                    <svg 
                      className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative footer element */}
        <div className="flex justify-center mb-10">
          <svg width="60" height="30" viewBox="0 0 60 30" className="text-teal-600 opacity-20">
            <path d="M0,0 L60,0 L30,30 Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
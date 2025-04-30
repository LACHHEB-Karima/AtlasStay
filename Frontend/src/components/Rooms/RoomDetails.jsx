import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchRoomById } from '../../services/roomService';

const RoomDetails = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        const loadRoom = async () => {
        const data = await fetchRoomById(id);
        if (data) setRoom(data);
        };
        loadRoom();
    }, [id]);

    if (!room) return <p className="text-center py-20">Loading room details...</p>;


    const amenities = ['WiFi', 'Air conditioning', 'Breakfast', 'Pool', 'Parking'];
 

  return (
    <div className="min-h-screen py-10 px-6 md:px-20">
      {/* Header Image bg-gradient-to-b from-teal-50 via-white to-teal-100 */}
      <div className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-lg">
        <img src={room.roomPhotoUrl} alt={room.roomTitle} className="w-full h-72 object-cover" />
      </div>

      {/* Details bg-white rounded-3xl shadow-lg */}
      <div className="mt-8 max-w-5xl mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-teal-700">{room.roomTitle}</h2>
            {/* <p className="text-gray-600 mt-1">Location</p> */}

            <div className="flex items-center gap-4 mt-4 text-gray-700">
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">{room.beds} Beds</span>
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">${room.roomPrice}/night</span>
            </div>

            <p className="mt-6 text-gray-700 leading-relaxed">{room.roomDescription}</p>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-teal-700 mb-2">Amenities</h3>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-600">
                {amenities.map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="mr-2 text-teal-500">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
         {/* Booking */}
            <div className="bg-white border border-teal-200 rounded-xl p-6 shadow-md self-center w-full md:w-1/3">
                <p className="text-sm font-semibold text-gray-600 mb-2">Start Booking</p>
                <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-teal-600">${room.roomPrice}</span>
                    <span className="text-gray-400 text-base">per Day</span>
                </div>
                <Link to="/booking"
                  className="mt-6 block w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-md text-sm font-medium text-center transition"
                >
                  Book Now!
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;

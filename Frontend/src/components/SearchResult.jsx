import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchAvailableRoomsBySearch } from '../services/roomService';
import RoomCard from './Rooms/RoomCard';

const SearchResult = () => {
  const location = useLocation();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(location.search);
  const checkInDate = query.get('checkInDate');
  const checkOutDate = query.get('checkOutDate');
  const roomType = query.get('roomType');

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      const data = await fetchAvailableRoomsBySearch(checkInDate, checkOutDate, roomType);
      setRooms(data.content);
      setLoading(false);
    };

    fetchRooms();
  }, [checkInDate, checkOutDate, roomType]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 mt-8">
      <h2 className="text-2xl font-semibold mb-6">Search Results</h2>
      {rooms.length === 0 ? (
        <p>No available rooms found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room.id} id={room.id} {...room} />
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;

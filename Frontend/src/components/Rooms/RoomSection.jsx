import RoomCard from './RoomCard';
import { useState, useEffect } from 'react';
import { fetchAvailableRooms } from '../../services/roomService';

const RoomsSection = () => {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      const data = await fetchAvailableRooms();
      setRooms(data.content);
    };
    loadRooms();
  }, []);

  return (
    <section className="py-16 px-4 md:px-20 bg-[#f9f9f9]">
      <div className="text-center mb-16 relative">
        <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gray-700 opacity-20" />
        <h2 className="inline-block relative px-6 text-3xl font-bold text-gray-800">
          Featured Rooms
        </h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto font-light">
          Book your best stay with authentic Amazigh culture in the majestic atlas mountains of Morocco.
        </p>
      </div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {rooms.map((room) => (
          <RoomCard key={room.id} id={room.id} {...room} />
        ))}
      </div>
      {/* Decorative Moroccan footer divider */}
      <div className="mt-16 flex justify-center">
        <div className="flex space-x-2 items-center">
          <div className="w-16 h-0.5 bg-gray-600 opacity-30"></div>
          <div className="w-3 h-3 rotate-45 bg-gray-600 opacity-30"></div>
          <div className="w-16 h-0.5 bg-gray-600 opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;

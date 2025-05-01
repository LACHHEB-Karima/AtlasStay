import React from 'react';
import RoomCard from './RoomCard';
import { useState, useEffect } from 'react';
import { fetchAvailableRooms } from '../../services/roomService';

const Rooms = () => {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
      const loadRooms = async () => {
        const data = await fetchAvailableRooms();
        setRooms(data.content);
      };
      loadRooms();
    }, []);

  return (
    <section className="py-16 px-4 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">Featured Rooms</h2>
        <p className="text-gray-500 mt-2">Find your ideal stay in Morocco’s most scenic destinations.</p>
      </div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {rooms.map((room) => (
          <RoomCard key={room.id} id={room.id} {...room} />
        ))}
      </div>
    </section>
  );
};

export default Rooms;

import React from 'react';
import { useWishlist } from '../../Contexts/WishListContext';
import RoomCard from './RoomCard';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <section className="py-16 px-4 md:px-20">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">You have no rooms in your wishlist yet.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {wishlist.map((room, index) => (
            <RoomCard key={index} {...room} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Wishlist;

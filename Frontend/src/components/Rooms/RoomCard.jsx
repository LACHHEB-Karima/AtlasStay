// RoomCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../Contexts/WishListContext';

const RoomCard = ({ id, roomPhotoUrl, roomTitle, roomPrice, beds = 1 }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const room = { id, roomPhotoUrl, roomTitle, roomPrice, beds };
  const wishlisted = isWishlisted(id);

  return (
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-xs">
      <button
        onClick={() => toggleWishlist(room)}
        className="absolute top-3 right-3 bg-white rounded-full p-1 shadow hover:scale-105 transition z-10"
        aria-label="Add to wishlist"
      >
        <svg
          className={`w-5 h-5 ${wishlisted ? 'fill-red-500' : 'fill-none'} stroke-red-500`}
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      <Link to={`/room/${id}`}>
        <img src={roomPhotoUrl} alt={roomTitle} className="h-48 w-full object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{roomTitle}</h3>
          {/* <div className="flex items-center text-sm text-gray-500 mt-1">
            <svg className="w-4 h-4 mr-1 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a2 2 0 10-2.828 0l-4.243 4.243a8 8 0 1111.314 0z" />
            </svg>
            Location
          </div> */}
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <svg className="w-4 h-4 mr-1 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 10h18M5 13h14v6H5z" />
            </svg>
            {beds} {beds === 1 ? 'bed' : 'beds'}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-teal-600 font-semibold">${roomPrice} / night</span>
            <span className="text-sm text-teal-700 font-medium">Details</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RoomCard;

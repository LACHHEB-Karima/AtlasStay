import { Link } from 'react-router-dom';
import { useWishlist } from '../../Contexts/WishListContext';

const RoomCard = ({ id, roomPhotoUrl, roomTitle, roomPrice, beds = 1 }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const room = { id, roomPhotoUrl, roomTitle, roomPrice, beds };
  const wishlisted = isWishlisted(id);

  // Amazigh geometric pattern SVG
  const AmazighPattern = () => (
    <svg className="absolute top-0 right-0 w-32 h-32 opacity-5" viewBox="0 0 100 100">
      <pattern id={`amazighPattern-${id}`} patternUnits="userSpaceOnUse" width="20" height="20">
        <path d="M0,10 L20,10 M10,0 L10,20" stroke="#0D9488" strokeWidth="1" />
        <path d="M5,5 L15,15 M15,5 L5,15" stroke="#0D9488" strokeWidth="1" />
      </pattern>
      <rect width="100" height="100" fill={`url(#amazighPattern-${id})`} />
    </svg>
  );

  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-sm w-full max-w-xs group">
      {/* Background pattern */}
      <AmazighPattern />

      {/* Wishlist button */}
      <button
        onClick={() => toggleWishlist(room)}
        className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md hover:scale-105 transition z-10 group-hover:opacity-100"
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

      <Link to={`/room/${id}`} className="block">
        {/* Image container */}
        <div className="relative overflow-hidden">
          <img
            src={roomPhotoUrl}
            alt={roomTitle}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Price tag */}
          <div className="absolute bottom-0 right-0 bg-teal-600 text-white px-3 py-1 clip-price-tag">
            <span className="font-semibold">${roomPrice}</span>
            <span className="text-xs ml-1">night</span>
          </div>
        </div>

        {/* Content container */}
        <div className="p-4">
          {/* Room title */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rotate-45 bg-teal-600"></div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-teal-700 transition-colors">
              {roomTitle}
            </h3>
          </div>

          {/* Beds information */}
          <div className="flex items-center text-sm text-gray-600 mt-3">
            <svg className="w-5 h-5 mr-2 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="8" width="20" height="12" rx="2" />
              <path d="M2 14h20" />
              <path d="M6 8V6a2 2 0 012-2h8a2 2 0 012 2v2" />
            </svg>
            {beds} {beds === 1 ? 'bed' : 'beds'}
          </div>

          {/* Button */}
          <div className="mt-4 flex justify-end">
            <span className="inline-flex items-center text-sm font-medium text-teal-700 group-hover:text-teal-800">
              Explore Room
              <svg
                className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </div>
      </Link>

      {/* Decorative Amazigh corner elements */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-teal-600 opacity-20 rounded-tl"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-teal-600 opacity-20 rounded-tr"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-teal-600 opacity-20 rounded-bl"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-teal-600 opacity-20 rounded-br"></div>
    </div>
  );
};

// Add the clip path
const styles = `
  .clip-price-tag {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%);
  }
`;

// Export with added CSS
const RoomCardWithStyles = (props) => (
  <>
    <style>{styles}</style>
    <RoomCard {...props} />
  </>
);

export default RoomCardWithStyles;
import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (room) => {
    setWishlist((prev) => {
      const exists = prev.find((r) => r.title === room.title);
      if (exists) {
        return prev.filter((r) => r.title !== room.title);
      } else {
        return [...prev, room];
      }
    });
  };

  const isWishlisted = (title) => wishlist.some((r) => r.title === title);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

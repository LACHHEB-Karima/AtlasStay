import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper function for active link styles
  const getLinkClassName = ({ isActive }) => 
    isActive ? "text-teal-600 font-medium" : "text-gray-700 hover:text-green-800";

  return (
    <nav className="relative border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-teal-600">AtlasStay.</Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <NavLink to="/" className={getLinkClassName} end>Home</NavLink>
            <NavLink to="/wishlist" className={getLinkClassName}>Wishlist</NavLink>
            <NavLink to="/rooms" className={getLinkClassName}>Rooms</NavLink>
            <NavLink to="/activities" className={getLinkClassName}>Activities</NavLink>
            <Link 
              to="/login" 
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Sign in
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-teal-600 focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-lg rounded-b-lg">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `block py-2 ${isActive ? 'text-teal-600 font-medium' : 'text-gray-700 hover:text-green-800'}`
            }
            end
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/wishlist" 
            className={({ isActive }) => 
              `block py-2 ${isActive ? 'text-teal-600 font-medium' : 'text-gray-700 hover:text-green-800'}`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Wishlist
          </NavLink>
          <NavLink 
            to="/rooms" 
            className={({ isActive }) => 
              `block py-2 ${isActive ? 'text-teal-600 font-medium' : 'text-gray-700 hover:text-green-800'}`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Rooms
          </NavLink>
          <NavLink 
            to="/activities" 
            className={({ isActive }) => 
              `block py-2 ${isActive ? 'text-teal-600 font-medium' : 'text-gray-700 hover:text-green-800'}`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Activities
          </NavLink>
          <Link 
            to="/login" 
            className="mt-2 block w-full bg-teal-600 text-center text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sign in
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
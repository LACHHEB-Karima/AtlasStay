import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  // Helper function for active link styles
  const getLinkClassName = ({ isActive }) =>
    isActive ? "text-teal-600 font-medium" : "text-gray-700 hover:text-green-800";

  return (
    <nav className="relative border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-teal-600">
            <h4 className='text-teal-500'><strong className='text-teal-600 text-[30px]'>Atlas</strong><span className='text-[25px]'>Stay</span></h4>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <NavLink to="/" className={getLinkClassName} end>Home</NavLink>
            <NavLink to="/wishlist" className={getLinkClassName}>Wishlist</NavLink>
            <NavLink to="/rooms" className={getLinkClassName}>Rooms</NavLink>
            <NavLink to="/activities" className={getLinkClassName}>Activities</NavLink>
            {isAuthenticated ? (
              <div className="relative">
                <button onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center hover:bg-teal-200 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 text-teal-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
                      />
                    </svg>
                  </div>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <Link to="/my-profile" className="block px-4 py-2 text-gray-700 hover:bg-teal-100">Profile</Link>
                    <Link to="/My-bookings" className="block px-4 py-2 text-gray-700 hover:bg-teal-100">Bookings</Link>
                    <Link to="/wishlist" className="block px-4 py-2 text-gray-700 hover:bg-teal-100">Wishlist</Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Sign in
              </Link>
            )}

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
        <div className="md:hidden absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 px-4 py-3 space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition-colors ${isActive ? 'text-teal-600 font-medium' : 'text-gray-700 hover:bg-teal-100'
              }`
            }
            end
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition-colors ${isActive ? 'text-teal-600 font-medium' : 'text-gray-700 hover:bg-teal-100'
              }`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Wishlist
          </NavLink>
          <NavLink
            to="/rooms"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition-colors ${isActive ? 'text-teal-600 font-medium' : 'text-gray-700 hover:bg-teal-100'
              }`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Rooms
          </NavLink>
          <NavLink
            to="/activities"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition-colors ${isActive ? 'text-teal-600 font-medium' : 'text-gray-700 hover:bg-teal-100'
              }`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Activities
          </NavLink>

          {isAuthenticated ? (
            <>
              <div className="border-t border-gray-100 my-2" />
              <Link
                to="/my-profile"
                className="block px-4 py-2 text-gray-700 rounded-md hover:bg-teal-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/my-bookings"
                className="block px-4 py-2 text-gray-700 rounded-md hover:bg-teal-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Bookings
              </Link>
              <Link
                to="/wishlist"
                className="block px-4 py-2 text-gray-700 rounded-md hover:bg-teal-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wishlist
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-100 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block w-full text-center bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign in
            </Link>
          )}
        </div>
      )}

    </nav>
  );
};

export default NavBar;
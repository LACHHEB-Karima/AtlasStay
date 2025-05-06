import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/Login/Signup';
import Activities from './components/Activities';
import Wishlist from './components/Rooms/Whishlist';
import { WishlistProvider } from './Contexts/WishListContext';
import RoomDetails from './components/Rooms/RoomDetails';
import BookingProcess from './components/Booking/BookingProcess';
import Rooms from './components/Rooms/Rooms';
import SearchResult from './components/SearchResult';
import OAuthSuccess from './components/Test-Social-Login/OAuthSuccess';
import Dashboard from './components/Test-Social-Login/Dashboard';
import TestLogin from './components/Test-Social-Login/TestLogin';

const PlaceholderPage = ({ title }) => (
  <div className="py-16 text-center">
    <h1 className="text-3xl font-bold text-green-600">{title} Page</h1>
    <p className="mt-4 text-gray-600">This page is under construction.</p>
  </div>
);

function AppContent() {
  const location = useLocation();
  const hideNavOnRoutes = ['/login', '/signup','/booking'];

  const shouldHideNav = hideNavOnRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-white">
      {!shouldHideNav && <NavBar />}
      <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/room/:id" element={<RoomDetails />} />
            <Route path="/booking" element={<BookingProcess />} />
            <Route path="/search-results" element={<SearchResult />} />
            <Route path="/oauth2/success" element={<OAuthSuccess />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Testlogin" element={<TestLogin />} />
            <Route path="*" element={<PlaceholderPage title="404 - Not Found" />} />
          </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <WishlistProvider>
    <Router>
      <AppContent />
    </Router>
  </WishlistProvider>
  );
}

export default App;

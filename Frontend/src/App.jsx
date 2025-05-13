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
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './Contexts/AuthContext';
import RequireAuth from './routes/RequireAuth';
import MyBookings from './components/Booking/MyBookings';
import MyProfile from './components/MyProfil';
import ActivateAccount from './pages/Login/ActivateAccount';

const PlaceholderPage = ({ title }) => (
  <div className="py-16 text-center">
    <h1 className="text-3xl font-bold text-teal-600">{title} Page</h1>
    <p className="mt-4 text-gray-600">This page is under construction.</p>
  </div>
);

function AppContent() {
  const location = useLocation();
  const hideNavOnRoutes = ['/login', '/signup', '/activate', '/booking'];

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
            <Route path="/booking"  element={ <RequireAuth>
                                                <BookingProcess />
                                              </RequireAuth>
            }/>
            <Route path="/search-results" element={<SearchResult />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/activate" element={<ActivateAccount />} />
            <Route path="*" element={<PlaceholderPage title="404 - Not Found" />} />
          </Routes>
      </main>
    </div>
  );
}

function App() {
  const clientId = '785904721379-0ob3q65sbbf5o2hshct3u0tnokoohufk.apps.googleusercontent.com';
  return (
    <Router>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
      
        <WishlistProvider>
        
            <AppContent />
          
        </WishlistProvider>
      </AuthProvider>  
    </GoogleOAuthProvider>
    </Router>

  );
}

export default App;

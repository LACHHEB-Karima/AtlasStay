import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Handle user login by using authService
  const handleLogin = async (email, password) => {
    try {
      await authService.login(email, password); 
      await fetchCurrentUser(); 
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed', error);
      setIsAuthenticated(false);
      throw error; 
  };

  // Fetch the current authenticated user from the backend
  const fetchCurrentUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      setUser(response);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Handle user logout using authService and clear user state
  const logout = async () => {
    try {
      await authService.logout(); 
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      navigate('/');
    }
  };

  // Use effect hook to check if the user is authenticated when the page loads
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
}

export const useAuth = () => useContext(AuthContext);

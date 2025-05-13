import axios from 'axios';

const API = 'http://localhost:4040/api/v1/auth';

// Register user
export const register = async (data) => {
  const response = await axios.post(`${API}/register`, data);
  return response;
};

// Activate user account
export const activateAccount = async (token) => {
  await axios.get(`${API}/activate-account`, { params: { token } });
};

// Login user and set JWT cookie
export const login = async (email, password) => {
  const response = await axios.post(
    `${API}/authenticate`,
    { email, password },
    { withCredentials: true }
  );
  return response.data;
};

// Logout user and clear cookie
export const logout = async () => {
  await axios.post(`${API}/logout`, {}, { withCredentials: true });
};

//get current user
export const getCurrentUser = async () => {
  try {
    const response = await axios.get("http://localhost:4040/api/v1/user/me", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



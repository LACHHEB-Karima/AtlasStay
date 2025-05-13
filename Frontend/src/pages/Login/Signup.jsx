import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { register } from '../../services/authService';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: () => {
      window.location.href = 'http://localhost:4040/oauth2/authorization/google';
    },
    onError: () => {
      console.log('Google login failed');
    }
  });

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 202) {
        navigate("/activate");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <h4 className='text-teal-500'><strong className='text-teal-600 text-[30px]'>Atlas</strong><span className='text-[25px]'>Stay</span></h4>
        </div>
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">Create an account</h1>
        <p className="text-center text-gray-600 mb-8">Join AtlasStay to get started</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-800 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-800 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-800 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="w-5 h-5 text-teal-500">
                    <path d="M1 1l22 22" />
                    <path d="M17.94 17.94A10.05 10.05 0 0112 20c-7 0-11-8-11-8a21.33 21.33 0 015.33-6.62" />
                    <path d="M9.88 9.88A3 3 0 0114.12 14.12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="w-5 h-5 text-teal-500">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-800 font-medium mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="w-5 h-5 text-teal-500">
                    <path d="M1 1l22 22" />
                    <path d="M17.94 17.94A10.05 10.05 0 0112 20c-7 0-11-8-11-8a21.33 21.33 0 015.33-6.62" />
                    <path d="M9.88 9.88A3 3 0 0114.12 14.12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="w-5 h-5 text-teal-500">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="flex items-center mb-6">
            <input type="checkbox" id="terms" className="h-4 w-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500" required />
            <label htmlFor="terms" className="ml-2 block text-gray-800 text-sm">
              I agree to the <a href="#" className="text-teal-500 hover:text-teal-600">Terms of Service</a> and <a href="#" className="text-teal-500 hover:text-teal-600">Privacy Policy</a>
            </label>
          </div>

          {errors.general && <p className="text-red-500 text-sm mb-4">{errors.general}</p>}

          <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded font-medium hover:bg-teal-600 transition duration-200">
            Create Account
          </button>
        </form>

        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-600">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          onClick={loginWithGoogle}
          className="w-full py-3 border border-gray-300 rounded flex items-center justify-center font-medium hover:bg-gray-50 transition duration-200"
        >
          {/* Google Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Sign up with Google
        </button>

        <div className="text-center mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-500 hover:text-teal-600">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

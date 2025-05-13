import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setErrors({});
      await handleLogin(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setErrors({ general: 'Email and/or password is incorrect' });
    }

  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      window.location.href = `http://localhost:4040/oauth2/authorization/google?redirect_uri=${encodeURIComponent(from)}`;
    },
    onError: () => {
      console.log('Google login failed');
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <h4 className='text-teal-500'>
            <strong className='text-teal-600 text-[30px]'>Atlas</strong>
            <span className='text-[25px]'>Stay</span>
          </h4>
        </div>

        <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">Welcome back</h1>
        <p className="text-center text-gray-600 mb-6">Authenticate to book your ideal stay</p>

        {errors.general && <p className="text-red-500 text-center mb-4">{errors.general}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-800 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-800 font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="w-5 h-5 text-teal-500">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                  {showPassword && <line x1="1" y1="1" x2="23" y2="23" />}
                </svg>
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-3 rounded font-medium hover:bg-teal-600 transition duration-200"
          >
            Sign in
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Sign in with Google
        </button>

        <div className="text-center mt-8">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-teal-500 hover:text-teal-600">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

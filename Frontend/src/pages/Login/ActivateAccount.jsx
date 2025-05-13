import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { activateAccount } from '../../services/authService';

export default function ActivateAccount() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    const key = e.key;

    if (key === "Backspace") {
      if (code[index]) {
        // Clear current
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        // Move to previous and clear
        inputRefs.current[index - 1].focus();
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
      }
    } else if (key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };


  useEffect(() => {
    if (code.every(d => d !== "")) {
      const verifyCode = async () => {
        try {
          const codeString = code.join("");
          await activateAccount(codeString);
          navigate("/login");
        } catch (err) {
          setError(err.response?.data?.message || "Activation failed. Please try again.");
          setCode(["", "", "", "", "", ""]);
          inputRefs.current[0].focus();
        }
      };
      verifyCode();
    }
  }, [code]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="mb-8">
          <h4 className="text-teal-500 text-3xl font-bold">
            <strong className="text-teal-600 text-4xl">Atlas</strong><span className="text-3xl">Stay</span>
          </h4>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Activate Your Account</h2>
        <p className="text-gray-600 mb-6">Enter the 6-digit code sent to your email</p>

        <div className="flex justify-center gap-3 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          ))}
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 shadow">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

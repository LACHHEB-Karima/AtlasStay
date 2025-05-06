import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4040/api/v1/user/me", { withCredentials: true })
      .then((res) => {
        console.log("User data:", res.data);
        navigate("/dashboard");
      })
      .catch(() => {
        alert("Login failed");
        navigate("/");
      });
  }, [navigate]);

  return <p>Logging you in...</p>;
};

export default OAuthSuccess;

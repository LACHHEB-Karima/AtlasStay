import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4040/api/v1/user/me", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => window.location.href = "/");
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;

import { useEffect, useState } from "react";
import { getUserProfile } from "../services/authService";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const data = await getUserProfile(token);
          setUser(data);
        } catch (error) {
          console.error("Failed to fetch profile:", error.response?.data?.message);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? <p>Welcome, {user.name}!</p> : <p>Loading user data...</p>}
    </div>
  );
};

export default Dashboard;

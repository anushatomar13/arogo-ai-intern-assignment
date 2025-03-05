import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../services/authService";
import { logout } from "../redux/userSlice"; 

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userFromStore = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token && !userFromStore) {
        try {
          const data = await getUserProfile(token);
          console.log(data);
          setUser(data);
        } catch (error) {
          console.error("Failed to fetch profile:", error.response?.data?.message);
        }
      } else {
        setUser(userFromStore);
      }
    };

    fetchUser();
  }, [userFromStore]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p>Welcome, {user.name}!</p> 
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;

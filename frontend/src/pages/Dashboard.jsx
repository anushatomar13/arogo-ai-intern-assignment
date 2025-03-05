import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/user-login"); 
    }
  }, [user, navigate]);

  if (!user) return null; 

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      {user.role === "doctor" ? (
        <p>This is the Doctor Dashboard</p>
      ) : (
        <p>This is the Patient Dashboard</p>
      )}
    </div>
  );
};

export default Dashboard;

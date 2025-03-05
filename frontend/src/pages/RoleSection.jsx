import { useNavigate } from "react-router-dom";

const UserDoctorSelection = () => {
  const navigate = useNavigate();

  const handleSelection = (role) => {
    if (role === "user") {
      navigate("/login");
    } else if (role === "doctor") {
      navigate("/doctor-login"); 
    }
  };

  return (
    <div>
      <h2>Are you a User or Doctor?</h2>
      <button onClick={() => handleSelection("user")}>User</button>
      <button onClick={() => handleSelection("doctor")}>Doctor</button>
    </div>
  );
};

export default UserDoctorSelection;

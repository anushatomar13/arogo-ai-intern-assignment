import { useNavigate } from "react-router-dom";

const UserDoctorSelection = () => {
  const navigate = useNavigate();

  const handleSelection = (role) => {
    if (role === "user") {
      navigate("/user-login");
    } else if (role === "doctor") {
      navigate("/doctor-login");
    }
  };

  return (
    <div className="container dark-theme">
      <div className="left-section dark-box">
        <h2>Are you a User or a Doctor?</h2>
        <button onClick={() => handleSelection("user")} className="user-btn">User</button>
        <button onClick={() => handleSelection("doctor")} className="doctor-btn">Doctor</button>
      </div>

      <div className="right-section dark-box image-container">
        <img src="/home.jpg" alt="Home" className="right-image" />
      </div>
    </div>
  );
};

export default UserDoctorSelection;
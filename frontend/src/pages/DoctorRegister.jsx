import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerDoctor } from "../services/authService";

const DoctorRegister = () => {
  const [doctorData, setDoctorData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    phone: "",
    feesPerConsultation: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerDoctor(doctorData);
      alert("Registration successful!");
      navigate("/doctor-login");
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message || "An error occurred");
    }
  };

  const styles = {
    page: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#121212",
      color: "#fff",
    },
    container: {
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(255, 255, 255, 0.1)",
      backgroundColor: "#1e1e1e",
      textAlign: "center",
      width: "100%",
      maxWidth: "400px",
    },
    input: {
      width: "calc(100% - 20px)",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid #444",
      backgroundColor: "#222",
      color: "#fff",
      fontSize: "1rem",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      border: "none",
      borderRadius: "5px",
      color: "#fff",
      cursor: "pointer",
      fontSize: "1rem",
      marginTop: "15px",
      transition: "background 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2>Doctor Registration</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(doctorData).map((key) => (
            <input
              key={key}
              type={key === "password" ? "password" : "text"}
              name={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              onChange={handleChange}
              required
              style={styles.input}
            />
          ))}
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegister;
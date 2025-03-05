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

  return (
    <div>
      <h2>Doctor Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="specialization" placeholder="Specialization" onChange={handleChange} required />
        <input type="number" name="experience" placeholder="Experience (years)" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
        <input type="number" name="feesPerConsultation" placeholder="Fees" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default DoctorRegister;

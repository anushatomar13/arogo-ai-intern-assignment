import { useState, useEffect } from "react";
import axios from "axios";

const DoctorSearch = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        `https://arogo-ai-backend.onrender.com/api/doctors/search`,
        {
          params: { name, location, specialization },
        }
      );
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [name, location, specialization]); // Auto-fetch when filters change

  return (
    <div style={{ padding: "20px", backgroundColor: "#121212", color: "#fff", minHeight: "100vh" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Search for Doctors</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", width: "30%", backgroundColor: "#222", color: "#fff", border: "1px solid #444" }}
        />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", width: "30%", backgroundColor: "#222", color: "#fff", border: "1px solid #444" }}
        >
          <option value="">Select Location</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
        </select>
        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", width: "30%", backgroundColor: "#222", color: "#fff", border: "1px solid #444" }}
        >
          <option value="">Select Specialization</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dermatologist">Dermatologist</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "15px" }}>
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div key={doctor._id} style={{ padding: "15px", borderRadius: "8px", backgroundColor: "#222", boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "5px" }}>{doctor.name}</h3>
              <p>Specialization: {doctor.specialization}</p>
              <p>Location: {doctor.location}</p>
              <p>Experience: {doctor.experience} years</p>
              <p>Fees: ${doctor.feesPerConsultation}</p>
            </div>
          ))
        ) : (
          <p>No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorSearch;
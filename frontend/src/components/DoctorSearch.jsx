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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Search for Doctors</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded w-1/3"
        >
          <option value="">Select Location</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
        </select>
        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="border p-2 rounded w-1/3"
        >
          <option value="">Select Specialization</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dermatologist">Dermatologist</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div key={doctor._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{doctor.name}</h3>
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

import { useState, useEffect } from "react";
import axios from "axios";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [location, setLocation] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/doctors/search", {
        params: { name, specialization, location },
      });
      setDoctors(response.data || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const bookAppointment = async () => {
    if (!appointmentDate || !appointmentTime || !selectedDoctor) {
      alert("Please select a date, time, and doctor.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not authenticated. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointments/book",
        {
          doctorId: selectedDoctor._id,
          date: appointmentDate,
          time: appointmentTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Appointment booked successfully!");
      setIsModalOpen(false);
      setAppointmentDate("");
      setAppointmentTime("");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("There was an error booking the appointment.");
    }
  };

  const debouncedFetchDoctors = debounce(fetchDoctors, 300);

  useEffect(() => {
    debouncedFetchDoctors();
  }, [name, specialization, location]);

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  return (
    <div>
      <h2>Search for Doctors</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="border p-2 rounded w-1/3"
        >
          <option value="">Select Specialization</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dermatologist">Dermatologist</option>
        </select>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded w-1/3"
        >
          <option value="">Select Location</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
        </select>
      </div>

      <div
        className="doctor-list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "15px",
        }}
      >
        {doctors.length === 0 && <p>No doctors found.</p>}
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="doctor-card"
            style={{
              padding: "15px",
              backgroundColor: "#f9f9f9",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 2px 3px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>{doctor.name}</h3>
            <p>
              <strong>Specialization:</strong> {doctor.specialization}
            </p>
            <p>
              <strong>Experience:</strong> {doctor.experience} years
            </p>
            <p>
              <strong>Location:</strong> {doctor.location}
            </p>
            <p>
              <strong>Phone:</strong> {doctor.phone}
            </p>
            <p>
              <strong>Fees per Consultation:</strong> ${doctor.feesPerConsultation}
            </p>

            <button
              onClick={() => {
                setSelectedDoctor(doctor);
                setIsModalOpen(true); 
              }}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "10px 15px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && selectedDoctor && (
        <div className="modal" style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="modal-content" style={{ padding: "20px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            <h3>Book Appointment with Dr. {selectedDoctor.name}</h3>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              style={{ padding: "10px", margin: "10px 0" }}
            />
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              style={{ padding: "10px", margin: "10px 0" }}
            />
            <div style={{ marginTop: "10px" }}>
              <button onClick={bookAppointment} style={{ padding: "10px 15px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                Book Appointment
              </button>
              <button onClick={() => setIsModalOpen(false)} style={{ padding: "10px 15px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginLeft: "10px" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;

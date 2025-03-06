import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../redux/userSlice";
import { FaSearch, FaCalendarAlt, FaSignOutAlt, FaHome } from "react-icons/fa";
import DoctorSearch from "../components/DoctorSearch";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showDoctorSearch, setShowDoctorSearch] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const fetchDoctorAppointments = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("http://localhost:5000/api/appointments/doctor", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch appointments");
      }

      setAppointments(data.appointments);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShowAppointments = () => {
    if (!showAppointments) {
      fetchDoctorAppointments();
    }
    setShowAppointments(!showAppointments);
  };

  const handleSearchDoctors = () => {
    navigate("/doctors-all");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/user-login");
  };

  useEffect(() => {
    if (!user) {
      navigate("/user-login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#121212", color: "white" }}>
      <div style={{ width: "250px", backgroundColor: "#1e1e1e", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>HealthCare</h2>
          <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <button style={{ backgroundColor: "#333", padding: "10px", borderRadius: "5px", color: "white", border: "none", cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
              <FaHome /> Dashboard
            </button>
            {user.role === "doctor" && (
              <button style={{ backgroundColor: "#333", padding: "10px", borderRadius: "5px", color: "white", border: "none", cursor: "pointer" }} onClick={handleShowAppointments}>
                <FaCalendarAlt /> See All Appointments
              </button>
            )}
            {user.role === "patient" && (
              <button style={{ backgroundColor: "#4CAF50", padding: "10px", borderRadius: "5px", color: "white", border: "none", cursor: "pointer" }} onClick={handleSearchDoctors}>
                <FaSearch /> Book an Appointment
              </button>
            )}
            <button style={{ backgroundColor: "#D32F2F", padding: "10px", borderRadius: "5px", color: "white", border: "none", cursor: "pointer" }} onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </nav>
        </div>
      </div>

      <div style={{ flex: 1, padding: "20px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>Welcome, {user.name}</h2>
        <div style={{ backgroundColor: "#1e1e1e", padding: "20px", borderRadius: "10px", textAlign: "center", marginBottom: "20px" }}>
          {user.role === "doctor" ? (
            <p>Manage your patients and appointments.</p>
          ) : (
            <p>Book appointments and check your medical history.</p>
          )}
        </div>

        {user.role === "doctor" && showAppointments && (
          <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#1e1e1e", borderRadius: "10px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>Appointments</h3>
            {loading && <p>Loading appointments...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && appointments.length === 0 && <p>No appointments found.</p>}
            {!loading && !error && appointments.length > 0 && (
              <ul>
                {appointments.map((appointment) => (
                  <li key={appointment._id} style={{ backgroundColor: "#333", padding: "10px", borderRadius: "5px", marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ fontSize: "16px" }}>Patient: {appointment.userId.name}</p>
                      <p style={{ fontSize: "14px", color: "#bbb" }}>{appointment.date} at {appointment.time}</p>
                    </div>
                    <span style={{ padding: "5px 10px", borderRadius: "5px", backgroundColor: appointment.status === "approved" ? "#4CAF50" : "#FFC107", color: "black" }}>
                      {appointment.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

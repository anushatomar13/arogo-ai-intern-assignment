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
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">HealthCare</h2>
          <nav className="space-y-4">
            <button className="flex items-center space-x-2 w-full p-3 rounded-lg bg-gray-700 hover:bg-gray-600" onClick={() => navigate("/dashboard")}>
              <FaHome /> <span>Dashboard</span>
            </button>
            {user.role === "doctor" && (
              <>
                <button
                  className="flex items-center space-x-2 w-full p-3 rounded-lg bg-gray-700 hover:bg-gray-600"
                  onClick={handleShowAppointments}
                >
                  <FaCalendarAlt /> <span>See All Appointments</span>
                </button>
              </>
            )}
            <button className="flex items-center space-x-2 w-full p-3 rounded-lg bg-red-600 hover:bg-red-700" onClick={handleLogout}>
              <FaSignOutAlt /> <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6">Welcome, {user.name}</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl text-center mb-6">
          {user.role === "doctor" ? (
            <p className="text-gray-300">Manage your patients and appointments.</p>
          ) : (
            <p className="text-gray-300">Book appointments and check your medical history.</p>
          )}
        </div>

        {user.role === "doctor" && showAppointments && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-md w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4">Appointments</h3>
            {loading && <p>Loading appointments...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && appointments.length === 0 && <p>No appointments found.</p>}
            {!loading && !error && appointments.length > 0 && (
              <ul className="space-y-3">
                {appointments.map((appointment) => (
                  <li key={appointment._id} className="bg-gray-700 p-3 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="text-lg">Patient: {appointment.userId.name}</p>
                      <p className="text-sm text-gray-300">{appointment.date} at {appointment.time}</p>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded ${appointment.status === "approved" ? "bg-green-500" : "bg-yellow-500"}`}>
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

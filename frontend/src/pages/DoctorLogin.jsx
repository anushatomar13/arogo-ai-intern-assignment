import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginDoctor } from "../services/authService"; 
import { setUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginDoctor({ email, password });
      localStorage.setItem("token", res.token);
      dispatch(setUser({ ...res.doctor, role: "doctor" }));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#121212", color: "#fff" }}>
      <div style={{ backgroundColor: "#1e1e1e", padding: "30px", borderRadius: "8px", width: "350px", textAlign: "center", boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.1)" }}>
        <h2 style={{ marginBottom: "20px" }}>Doctor Login</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#333", color: "#fff" }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#333", color: "#fff" }} />
          <button type="submit" style={{ padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#28a745", color: "#fff", cursor: "pointer" }}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;
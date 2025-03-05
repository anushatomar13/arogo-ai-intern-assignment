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
    <div>
      <h2>Doctor Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default DoctorLogin;

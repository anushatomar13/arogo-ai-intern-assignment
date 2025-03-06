import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { setUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.token);
      dispatch(setUser(res.user));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || "An error occurred");
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
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
      backgroundColor: "#1e1e1e",
      textAlign: "center",
      width: "300px",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid #333",
      backgroundColor: "#333",
      color: "#fff",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      border: "none",
      borderRadius: "5px",
      color: "#fff",
      cursor: "pointer",
      fontSize: "1rem",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2>User Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password, role: "user" });
      navigate("/user-login");
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#0a0f1e",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "380px", // Slightly smaller for better layout
          backgroundColor: "#1a1f36",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.6)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            color: "#ffffff",
            marginBottom: "15px",
            textShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
          }}
        >
          User Register
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              margin: "8px 0",
              fontSize: "14px",
              border: "none",
              borderRadius: "6px",
              backgroundColor: "#111827",
              color: "white",
              outline: "none",
              textAlign: "center",
              boxShadow: "0 0 6px rgba(255, 255, 255, 0.1)",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              margin: "8px 0",
              fontSize: "14px",
              border: "none",
              borderRadius: "6px",
              backgroundColor: "#111827",
              color: "white",
              outline: "none",
              textAlign: "center",
              boxShadow: "0 0 6px rgba(255, 255, 255, 0.1)",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              margin: "8px 0",
              fontSize: "14px",
              border: "none",
              borderRadius: "6px",
              backgroundColor: "#111827",
              color: "white",
              outline: "none",
              textAlign: "center",
              boxShadow: "0 0 6px rgba(255, 255, 255, 0.1)",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "15px",
              background: "linear-gradient(90deg, #3b82f6, #2563eb)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "0.3s ease",
              marginTop: "12px",
              textTransform: "uppercase",
              fontWeight: "bold",
              letterSpacing: "1px",
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.7)",
            }}
            onMouseOver={(e) =>
              (e.target.style.background = "linear-gradient(90deg, #2563eb, #1e40af)")
            }
            onMouseOut={(e) =>
              (e.target.style.background = "linear-gradient(90deg, #3b82f6, #2563eb)")
            }
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
